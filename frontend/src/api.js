// frontend/src/services/api.js
import axios from "axios";
import { API_URL } from './config.js';

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // Increased timeout for file uploads
  headers: {
    'Content-Type': 'application/json'
  }
});

// Tablet APIs
export const addTablet = async (file, tabletData) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productname", tabletData.productname);
    formData.append("productcategorey", tabletData.productcategorey);
    formData.append("dateofmfc", tabletData.dateofmfc);
    formData.append("dateofexp", tabletData.dateofexp);
    formData.append("price", tabletData.price);
    formData.append("stock", tabletData.stock);

    const result = await api.post('/v1/tablet/addtablet', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result.data;
  } catch (error) {
    console.error("Error uploading file:", error);
    return { success: false, error: error.message };
  }
};

export const getTablet = async () => {
  try {
    const response = await api.get("/v1/tablet/gettablet");
    console.log("API Response:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching tablets:", error);
    return [];
  }
};

export const updateTablet = async (file, tabletData, id) => {
  try {
    console.log("ids", id);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productname", tabletData.productname);
    formData.append("productcategorey", tabletData.productcategorey);
    formData.append("dateofmfc", tabletData.dateofmfc);
    formData.append("dateofexp", tabletData.dateofexp);
    formData.append("price", tabletData.price);
    formData.append("stock", tabletData.stock);

    const result = await api.put(`/v1/tablet/changetablet/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result.data;
  } catch (error) {
    console.error("Error updating tablet:", error);
    return { success: false, error: error.message };
  }
};

export const deletetTablet = async (id) => {
  try {
    console.log("id for delete api", id);
    const response = await api.delete(`/v1/tablet/deletetablet/${id}`);
    console.log("Delete Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error deleting tablet:", error);
    throw error;
  }
};

// Ointment APIs
export const addOinment = async (file, ointmentData) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tabletname", ointmentData.tabletname);
    formData.append("productcategorey", ointmentData.productcategorey);
    formData.append("dateofmfc", ointmentData.dateofmfc);
    formData.append("dateofexp", ointmentData.dateofexp);
    formData.append("price", ointmentData.price);
    formData.append("stock", ointmentData.stock);

    const result = await api.post('/v1/oinment/addtoinment', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result.data;
  } catch (error) {
    console.error("Error uploading ointment:", error);
    return { success: false, error: error.message };
  }
};

export const getOinment = async () => {
  try {
    const response = await api.get("/v1/oinment/getoinment");
    console.log("API Response ointment:", response.data);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching ointments:", error);
    return [];
  }
};

export const updateOinment = async (file, ointmentData, id) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productname", ointmentData.productname);
    formData.append("productcategorey", ointmentData.productcategorey);
    formData.append("dateofmfc", ointmentData.dateofmfc);
    formData.append("dateofexp", ointmentData.dateofexp);
    formData.append("price", ointmentData.price);
    formData.append("stock", ointmentData.stock);

    const result = await api.put(`/v1/oinment/changeoinment/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result.data;
  } catch (error) {
    console.error("Error updating ointment:", error);
    return { success: false, error: error.message };
  }
};

export const deletetOinment = async (id) => {
  try {
    const response = await api.delete(`/v1/oinment/deleteoinment/${id}`);
    console.log("Delete Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error deleting ointment:", error);
    throw error;
  }
};

// Syrup APIs
export const addSyrup = async (file, syrupData) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("tabletname", syrupData.tabletname);
    formData.append("productcategorey", syrupData.productcategorey);
    formData.append("dateofmfc", syrupData.dateofmfc);
    formData.append("dateofexp", syrupData.dateofexp);
    formData.append("price", syrupData.price);
    formData.append("stock", syrupData.stock);

    const result = await api.post('/v1/syrup/addsyrup', formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result.data;
  } catch (error) {
    console.error("Error uploading syrup:", error);
    return { success: false, error: error.message };
  }
};

export const getSyrup = async () => {
  try {
    const response = await api.get("/v1/syrup/getsyrup");
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching syrup:", error);
    return [];
  }
};

export const updateSyrup = async (file, syrupData, id) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("productname", syrupData.productname);
    formData.append("productcategorey", syrupData.productcategorey);
    formData.append("dateofmfc", syrupData.dateofmfc);
    formData.append("dateofexp", syrupData.dateofexp);
    formData.append("price", syrupData.price);
    formData.append("stock", syrupData.stock);

    const result = await api.put(`/v1/syrup/changesyrup/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result.data;
  } catch (error) {
    console.error("Error updating syrup:", error);
    return { success: false, error: error.message };
  }
};

export const deletetSyrup = async (id) => {
  try {
    const response = await api.delete(`/v1/syrup/deletesyrup/${id}`);
    console.log("Delete Response:", response);
    return response.data;
  } catch (error) {
    console.error("Error deleting syrup:", error);
    throw error;
  }
};

// Billing section
export const createBill = async (billData) => {
  try {
    const response = await api.post('/v1/billing/createbill', billData);
    return response.data;
  } catch (error) {
    console.error("Error saving bill:", error);
    throw error;
  }
};

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Server responded with error status
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // Request made but no response
      console.error("Network Error - No response received");
    } else {
      // Something else happened
      console.error("Request Error:", error.message);
    }
    return Promise.reject(error);
  }
);