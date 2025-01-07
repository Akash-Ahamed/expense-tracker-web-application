from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os
import pandas as pd

app = Flask(__name__)
CORS(app)


# Load the model
current_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(current_dir, 'random_forest_model.pkl')
with open(model_path, 'rb') as file:
    model_data = pickle.load(file)
    model = model_data['model']  # Access the model from the dictionary
    feature_names = model_data['features']

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Log the incoming request for debugging
        data = request.json.get('data', None)
        print(f"Received data: {data}")
        
        # Validate data
        if not data:
            raise ValueError("No data provided.")
        
        # Convert to DataFrame
        input_data = pd.DataFrame(data)
        print(f"DataFrame created: {input_data}")
        
        # Ensure columns match model training
        required_features = ['lag_1', 'lag_2']
        if not all(col in input_data.columns for col in required_features):
            raise ValueError(f"Missing required features. Expected: {required_features}")
        
        # Perform prediction
        predictions = model.predict(input_data).tolist()
        return jsonify({"predictions": predictions})
    
    except Exception as e:
        # Log error for debugging
        print(f"Error: {e}")
        return jsonify({"error": str(e)}), 400


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
