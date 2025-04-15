/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FiPlus, FiCheck, FiClock, FiFlag, FiEdit } from "react-icons/fi";
import AddTaskModal from "../components/AddTask";
import AddNoteModal from "../components/AddNote";

const Dashboard = () => {
  const user = { name: "Alex" };
  const [quote, setQuote] = useState({});
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [showTagModal, setShowTagModal] = useState(false);

  // Sample data - replace with your actual data
  const lists = [
    { id: "1", name: "Personal", color: "#8B5CF6" },
    { id: "2", name: "Work", color: "#3B82F6" },
  ];

  const tags = [
    { id: "1", name: "Important" },
    { id: "2", name: "Urgent" },
  ];

  const handleAddTask = (taskData) => {
    console.log("Adding task:", taskData);
    // Call your API here
  };

  const handleAddNote = (noteData) => {
    console.log("Adding note:", noteData);
    // Call your API here
  };

  const url =
    "https://api.freeapi.app/api/v1/public/quotes?page=1&limit=10&query=human";
  const options = { method: "GET", headers: { accept: "application/json" } };

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.data.data.length);
        const quote = data.data.data[randomIndex];
        setQuote(quote);
      } catch (error) {
        console.error("Failed to fetch quote:", error);
      }
    };
    fetchQuote();
  }, []);

  // Sample tasks data
  const tasks = [
    {
      id: 1,
      title: "Complete project proposal",
      time: "10:00 AM",
      priority: "high",
      completed: false,
    },
    {
      id: 2,
      title: "Team standup meeting",
      time: "11:30 AM",
      priority: "medium",
      completed: false,
    },
    {
      id: 3,
      title: "Review design mockups",
      time: "2:00 PM",
      priority: "low",
      completed: true,
    },
  ];

  // Sample notes data
  const recentNotes = [
    {
      id: 1,
      content: "Ideas for the new marketing campaign...",
      updatedAt: "2 hours ago",
    },
    {
      id: 2,
      content: "Meeting notes with design team regarding...",
      updatedAt: "Yesterday",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-purple-100">
        <h1 className="text-2xl font-bold text-purple-900">
          Welcome back, {user.name}!
        </h1>
        <p className="text-purple-600">Here's a quick look at your day 👇</p>
      </div>

      {/*Modals */}
      <AddTaskModal
        isOpen={showTaskModal}
        onClose={() => setShowTaskModal(false)}
        onSubmit={handleAddTask}
        lists={lists}
        tags={tags}
      />
      <AddNoteModal
        isOpen={showNoteModal}
        onClose={() => setShowNoteModal(false)}
        onSubmit={handleAddNote}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-purple-900">
              Your Tasks for Today
            </h2>
            <button
              onClick={() => setShowTaskModal(true)}
              className="flex items-center gap-1 text-sm cursor-pointer bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              <FiPlus size={16} />
              Add Task
            </button>
          </div>
          <p className="text-purple-500 mb-4">
            You have {tasks.length} tasks scheduled
          </p>

          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 p-3 hover:bg-purple-50 rounded-lg transition-colors"
              >
                <button
                  className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border ${
                    task.completed
                      ? "bg-purple-600 border-purple-600 text-white"
                      : "border-purple-300"
                  }`}
                >
                  {task.completed && <FiCheck size={14} className="m-auto" />}
                </button>
                <div className="flex-1">
                  <p
                    className={`font-medium ${
                      task.completed
                        ? "text-purple-400 line-through"
                        : "text-purple-800"
                    }`}
                  >
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="flex items-center gap-1 text-xs text-purple-500">
                      <FiClock size={12} /> {task.time}
                    </span>
                    {task.priority === "high" && (
                      <span className="flex items-center gap-1 text-xs bg-red-50 text-red-600 px-2 py-0.5 rounded-full">
                        <FiFlag size={12} /> High
                      </span>
                    )}
                    {task.priority === "medium" && (
                      <span className="flex items-center gap-1 text-xs bg-yellow-50 text-yellow-600 px-2 py-0.5 rounded-full">
                        <FiFlag size={12} /> Medium
                      </span>
                    )}
                    {task.priority === "low" && (
                      <span className="flex items-center gap-1 text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">
                        <FiFlag size={12} /> Low
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Notes Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-purple-900">
              Quick Notes
            </h2>
            <button
              onClick={() => setShowNoteModal(true)}
              className="flex items-center cursor-pointer gap-1 text-sm bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              <FiPlus size={16} />
              New Note
            </button>
          </div>

          <div className="space-y-4">
            {recentNotes.length > 0 ? (
              recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 bg-purple-50 rounded-lg border border-purple-100"
                >
                  <p className="text-purple-800 line-clamp-3">{note.content}</p>
                  <p className="text-xs text-purple-400 mt-2">
                    {note.updatedAt}
                  </p>
                </div>
              ))
            ) : (
              <div className="p-6 text-center border-2 border-dashed border-purple-200 rounded-lg">
                <p className="text-purple-500">Capture an idea or thought...</p>
              </div>
            )}
          </div>
        </div>

        {/* Productivity Insight Card */}
        <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 border border-purple-100 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-semibold text-purple-900 mb-2">
            Productivity Insight
          </h2>
          <p className="text-purple-600 mb-4">
            You completed 12 tasks this week — keep it up!
          </p>

          <div className="w-full bg-purple-100 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-indigo-400 to-purple-600 h-2.5 rounded-full"
              style={{ width: "75%" }}
            ></div>
          </div>

          {/* Motivational Quote */}
          <div className="mt-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
            <p className="text-indigo-800 italic">{`"${
              quote.content || "Believe you can and you're halfway there."
            }"`}</p>
            <p className="text-indigo-600 text-sm mt-1">{`- ${
              quote.author || "Theodore Roosevelt"
            }`}</p>
          </div>
        </div>
      </div>

      {/* Bottom Action Buttons (Mobile) */}

      <div className="lg:hidden fixed bottom-6 right-6 flex gap-3">
        <button className="p-3 bg-purple-600 text-white rounded-full shadow-lg hover:bg-purple-700 transition-colors">
          <FiEdit size={20} />
        </button>
        <button className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition-colors">
          <FiPlus size={20} />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
