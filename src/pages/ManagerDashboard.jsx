import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ManagerDashboard() {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [managers, setManagers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [error, setError] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskFormData, setTaskFormData] = useState({
    taskId: "",
    teamMemberId: "",
    taskName: "",
    managerId: ""
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    deadline: "",
    technologies: "",
    priority: "5",
    teamMembers: [],
    progress: "0"
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check if manager is logged in
    if (!localStorage.getItem("managerLoggedIn")) {
      navigate("/manager");
      return;
    }

    // Sample projects data
    const sampleProjects = [
      {
        id: 1,
        title: "Website Redesign",
        description: "Redesign company website with modern UI",
        deadline: "2025-10-15",
        progress: 65,
        team: ["John", "Sarah"]
      },
      {
        id: 2,
        title: "Mobile App Development",
        description: "Develop a new mobile app for clients",
        deadline: "2025-11-20",
        progress: 30,
        team: ["Mike", "Lisa", "David"]
      }
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
    
    setProjects(sampleProjects);
    setTeamMembers(sampleTeamMembers);
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
    localStorage.removeItem("managerLoggedIn");
    navigate("/manager");
  };

  const handleTaskInputChange = (e) => {
    const { name, value } = e.target;
    setTaskFormData({
      ...taskFormData,
      [name]: value
    });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!taskFormData.taskId || !taskFormData.teamMemberId || !taskFormData.taskName || !taskFormData.managerId) {
      alert("Please fill all required fields!");
      return;
    }

    // Here you would typically save the task assignment
    console.log("Task assigned:", taskFormData);
    
    // Reset form
    setTaskFormData({
      taskId: "",
      teamMemberId: "",
      taskName: "",
      managerId: ""
    });
    
    setShowTaskForm(false);
    alert("Task assigned successfully!");
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.title || !formData.description || !formData.deadline) {
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
        <h2>Manager Dashboard</h2>
        <ul className="sidebar-nav">
          <li>
            <a 
              href="#dashboard" 
              className={activeTab === "dashboard" ? "active" : ""}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </a>
          </li>
          <li>
            <a 
              href="#projects" 
              className={activeTab === "projects" ? "active" : ""}
              onClick={() => setActiveTab("projects")}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#tasks" 
              className={activeTab === "tasks" ? "active" : ""}
              onClick={() => setActiveTab("tasks")}
            >
              Task Assignment
            </a>
          </li>
          <li>
            <a 
              href="#team" 
              className={activeTab === "team" ? "active" : ""}
              onClick={() => setActiveTab("team")}
            >
              Team Members
            </a>
          </li>
          <li>
            <a 
              href="#profile" 
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              My Profile
            </a>
          </li>
        </ul>
        <div style={{ marginTop: "auto", paddingTop: "20px" }}>
          <button onClick={handleLogout}>Logout</button>
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
            <span>Manager</span>
          </div>
        </div>

        {activeTab === "dashboard" && (
          <div className="dashboard-content">
            <h3>Welcome to the Manager Dashboard</h3>
            <p>This is your central command center for managing projects and team members.</p>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="dashboard-content">
            <div className="section-header">
              <h3>Projects Management</h3>
            </div>
            
            <div className="project-management">
              <p>Manage your projects, track progress, and allocate resources effectively.</p>
              
              <div className="action-buttons project-actions">
                <button 
                  className={`action-btn primary ${showForm ? 'cancel' : ''}`} 
                  onClick={() => setShowForm(!showForm)}
                >
                  {showForm ? '✖ Cancel' : '+ New Project'}
                </button>
                <button className="action-btn">View All Projects</button>
              </div>
              
              {showForm && (
                <div className="form-container" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <h3>Create New Project</h3>
                  {error && <div className="error-message" style={{ color: '#dc2626', padding: '10px', backgroundColor: '#fee2e2', borderRadius: '4px', marginBottom: '15px' }}>{error}</div>}
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
                      <div className="team-member-selection" style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #e5e7eb', borderRadius: '4px', padding: '10px' }}>
                        {teamMembers.map(member => (
                          <div 
                            key={member.id} 
                            className={`team-member-option ${selectedTeamMembers.includes(member.id) ? 'selected' : ''}`}
                            onClick={() => handleTeamMemberToggle(member.id)}
                            style={{ 
                              display: 'flex', 
                              alignItems: 'center', 
                              padding: '8px', 
                              margin: '5px 0', 
                              borderRadius: '4px', 
                              cursor: 'pointer',
                              backgroundColor: selectedTeamMembers.includes(member.id) ? '#e0f2fe' : 'white',
                              border: selectedTeamMembers.includes(member.id) ? '1px solid #bae6fd' : '1px solid #e5e7eb'
                            }}
                          >
                            <div className="member-avatar" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '10px' }}>
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="member-details" style={{ flex: '1' }}>
                              <span className="member-name" style={{ display: 'block', fontWeight: '500' }}>{member.name}</span>
                              <span className="member-skill" style={{ display: 'block', fontSize: '0.875rem', color: '#6b7280' }}>{member.skill}</span>
                            </div>
                            <div className="member-checkbox" style={{ width: '24px', height: '24px', borderRadius: '4px', border: selectedTeamMembers.includes(member.id) ? 'none' : '1px solid #d1d5db', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: selectedTeamMembers.includes(member.id) ? '#2563eb' : 'transparent' }}>
                              {selectedTeamMembers.includes(member.id) && <span style={{ color: 'white' }}>✓</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <button type="submit" className="submit-button" style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', marginTop: '15px', fontWeight: '500' }}>Create Project</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="dashboard-content">
            <div className="section-header">
              <h3>Task Assignment</h3>
            </div>
            
            <div className="task-management">
              <p>Assign tasks to your team members.</p>
              
              <div className="action-buttons task-actions">
                <button 
                  className={`action-btn primary ${showTaskForm ? 'cancel' : ''}`}
                  onClick={() => setShowTaskForm(!showTaskForm)}
                >
                  {showTaskForm ? '✖ Cancel' : '+ Assign Task'}
                </button>
              </div>

              {showTaskForm && (
                <div className="form-container" style={{ marginTop: '20px', padding: '20px', backgroundColor: '#f8f9fa', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                  <h3>Assign New Task</h3>
                  
                  <form onSubmit={handleTaskSubmit} className="registration-form">
                    <div className="form-group">
                      <label htmlFor="taskId">Task ID*</label>
                      <input
                        type="text"
                        id="taskId"
                        name="taskId"
                        value={taskFormData.taskId}
                        onChange={handleTaskInputChange}
                        placeholder="Enter task ID"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="teamMemberId">Team Member ID*</label>
                      <select
                        id="teamMemberId"
                        name="teamMemberId"
                        value={taskFormData.teamMemberId}
                        onChange={handleTaskInputChange}
                        required
                      >
                        <option value="">-- Select Team Member --</option>
                        {teamMembers.map(member => (
                          <option key={member.id} value={member.id}>
                            {member.id} - {member.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="form-group">
                      <label htmlFor="taskName">Task Name*</label>
                      <input
                        type="text"
                        id="taskName"
                        name="taskName"
                        value={taskFormData.taskName}
                        onChange={handleTaskInputChange}
                        placeholder="Enter task name"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="managerId">Manager ID*</label>
                      <input
                        type="text"
                        id="managerId"
                        name="managerId"
                        value={taskFormData.managerId}
                        onChange={handleTaskInputChange}
                        placeholder="Enter manager ID"
                        required
                      />
                    </div>

                    <button type="submit" className="submit-button" style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 20px', borderRadius: '4px', border: 'none', cursor: 'pointer', marginTop: '15px', fontWeight: '500' }}>
                      Assign Task
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="dashboard-content">
            <div className="section-header">
              <h3>Team Management</h3>
            </div>
            
            <div className="team-management">
              <p>Manage your team, assign roles, and monitor individual performance.</p>
              
              <div className="action-buttons team-actions">
                <button className="action-btn">View Team</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="dashboard-content">
            <h3>My Profile</h3>
            <p>View and update your personal information and preferences.</p>
            
            <div className="profile-section">
              <div className="profile-info">
                <h4>Personal Information</h4>
                <p>Name: </p>
                <p>Email: </p>
                {/* <p>Department: </p>
                <p>Role: </p> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManagerDashboard;
