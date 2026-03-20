import azure.functions as func
import logging
from app import app  # Import your Flask app
from flask import Request

# ✅ Define the Azure Function App
function_app = func.FunctionApp(http_auth_level=func.AuthLevel.FUNCTION)

# ✅ Catch-All Route for Azure Functions to Forward Requests to Flask
@function_app.route(route="{*path}")  
def main(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Received request in Azure Function.")

    try:
        # Convert Azure Functions request to Flask request
        with app.test_request_context(
            path=req.url, 
            method=req.method,
            headers={k: v for k, v in req.headers.items()},
            json=req.get_json(silent=True)  # Handle JSON requests safely
        ):
            # Process request using Flask app
            response = app.full_dispatch_request()

        # Convert Flask response to Azure Function response
        return func.HttpResponse(
            response.get_data(as_text=True),
            status_code=response.status_code,
            mimetype=response.mimetype
        )
    except Exception as e:
        logging.error(f"Error in function: {str(e)}")
        return func.HttpResponse(f"Internal Server Error: {str(e)}", status_code=500)

# ✅ A Simple Azure Function Endpoint (Independent of Flask)
@function_app.route("backend", auth_level=func.AuthLevel.FUNCTION)
def backend(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    name = req.params.get('name')

    if not name:
        try:
            req_body = req.get_json()
            name = req_body.get('name')
        except ValueError:
            pass

    if name:
        return func.HttpResponse(f"Hello, {name}. This function executed successfully.")
    else:
        return func.HttpResponse(
            "Pass a name in the query string or request body for a personalized response.",
            status_code=200
        )
