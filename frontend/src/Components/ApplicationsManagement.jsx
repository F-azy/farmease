import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const ApplicationsManagement = () => {
  const [applications, setApplications] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    app_name: "",
    purpose: "",
    key_features: "",
    benefits: "",
    download_link: "",
    support_contact: "",
  });

  const token = localStorage.getItem("token");
  const BASE_URL = "http://localhost:5000";

  // Fetch all applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/applications`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(res.data.data || []);
    } catch (err) {
      console.error(err);
      setApplications([]);
    }
  };

  // Fetch all submissions
  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/submissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(res.data.submissions || []);
    } catch (err) {
      console.error(err);
      setSubmissions([]);
    }
  };

  useEffect(() => {
    fetchApplications();
    fetchSubmissions();
  }, []);

  // Create new application
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/applications/new`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Application posted successfully ✅");
      setShowForm(false);
      setFormData({
        app_name: "",
        purpose: "",
        key_features: "",
        benefits: "",
        download_link: "",
        support_contact: "",
      });
      fetchApplications();
    } catch (err) {
      console.error(err);
      alert("Failed to post application ❌");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Applications Management</h1>
          <button
            onClick={() => setShowForm(true)}
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700"
          >
            Post New Application
          </button>
        </div>

        {/* Applications Table */}
        <table className="w-full table-auto bg-white rounded-xl shadow mb-10">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Purpose</th>
              <th className="px-4 py-2">Features</th>
              <th className="px-4 py-2">Benefits</th>
              <th className="px-4 py-2">Download</th>
              <th className="px-4 py-2">Support</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.id} className="border-b hover:bg-gray-100">
                <td className="px-4 py-2">{app.id}</td>
                <td className="px-4 py-2">{app.app_name}</td>
                <td className="px-4 py-2">{app.purpose}</td>
                <td className="px-4 py-2">{app.key_features}</td>
                <td className="px-4 py-2">{app.benefits}</td>
                <td className="px-4 py-2">
                  {app.download_link && (
                    <a
                      href={app.download_link}
                      target="_blank"
                      rel="noreferrer"
                      className="text-green-600 underline"
                    >
                      Link
                    </a>
                  )}
                </td>
                <td className="px-4 py-2">{app.support_contact}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Submissions Table */}
        <h2 className="text-2xl font-bold mb-4">Application Submissions</h2>
        <table className="w-full table-auto bg-white rounded-xl shadow">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Application</th>
              <th className="px-4 py-2">User Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Comments</th>
              <th className="px-4 py-2">Submitted Date</th>
            </tr>
          </thead>
       <tbody>
  {submissions.map((sub) => (
    <tr key={sub.id} className="border-b hover:bg-gray-100">
      <td className="px-4 py-2">{sub.id}</td>
      <td className="px-4 py-2">{sub.app_name}</td>
      <td className="px-4 py-2">{sub.user_name}</td>
      <td className="px-4 py-2">{sub.email}</td>
      <td className="px-4 py-2">{sub.phone}</td>
      <td className="px-4 py-2">{sub.comments}</td>
      <td className="px-4 py-2">{new Date(sub.submitted_date).toLocaleString()}</td>
    </tr>
  ))}
</tbody>
        </table>

        {/* Popup Form */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Post New Application</h2>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Application Name"
                  value={formData.app_name}
                  onChange={(e) => setFormData({ ...formData, app_name: e.target.value })}
                  required
                  className="w-full border p-2 rounded"
                />
                <textarea
                  placeholder="Purpose / Objective"
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  required
                  className="w-full border p-2 rounded"
                />
                <textarea
                  placeholder="Key Features (comma separated)"
                  value={formData.key_features}
                  onChange={(e) => setFormData({ ...formData, key_features: e.target.value })}
                  required
                  className="w-full border p-2 rounded"
                />
                <textarea
                  placeholder="Benefits for Farmers"
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  required
                  className="w-full border p-2 rounded"
                />
                <input
                  type="url"
                  placeholder="Download / Access Link"
                  value={formData.download_link}
                  onChange={(e) => setFormData({ ...formData, download_link: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Support Contact"
                  value={formData.support_contact}
                  onChange={(e) => setFormData({ ...formData, support_contact: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <div className="flex justify-end gap-3 mt-3">
                  <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 border rounded">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicationsManagement;
