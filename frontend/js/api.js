// API Service for Notes App

const API_URL = "http://localhost:5000/api";

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem("authToken");
};

// Helper function for API calls
const apiRequest = async (endpoint, options = {}) => {
    const token = getAuthToken();
    
    const defaultHeaders = {
        "Content-Type": "application/json",
    };
    
    if (token) {
        defaultHeaders["Authorization"] = `Bearer ${token}`;
    }
    
    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };
    
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }
    
    return data;
};

// Note API functions
export const noteAPI = {
    // Get all notes
    getAll: () => apiRequest("/notes"),
    
    // Get single note
    getById: (id) => apiRequest(`/notes/${id}`),
    
    // Create note
    create: (noteData) => apiRequest("/notes", {
        method: "POST",
        body: JSON.stringify(noteData),
    }),
    
    // Update note
    update: (id, noteData) => apiRequest(`/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify(noteData),
    }),
    
    // Delete note
    delete: (id) => apiRequest(`/notes/${id}`, {
        method: "DELETE",
    }),
};

// Auth API functions
export const authAPI = {
    login: (email, password) => apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    }),
    
    register: (name, email, password) => apiRequest("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    }),
};