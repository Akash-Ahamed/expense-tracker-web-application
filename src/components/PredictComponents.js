"use clien";

import { getPredictions } from "../services/apiService";

const PredictComponent = () => {
  const handleTestConnection = async () => {
    try {
      const testInput = [{ lag_1: 150, lag_2: 120 }];
      const result = await getPredictions(testInput);
      console.log("Predictions from backend:", result);
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return (
    <div>
      <h1>Expense Prediction</h1>
      <button onClick={handleTestConnection}>Test Connection</button>
    </div>
  );
};

export default PredictComponent;
