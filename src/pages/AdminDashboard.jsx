import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeJoineeTab, setActiveJoineeTab] = useState("manager");
  const [managers, setManagers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [selectedTeamMembers, setSelectedTeamMembers] = useState([]);
  const [showManagerForm, setShowManagerForm] = useState(false);
  const [showTeamMemberForm, setShowTeamMemberForm] = useState(false);
  const [managerFormError, setManagerFormError] = useState("");
  const [managerFormSuccess, setManagerFormSuccess] = useState(false);
  const [teamMemberFormError, setTeamMemberFormError] = useState("");
  const [teamMemberFormSuccess, setTeamMemberFormSuccess] = useState(false);
  const [managerData, setManagerData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    department: "",
    experience: "",
    skills: "",
    password: "",
    confirmPassword: ""
  });
  const [teamMemberData, setTeamMemberData] = useState({
    name: "",
    username: "",
    email: "",
    mobile: "",
    designation: "",
    experience: "",
    skills: "",
    managerId: "",
    password: "",
    confirmPassword: ""
  });
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
    // Help section data
    const [helpData, setHelpData] = useState([
      { id: 1, date: "2025-09-01", subject: "Login Issue", status: "Resolved", user: "John Smith" },
      { id: 2, date: "2025-09-02", subject: "Project Access", status: "Pending", user: "Lisa Wong" },
      { id: 3, date: "2025-09-03", subject: "Password Reset", status: "Resolved", user: "Mark Thompson" },
      { id: 4, date: "2025-09-04", subject: "Feature Request", status: "In Progress", user: "Anita Kumar" }
    ]);
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

  // Manager form handlers
  const handleManagerInputChange = (e) => {
    const { name, value } = e.target;
    setManagerData({
      ...managerData,
      [name]: value
    });
    
    if (managerFormError) {
      setManagerFormError("");
    }
  };
  
  const validateManagerForm = () => {
    if (!managerData.name.trim()) return "Name is required";
    if (!managerData.username.trim()) return "Username is required";
    if (managerData.username.trim().length < 4) return "Username must be at least 4 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(managerData.username)) return "Username can only contain letters, numbers and underscore";
    if (!managerData.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(managerData.email)) return "Email address is invalid";
    if (!managerData.mobile.trim()) return "Mobile number is required";
    if (!/^\d{10}$/.test(managerData.mobile.replace(/\D/g, ''))) return "Mobile number must be 10 digits";
    if (!managerData.department.trim()) return "Department is required";
    if (!managerData.experience) return "Experience is required";
    if (isNaN(managerData.experience) || parseFloat(managerData.experience) < 0) return "Experience must be a positive number";
    if (!managerData.skills.trim()) return "Skills are required";
    if (!managerData.password) return "Password is required";
    if (managerData.password.length < 6) return "Password must be at least 6 characters";
    if (!managerData.confirmPassword) return "Please confirm your password";
    if (managerData.password !== managerData.confirmPassword) return "Passwords do not match";
    
    return "";
  };
  
  const handleManagerSubmit = (e) => {
    e.preventDefault();
    setManagerFormError("");
    setManagerFormSuccess(false);
    
    const error = validateManagerForm();
    if (error) {
      setManagerFormError(error);
      return;
    }
    
    // Add new manager
    const newManager = {
      id: managers.length + 1,
      name: managerData.name,
      email: managerData.email,
      department: managerData.department,
      username: managerData.username,
      password: managerData.password // In a real app, you'd hash this
    };
    
    setManagers([...managers, newManager]);
    
    // Store manager credentials (for demo purposes)
    localStorage.setItem(`manager_${newManager.id}_username`, newManager.username);
    localStorage.setItem(`manager_${newManager.id}_password`, newManager.password);
    
    // Reset form
    setManagerData({
      name: "",
      username: "",
      email: "",
      mobile: "",
      department: "",
      experience: "",
      skills: "",
      password: "",
      confirmPassword: ""
    });
    
    setManagerFormSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setManagerFormSuccess(false);
    }, 3000);
  };
  
  // Team Member form handlers
  const handleTeamMemberInputChange = (e) => {
    const { name, value } = e.target;
    setTeamMemberData({
      ...teamMemberData,
      [name]: value
    });
    
    if (teamMemberFormError) {
      setTeamMemberFormError("");
    }
  };
  
  const validateTeamMemberForm = () => {
    if (!teamMemberData.name.trim()) return "Name is required";
    if (!teamMemberData.username.trim()) return "Username is required";
    if (teamMemberData.username.trim().length < 4) return "Username must be at least 4 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(teamMemberData.username)) return "Username can only contain letters, numbers and underscore";
    if (!teamMemberData.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(teamMemberData.email)) return "Email address is invalid";
    if (!teamMemberData.mobile.trim()) return "Mobile number is required";
    if (!/^\d{10}$/.test(teamMemberData.mobile.replace(/\D/g, ''))) return "Mobile number must be 10 digits";
    if (!teamMemberData.designation.trim()) return "Designation is required";
    if (!teamMemberData.experience) return "Experience is required";
    if (isNaN(teamMemberData.experience) || parseFloat(teamMemberData.experience) < 0) return "Experience must be a positive number";
    if (!teamMemberData.skills.trim()) return "Skills are required";
    if (!teamMemberData.managerId) return "Please select a manager";
    if (!teamMemberData.password) return "Password is required";
    if (teamMemberData.password.length < 6) return "Password must be at least 6 characters";
    if (!teamMemberData.confirmPassword) return "Please confirm your password";
    if (teamMemberData.password !== teamMemberData.confirmPassword) return "Passwords do not match";
    
    return "";
  };
  
  const handleTeamMemberSubmit = (e) => {
    e.preventDefault();
    setTeamMemberFormError("");
    setTeamMemberFormSuccess(false);
    
    const error = validateTeamMemberForm();
    if (error) {
      setTeamMemberFormError(error);
      return;
    }
    
    // Get the selected manager
    const selectedManager = managers.find(manager => manager.id === Number(teamMemberData.managerId));
    
    // Add new team member
    const newTeamMember = {
      id: teamMembers.length + 1,
      name: teamMemberData.name,
      skill: teamMemberData.designation,
      email: teamMemberData.email,
      managerId: selectedManager.id,
      managerName: selectedManager.name,
      managerDepartment: selectedManager.department,
      username: teamMemberData.username,
      password: teamMemberData.password // In a real app, you'd hash this
    };
    
    setTeamMembers([...teamMembers, newTeamMember]);
    
    // Store team member credentials (for demo purposes)
    localStorage.setItem(`team_member_${newTeamMember.id}_username`, newTeamMember.username);
    localStorage.setItem(`team_member_${newTeamMember.id}_password`, newTeamMember.password);
    localStorage.setItem(`team_member_${newTeamMember.id}_manager_id`, selectedManager.id);
    localStorage.setItem(`team_member_${newTeamMember.id}_manager_name`, selectedManager.name);
    localStorage.setItem(`team_member_${newTeamMember.id}_manager_department`, selectedManager.department);
    
    // Reset form
    setTeamMemberData({
      name: "",
      username: "",
      email: "",
      mobile: "",
      designation: "",
      experience: "",
      skills: "",
      managerId: "",
      password: "",
      confirmPassword: ""
    });
    
    setTeamMemberFormSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setTeamMemberFormSuccess(false);
    }, 3000);
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
              href="#newjoinee" 
              className={activeTab === "newjoinee" ? "active" : ""}
              onClick={() => setActiveTab("newjoinee")}
            >
              🆕 New Joinee
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
            <li>
              <a 
                href="#help" 
                className={activeTab === "help" ? "active" : ""}
                onClick={() => setActiveTab("help")}
              >
                🆘 Help
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
            <div className="dashboard-actions">
              <select className="filter-dropdown">
                <option value="all">All Projects</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>
          </div>
        )}

        {activeTab === "projects" && (
          <div className="content-section">
            <h3>Projects Management</h3>
            <p>Overview of all projects across the organization.</p>
            
            <div className="projects-overview" style={{ marginTop: '20px' }}>
              <div className="projects-table-container">
                <table className="projects-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>Project</th>
                      <th style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>Manager</th>
                      <th style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>Deadline</th>
                      <th style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>Status</th>
                      <th style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>Progress</th>
                      <th style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(project => (
                      <tr key={project.id}>
                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #e5e7eb' }}>
                          <div>
                            <strong>{project.title}</strong>
                            <p style={{ margin: '5px 0 0', fontSize: '0.875rem', color: '#6b7280' }}>{project.description.substring(0, 50)}...</p>
                          </div>
                        </td>
                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #e5e7eb' }}>
                          {managers.find(m => m.id === 1)?.name || 'Not assigned'}
                        </td>
                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #e5e7eb' }}>
                          {project.deadline}
                        </td>
                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #e5e7eb' }}>
                          <span style={{ 
                            padding: '4px 8px', 
                            borderRadius: '4px', 
                            fontSize: '0.75rem',
                            backgroundColor: project.status === 'Completed' ? '#dcfce7' : 
                                            project.status === 'In Progress' ? '#dbeafe' : 
                                            project.status === 'Not Started' ? '#f3f4f6' : '#fee2e2',
                            color: project.status === 'Completed' ? '#166534' : 
                                  project.status === 'In Progress' ? '#1e40af' : 
                                  project.status === 'Not Started' ? '#4b5563' : '#b91c1c'
                          }}>
                            {project.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #e5e7eb' }}>
                          <div style={{ width: '100%', backgroundColor: '#e5e7eb', borderRadius: '4px', height: '8px' }}>
                            <div style={{ 
                              width: `${project.progress}%`, 
                              backgroundColor: project.progress > 75 ? '#22c55e' : 
                                              project.progress > 50 ? '#3b82f6' : 
                                              project.progress > 25 ? '#f59e0b' : '#ef4444',
                              height: '8px',
                              borderRadius: '4px'
                            }}></div>
                          </div>
                          <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{project.progress}%</span>
                        </td>
                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #e5e7eb' }}>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button style={{ 
                              padding: '4px 8px', 
                              backgroundColor: '#eff6ff', 
                              color: '#2563eb', 
                              border: 'none', 
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}>
                              View
                            </button>
                            <button style={{ 
                              padding: '4px 8px', 
                              backgroundColor: '#f3f4f6', 
                              color: '#4b5563', 
                              border: 'none', 
                              borderRadius: '4px',
                              cursor: 'pointer',
                              fontSize: '0.875rem'
                            }}>
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "team" && (
          <div className="content-section">
            <h3>Team Management</h3>
            
            <div className="tab-navigation">
              <button 
                className={!showManagerForm && !showTeamMemberForm ? "tab-button active" : "tab-button"}
                onClick={() => {
                  setShowManagerForm(false);
                  setShowTeamMemberForm(false);
                }}
              >
                View Team
              </button>
              <button 
                className={showManagerForm ? "tab-button active" : "tab-button"}
                onClick={() => {
                  setShowManagerForm(true);
                  setShowTeamMemberForm(false);
                }}
              >
                Add Manager
              </button>
              <button 
                className={showTeamMemberForm ? "tab-button active" : "tab-button"}
                onClick={() => {
                  setShowManagerForm(false);
                  setShowTeamMemberForm(true);
                }}
              >
                Add Team Member
              </button>
            </div>
            
            {!showManagerForm && !showTeamMemberForm && (
              <div className="team-overview">
                <div className="team-section">
                  <h4>Managers</h4>
                  <div className="team-grid">
                    {managers.map(manager => (
                      <div className="team-card" key={manager.id}>
                        <div className="team-card-header">
                          <div className="team-avatar">{manager.name.split(' ').map(n => n[0]).join('')}</div>
                          <div>
                            <h5>{manager.name}</h5>
                            <span className="team-department">{manager.department}</span>
                          </div>
                        </div>
                        <div className="team-card-info">
                          <p><strong>Email:</strong> {manager.email}</p>
                          <p><strong>Team Members:</strong> {Math.floor(Math.random() * 8) + 1}</p>
                          <p><strong>Projects:</strong> {Math.floor(Math.random() * 5) + 1}</p>
                        </div>
                        <div className="team-card-actions">
                          <button className="action-btn edit">Edit</button>
                          <button className="action-btn delete">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="team-section">
                  <h4>Team Members</h4>
                  <div className="team-grid">
                    {teamMembers.map(member => (
                      <div className="team-card" key={member.id}>
                        <div className="team-card-header">
                          <div className="team-avatar">{member.name.split(' ').map(n => n[0]).join('')}</div>
                          <div>
                            <h5>{member.name}</h5>
                            <span className="team-role">{member.skill}</span>
                          </div>
                        </div>
                        <div className="team-card-info">
                          <p><strong>Manager:</strong> {managers[Math.floor(Math.random() * managers.length)].name}</p>
                          <p><strong>Tasks:</strong> {Math.floor(Math.random() * 10) + 1}</p>
                        </div>
                        <div className="team-card-actions">
                          <button className="action-btn edit">Edit</button>
                          <button className="action-btn delete">Delete</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            
            {showManagerForm && (
              <div className="form-container">
                <h3>Add New Manager</h3>
                {managerFormError && <div className="error-message">{managerFormError}</div>}
                {managerFormSuccess && <div className="success-message">Manager added successfully!</div>}
                
                <form onSubmit={handleManagerSubmit} className="registration-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="managerName">Full Name*</label>
                      <input
                        type="text"
                        id="managerName"
                        name="name"
                        value={managerData.name}
                        onChange={handleManagerInputChange}
                        placeholder="Enter full name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="managerUsername">Username*</label>
                      <input
                        type="text"
                        id="managerUsername"
                        name="username"
                        value={managerData.username}
                        onChange={handleManagerInputChange}
                        placeholder="Create a username"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="managerEmail">Email Address*</label>
                      <input
                        type="email"
                        id="managerEmail"
                        name="email"
                        value={managerData.email}
                        onChange={handleManagerInputChange}
                        placeholder="Enter email address"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="managerMobile">Mobile Number*</label>
                      <input
                        type="tel"
                        id="managerMobile"
                        name="mobile"
                        value={managerData.mobile}
                        onChange={handleManagerInputChange}
                        placeholder="Enter 10-digit mobile number"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="managerDepartment">Department*</label>
                      <input
                        type="text"
                        id="managerDepartment"
                        name="department"
                        value={managerData.department}
                        onChange={handleManagerInputChange}
                        placeholder="Enter department"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="managerExperience">Experience (years)*</label>
                      <input
                        type="number"
                        id="managerExperience"
                        name="experience"
                        value={managerData.experience}
                        onChange={handleManagerInputChange}
                        placeholder="Enter years of experience"
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="managerSkills">Skills*</label>
                    <input
                      type="text"
                      id="managerSkills"
                      name="skills"
                      value={managerData.skills}
                      onChange={handleManagerInputChange}
                      placeholder="Enter skills (comma separated)"
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="managerPassword">Password*</label>
                      <input
                        type="password"
                        id="managerPassword"
                        name="password"
                        value={managerData.password}
                        onChange={handleManagerInputChange}
                        placeholder="Create a password"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="managerConfirmPassword">Confirm Password*</label>
                      <input
                        type="password"
                        id="managerConfirmPassword"
                        name="confirmPassword"
                        value={managerData.confirmPassword}
                        onChange={handleManagerInputChange}
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>

                  <div className="form-buttons">
                    <button type="button" className="cancel-button" onClick={() => setShowManagerForm(false)}>Cancel</button>
                    <button type="submit" className="submit-button">Add Manager</button>
                  </div>
                </form>
              </div>
            )}
            
            {showTeamMemberForm && (
              <div className="form-container">
                <h3>Add New Team Member</h3>
                {teamMemberFormError && <div className="error-message">{teamMemberFormError}</div>}
                {teamMemberFormSuccess && <div className="success-message">Team Member added successfully!</div>}
                
                <form onSubmit={handleTeamMemberSubmit} className="registration-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="teamMemberName">Full Name*</label>
                      <input
                        type="text"
                        id="teamMemberName"
                        name="name"
                        value={teamMemberData.name}
                        onChange={handleTeamMemberInputChange}
                        placeholder="Enter full name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="teamMemberUsername">Username*</label>
                      <input
                        type="text"
                        id="teamMemberUsername"
                        name="username"
                        value={teamMemberData.username}
                        onChange={handleTeamMemberInputChange}
                        placeholder="Create a username"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="teamMemberEmail">Email Address*</label>
                      <input
                        type="email"
                        id="teamMemberEmail"
                        name="email"
                        value={teamMemberData.email}
                        onChange={handleTeamMemberInputChange}
                        placeholder="Enter email address"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="teamMemberMobile">Mobile Number*</label>
                      <input
                        type="tel"
                        id="teamMemberMobile"
                        name="mobile"
                        value={teamMemberData.mobile}
                        onChange={handleTeamMemberInputChange}
                        placeholder="Enter 10-digit mobile number"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="teamMemberDesignation">Designation*</label>
                      <input
                        type="text"
                        id="teamMemberDesignation"
                        name="designation"
                        value={teamMemberData.designation}
                        onChange={handleTeamMemberInputChange}
                        placeholder="Enter job title"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="teamMemberExperience">Experience (years)*</label>
                      <input
                        type="number"
                        id="teamMemberExperience"
                        name="experience"
                        value={teamMemberData.experience}
                        onChange={handleTeamMemberInputChange}
                        placeholder="Enter years of experience"
                        min="0"
                        step="0.5"
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="teamMemberSkills">Skills*</label>
                    <input
                      type="text"
                      id="teamMemberSkills"
                      name="skills"
                      value={teamMemberData.skills}
                      onChange={handleTeamMemberInputChange}
                      placeholder="Enter skills (comma separated)"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="teamMemberManagerId">Select Manager*</label>
                    <select
                      id="teamMemberManagerId"
                      name="managerId"
                      value={teamMemberData.managerId}
                      onChange={handleTeamMemberInputChange}
                    >
                      <option value="">-- Select a Manager --</option>
                      {managers.map(manager => (
                        <option key={manager.id} value={manager.id}>
                          {manager.name} - {manager.department}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="teamMemberPassword">Password*</label>
                      <input
                        type="password"
                        id="teamMemberPassword"
                        name="password"
                        value={teamMemberData.password}
                        onChange={handleTeamMemberInputChange}
                        placeholder="Create a password"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="teamMemberConfirmPassword">Confirm Password*</label>
                      <input
                        type="password"
                        id="teamMemberConfirmPassword"
                        name="confirmPassword"
                        value={teamMemberData.confirmPassword}
                        onChange={handleTeamMemberInputChange}
                        placeholder="Confirm password"
                      />
                    </div>
                  </div>

                  <div className="form-buttons">
                    <button type="button" className="cancel-button" onClick={() => setShowTeamMemberForm(false)}>Cancel</button>
                    <button type="submit" className="submit-button">Add Team Member</button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}
        
        {activeTab === "newjoinee" && (
          <div className="content-section">
            <h3>New Joinee Registration</h3>
            <p>Register new managers and team members to onboard them to the system.</p>
            
            <div className="joinee-tabs">
              <div className="tab-navigation">
                <button 
                  className={activeJoineeTab === "manager" ? "tab-button active" : "tab-button"}
                  onClick={() => setActiveJoineeTab("manager")}
                >
                  Manager Registration
                </button>
                <button 
                  className={activeJoineeTab === "teamMember" ? "tab-button active" : "tab-button"}
                  onClick={() => setActiveJoineeTab("teamMember")}
                >
                  Team Member Registration
                </button>
              </div>
              
              {activeJoineeTab === "manager" && (
                <div className="form-container">
                  <h3>Register New Manager</h3>
                  {managerFormError && <div className="error-message">{managerFormError}</div>}
                  {managerFormSuccess && <div className="success-message">Manager registered successfully! Credentials have been saved.</div>}
                  
                  <form onSubmit={handleManagerSubmit} className="registration-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="newManagerName">Full Name*</label>
                        <input
                          type="text"
                          id="newManagerName"
                          name="name"
                          value={managerData.name}
                          onChange={handleManagerInputChange}
                          placeholder="Enter full name"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="newManagerUsername">Username*</label>
                        <input
                          type="text"
                          id="newManagerUsername"
                          name="username"
                          value={managerData.username}
                          onChange={handleManagerInputChange}
                          placeholder="Create a username"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="newManagerEmail">Email Address*</label>
                        <input
                          type="email"
                          id="newManagerEmail"
                          name="email"
                          value={managerData.email}
                          onChange={handleManagerInputChange}
                          placeholder="Enter email address"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="newManagerMobile">Mobile Number*</label>
                        <input
                          type="tel"
                          id="newManagerMobile"
                          name="mobile"
                          value={managerData.mobile}
                          onChange={handleManagerInputChange}
                          placeholder="Enter 10-digit mobile number"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="newManagerDepartment">Department*</label>
                        <input
                          type="text"
                          id="newManagerDepartment"
                          name="department"
                          value={managerData.department}
                          onChange={handleManagerInputChange}
                          placeholder="Enter department"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="newManagerExperience">Experience (years)*</label>
                        <input
                          type="number"
                          id="newManagerExperience"
                          name="experience"
                          value={managerData.experience}
                          onChange={handleManagerInputChange}
                          placeholder="Enter years of experience"
                          min="0"
                          step="0.5"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="newManagerSkills">Skills*</label>
                      <input
                        type="text"
                        id="newManagerSkills"
                        name="skills"
                        value={managerData.skills}
                        onChange={handleManagerInputChange}
                        placeholder="Enter skills (comma separated)"
                      />
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="newManagerPassword">Password*</label>
                        <input
                          type="password"
                          id="newManagerPassword"
                          name="password"
                          value={managerData.password}
                          onChange={handleManagerInputChange}
                          placeholder="Create a password"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="newManagerConfirmPassword">Confirm Password*</label>
                        <input
                          type="password"
                          id="newManagerConfirmPassword"
                          name="confirmPassword"
                          value={managerData.confirmPassword}
                          onChange={handleManagerInputChange}
                          placeholder="Confirm password"
                        />
                      </div>
                    </div>

                    <button type="submit" className="submit-button">Register Manager</button>
                  </form>
                </div>
              )}
              
              {activeJoineeTab === "teamMember" && (
                <div className="form-container">
                  <h3>Register New Team Member</h3>
                  {teamMemberFormError && <div className="error-message">{teamMemberFormError}</div>}
                  {teamMemberFormSuccess && <div className="success-message">Team Member registered successfully! Credentials have been saved.</div>}
                  
                  <form onSubmit={handleTeamMemberSubmit} className="registration-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="newTeamMemberName">Full Name*</label>
                        <input
                          type="text"
                          id="newTeamMemberName"
                          name="name"
                          value={teamMemberData.name}
                          onChange={handleTeamMemberInputChange}
                          placeholder="Enter full name"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="newTeamMemberUsername">Username*</label>
                        <input
                          type="text"
                          id="newTeamMemberUsername"
                          name="username"
                          value={teamMemberData.username}
                          onChange={handleTeamMemberInputChange}
                          placeholder="Create a username"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="newTeamMemberEmail">Email Address*</label>
                        <input
                          type="email"
                          id="newTeamMemberEmail"
                          name="email"
                          value={teamMemberData.email}
                          onChange={handleTeamMemberInputChange}
                          placeholder="Enter email address"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="newTeamMemberMobile">Mobile Number*</label>
                        <input
                          type="tel"
                          id="newTeamMemberMobile"
                          name="mobile"
                          value={teamMemberData.mobile}
                          onChange={handleTeamMemberInputChange}
                          placeholder="Enter 10-digit mobile number"
                        />
                      </div>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="newTeamMemberDesignation">Designation*</label>
                        <input
                          type="text"
                          id="newTeamMemberDesignation"
                          name="designation"
                          value={teamMemberData.designation}
                          onChange={handleTeamMemberInputChange}
                          placeholder="Enter job title"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="newTeamMemberExperience">Experience (years)*</label>
                        <input
                          type="number"
                          id="newTeamMemberExperience"
                          name="experience"
                          value={teamMemberData.experience}
                          onChange={handleTeamMemberInputChange}
                          placeholder="Enter years of experience"
                          min="0"
                          step="0.5"
                        />
                      </div>
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="newTeamMemberSkills">Skills*</label>
                      <input
                        type="text"
                        id="newTeamMemberSkills"
                        name="skills"
                        value={teamMemberData.skills}
                        onChange={handleTeamMemberInputChange}
                        placeholder="Enter skills (comma separated)"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor="newTeamMemberManagerId">Select Manager*</label>
                      <select
                        id="newTeamMemberManagerId"
                        name="managerId"
                        value={teamMemberData.managerId}
                        onChange={handleTeamMemberInputChange}
                      >
                        <option value="">-- Select a Manager --</option>
                        {managers.map(manager => (
                          <option key={manager.id} value={manager.id}>
                            {manager.name} - {manager.department}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="newTeamMemberPassword">Password*</label>
                        <input
                          type="password"
                          id="newTeamMemberPassword"
                          name="password"
                          value={teamMemberData.password}
                          onChange={handleTeamMemberInputChange}
                          placeholder="Create a password"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="newTeamMemberConfirmPassword">Confirm Password*</label>
                        <input
                          type="password"
                          id="newTeamMemberConfirmPassword"
                          name="confirmPassword"
                          value={teamMemberData.confirmPassword}
                          onChange={handleTeamMemberInputChange}
                          placeholder="Confirm password"
                        />
                      </div>
                    </div>

                    <button type="submit" className="submit-button">Register Team Member</button>
                  </form>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="content-section">
            <h3>Reports</h3>
            <p>Reporting features will be shown here</p>
          </div>
        )}
          {activeTab === "help" && (
            <div className="content-section">
              <h3 className="text-2xl font-bold mb-4 text-blue-700">Help Requests</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-lg border border-gray-200">
                  <thead className="bg-blue-100">
                    <tr>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Date</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Subject</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">Status</th>
                      <th className="py-3 px-4 text-left font-semibold text-gray-700">User</th>
                    </tr>
                  </thead>
                  <tbody>
                    {helpData.map((item) => (
                      <tr key={item.id} className="hover:bg-blue-50 transition">
                        <td className="py-2 px-4 border-b border-gray-100">{item.date}</td>
                        <td className="py-2 px-4 border-b border-gray-100">{item.subject}</td>
                        <td className={`py-2 px-4 border-b border-gray-100 font-semibold ${item.status === 'Resolved' ? 'text-green-600' : item.status === 'Pending' ? 'text-yellow-600' : item.status === 'In Progress' ? 'text-blue-600' : 'text-gray-600'}`}>{item.status}</td>
                        <td className="py-2 px-4 border-b border-gray-100">{item.user}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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