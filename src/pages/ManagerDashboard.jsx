import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function ManagerDashboard() {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
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
    
    // Sample tasks data
    const sampleTasks = [
      {
        id: 1,
        projectId: 1,
        title: "Design Homepage Mockup",
        assignedTo: "John",
        status: "In Progress",
        dueDate: "2025-09-20"
      },
      {
        id: 2,
        projectId: 1,
        title: "Create CSS Framework",
        assignedTo: "Sarah",
        status: "Pending",
        dueDate: "2025-09-25"
      },
      {
        id: 3,
        projectId: 2,
        title: "Design App Wireframes",
        assignedTo: "Mike",
        status: "Completed",
        dueDate: "2025-09-15"
      },
      {
        id: 4,
        projectId: 2,
        title: "Frontend Development",
        assignedTo: "Lisa",
        status: "In Progress",
        dueDate: "2025-10-10"
      }
    ];
    
    setProjects(sampleProjects);
    setTasks(sampleTasks);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("managerLoggedIn");
    navigate("/manager");
  };

  const updateTaskStatus = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
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
            
            <div className="quick-actions">
              <div className="action-section">
                <h4>Quick Actions</h4>
                <div className="action-buttons">
                  <button className="action-btn">Create New Project</button>
                  <button className="action-btn">Assign Tasks</button>
                  <button className="action-btn">View Team Performance</button>
                  <button className="action-btn">Generate Reports</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="dashboard-content">
            <div className="section-header">
              <h3>Projects Management</h3>
              <div className="stat-badge">
                <span>Total Projects:</span>
                <span className="stat-value">{projects.length}</span>
              </div>
            </div>
            
            <div className="project-management">
              <p>Manage your projects, track progress, and allocate resources effectively.</p>
              
              <div className="action-buttons project-actions">
                <button className="action-btn primary">+ New Project</button>
                <button className="action-btn">View All Projects</button>
                <button className="action-btn">Project Analytics</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "tasks" && (
          <div className="dashboard-content">
            <div className="section-header">
              <h3>Task Assignment</h3>
              <div className="stat-badges">
                <div className="stat-badge">
                  <span>Total Tasks:</span>
                  <span className="stat-value">{tasks.length}</span>
                </div>
                <div className="stat-badge">
                  <span>Completed:</span>
                  <span className="stat-value">{tasks.filter(task => task.status === "Completed").length}</span>
                </div>
              </div>
            </div>
            
            <div className="task-management">
              <p>Assign, monitor, and update tasks for your team members.</p>
              
              <div className="action-buttons task-actions">
                <button className="action-btn primary">+ New Task</button>
                <button className="action-btn">View All Tasks</button>
                <button className="action-btn">Task Statistics</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="dashboard-content">
            <div className="section-header">
              <h3>Team Management</h3>
              <div className="stat-badge">
                <span>Team Members:</span>
                <span className="stat-value">{[...new Set(projects.flatMap(p => p.team))].length}</span>
              </div>
            </div>
            
            <div className="team-management">
              <p>Manage your team, assign roles, and monitor individual performance.</p>
              
              <div className="action-buttons team-actions">
                <button className="action-btn primary">+ Add Team Member</button>
                <button className="action-btn">View Team</button>
                <button className="action-btn">Performance Reviews</button>
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
                <p>Name: John Manager</p>
                <p>Email: john.manager@example.com</p>
                <p>Department: Development</p>
                <p>Role: Senior Project Manager</p>
              </div>
              
              <div className="action-buttons profile-actions">
                <button className="action-btn primary">Edit Profile</button>
                <button className="action-btn">Change Password</button>
                <button className="action-btn">Notification Settings</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManagerDashboard;
