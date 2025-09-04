import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TeamMemberDashboard() {
  const [myTasks, setMyTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [teamMemberName, setTeamMemberName] = useState("Team Member");
  const [managerName, setManagerName] = useState("");
  const [managerDepartment, setManagerDepartment] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if team member is logged in
    if (!localStorage.getItem("teamLoggedIn")) {
      navigate("/team");
      return;
    }

    // Get team member name and manager details from localStorage
    const storedName = localStorage.getItem("teamMemberName");
    const storedManagerName = localStorage.getItem("teamMemberManagerName");
    const storedManagerDepartment = localStorage.getItem("teamMemberManagerDepartment");
    
    if (storedName) {
      setTeamMemberName(storedName);
    }
    
    if (storedManagerName) {
      setManagerName(storedManagerName);
    }
    
    if (storedManagerDepartment) {
      setManagerDepartment(storedManagerDepartment);
    }

    // Sample projects data
    const sampleProjects = [
      {
        id: 1,
        title: "Website Redesign",
        description: "Redesign company website with modern UI",
        deadline: "2025-10-15",
      },
      {
        id: 2,
        title: "Mobile App Development",
        description: "Develop a new mobile app for clients",
        deadline: "2025-11-20",
      }
    ];
    
    // Sample tasks data for this team member (John)
    const sampleTasks = [
      {
        id: 1,
        projectId: 1,
        title: "Design Homepage Mockup",
        description: "Create modern homepage design based on requirements",
        status: "In Progress",
        dueDate: "2025-09-20",
        priority: "High"
      },
      {
        id: 3,
        projectId: 1,
        title: "Create Navigation Menu",
        description: "Implement responsive navigation menu",
        status: "Pending",
        dueDate: "2025-09-22",
        priority: "Medium"
      },
      {
        id: 5,
        projectId: 2,
        title: "Design Login Screen",
        description: "Create login screen for the mobile app",
        status: "Completed",
        dueDate: "2025-09-10",
        priority: "Medium"
      }
    ];
    
    setProjects(sampleProjects);
    setMyTasks(sampleTasks);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("teamLoggedIn");
    // We're not clearing the team member and manager info so it persists between sessions
    navigate("/team");
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setMyTasks(myTasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Team Dashboard</h2>
        <ul className="sidebar-nav">
          <li>
            <a 
              href="#" 
              className={activeTab === "dashboard" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("dashboard");
              }}
            >
              My Dashboard
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeTab === "tasks" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("tasks");
              }}
            >
              My Tasks
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeTab === "projects" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("projects");
              }}
            >
              Projects
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeTab === "calendar" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("calendar");
              }}
            >
              Calendar
            </a>
          </li>
          <li>
            <a 
              href="#" 
              className={activeTab === "profile" ? "active" : ""}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab("profile");
              }}
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
            <span>{teamMemberName}</span>
          </div>
        </div>

        {activeTab === "dashboard" && (
          <div className="dashboard-content">
            <div className="dashboard-welcome">
              <h2>Welcome, {teamMemberName}!</h2>
              <p>Here's an overview of your tasks and projects.</p>
            </div>
            
            <div className="dashboard-summary">
              <div className="summary-section">
                <h3>Task Summary</h3>
                <div className="task-stats">
                  <div className="task-stat-item">
                    <span className="stat-label">Total Tasks:</span>
                    <span className="stat-value">{myTasks.length}</span>
                  </div>
                  <div className="task-stat-item">
                    <span className="stat-label">Completed:</span>
                    <span className="stat-value">{myTasks.filter(task => task.status === "Completed").length}</span>
                  </div>
                  <div className="task-stat-item">
                    <span className="stat-label">In Progress:</span>
                    <span className="stat-value">{myTasks.filter(task => task.status === "In Progress").length}</span>
                  </div>
                  <div className="task-stat-item">
                    <span className="stat-label">Pending:</span>
                    <span className="stat-value">{myTasks.filter(task => task.status === "Pending").length}</span>
                  </div>
                </div>
              </div>
              
              <div className="summary-section">
                <h3>Recent Activity</h3>
                <p>No recent activity to display.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="project-list">
            <h3>My Tasks</h3>
            
            <div className="task-stats">
              <div className="task-stat-item">
                <span className="stat-label">Total Tasks:</span>
                <span className="stat-value">{myTasks.length}</span>
              </div>
              <div className="task-stat-item">
                <span className="stat-label">Completed:</span>
                <span className="stat-value">{myTasks.filter(task => task.status === "Completed").length}</span>
              </div>
              <div className="task-stat-item">
                <span className="stat-label">In Progress:</span>
                <span className="stat-value">{myTasks.filter(task => task.status === "In Progress").length}</span>
              </div>
              <div className="task-stat-item">
                <span className="stat-label">Pending:</span>
                <span className="stat-value">{myTasks.filter(task => task.status === "Pending").length}</span>
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px", marginTop: "20px" }}>
              <h4>Task List</h4>
              <select style={{ padding: "5px", borderRadius: "4px" }}>
                <option value="all">All Tasks</option>
                <option value="priority">Sort by Priority</option>
                <option value="dueDate">Sort by Due Date</option>
              </select>
            </div>

            {myTasks.map((task) => (
              <div className="project-card" key={task.id}>
                <div className="project-header">
                  <div>
                    <h4>{task.title}</h4>
                    <small>Project: {projects.find(p => p.id === task.projectId)?.title || "Unknown"}</small>
                  </div>
                  <span style={{ 
                    padding: "4px 8px", 
                    borderRadius: "4px", 
                    backgroundColor: 
                      task.priority === "High" ? "#f44336" : 
                      task.priority === "Medium" ? "#ff9800" : "#4caf50",
                    color: "white",
                    fontSize: "0.8em"
                  }}>
                    {task.priority}
                  </span>
                </div>
                
                <p>{task.description}</p>
                
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
                  <span>Due: {task.dueDate}</span>
                  <div>
                    <select 
                      value={task.status}
                      onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                      style={{ 
                        padding: "4px", 
                        borderRadius: "4px",
                        backgroundColor: 
                          task.status === "Completed" ? "#4caf50" : 
                          task.status === "In Progress" ? "#2196f3" : "#ff9800",
                        color: "white"
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "projects" && (
          <div className="project-list">
            <h3>Projects</h3>
            {projects.map((project) => (
              <div className="project-card" key={project.id} style={{ padding: "15px" }}>
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <p>Deadline: {project.deadline}</p>
                <p>My Tasks: {myTasks.filter(task => task.projectId === project.id).length}</p>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === "calendar" && (
          <div className="project-list">
            <h3>Calendar</h3>
            <p className="no-data">Calendar view is not available yet.</p>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="project-list">
            <h3>My Profile</h3>
            <div className="profile-section">
              <div className="profile-info">
                <h4>Personal Information</h4>
                <p><strong>Name:</strong> {teamMemberName}</p>
                <p><strong>Position:</strong> Team Member</p>
                <p><strong>Department:</strong> Development</p>
              </div>
              
              {managerName && (
                <div className="profile-info">
                  <h4>Manager Information</h4>
                  <div className="manager-profile-details">
                    <div className="manager-avatar-profile">{managerName.charAt(0)}</div>
                    <div className="manager-info">
                      <p><strong>Manager Name:</strong> {managerName}</p>
                      <p><strong>Department:</strong> {managerDepartment}</p>
                      <p><strong>Contact:</strong> {managerName.toLowerCase().replace(' ', '.')}@company.com</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamMemberDashboard;
