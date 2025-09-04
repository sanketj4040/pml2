import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [managers, setManagers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    managerId: "",
    technologies: "",
    priority: "5",
    teamMembers: [],
    progress: "0"
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if admin is logged in
    if (!localStorage.getItem("adminLoggedIn")) {
      navigate("/admin");
      return;
    }

    // Sample managers data
    const sampleManagers = [
      { id: 1, name: "Sarah Johnson", email: "sarah.johnson@example.com", department: "Development" },
      { id: 2, name: "Michael Chen", email: "michael.chen@example.com", department: "Design" },
      { id: 3, name: "Emily Rodriguez", email: "emily.rodriguez@example.com", department: "Marketing" },
      { id: 4, name: "David Patel", email: "david.patel@example.com", department: "Operations" }
    ];
    
    // Sample team members data
    const sampleTeamMembers = [
      { id: 1, name: "John Smith", skill: "Frontend Developer" },
      { id: 2, name: "Lisa Wong", skill: "Backend Developer" },
      { id: 3, name: "Mark Thompson", skill: "UI/UX Designer" },
      { id: 4, name: "Anita Kumar", skill: "Database Administrator" },
      { id: 5, name: "Carlos Rodriguez", skill: "QA Engineer" },
      { id: 6, name: "Emma Davis", skill: "Project Manager" },
      { id: 7, name: "Tomas Lee", skill: "DevOps Engineer" },
      { id: 8, name: "Sophie Martin", skill: "Business Analyst" }
    ];
    
    setManagers(sampleManagers);
    setTeamMembers(sampleTeamMembers);

    // Sample projects data
    const sampleProjects = [
      {
        id: 1,
        title: "Website Redesign",
        description: "Redesign company website with modern UI and improved user experience",
        deadline: "2025-10-15",
        progress: 65,
        team: ["John Doe", "Sarah Smith"],
        priority: "High",
        status: "In Progress"
      },
      {
        id: 2,
        title: "Mobile App Development",
        description: "Develop a new mobile app for clients with cross-platform compatibility",
        deadline: "2025-11-20",
        progress: 30,
        team: ["Mike Johnson", "Lisa Brown", "David Wilson"],
        priority: "Medium",
        status: "In Progress"
      },
      {
        id: 3,
        title: "Database Migration",
        description: "Migrate data from legacy system to new cloud platform",
        deadline: "2025-09-30",
        progress: 85,
        team: ["Robert Taylor", "Emma Davis"],
        priority: "Critical",
        status: "In Progress"
      }
    ];
    setProjects(sampleProjects);
  }, [navigate]);

  // Initialize empty form with today's date when form is shown
  useEffect(() => {
    if (showForm) {
      setFormData(prevData => ({
        ...prevData,
        deadline: prevData.deadline || new Date().toISOString().split("T")[0]
      }));
    }
  }, [showForm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTeamMemberToggle = (memberId) => {
    setSelectedTeamMembers(prev => {
      if (prev.includes(memberId)) {
        return prev.filter(id => id !== memberId);
      } else {
        return [...prev, memberId];
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/admin");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.title || !formData.description || !formData.deadline || !formData.managerId) {
      setError("Please fill all required fields!");
      return;
    }

    if (selectedTeamMembers.length === 0) {
      setError("Please select at least one team member!");
      return;
    }

    // Fix for deadline validation
    // Get today's date at the beginning of the day (midnight) to properly compare with selected date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const selectedDate = new Date(formData.deadline);
    // Set to beginning of the day for accurate comparison
    selectedDate.setHours(0, 0, 0, 0);
    
    if (selectedDate < today) {
      setError("Deadline must be today or a future date");
      return;
    }

    // Get selected manager details
    const selectedManager = managers.find(manager => manager.id === Number(formData.managerId));
    
    // Get selected team members details
    const selectedTeamMembersDetails = teamMembers.filter(member => 
      selectedTeamMembers.includes(member.id)
    ).map(member => ({
      id: member.id,
      name: member.name,
      skill: member.skill
    }));

    // Add new project
    const newProject = {
      id: projects.length + 1,
      title: formData.title,
      description: formData.description,
      deadline: formData.deadline,
      progress: parseInt(formData.progress) || 0,
      technologies: formData.technologies.split(",").map(t => t.trim()).filter(t => t),
      priority: getPriorityLabel(parseInt(formData.priority)),
      priorityValue: parseInt(formData.priority),
      manager: {
        id: selectedManager.id,
        name: selectedManager.name,
        department: selectedManager.department
      },
      team: selectedTeamMembersDetails.map(member => member.name),
      status: "Not Started",
      createdAt: new Date().toISOString()
    };

    setProjects([...projects, newProject]);
    setShowForm(false);
    setFormData({
      title: "",
      description: "",
      deadline: "",
      managerId: "",
      technologies: "",
      priority: "5",
      teamMembers: [],
      progress: "0"
    });
    setSelectedTeamMembers([]);
  };

  // Helper function to convert numeric priority to label
  const getPriorityLabel = (priorityValue) => {
    if (priorityValue >= 8) return "Critical";
    if (priorityValue >= 5) return "High";
    if (priorityValue >= 3) return "Medium";
    return "Low";
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Pro-Manage</h2>
          <p>Admin Panel</p>
        </div>
        
        <ul className="sidebar-nav">
          <li>
            <a 
              href="#dashboard" 
              className={activeTab === "dashboard" ? "active" : ""}
              onClick={() => setActiveTab("dashboard")}
            >
              📊 Dashboard
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={activeTab === "projects" ? "active" : ""}
              onClick={() => setActiveTab("projects")}
            >
              📁 Projects
            </a>
          </li>
          <li>
            <a 
              href="#team" 
              className={activeTab === "team" ? "active" : ""}
              onClick={() => setActiveTab("team")}
            >
              👥 Team Management
            </a>
          </li>
          <li>
            <a 
              href="#reports" 
              className={activeTab === "reports" ? "active" : ""}
              onClick={() => setActiveTab("reports")}
            >
              📈 Reports
            </a>
          </li>
          <li>
            <a 
              href="#settings" 
              className={activeTab === "settings" ? "active" : ""}
              onClick={() => setActiveTab("settings")}
            >
              ⚙️ Settings
            </a>
          </li>
        </ul>
        
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="main-content">
        <div className="simple-header">
          <div className="header-nav">
            <a href="/">Home</a>
            <a href="/services">Services</a>
            <a href="/help">Help</a>
          </div>
          <div className="header-user">
            <span>Admin</span>
          </div>
        </div>

        {activeTab === "dashboard" && (
          <div className="dashboard-content">
            <div className="dashboard-welcome">
              <h2>Welcome to the Admin Dashboard</h2>
              <p>Manage your projects, team members, and company resources from this central dashboard.</p>
            </div>

            <div className="dashboard-actions">
              <button 
                className={`action-button ${showForm ? 'cancel' : 'create'}`} 
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? '✖ Cancel' : '➕ Create New Project'}
              </button>
              <select className="filter-dropdown">
                <option value="all">All Projects</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>

            {showForm && (
              <div className="form-container">
                <h3>Create New Project</h3>
                {error && <div className="error-message">{error}</div>}
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label>Project Title*</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Enter project title"
                    />
                  </div>
                  <div className="form-group">
                    <label>Description*</label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Enter project description"
                    ></textarea>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Deadline*</label>
                      <input
                        type="date"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div className="form-group">
                      <label>Select Manager*</label>
                      <select
                        name="managerId"
                        value={formData.managerId}
                        onChange={handleInputChange}
                      >
                        <option value="">-- Select a Manager --</option>
                        {managers.map(manager => (
                          <option key={manager.id} value={manager.id}>
                            {manager.name} - {manager.department}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Technologies Required (comma-separated)*</label>
                    <input
                      type="text"
                      name="technologies"
                      value={formData.technologies}
                      onChange={handleInputChange}
                      placeholder="React, Node.js, MongoDB, etc."
                    />
                  </div>
                  <div className="form-group">
                    <label>Priority (1-10)*: {formData.priority}</label>
                    <input
                      type="range"
                      name="priority"
                      min="1"
                      max="10"
                      value={formData.priority}
                      onChange={handleInputChange}
                      className="priority-slider"
                    />
                    <div className="priority-labels">
                      <span>Low</span>
                      <span>Medium</span>
                      <span>High</span>
                      <span>Critical</span>
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Initial Progress (%)</label>
                    <input
                      type="number"
                      name="progress"
                      min="0"
                      max="100"
                      value={formData.progress}
                      onChange={handleInputChange}
                      placeholder="0-100"
                    />
                  </div>
                  <div className="form-group">
                    <label>Select Team Members*</label>
                    <div className="team-member-selection">
                      {teamMembers.map(member => (
                        <div 
                          key={member.id} 
                          className={`team-member-option ${selectedTeamMembers.includes(member.id) ? 'selected' : ''}`}
                          onClick={() => handleTeamMemberToggle(member.id)}
                        >
                          <div className="member-avatar">{member.name.split(' ').map(n => n[0]).join('')}</div>
                          <div className="member-details">
                            <span className="member-name">{member.name}</span>
                            <span className="member-skill">{member.skill}</span>
                          </div>
                          <div className="member-checkbox">
                            {selectedTeamMembers.includes(member.id) && <span>✓</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button type="submit" className="submit-button">Create Project</button>
                </form>
              </div>
            )}

          </div>
        )}

        {activeTab === "projects" && (
          <div className="content-section">
            <h3>Projects Management</h3>
            <p>Detailed project management view will be shown here</p>
          </div>
        )}

        {activeTab === "team" && (
          <div className="content-section">
            <h3>Team Management</h3>
            <p>Team management features will be shown here</p>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="content-section">
            <h3>Reports</h3>
            <p>Reporting features will be shown here</p>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="content-section">
            <h3>Settings</h3>
            <p>Settings features will be shown here</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;