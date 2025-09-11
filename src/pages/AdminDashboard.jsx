import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSupportRequests } from "../services/supportService";

function AdminDashboard() {
  const [projects, setProjects] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [activeJoineeTab, setActiveJoineeTab] = useState("manager");
  const [managers, setManagers] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [managerFormError, setManagerFormError] = useState("");
  const [managerFormSuccess, setManagerFormSuccess] = useState(false);
  const [teamMemberFormError, setTeamMemberFormError] = useState("");
  const [teamMemberFormSuccess, setTeamMemberFormSuccess] = useState(false);
  const [managerData, setManagerData] = useState({
    name: "",
    userId: "",
    password: ""
  });
  const [teamMemberData, setTeamMemberData] = useState({
    name: "",
    userId: "",
    password: ""
  });
  const [error, setError] = useState("");
  // Help section data
  const [helpData, setHelpData] = useState([]);
  const [helpLoading, setHelpLoading] = useState(false);
  const [helpError, setHelpError] = useState("");
  const navigate = useNavigate();

  // Function to fetch help data
  const fetchHelpData = async () => {
    try {
      setHelpLoading(true);
      setHelpError("");
      const data = await getAllSupportRequests();
      setHelpData(data);
    } catch (error) {
      console.error("Error fetching help data:", error);
      setHelpError("Failed to load help requests");
    } finally {
      setHelpLoading(false);
    }
  };

  useEffect(() => {
    // Check if admin is logged in
    if (!localStorage.getItem("adminLoggedIn")) {
      navigate("/admin");
      return;
    }

    // Initialize with empty arrays instead of sample data
    setManagers([]);
    setTeamMembers([]);
    setProjects([]);
    
    // Fetch help data from API
    fetchHelpData();
    
  }, [navigate]);

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
    if (!managerData.userId.trim()) return "User ID is required";
    if (!managerData.password.trim()) return "Password is required";
    if (managerData.password.length < 6) return "Password must be at least 6 characters";
    
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
      userId: managerData.userId,
      password: managerData.password
    };
    
    setManagers([...managers, newManager]);
    
    // Store manager credentials (for demo purposes)
    localStorage.setItem(`manager_${newManager.id}_userId`, newManager.userId);
    localStorage.setItem(`manager_${newManager.id}_password`, newManager.password);
    localStorage.setItem(`manager_${newManager.id}_name`, newManager.name);
    
    // Reset form
    setManagerData({
      name: "",
      userId: "",
      password: ""
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
    if (!teamMemberData.userId.trim()) return "User ID is required";
    if (!teamMemberData.password.trim()) return "Password is required";
    if (teamMemberData.password.length < 6) return "Password must be at least 6 characters";
    
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
    
    // Add new team member
    const newTeamMember = {
      id: teamMembers.length + 1,
      name: teamMemberData.name,
      userId: teamMemberData.userId,
      password: teamMemberData.password
    };
    
    setTeamMembers([...teamMembers, newTeamMember]);
    
    // Store team member credentials (for demo purposes)
    localStorage.setItem(`team_member_${newTeamMember.id}_userId`, newTeamMember.userId);
    localStorage.setItem(`team_member_${newTeamMember.id}_password`, newTeamMember.password);
    localStorage.setItem(`team_member_${newTeamMember.id}_name`, newTeamMember.name);
    
    // Reset form
    setTeamMemberData({
      name: "",
      userId: "",
      password: ""
    });
    
    setTeamMemberFormSuccess(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => {
      setTeamMemberFormSuccess(false);
    }, 3000);
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
                      <th style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>Project ID</th>
                      <th style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>Project</th>
                      <th style={{ textAlign: 'left', padding: '12px 15px', backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>Manager</th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.map(project => (
                      <tr key={project.id}>
                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #e5e7eb' }}>
                          {project.projectId || project.id}
                        </td>
                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #e5e7eb' }}>
                          <strong>{project.title}</strong>
                        </td>
                        <td style={{ padding: '12px 15px', borderBottom: '1px solid #e5e7eb' }}>
                          {project.manager?.name || managers.find(m => m.id === project.managerId)?.name || 'Not assigned'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
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
                    <div className="form-group">
                      <label htmlFor="managerName">Manager Name*</label>
                      <input
                        type="text"
                        id="managerName"
                        name="name"
                        value={managerData.name}
                        onChange={handleManagerInputChange}
                        placeholder="Enter manager name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="managerUserId">User ID*</label>
                      <input
                        type="text"
                        id="managerUserId"
                        name="userId"
                        value={managerData.userId}
                        onChange={handleManagerInputChange}
                        placeholder="Enter user ID"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="managerPassword">Password*</label>
                      <input
                        type="password"
                        id="managerPassword"
                        name="password"
                        value={managerData.password}
                        onChange={handleManagerInputChange}
                        placeholder="Enter password"
                      />
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
                    <div className="form-group">
                      <label htmlFor="teamMemberName">Team Member Name*</label>
                      <input
                        type="text"
                        id="teamMemberName"
                        name="name"
                        value={teamMemberData.name}
                        onChange={handleTeamMemberInputChange}
                        placeholder="Enter team member name"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="teamMemberUserId">User ID*</label>
                      <input
                        type="text"
                        id="teamMemberUserId"
                        name="userId"
                        value={teamMemberData.userId}
                        onChange={handleTeamMemberInputChange}
                        placeholder="Enter user ID"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="teamMemberPassword">Password*</label>
                      <input
                        type="password"
                        id="teamMemberPassword"
                        name="password"
                        value={teamMemberData.password}
                        onChange={handleTeamMemberInputChange}
                        placeholder="Enter password"
                      />
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
              
              {helpLoading ? (
                <div className="text-center py-8">
                  <p>Loading help requests...</p>
                </div>
              ) : helpError ? (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  {helpError}
                  <button 
                    onClick={fetchHelpData}
                    className="ml-2 underline hover:no-underline"
                  >
                    Retry
                  </button>
                </div>
              ) : helpData.length === 0 ? (
                <div className="text-center py-8">
                  <p>No help requests found.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white rounded-lg shadow-lg border border-gray-200">
                    <thead className="bg-blue-100">
                      <tr>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">ID</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Name</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Email</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Mobile</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Subject</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Description</th>
                        <th className="py-3 px-4 text-left font-semibold text-gray-700">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {helpData.map((item) => (
                        <tr key={item.id} className="hover:bg-blue-50 transition">
                          <td className="py-2 px-4 border-b border-gray-100">{item.id}</td>
                          <td className="py-2 px-4 border-b border-gray-100">{item.name}</td>
                          <td className="py-2 px-4 border-b border-gray-100">
                            <a 
                              href={`mailto:${item.email}`} 
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {item.email}
                            </a>
                          </td>
                          <td className="py-2 px-4 border-b border-gray-100">
                            <a 
                              href={`tel:${item.mobile}`} 
                              className="text-blue-600 hover:text-blue-800"
                            >
                              {item.mobile}
                            </a>
                          </td>
                          <td className="py-2 px-4 border-b border-gray-100">
                            {item.subject}
                          </td>
                          <td className="py-2 px-4 border-b border-gray-100 max-w-xs">
                            <div className="truncate" title={item.description}>
                              {item.description || 'N/A'}
                            </div>
                          </td>
                          <td className="py-2 px-4 border-b border-gray-100">
                            {item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'N/A'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
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