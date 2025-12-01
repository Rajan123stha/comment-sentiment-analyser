import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";
import {
  HiUser,
  HiMail,
  HiShieldCheck,
  HiUserGroup,
  HiTrash,
  HiSearch,
} from "react-icons/hi";

const AdminProfile = () => {
  const { admin } = useAuth();
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (admin) {
      const fetchData = async () => {
        try {
          const usersResponse = await axios.get(
            "http://localhost:5000/api/users"
          );
          setUsers(usersResponse.data.users);
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("Could not fetch data");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    } else {
      setLoading(false);
    }
  }, [admin]);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      setUsers(users.filter((user) => user._id !== userId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting user:", error);
      setError("Failed to delete user");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#1E3A8A] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!admin) {
    navigate("/admin/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Manage your platform and users</p>
        </div>

        {/* Admin Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#1E3A8A] to-[#14B8A6] flex items-center justify-center shadow-lg">
              <HiShieldCheck className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-medium rounded-full">
                  Administrator
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                {admin.username}
              </h2>
              <div className="flex items-center gap-2 text-gray-500 mt-1">
                <HiMail className="w-4 h-4" />
                <span>{admin.email}</span>
              </div>
            </div>
            <div className="hidden md:flex gap-4">
              <div className="text-center px-6 py-3 bg-blue-50 rounded-xl">
                <p className="text-2xl font-bold text-[#1E3A8A]">
                  {users.length}
                </p>
                <p className="text-sm text-gray-500">Total Users</p>
              </div>
            </div>
          </div>
        </div>

        {/* Users Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* Section Header */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                  <HiUserGroup className="w-5 h-5 text-[#1E3A8A]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    System Users
                  </h3>
                  <p className="text-sm text-gray-500">
                    {users.length} registered users
                  </p>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full md:w-72 pl-12 pr-4 py-2.5 border border-gray-200 rounded-xl bg-gray-50 
                           focus:outline-none focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] focus:bg-white
                           transition-all duration-200 placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mx-6 mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Users Table */}
          {filteredUsers.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell">
                      User ID
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user, index) => (
                    <tr
                      key={user._id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                            <HiUser className="w-5 h-5 text-[#1E3A8A]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-800">
                              {user.name || "Unknown"}
                            </p>
                            <p className="text-xs text-gray-400 md:hidden">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 hidden md:table-cell">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-xs font-mono text-gray-400 bg-gray-100 px-2 py-1 rounded">
                          {user._id.slice(-8)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {deleteConfirm === user._id ? (
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              className="px-3 py-1.5 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                            >
                              Confirm
                            </button>
                            <button
                              onClick={() => setDeleteConfirm(null)}
                              className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setDeleteConfirm(user._id)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-red-600 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors"
                          >
                            <HiTrash className="w-4 h-4" />
                            Delete
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-4">
                <HiUserGroup className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-500">
                {searchTerm
                  ? "No users found matching your search"
                  : "No users found"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
