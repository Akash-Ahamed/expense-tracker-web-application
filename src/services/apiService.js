import axios from "axios";

// API Service(src/services/apiService.js)
export const getPredictions = async (inputData) => {
  try {
    const response = await axios.post("http://127.0.0.1:5000/predict", {
      data: inputData,
      headers: { "Content-Type": "application/json" },
    });
    return response.data.predictions;
  } catch (error) {
    console.error(
      "Error fetching predictions:",
      error.response?.data || error.message
    );
    throw error;
  }
};
