import React, { useEffect, useState } from "react";
import axios from "axios";

import FarmerSidebar from "./FarmerSidebar";

const ApplicationsPage = () => {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [formData, setFormData] = useState({ user_name: "", email: "", phone: "", comments: "" });
  const [showForm, setShowForm] = useState(false);
  const [submittedApplications, setSubmittedApplications] = useState([]); // store submitted app IDs
    const [activeTab, setActiveTab] = useState("applications");
    const [sidebarOpen, setSidebarOpen] = useState(false);

  const BASE_URL = "http://localhost:5000";

  // Fetch applications
  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/applications`);
      setApplications(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Submit user form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}/api/applications/submit`, {
        ...formData,
        application_id: selectedApp.id,
      });
      // mark app as submitted
      setSubmittedApplications([...submittedApplications, selectedApp.id]);

      alert("Application submitted successfully ✅");
      setFormData({ user_name: "", email: "", phone: "", comments: "" });
      setShowForm(false);
    } catch (err) {
      console.error(err);
      alert("Failed to submit ❌");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
         <FarmerSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Available Applications</h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {applications.map((app) => {
            const isSubmitted = submittedApplications.includes(app.id);

            return (
              <div key={app.id} className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition">
                <h2 className="text-xl font-bold">{app.app_name}</h2>
                <p className="text-gray-700 mt-2"><strong>Purpose:</strong> {app.purpose}</p>
                <p className="text-gray-700 mt-1"><strong>Features:</strong> {app.key_features}</p>
                <p className="text-gray-700 mt-1"><strong>Benefits:</strong> {app.benefits}</p>
                {app.download_link && (
                  <a href={app.download_link} target="_blank" rel="noreferrer" className="text-blue-600 underline mt-2 block">
                    Access / Download
                  </a>
                )}
                {app.support_contact && <p className="text-gray-500 mt-1">Support: {app.support_contact}</p>}

                <button
                  onClick={() => { if (!isSubmitted) { setSelectedApp(app); setShowForm(true); } }}
                  className={`mt-4 w-full py-2 rounded-xl transition
                    ${isSubmitted 
                      ? "bg-gray-400 cursor-not-allowed" 
                      : "bg-green-600 text-white hover:bg-green-700"}`}
                  disabled={isSubmitted}
                >
                  {isSubmitted ? "Application Submitted" : "Fill Application"}
                </button>
              </div>
            );
          })}
        </div>

        {/* Popup Form */}
        {showForm && selectedApp && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4">Apply: {selectedApp.app_name}</h2>
              <form className="space-y-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.user_name}
                  onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                  required
                  className="w-full border p-2 rounded"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <textarea
                  placeholder="Comments / Message"
                  value={formData.comments}
                  onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
                  className="w-full border p-2 rounded"
                />
                <div className="flex justify-end gap-3 mt-2">
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

export default ApplicationsPage;
