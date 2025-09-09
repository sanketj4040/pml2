import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ManagerDashboard() {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showForm, setShowForm] = useState(false);
  const [managers, setManagers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [error, setError] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskFormData, setTaskFormData] = useState({
    taskId: "",
    teamMemberId: "",
    taskName: "",
    managerId: ""
  });
  const [formData, setFormData] = useState({
    projectId: "",
    title: "",
    description: "",
    teamMember: ""
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
    
    // Sample team members data - removed dummy data
    const sampleTeamMembers = [];
    
    setProjects(sampleProjects);
    setTeamMembers(sampleTeamMembers);
  }, [navigate]);

  // Initialize empty form with today's date when form is shown
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
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
    if (!formData.projectId || !formData.title || !formData.description || !formData.teamMember) {
      setError("Please fill all required fields!");
      return;
    }

    // Add new project
    const newProject = {
      id: projects.length + 1,
      projectId: formData.projectId,
      title: formData.title,
      description: formData.description,
      teamMember: formData.teamMember,
      status: "Not Started",
      createdAt: new Date().toISOString()
    };

    setProjects([...projects, newProject]);
    setShowForm(false);
    setFormData({
      projectId: "",
      title: "",
      description: "",
      teamMember: ""
    });
  };

  // Helper function to convert numeric priority to label
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
                      <label>Project ID*</label>
                      <input
                        type="text"
                        name="projectId"
                        value={formData.projectId}
                        onChange={handleInputChange}
                        placeholder="Enter project ID"
                      />
                    </div>
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
                    <div className="form-group">
                      <label>Team Member*</label>
                      <select
                        name="teamMember"
                        value={formData.teamMember}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">-- Select Team Member --</option>
                        {teamMembers.map(member => (
                          <option key={member.id} value={member.name}>
                            {member.name}
                          </option>
                        ))}
                      </select>
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
