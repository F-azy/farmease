import React, { useState } from "react";
import { ArrowLeft, Play, Clock, Users, BookOpen, Star, Search, Filter } from "lucide-react";

const Learning = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Extract YouTube video ID from URL
  const getYouTubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Generate thumbnail URL from video ID
  const getThumbnailUrl = (videoId) => {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  };

  // Video data with your links and additional farming videos
  const videos = [
    {
      id: 1,
      title: "Modern Farming Techniques & Smart Agriculture",
      url: "https://youtu.be/ebj1whRF0KQ?si=A2ISe0vl9hayK_Rt",
      category: "technology",
      duration: "12:45",
      views: "1.2M",
      rating: 4.8,
      description: "Learn about cutting-edge farming technologies that are revolutionizing agriculture worldwide.",
      instructor: "AgriTech Pro",
      difficulty: "Intermediate"
    },
    {
      id: 2,
      title: "Sustainable Farming Practices",
      url: "https://youtu.be/heTxEsrPVdQ?feature=shared",
      category: "sustainability",
      duration: "18:30",
      views: "856K",
      rating: 4.9,
      description: "Discover eco-friendly farming methods that protect the environment while maximizing yield.",
      instructor: "Green Farm Solutions",
      difficulty: "Beginner"
    },
    {
      id: 3,
      title: "Crop Rotation and Soil Management",
      url: "https://youtu.be/SPb3eLn2I8o?si=mcqJji-tV8pjSGgg",
      category: "soil",
      duration: "15:20",
      views: "645K",
      rating: 4.7,
      description: "Master the art of crop rotation and learn how to maintain healthy, productive soil.",
      instructor: "Soil Science Academy",
      difficulty: "Intermediate"
    },
    // Additional farming videos
    {
      id: 4,
      title: "Organic Farming Complete Guide",
      url: "https://youtu.be/Z8MdPJhS5cY",
      category: "organic",
      duration: "25:15",
      views: "2.1M",
      rating: 4.9,
      description: "Comprehensive guide to organic farming methods, certification, and best practices.",
      instructor: "Organic Farmers Association",
      difficulty: "Beginner"
    },
    {
      id: 5,
      title: "Drip Irrigation System Setup",
      url: "https://youtu.be/Qx_nHq8qYcE",
      category: "irrigation",
      duration: "14:30",
      views: "934K",
      rating: 4.6,
      description: "Step-by-step guide to installing and maintaining efficient drip irrigation systems.",
      instructor: "Water Management Pro",
      difficulty: "Intermediate"
    },
    {
      id: 6,
      title: "Greenhouse Farming Basics",
      url: "https://youtu.be/YOuENdYGT1Y",
      category: "greenhouse",
      duration: "20:45",
      views: "1.5M",
      rating: 4.8,
      description: "Learn how to set up and manage a profitable greenhouse operation.",
      instructor: "Greenhouse Experts",
      difficulty: "Advanced"
    },
    {
      id: 7,
      title: "Pest Control in Organic Farming",
      url: "https://youtu.be/8RZ9iYV0P6Q",
      category: "pest-control",
      duration: "16:20",
      views: "756K",
      rating: 4.7,
      description: "Natural and organic methods for controlling pests without harmful chemicals.",
      instructor: "Eco Pest Solutions",
      difficulty: "Intermediate"
    },
    {
      id: 8,
      title: "Vertical Farming Revolution",
      url: "https://youtu.be/r5JyD2IKR_Q",
      category: "technology",
      duration: "22:10",
      views: "1.8M",
      rating: 4.9,
      description: "Explore the future of farming with vertical agriculture and urban farming solutions.",
      instructor: "Future Farm Tech",
      difficulty: "Advanced"
    },
    {
      id: 9,
      title: "Composting for Better Soil Health",
      url: "https://youtu.be/k3JWlBD_BYc",
      category: "soil",
      duration: "13:45",
      views: "892K",
      rating: 4.8,
      description: "Learn how to create nutrient-rich compost to improve soil fertility naturally.",
      instructor: "Compost Masters",
      difficulty: "Beginner"
    }
  ];

  const categories = [
    { id: "all", name: "All Videos", icon: "📚", count: videos.length },
    { id: "technology", name: "Technology", icon: "🤖", count: videos.filter(v => v.category === "technology").length },
    { id: "sustainability", name: "Sustainability", icon: "🌱", count: videos.filter(v => v.category === "sustainability").length },
    { id: "organic", name: "Organic Farming", icon: "🥬", count: videos.filter(v => v.category === "organic").length },
    { id: "soil", name: "Soil Management", icon: "🌍", count: videos.filter(v => v.category === "soil").length },
    { id: "irrigation", name: "Irrigation", icon: "💧", count: videos.filter(v => v.category === "irrigation").length },
    { id: "greenhouse", name: "Greenhouse", icon: "🏠", count: videos.filter(v => v.category === "greenhouse").length },
    { id: "pest-control", name: "Pest Control", icon: "🐛", count: videos.filter(v => v.category === "pest-control").length }
  ];

  // Filter videos based on search and category
  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || video.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case "Beginner": return "bg-green-100 text-green-800 border-green-200";
      case "Intermediate": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Advanced": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleVideoClick = (video) => {
    const videoId = getYouTubeVideoId(video.url);
    if (videoId) {
      setSelectedVideo({...video, videoId});
    } else {
      // Fallback to opening in new tab
      window.open(video.url, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-teal-50">
      {/* Header */}
      <header className="bg-white shadow-xl border-b-4 border-green-500 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center space-x-4 mb-4 lg:mb-0">
              <button
                onClick={() => window.history.back()}
                className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-medium transition-all duration-300 hover:scale-105"
              >
                <ArrowLeft size={20} />
                Back to Dashboard
              </button>
              <div className="w-1 h-8 bg-blue-300"></div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full flex items-center justify-center shadow-lg">
                  <BookOpen className="text-white" size={24} />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Learning Center</h1>
                  <p className="text-gray-600">Master modern farming techniques</p>
                </div>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="relative max-w-md w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search videos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-600 focus:outline-none transition-colors"
              />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Videos</p>
                <p className="text-2xl font-bold text-blue-600">{videos.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Play className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Categories</p>
                <p className="text-2xl font-bold text-green-600">{categories.length - 1}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Filter className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-purple-600">12.8M+</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-yellow-600">4.8</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Star className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <Filter className="mr-2 text-blue-600" size={24} />
            Filter by Category
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-blue-50 border-blue-500 text-blue-700"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-blue-50 hover:border-blue-300"
                }`}
              >
                <span className="text-2xl mb-2">{category.icon}</span>
                <span className="text-sm font-medium text-center">{category.name}</span>
                <span className="text-xs text-gray-500 mt-1">({category.count})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredVideos.map((video) => {
            const videoId = getYouTubeVideoId(video.url);
            const thumbnailUrl = videoId ? getThumbnailUrl(videoId) : "/api/placeholder/320/180";
            
            return (
              <div
                key={video.id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
                onClick={() => handleVideoClick(video)}
              >
                {/* Thumbnail */}
                <div className="relative">
                  <img
                    src={thumbnailUrl}
                    alt={video.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.target.src = "/api/placeholder/320/180";
                    }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-lg">
                      <Play className="text-white ml-1" size={28} />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded flex items-center">
                    <Clock size={12} className="mr-1" />
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(video.difficulty)}`}>
                      {video.difficulty}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-sm font-medium ml-1">{video.rating}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {video.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Users size={14} className="mr-1" />
                      {video.views} views
                    </div>
                    <span className="font-medium">{video.instructor}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No videos found</h3>
            <p className="text-gray-600">Try adjusting your search terms or category filter</p>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedVideo.title}</h3>
                <button
                  onClick={() => setSelectedVideo(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="aspect-video mb-4">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                  title={selectedVideo.title}
                  className="w-full h-full rounded-lg"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-700 mb-4">{selectedVideo.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Clock size={14} className="mr-1" />
                      {selectedVideo.duration}
                    </div>
                    <div className="flex items-center">
                      <Users size={14} className="mr-1" />
                      {selectedVideo.views} views
                    </div>
                    <div className="flex items-center">
                      <Star size={14} className="mr-1 text-yellow-500" fill="currentColor" />
                      {selectedVideo.rating}
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Instructor</h4>
                  <p className="text-gray-700 mb-4">{selectedVideo.instructor}</p>
                  
                  <h4 className="font-bold text-gray-900 mb-2">Difficulty Level</h4>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(selectedVideo.difficulty)}`}>
                    {selectedVideo.difficulty}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Learning;