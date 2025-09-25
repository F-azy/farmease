import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const TaskApproval = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const BASE_URL = "http://localhost:5000"; // Backend URL

  // fetch submissions
  const fetchSubmissions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/submissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(res.data.submissions || []);
    } catch (err) {
      console.error("❌ Error fetching submissions:", err);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleApprove = async (id) => {
    // Optimistic UI update (instant fake approval)
    setSubmissions((prev) =>
      prev.map((s) =>
        s.id === id ? { ...s, status: "approved", approvedFake: true } : s
      )
    );

    try {
      await axios.put(
        `${BASE_URL}/api/tasks/approve/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("✅ Task approved on backend");
    } catch (err) {
      console.error("❌ Backend approve failed, but UI updated for demo:", err);
    }
  };

  if (loading) return <div className="p-6">Loading submissions...</div>;

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-green-700 mb-8">Task Approvals</h1>

        {submissions.length === 0 ? (
          <p className="text-gray-600 text-lg">No submissions yet.</p>
        ) : (
          <div className="space-y-6">
            {submissions.map((s) => (
              <div
                key={s.id}
                className={`p-6 border rounded-lg shadow-md bg-white flex flex-col md:flex-row justify-between items-start md:items-center transition hover:shadow-lg ${
                  s.approvedFake ? "opacity-70 grayscale" : ""
                }`}
              >
                <div className="space-y-2">
                  <p className="font-semibold text-lg">{s.task_title}</p>
                  <p className="text-sm text-gray-600">
                    Farmer: {s.full_name} ({s.phone})
                  </p>
                  <p className="text-sm text-gray-600">
                    Category: {s.category_name}
                  </p>
                  <p className="text-sm">
                    Status:{" "}
                    <span
                      className={`font-semibold ${
                        s.status === "approved"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {s.status}
                    </span>
                  </p>
                  {s.file_type === "image" ? (
                    <img
                      src={`${BASE_URL}${s.file_url}`}
                      alt="submission"
                      className="mt-2 w-40 rounded border"
                    />
                  ) : (
                    <video
                      controls
                      src={`${BASE_URL}${s.file_url}`}
                      className="mt-2 w-96 rounded border"
                    />
                  )}
                </div>

                {s.status !== "approved" && (
                  <button
                    onClick={() => handleApprove(s.id)}
                    className="mt-4 md:mt-0 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Approve
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskApproval;
