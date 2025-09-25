import React, { useState, useEffect } from "react";
import FarmerSidebar from "./FarmerSidebar";
import { useParams } from "react-router-dom";
import { Menu } from "lucide-react";

const CropTasks = () => {
  const { categoryId } = useParams();
  const [category, setCategory] = useState(null);
  const [activeTab, setActiveTab] = useState("tasks");

  const [tasks, setTasks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState(null);
  const [submittedTasks, setSubmittedTasks] = useState({}); // Track submitted tasks
useEffect(() => {
  const fetchTasks = async () => {
    try {
      console.log("CategoryId from useParams:", categoryId);
      console.log("Fetching URL:", `http://localhost:5000/api/tasks/${categoryId}/tasks`);
      
      const res = await fetch(
        `http://localhost:5000/api/tasks/${categoryId}/tasks`,
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      // Add this missing code:
      const data = await res.json();
      console.log("Response data:", data); // Debug log
      
      if (res.ok || res.status === 200) {
        setCategory(data.category);
        setTasks(data.tasks);

        // Handle submissions if they exist
        const submitted = {};
        if (data.submissions) {
          if (Array.isArray(data.submissions)) {
            data.submissions.forEach((sub) => {
              submitted[sub.task_title] = true;
            });
          } else {
            submitted[data.submissions.task_title] = true;
          }
        }
        setSubmittedTasks(submitted);
      } else {
        console.error("Error fetching tasks:", data.message);
      }
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };
  fetchTasks();
}, [categoryId]);

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const submitTask = async (task) => {
    if (!file) return alert("Please select a file to submit");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("user_id", localStorage.getItem("userId"));
    formData.append("category_id", categoryId);
    formData.append("task_title", task.title);

    try {
      const res = await fetch("http://localhost:5000/api/tasks/submit-task", {
        method: "POST",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        alert("Task submitted successfully!");
        setFile(null);
        // Mark this task as submitted
        setSubmittedTasks((prev) => ({ ...prev, [task.title]: true }));
      } else {
        alert(data.message || "Submission failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting task");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        ⏳ Loading tasks...
      </div>
    );

  if (!category)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl text-red-600">
        ❌ Category not found
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-yellow-50">
         <FarmerSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-lg border-b-4 border-green-500 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4">
              <div className="flex items-center space-x-3 mb-4 lg:mb-0">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-2xl">{category.icon}</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{category.title}</h1>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Available Tasks</h2>

          {tasks.length === 0 ? (
            <p className="text-gray-600">No tasks available for this category.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{task.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">Points: {task.points}</p>

                  {!submittedTasks[task.title] ? (
                    <>
                      <input type="file" onChange={handleFileChange} className="mb-2 w-full" />
                      <button
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold py-2 px-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-colors shadow-md"
                        onClick={() => submitTask(task)}
                      >
                        Submit Task
                      </button>
                    </>
                  ) : (
                    <button
                      disabled
                      className="w-full bg-gray-400 text-white font-semibold py-2 px-4 rounded-xl cursor-not-allowed shadow-md"
                    >
                      Submitted
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default CropTasks;
