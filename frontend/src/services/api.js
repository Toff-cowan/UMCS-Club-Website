// API service for making backend requests
// In development, Vite proxy handles /api requests
// In production, use VITE_API_BASE_URL environment variable
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Fetches all SIGs from the backend
 * @returns {Promise<Array>} Array of SIG objects
 */
export const getSIGs = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sigs`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(`Failed to fetch SIGs: ${errorData.message || response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching SIGs:', error);
    // More detailed error message
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.name === 'TypeError') {
      throw new Error('Cannot connect to backend server. Make sure the backend is running on port 5000 and MongoDB is connected.');
    }
    throw error;
  }
};

/**
 * Fetches all SIG Leads from the backend
 * @returns {Promise<Array>} Array of SIG Lead objects
 */
export const getSIGLeads = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/sig-leads`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(`Failed to fetch SIG Leads: ${errorData.message || response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching SIG Leads:', error);
    // More detailed error message
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.name === 'TypeError') {
      throw new Error('Cannot connect to backend server. Make sure the backend is running on port 5000 and MongoDB is connected.');
    }
    throw error;
  }
};

/**
 * Fetches all Executives from the backend
 * @returns {Promise<Array>} Array of Executive objects
 */
export const getExecutives = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/executives`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(`Failed to fetch Executives: ${errorData.message || response.statusText}`);
    }
    const data = await response.json();
    // Handle controller response format: { success: true, data: [...] }
    return data.success ? data.data : data;
  } catch (error) {
    console.error('Error fetching Executives:', error);
    // More detailed error message
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError') || error.name === 'TypeError') {
      throw new Error('Cannot connect to backend server. Make sure the backend is running on port 5000 and MongoDB is connected.');
    }
    throw error;
  }
};

