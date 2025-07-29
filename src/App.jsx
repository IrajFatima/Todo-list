import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2, Plus, Moon, Sun, Check, Filter, Star, Calendar, Clock,
  Edit2, Save, X, Search, SortAsc, BarChart3, Target, Zap
} from "lucide-react";
import taskflowIcon from "./assets/taskflow-icon.svg";


const App = () => {
  const [theme, setTheme] = useState("dark");
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem('taskflow-tasks');
      return savedTasks ? JSON.parse(savedTasks) : [];
    } catch (error) {
      console.error('Error loading tasks from localStorage:', error);
      return [];
    }
  });
  const [filter, setFilter] = useState("all");
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("medium");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [editingTask, setEditingTask] = useState(null);
  const [editText, setEditText] = useState("");
  const [showStats, setShowStats] = useState(false);
  const [category, setCategory] = useState("personal");

  // Categories
  const categories = [
    { id: "personal", name: "Personal", emoji: "👤", color: "blue" },
    { id: "work", name: "Work", emoji: "💼", color: "purple" },
    { id: "shopping", name: "Shopping", emoji: "🛒", color: "green" },
    { id: "health", name: "Health", emoji: "🏥", color: "red" },
    { id: "learning", name: "Learning", emoji: "📚", color: "yellow" }
  ];

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    try {
      localStorage.setItem('taskflow-tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to localStorage:', error);
    }
  }, [tasks]);

  // Animated particles
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 15 + 10,
    }));
    setParticles(newParticles);
  }, []);

  // Filter and search tasks
  const filteredTasks = tasks
    .filter(task => {
      if (filter === "completed") return task.completed;
      if (filter === "active") return !task.completed;
      if (filter === "high") return task.priority === "high";
      if (filter === "today") {
        const today = new Date().toDateString();
        return task.dueDate && new Date(task.dueDate).toDateString() === today;
      }
      return true;
    })
    .filter(task =>
      task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };

      switch (sortBy) {
        case "newest": return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest": return new Date(a.createdAt) - new Date(b.createdAt);
        case "priority":
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        default: return 0;
      }
    });

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const addTask = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newTask = {
        id: crypto.randomUUID(),
        text: input,
        completed: false,
        priority,
        category,
        createdAt: new Date().toISOString(),
        notes: ""
      };
      setTasks([newTask, ...tasks]);
      setInput("");
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (task) => {
    setEditingTask(task.id);
    setEditText(task.text);
  };

  const saveEdit = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: editText } : task
    ));
    setEditingTask(null);
    setEditText("");
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setEditText("");
  };


  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  // Get stats by category
  const categoryStats = categories.map(cat => ({
    ...cat,
    total: tasks.filter(t => t.category === cat.id).length,
    completed: tasks.filter(t => t.category === cat.id && t.completed).length
  }));

  const themeStyles = {
    dark: {
      bg: "from-slate-900 via-purple-900 to-slate-900",
      card: "bg-gray-800 bg-opacity-60 border-gray-700",
      text: "text-white",
      textSecondary: "text-gray-300",
      input: "bg-gray-700 border-gray-600 text-white placeholder-gray-400",
      button: "bg-blue-600 hover:bg-blue-700",
      particle: "bg-white",
      filterButton: "bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
    },
    light: {
      bg: "from-blue-50 via-indigo-50 to-purple-50",
      card: "bg-white bg-opacity-80 border-gray-200",
      text: "text-gray-900",
      textSecondary: "text-gray-600",
      input: "bg-white border-gray-300 text-gray-900 placeholder-gray-500",
      button: "bg-indigo-600 hover:bg-indigo-700",
      particle: "bg-indigo-400",
      filterButton: "bg-gray-100 border-gray-300 text-gray-700 hover:bg-gray-200"
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className={`min-h-screen w-full bg-gradient-to-br ${currentTheme.bg} relative overflow-hidden`}>

      {/* Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className={`absolute rounded-full ${currentTheme.particle} opacity-10`}
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen w-full flex flex-col items-center p-4 sm:p-6">

        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="w-full max-w-6xl flex flex-col sm:flex-row justify-between items-center mb-8 gap-4"
        >
          <div className="flex items-center gap-4">
            <img src={taskflowIcon} alt="icon" width={100} />
            <h1 className={`text-4xl sm:text-5xl font-bold ${currentTheme.text}`}>
              <span className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                TaskFlow Pro
              </span>
            </h1>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="text-4xl"
            >
              ✨
            </motion.div>
          </div>

          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowStats(!showStats)}
              className={`p-3 rounded-xl ${currentTheme.card} transition-all duration-300 border`}
            >
              <BarChart3 size={20} className="text-blue-500" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className={`p-3 rounded-xl ${currentTheme.card} transition-all duration-300 border`}
            >
              {theme === "dark" ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} className="text-indigo-600" />}
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Panel */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`w-full max-w-6xl p-6 rounded-2xl ${currentTheme.card} mb-8 backdrop-blur-sm border`}
            >
              <h3 className={`text-xl font-bold ${currentTheme.text} mb-4 flex items-center gap-2`}>
                <Target size={20} className="text-blue-500" />
                Productivity Overview
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {categoryStats.map(cat => (
                  <div key={cat.id} className={`p-4 rounded-xl ${currentTheme.card} border`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{cat.emoji}</span>
                      <span className={`font-semibold ${currentTheme.text}`}>{cat.name}</span>
                    </div>
                    <div className={`text-2xl font-bold text-${cat.color}-500`}>
                      {cat.completed}/{cat.total}
                    </div>
                    <div className={`text-sm ${currentTheme.textSecondary}`}>
                      {cat.total > 0 ? Math.round((cat.completed / cat.total) * 100) : 0}% Complete
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className={`w-full max-w-6xl p-6 rounded-2xl ${currentTheme.card} mb-8 backdrop-blur-sm border`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4">
            <div className="flex items-center gap-3">
              <Calendar className="text-blue-500" size={24} />
              <span className={`text-lg font-semibold ${currentTheme.text}`}>
                Today's Progress
              </span>
            </div>
            <div className="text-2xl font-bold text-blue-500">
              {completedTasks}/{totalTasks}
            </div>
          </div>

          <div className="w-full h-3 bg-gray-300 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 1, delay: 0.3 }}
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            />
          </div>
        </motion.div>

        {/* Search and Sort Controls */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.15 }}
          className={`w-full max-w-6xl p-4 rounded-2xl ${currentTheme.card} mb-6 backdrop-blur-sm border`}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search tasks..."
                className={`w-full pl-12 pr-4 py-3 rounded-xl ${currentTheme.input} border-2 outline-none transition-all duration-300 focus:border-blue-500`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <SortAsc className="text-gray-400" size={20} />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className={`px-4 py-3 rounded-xl ${currentTheme.input} border-2 outline-none transition-all duration-300 focus:border-blue-500`}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Add Task Form */}
        <motion.form
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          onSubmit={addTask}
          className={`w-full max-w-6xl p-6 rounded-2xl ${currentTheme.card} mb-8 backdrop-blur-sm border`}
        >
          <div className="flex flex-col gap-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="What needs to be done?"
                  className={`w-full p-4 pr-12 rounded-xl ${currentTheme.input} border-2 outline-none transition-all duration-300 text-lg focus:border-blue-500`}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <Plus className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`px-4 py-4 rounded-xl ${currentTheme.input} border-2 outline-none transition-all duration-300 focus:border-blue-500`}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.name}
                  </option>
                ))}
              </select>

              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`px-4 py-4 rounded-xl ${currentTheme.input} border-2 outline-none transition-all duration-300 focus:border-blue-500`}
              >
                <option value="low">🟢 Low</option>
                <option value="medium">🟡 Medium</option>
                <option value="high">🔴 High</option>
              </select>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
              >
                <Zap size={18} />
                Add Task
              </motion.button>
            </div>
          </div>
        </motion.form>

        {/* Filter Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex gap-3 mb-8 flex-wrap justify-center"
        >
          {[
            { key: "all", label: "All", icon: Filter },
            { key: "active", label: "Active", icon: Clock },
            { key: "completed", label: "Completed", icon: Check },
            { key: "high", label: "High Priority", icon: Star },
          ].map(({ key, label, icon: Icon }) => (
            <motion.button
              key={key}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(key)}
              className={`px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-2 font-medium border-2 ${filter === key
                ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-lg"
                : `${currentTheme.filterButton} border-current hover:shadow-md`
                }`}
            >
              <Icon size={16} />
              {label}
            </motion.button>
          ))}
        </motion.div>

        {/* Tasks List */}
        <div className="w-full max-w-6xl">
          <AnimatePresence mode="popLayout">
            {filteredTasks.map((task) => {
              const cat = categories.find(c => c.id === task.category);
              const priorityColors = {
                high: "border-l-4 border-red-500 bg-red-50",
                medium: "border-l-4 border-yellow-500 bg-yellow-50",
                low: "border-l-4 border-green-500 bg-green-50"
              };

              const darkPriorityColors = {
                high: "border-l-4 border-red-500 bg-red-900 bg-opacity-20",
                medium: "border-l-4 border-yellow-500 bg-yellow-900 bg-opacity-20",
                low: "border-l-4 border-green-500 bg-green-900 bg-opacity-20"
              };

              return (
                <motion.div
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                    layout: { duration: 0.3 }
                  }}
                  className={`p-6 rounded-2xl mb-4 transition-all duration-300 hover:shadow-xl border ${theme === "dark"
                    ? `${currentTheme.card} ${darkPriorityColors[task.priority]}`
                    : `${currentTheme.card} ${priorityColors[task.priority]}`
                    } ${task.completed ? "opacity-60" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleTask(task.id)}
                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${task.completed
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 border-transparent"
                          : "border-gray-400 hover:border-blue-500"
                          }`}
                      >
                        {task.completed && <Check size={14} className="text-white" />}
                      </motion.button>

                      <div className="flex-1">
                        {editingTask === task.id ? (
                          <div className="flex gap-2 items-center">
                            <input
                              type="text"
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className={`flex-1 p-2 rounded-lg ${currentTheme.input} border outline-none`}
                              autoFocus
                            />
                            <button
                              onClick={() => saveEdit(task.id)}
                              className="p-2 text-green-600 hover:bg-green-100 rounded-lg"
                            >
                              <Save size={16} />
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                            >
                              <X size={16} />
                            </button>
                          </div>
                        ) : (
                          <div>
                            <span className={`text-lg transition-all duration-300 ${task.completed
                              ? `line-through opacity-60 ${currentTheme.textSecondary}`
                              : currentTheme.text
                              }`}>
                              {task.text}
                            </span>
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-lg">{cat?.emoji}</span>
                              <span className={`text-sm ${currentTheme.textSecondary}`}>
                                {cat?.name}
                              </span>
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${task.priority === "high"
                                ? "bg-red-100 text-red-800 border border-red-200"
                                : task.priority === "medium"
                                  ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                                  : "bg-green-100 text-green-800 border border-green-200"
                                } ${theme === "dark" ? "bg-opacity-20 border-opacity-30" : ""}`}>
                                {task.priority.toUpperCase()}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => startEditing(task)}
                        className="p-2 rounded-lg text-blue-500 hover:bg-blue-50 transition-all duration-300"
                      >
                        <Edit2 size={16} />
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteTask(task.id)}
                        className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition-all duration-300"
                      >
                        <Trash2 size={16} />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredTasks.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              className={`text-center py-12 ${currentTheme.textSecondary}`}
            >
              <div className="text-6xl mb-4">🎯</div>
              <p className="text-xl">
                {searchQuery
                  ? `No tasks found for "${searchQuery}"`
                  : filter === "all"
                    ? "No tasks yet. Add one above!"
                    : `No ${filter} tasks found.`}
              </p>
            </motion.div>
          )}
        </div>

        {/* Footer Stats */}
        {tasks.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className={`mt-8 p-6 rounded-xl ${currentTheme.card} backdrop-blur-sm border w-full max-w-6xl`}
          >
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-500">{tasks.length}</div>
                <div className={`text-sm ${currentTheme.textSecondary}`}>Total Tasks</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-green-500">{completedTasks}</div>
                <div className={`text-sm ${currentTheme.textSecondary}`}>Completed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-orange-500">{tasks.length - completedTasks}</div>
                <div className={`text-sm ${currentTheme.textSecondary}`}>Remaining</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-500">{Math.round(progressPercentage)}%</div>
                <div className={`text-sm ${currentTheme.textSecondary}`}>Progress</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default App;