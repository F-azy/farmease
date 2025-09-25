import React, { useState, useEffect } from 'react';

const FarmConnectTasks = () => {
  // Task database
  const taskDatabase = {
    'sustainable-farming': [
      {
        id: 'bio-gas-installation',
        name: 'Bio gas installation',
        points: 3000,
        icon: '🔥',
        difficulty: 'hard',
        description: 'Install a bio gas plant to convert organic waste into clean energy for cooking and lighting.',
        requirements: 'Space: 10x10 feet, Initial investment, Organic waste source',
        duration: '2-3 weeks',
        status: 'available'
      },
      {
        id: 'compost-pit',
        name: 'Compost pit',
        points: 2000,
        icon: '🕳',
        difficulty: 'medium',
        description: 'Create a compost pit to convert organic waste into nutrient-rich fertilizer for your crops.',
        requirements: 'Digging tools, Organic waste, 6x4 feet space',
        duration: '3-5 days',
        status: 'available'
      },
      {
        id: 'drip-irrigation',
        name: 'Drip irrigation',
        points: 2000,
        icon: '💧',
        difficulty: 'medium',
        description: 'Set up a drip irrigation system to efficiently water your crops and conserve water.',
        requirements: 'Water source, Drip pipes, Basic plumbing knowledge',
        duration: '1-2 weeks',
        status: 'in-progress'
      },
      {
        id: 'apiculture',
        name: 'Apiculture (Beekeeping)',
        points: 1500,
        icon: '🐝',
        difficulty: 'medium',
        description: 'Start beekeeping to produce honey and help with crop pollination.',
        requirements: 'Beehives, Protective gear, Bee colonies, Training',
        duration: '1-2 months',
        status: 'available'
      },
      {
        id: 'crop-rotation',
        name: 'Crop rotation',
        points: 800,
        icon: '🔄',
        difficulty: 'easy',
        description: 'Practice crop rotation to improve soil health and reduce pest problems.',
        requirements: 'Multiple crop varieties, Planning calendar',
        duration: 'Full season',
        status: 'available'
      },
      {
        id: 'rainwater-harvesting',
        name: 'Rain water harvesting',
        points: 800,
        icon: '🌧',
        difficulty: 'medium',
        description: 'Collect and store rainwater for irrigation during dry periods.',
        requirements: 'Storage tanks, Gutters, Filtration system',
        duration: '1 week',
        status: 'available'
      },
      {
        id: 'organic-pesticide',
        name: 'Organic pesticide',
        points: 500,
        icon: '🌿',
        difficulty: 'easy',
        description: 'Prepare and apply organic pesticides to protect crops naturally.',
        requirements: 'Neem leaves, Garlic, Soap, Sprayer',
        duration: '2-3 days',
        status: 'completed'
      },
      {
        id: 'organic-insecticide',
        name: 'Organic insecticide',
        points: 500,
        icon: '🦗',
        difficulty: 'easy',
        description: 'Create natural insecticides to control harmful insects without chemicals.',
        requirements: 'Natural ingredients, Mixing containers, Sprayer',
        duration: '2-3 days',
        status: 'available'
      },
      {
        id: 'no-till-farming',
        name: 'No-till farming',
        points: 250,
        icon: '🚜',
        difficulty: 'easy',
        description: 'Practice no-till farming to preserve soil structure and reduce erosion.',
        requirements: 'Cover crops, Direct seeding equipment',
        duration: 'Ongoing',
        status: 'available'
      },
      {
        id: 'crop-covering',
        name: 'Crop covering',
        points: 250,
        icon: '🛡',
        difficulty: 'easy',
        description: 'Use crop covers to protect plants from pests and weather extremes.',
        requirements: 'Covering materials, Stakes, Clips',
        duration: '1-2 days',
        status: 'available'
      },
      {
        id: 'chicken-waste-fish',
        name: 'Chicken waste to fish feeding',
        points: 200,
        icon: '🐟',
        difficulty: 'easy',
        description: 'Convert chicken waste into fish feed for integrated farming.',
        requirements: 'Chicken coop, Fish pond, Processing equipment',
        duration: '1 week',
        status: 'available'
      },
      {
        id: 'mulching',
        name: 'Mulching',
        points: 200,
        icon: '🍂',
        difficulty: 'easy',
        description: 'Apply mulch around plants to retain moisture and suppress weeds.',
        requirements: 'Organic mulch materials, Rake, Shovel',
        duration: '2-3 days',
        status: 'available'
      },
      {
        id: 'water-efficient-crops',
        name: 'Planting water efficient crops',
        points: 200,
        icon: '🌾',
        difficulty: 'easy',
        description: 'Plant drought-resistant crop varieties to conserve water.',
        requirements: 'Drought-resistant seeds, Basic farming tools',
        duration: '1 season',
        status: 'available'
      },
      {
        id: 'bone-meal',
        name: 'Bone meal',
        points: 200,
        icon: '🦴',
        difficulty: 'easy',
        description: 'Create and apply bone meal fertilizer for phosphorus-rich nutrition.',
        requirements: 'Animal bones, Grinding equipment, Storage containers',
        duration: '3-4 days',
        status: 'available'
      },
      {
        id: 'fish-amino-acid',
        name: 'Fish amino acid meal',
        points: 150,
        icon: '🐠',
        difficulty: 'easy',
        description: 'Prepare fish amino acid fertilizer for plant nutrition.',
        requirements: 'Fish waste, Brown sugar, Fermentation container',
        duration: '1 week',
        status: 'available'
      },
      {
        id: 'fish-water-plants',
        name: 'Using fish water for plants',
        points: 100,
        icon: '🌱',
        difficulty: 'easy',
        description: 'Use nutrient-rich fish tank water to fertilize plants.',
        requirements: 'Fish tank, Water collection system',
        duration: 'Ongoing',
        status: 'available'
      },
      {
        id: 'plant-waste-recycling',
        name: 'Plant waste to crops, cattle, poultry',
        points: 100,
        icon: '♻',
        difficulty: 'easy',
        description: 'Recycle plant waste as feed and fertilizer for integrated farming.',
        requirements: 'Plant waste, Processing area, Storage',
        duration: '1-2 days',
        status: 'available'
      },
      {
        id: 'cow-dung-plants',
        name: 'Cow dung to plants',
        points: 100,
        icon: '🐄',
        difficulty: 'easy',
        description: 'Use cow dung as natural fertilizer for plant growth.',
        requirements: 'Fresh cow dung, Composting area',
        duration: '1 week',
        status: 'available'
      }
    ],
    'renewable-energy': [
      {
        id: 'solar-panel',
        name: 'Solar panel',
        points: 5000,
        icon: '☀',
        difficulty: 'hard',
        description: 'Install solar panels to generate clean electricity for your farm operations.',
        requirements: 'Solar panels, Inverter, Batteries, Professional installation',
        duration: '1-2 weeks',
        status: 'available'
      },
      {
        id: 'wind-mill',
        name: 'Wind mill',
        points: 5000,
        icon: '💨',
        difficulty: 'hard',
        description: 'Set up a wind mill to generate renewable energy from wind power.',
        requirements: 'Wind turbine, Tower, Electrical components, Windy location',
        duration: '2-3 weeks',
        status: 'available'
      }
    ]
  };

  const [allTasks, setAllTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [currentPoints, setCurrentPoints] = useState(2450);
  const [filters, setFilters] = useState({
    category: 'all',
    difficulty: 'all',
    search: ''
  });
  const [currentSort, setCurrentSort] = useState('points');
  const [selectedTask, setSelectedTask] = useState(null);
  const [notification, setNotification] = useState(null);

  // Initialize tasks
  useEffect(() => {
    const tasks = [];
    Object.keys(taskDatabase).forEach(category => {
      taskDatabase[category].forEach(task => {
        task.category = category;
        tasks.push(task);
      });
    });
    setAllTasks(tasks);
    setFilteredTasks(tasks);
    applySortToTasks(tasks, 'points');
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = allTasks.filter(task => {
      const categoryMatch = filters.category === 'all' || task.category === filters.category;
      const difficultyMatch = filters.difficulty === 'all' || task.difficulty === filters.difficulty;
      const searchMatch = filters.search === '' || 
        task.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        task.description.toLowerCase().includes(filters.search.toLowerCase());
      
      return categoryMatch && difficultyMatch && searchMatch;
    });
    
    applySortToTasks(filtered, currentSort);
    setFilteredTasks(filtered);
  }, [filters, allTasks, currentSort]);

  const applySortToTasks = (tasks, sortBy) => {
    tasks.sort((a, b) => {
      switch (sortBy) {
        case 'points':
          return b.points - a.points;
        case 'difficulty':
          const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleSort = (sortBy) => {
    setCurrentSort(sortBy);
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      'easy': 'bg-green-100 text-green-600',
      'medium': 'bg-orange-100 text-orange-600',
      'hard': 'bg-red-100 text-red-600'
    };
    return colors[difficulty] || 'bg-green-100 text-green-600';
  };

  const getStatusColor = (status) => {
    const colors = {
      'available': 'bg-green-100 text-green-600',
      'in-progress': 'bg-orange-100 text-orange-600',
      'completed': 'bg-blue-100 text-blue-600'
    };
    return colors[status] || 'bg-green-100 text-green-600';
  };

  const getStatusText = (status) => {
    const texts = {
      'available': 'Available',
      'in-progress': 'In Progress',
      'completed': 'Completed'
    };
    return texts[status] || 'Available';
  };

  const getCategoryName = (category) => {
    const names = {
      'sustainable-farming': 'Sustainable Farming',
      'renewable-energy': 'Renewable Energy'
    };
    return names[category] || category;
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const updatePoints = (newPoints) => {
    setCurrentPoints(prev => prev + newPoints);
  };

  const startTask = (taskId) => {
    const updatedTasks = allTasks.map(task =>
      task.id === taskId ? { ...task, status: 'in-progress' } : task
    );
    setAllTasks(updatedTasks);
    
    const task = updatedTasks.find(t => t.id === taskId);
    showNotification(`🚀 Started: ${task.name}! Follow the instructions to complete and earn ${task.points} points.`, 'success');
    
    setSelectedTask(null);
  };

  const continueTask = (taskId) => {
    const task = allTasks.find(t => t.id === taskId);
    showNotification(`📋 Continuing: ${task.name}. Complete your submission to earn points!`, 'info');
    setSelectedTask(null);
  };

  const TaskCard = ({ task }) => {
    const isHighValue = task.points >= 1500;
    const isPremium = task.points >= 3000;

    return (
      <div className={`bg-white rounded-2xl p-6 shadow-lg border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl relative overflow-hidden ${isHighValue ? 'border-2 border-orange-300 bg-gradient-to-br from-orange-50 to-yellow-50' : 'border-green-200'}`}>
        {isPremium && (
          <div className="absolute -top-1 -left-1 bg-gradient-to-r from-orange-400 to-orange-600 text-white px-4 py-2 rounded-br-2xl text-xs font-bold transform -rotate-3 z-10">
            PREMIUM
          </div>
        )}
        
        <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(task.status)}`}>
          {getStatusText(task.status)}
        </div>

        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="text-4xl mb-2">{task.icon}</div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">{task.name}</h3>
            <span className="inline-block bg-green-100 text-green-600 px-3 py-1 rounded-full text-xs font-medium">
              {getCategoryName(task.category)}
            </span>
          </div>
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-2xl font-bold text-center min-w-20">
            {task.points.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className={`px-2 py-1 rounded-lg text-xs font-semibold ${getDifficultyColor(task.difficulty)}`}>
            {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
          </span>
          <span className="text-gray-500 text-xs">• {task.duration}</span>
        </div>

        <p className="text-gray-600 mb-4 text-sm leading-relaxed">{task.description}</p>

        <div className="bg-blue-50 p-3 rounded-lg mb-5">
          <div className="text-blue-700 font-semibold text-xs mb-1">Requirements:</div>
          <div className="text-blue-600 text-xs leading-relaxed">{task.requirements}</div>
        </div>

        <div className="flex gap-2">
          {task.status === 'completed' ? (
            <button className="flex-1 bg-green-500 text-white py-3 px-4 rounded-lg font-semibold cursor-default">
              ✓ Completed
            </button>
          ) : task.status === 'in-progress' ? (
            <button 
              onClick={() => continueTask(task.id)}
              className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg font-semibold transition-colors"
            >
              Continue Task
            </button>
          ) : (
            <button 
              onClick={() => startTask(task.id)}
              className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-4 rounded-lg font-semibold transition-all transform hover:-translate-y-0.5"
            >
              Start Task
            </button>
          )}
          <button 
            onClick={() => setSelectedTask(task)}
            className="bg-white text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Learn More
          </button>
        </div>
      </div>
    );
  };

  const TaskDetailsModal = ({ task, onClose }) => {
    if (!task) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-5 z-50">
        <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-6 text-gray-400 hover:text-gray-600 text-3xl font-light"
          >
            ×
          </button>

          <div className="text-center mb-5">
            <div className="text-6xl mb-3">{task.icon}</div>
            <h2 className="text-2xl font-bold text-green-800 mb-3">{task.name}</h2>
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white inline-block px-5 py-3 rounded-2xl font-bold text-lg">
              {task.points.toLocaleString()} Points
            </div>
          </div>

          <div className="bg-green-50 p-5 rounded-2xl mb-5">
            <h3 className="text-green-800 font-semibold mb-3">Description</h3>
            <p className="text-gray-700 leading-relaxed">{task.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="text-blue-700 font-semibold mb-2">Difficulty</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(task.difficulty)}`}>
                {task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)}
              </span>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="text-purple-700 font-semibold mb-2">Duration</h4>
              <p className="text-gray-700 font-medium">{task.duration}</p>
            </div>
          </div>

          <div className="bg-orange-50 p-5 rounded-2xl mb-6">
            <h3 className="text-orange-700 font-semibold mb-3">Requirements</h3>
            <p className="text-gray-700 leading-relaxed">{task.requirements}</p>
          </div>

          <div className="flex gap-4">
            {task.status === 'completed' ? (
              <button className="flex-1 bg-green-500 text-white py-4 px-6 rounded-lg text-lg font-semibold cursor-default">
                ✓ Completed
              </button>
            ) : task.status === 'in-progress' ? (
              <button 
                onClick={() => { continueTask(task.id); onClose(); }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-4 px-6 rounded-lg text-lg font-semibold transition-colors"
              >
                Continue Task
              </button>
            ) : (
              <button 
                onClick={() => { startTask(task.id); onClose(); }}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-lg text-lg font-semibold transition-all"
              >
                Start Task
              </button>
            )}
            <button 
              onClick={onClose}
              className="bg-white text-green-500 border-2 border-green-500 hover:bg-green-500 hover:text-white py-4 px-6 rounded-lg text-lg font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Group tasks by category for rendering
  const tasksByCategory = {};
  filteredTasks.forEach(task => {
    if (!tasksByCategory[task.category]) {
      tasksByCategory[task.category] = [];
    }
    tasksByCategory[task.category].push(task);
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100/30 to-yellow-50/20 p-5 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-lg border border-green-200">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-5">
            <h1 className="text-3xl font-bold text-green-800 flex items-center gap-3">
              <span>🌾</span>
              <span>Available Tasks</span>
            </h1>
            
            <div className="flex items-center gap-4 bg-green-100 px-5 py-4 rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center text-white font-semibold text-lg">
                RK
              </div>
              <div>
                <h3 className="text-green-800 font-semibold">Ravi Kumar</h3>
                <p className="text-gray-600 text-sm">+91 98765 43210</p>
                <p className="text-gray-600 text-sm">Thrissur, Kerala</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-4 rounded-2xl text-center min-w-40">
              <div className="text-3xl font-bold mb-1">{currentPoints.toLocaleString()}</div>
              <div className="text-sm opacity-90">Total Points</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-5 mb-6 shadow-lg border border-green-200">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-4 items-center">
              <select 
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-700 cursor-pointer transition-colors focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 min-w-40"
              >
                <option value="all">All Categories</option>
                <option value="sustainable-farming">Sustainable Farming</option>
                <option value="renewable-energy">Renewable Energy</option>
              </select>
              
              <select 
                value={filters.difficulty}
                onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-lg bg-white text-gray-700 cursor-pointer transition-colors focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100 min-w-40"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
              
              <input 
                type="text"
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                placeholder="Search tasks..."
                className="px-4 py-3 border-2 border-gray-200 rounded-lg text-gray-700 min-w-52 transition-colors focus:outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>
            
            <div className="flex gap-3">
              <button 
                onClick={() => handleSort('points')}
                className={`px-4 py-2 border-2 border-green-500 rounded-lg text-sm font-medium transition-colors ${currentSort === 'points' ? 'bg-green-500 text-white' : 'bg-white text-green-500 hover:bg-green-500 hover:text-white'}`}
              >
                💰 Points
              </button>
              <button 
                onClick={() => handleSort('difficulty')}
                className={`px-4 py-2 border-2 border-green-500 rounded-lg text-sm font-medium transition-colors ${currentSort === 'difficulty' ? 'bg-green-500 text-white' : 'bg-white text-green-500 hover:bg-green-500 hover:text-white'}`}
              >
                📊 Difficulty
              </button>
              <button 
                onClick={() => handleSort('name')}
                className={`px-4 py-2 border-2 border-green-500 rounded-lg text-sm font-medium transition-colors ${currentSort === 'name' ? 'bg-green-500 text-white' : 'bg-white text-green-500 hover:bg-green-500 hover:text-white'}`}
              >
                📝 Name
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Content */}
        {filteredTasks.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <div className="text-6xl mb-5">🔍</div>
            <div className="text-xl mb-3">No tasks found</div>
            <div className="text-sm">Try adjusting your filters or search terms</div>
          </div>
        ) : (
          Object.keys(tasksByCategory).map(category => {
            const tasks = tasksByCategory[category];
            return (
              <div key={category} className="mb-8">
                <div className="flex items-center gap-4 mb-5 px-3">
                  <h2 className="text-2xl font-semibold text-green-800">{getCategoryName(category)}</h2>
                  <span className="bg-green-100 text-green-600 px-3 py-2 rounded-full text-sm font-semibold">
                    {tasks.length} tasks
                  </span>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Task Details Modal */}
      <TaskDetailsModal task={selectedTask} onClose={() => setSelectedTask(null)} />

      {/* Notification */}
      {notification && (
        <div className={`fixed top-5 right-5 px-6 py-4 rounded-2xl text-white font-semibold shadow-lg z-50 max-w-sm animate-pulse ${
          notification.type === 'success' ? 'bg-gradient-to-r from-green-500 to-green-600' :
          notification.type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600' :
          notification.type === 'warning' ? 'bg-gradient-to-r from-orange-500 to-orange-600' :
          'bg-gradient-to-r from-blue-500 to-blue-600'
        }`}>
          {notification.message}
        </div>
      )}
    </div>
  );
};

export default FarmConnectTasks;