// This file contains functions to interact with the backend API for support requests
// In a real application, these functions would make actual API calls to your backend server
// Mock database for demonstration purposes
let supportRequests = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    mobile: "1234567890",
    subject: "Login Issue",
    description: "I'm unable to login to my account after the recent update.",
    status: "pending",
    createdAt: "2023-09-01T14:30:00Z"
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    mobile: "9876543210",
    subject: "Feature Request",
    description: "Can you add a dark mode to the application?",
    status: "resolved",
    createdAt: "2023-08-28T09:15:00Z"
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    mobile: "5551234567",
    subject: "Report Generation Error",
    description: "I'm getting an error when trying to generate the monthly report.",
    status: "in-progress",
    createdAt: "2023-09-02T11:45:00Z"
  }
];

// Get all support requests
export const getAllSupportRequests = async () => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...supportRequests]);
    }, 500);
  });
};

// Get a single support request by ID
export const getSupportRequestById = async (id) => {
  // Simulate API delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const request = supportRequests.find(req => req.id === id);
      if (request) {
        resolve({ ...request });
      } else {
        reject(new Error('Support request not found'));
      }
    }, 500);
  });
};

// Create a new support request
export const createSupportRequest = async (requestData) => {
  // Simulate API delay
  return new Promise((resolve) => {
    setTimeout(() => {
      const newRequest = {
        id: supportRequests.length + 1,
        ...requestData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      
      supportRequests = [...supportRequests, newRequest];
      resolve(newRequest);
    }, 500);
  });
};

// Update a support request
export const updateSupportRequest = async (id, updates) => {
  // Simulate API delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = supportRequests.findIndex(req => req.id === id);
      
      if (index !== -1) {
        const updatedRequest = {
          ...supportRequests[index],
          ...updates
        };
        
        supportRequests = [
          ...supportRequests.slice(0, index),
          updatedRequest,
          ...supportRequests.slice(index + 1)
        ];
        
        resolve(updatedRequest);
      } else {
        reject(new Error('Support request not found'));
      }
    }, 500);
  });
};

// Delete a support request
export const deleteSupportRequest = async (id) => {
  // Simulate API delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = supportRequests.findIndex(req => req.id === id);
      
      if (index !== -1) {
        supportRequests = [
          ...supportRequests.slice(0, index),
          ...supportRequests.slice(index + 1)
        ];
        
        resolve({ success: true });
      } else {
        reject(new Error('Support request not found'));
      }
    }, 500);
  });
};

// In a real application, these functions would use fetch or axios to make HTTP requests to your backend
// Example using fetch:
/*
export const getAllSupportRequests = async () => {
  try {
    const response = await fetch('/api/support-requests');
    if (!response.ok) {
      throw new Error('Failed to fetch support requests');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching support requests:', error);
    throw error;
  }
};

export const createSupportRequest = async (requestData) => {
  try {
    const response = await fetch('/api/support-requests', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create support request');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating support request:', error);
    throw error;
  }
};
*/
