import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createAd = async (adData, token) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/ads/create`, adData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || "Ad creation failed";
  }
};
