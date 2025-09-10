import axios from 'axios';

// API base URL - adjust this based on where your Django server is running
const API_BASE_URL = 'http://localhost:8000/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User-related API calls (original model)
export const userService = {
  // Get all users
  getAll: async () => {
    try {
      const response = await apiClient.get('/users/');
      return response.data;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  },

  // Get a single user by ID
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/users/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching user with id ${id}:`, error);
      throw error;
    }
  },

  // Create a new user
  create: async (userData) => {
    try {
      const response = await apiClient.post('/users/create/', userData);
      return response.data;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  // Update an existing user
  update: async (id, userData) => {
    try {
      const response = await apiClient.put(`/users/update/${id}/`, userData);
      return response.data;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  },

  // Delete a user
  delete: async (id) => {
    try {
      await apiClient.delete(`/users/delete/${id}/`);
      return true;
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw error;
    }
  }
};

// Help API service (replacing support requests)
export const apiSupportService = {
  // Get all help requests
  getAllSupportRequests: async () => {
    try {
      const response = await apiClient.get('/help/');
      return response.data;
    } catch (error) {
      console.error('Error fetching help requests:', error);
      throw error;
    }
  },

  // Get a single help request by ID
  getSupportRequestById: async (id) => {
    try {
      const response = await apiClient.get(`/help/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching help request with id ${id}:`, error);
      throw error;
    }
  },

  // Create a new help request
  createSupportRequest: async (requestData) => {
    try {
      const response = await apiClient.post('/help/create/', requestData);
      return response.data;
    } catch (error) {
      console.error('Error creating help request:', error);
      throw error;
    }
  },

  // Update a help request
  updateSupportRequest: async (id, updates) => {
    try {
      const response = await apiClient.put(`/help/update/${id}/`, updates);
      return response.data;
    } catch (error) {
      console.error(`Error updating help request with id ${id}:`, error);
      throw error;
    }
  },

  // Delete a help request
  deleteSupportRequest: async (id) => {
    try {
      await apiClient.delete(`/help/delete/${id}/`);
      return { success: true };
    } catch (error) {
      console.error(`Error deleting help request with id ${id}:`, error);
      throw error;
    }
  }
};

// Admin API service
export const adminService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/admins/');
      return response.data;
    } catch (error) {
      console.error('Error fetching admins:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/admins/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching admin with id ${id}:`, error);
      throw error;
    }
  },
  
  create: async (adminData) => {
    try {
      const response = await apiClient.post('/admins/create/', adminData);
      return response.data;
    } catch (error) {
      console.error('Error creating admin:', error);
      throw error;
    }
  },
  
  update: async (id, adminData) => {
    try {
      const response = await apiClient.put(`/admins/update/${id}/`, adminData);
      return response.data;
    } catch (error) {
      console.error(`Error updating admin with id ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await apiClient.delete(`/admins/delete/${id}/`);
      return true;
    } catch (error) {
      console.error(`Error deleting admin with id ${id}:`, error);
      throw error;
    }
  }
};

// Manager API service
export const managerService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/managers/');
      return response.data;
    } catch (error) {
      console.error('Error fetching managers:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/managers/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching manager with id ${id}:`, error);
      throw error;
    }
  },
  
  create: async (managerData) => {
    try {
      const response = await apiClient.post('/managers/create/', managerData);
      return response.data;
    } catch (error) {
      console.error('Error creating manager:', error);
      throw error;
    }
  },
  
  update: async (id, managerData) => {
    try {
      const response = await apiClient.put(`/managers/update/${id}/`, managerData);
      return response.data;
    } catch (error) {
      console.error(`Error updating manager with id ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await apiClient.delete(`/managers/delete/${id}/`);
      return true;
    } catch (error) {
      console.error(`Error deleting manager with id ${id}:`, error);
      throw error;
    }
  }
};

// TeamMember API service
export const teamMemberService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/team-members/');
      return response.data;
    } catch (error) {
      console.error('Error fetching team members:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/team-members/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching team member with id ${id}:`, error);
      throw error;
    }
  },
  
  create: async (teamMemberData) => {
    try {
      const response = await apiClient.post('/team-members/create/', teamMemberData);
      return response.data;
    } catch (error) {
      console.error('Error creating team member:', error);
      throw error;
    }
  },
  
  update: async (id, teamMemberData) => {
    try {
      const response = await apiClient.put(`/team-members/update/${id}/`, teamMemberData);
      return response.data;
    } catch (error) {
      console.error(`Error updating team member with id ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await apiClient.delete(`/team-members/delete/${id}/`);
      return true;
    } catch (error) {
      console.error(`Error deleting team member with id ${id}:`, error);
      throw error;
    }
  }
};

// Project API service
export const projectService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/projects/');
      return response.data;
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/projects/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching project with id ${id}:`, error);
      throw error;
    }
  },
  
  create: async (projectData) => {
    try {
      const response = await apiClient.post('/projects/create/', projectData);
      return response.data;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },
  
  update: async (id, projectData) => {
    try {
      const response = await apiClient.put(`/projects/update/${id}/`, projectData);
      return response.data;
    } catch (error) {
      console.error(`Error updating project with id ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await apiClient.delete(`/projects/delete/${id}/`);
      return true;
    } catch (error) {
      console.error(`Error deleting project with id ${id}:`, error);
      throw error;
    }
  }
};

// Task API service
export const taskService = {
  getAll: async () => {
    try {
      const response = await apiClient.get('/tasks/');
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await apiClient.get(`/tasks/${id}/`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching task with id ${id}:`, error);
      throw error;
    }
  },
  
  create: async (taskData) => {
    try {
      const response = await apiClient.post('/tasks/create/', taskData);
      return response.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },
  
  update: async (id, taskData) => {
    try {
      const response = await apiClient.put(`/tasks/update/${id}/`, taskData);
      return response.data;
    } catch (error) {
      console.error(`Error updating task with id ${id}:`, error);
      throw error;
    }
  },
  
  delete: async (id) => {
    try {
      await apiClient.delete(`/tasks/delete/${id}/`);
      return true;
    } catch (error) {
      console.error(`Error deleting task with id ${id}:`, error);
      throw error;
    }
  }
};
