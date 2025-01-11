# Expense Tracking Web Applicatio

## [Live Demo Website.](https://expense-tracker-web-application-blue.vercel.app/)

## **1. Project Overview**

The Expense Tracking Application is a web-based system designed to help users monitor their daily expenditures, generate insightful reports, and predict future expenses. It combines a user-friendly interface with robust backend operations and integrates machine learning for predictive analytics, making it a powerful tool for personal financial management.

### **Objective**

The primary goal of the application is to:

- Provide a seamless way to record and manage expenses.
- Generate detailed reports to offer insights into spending patterns.
- Predict future expenses using machine learning, helping users budget effectively.

### **Project Type**

Web Application

### **Technology Stack**

- **Frontend:** React
- **Backend:** Next.js
- **Database:** MongoDB
- **Machine Learning:** Python (Random Forest Regression)

## **2. Features**

### **A. Fund Management**

- A simple UI allows users to enter and update their available funds.
- Real-time updates ensure users can track their remaining budget dynamically.

### **B. Expense Recording**

- Users can record daily expenses with the following fields:
  - **Title:** Name of the expense item.
  - **Category:** Predefined dropdown categories.
  - **Date and Time:** Automatically captured and uneditable.
  - **Amount:** Expense amount deducted from available funds.

### **C. Reporting**

- **Date Range Report:**

  - Displays total expenses within a selected date range.
  - Provides a breakdown of expenses by date.
  - Expandable views allow users to edit or delete individual entries.

- **Category-Wise Report:**
  - Visual representation using a pie chart for category-wise expenses.

### **D. Forecasting Future Expenses**

- Based on 100 dummy data points, the application predicts total expenses for the next 7 days using a Random Forest Regression model.

---

## **3. System Design and Architecture**

### **Frontend**

- Built with React to provide a dynamic and interactive user interface.
- Components include:
  - Navbar
  - Expense Entry Form
  - Dashboard for reports and visualizations

### **Backend**

- Developed with Next.js to handle server-side rendering and API routing.
- Key endpoints:
  - `/add-fund`: Adds available funds.
  - `/add-expense`: Records expense data.
  - `/get-report`: Fetches data for reports.

### **Database**

- MongoDB stores user data, including:
  - Fund details
  - Expense records

### **Machine Learning Integration**

- **Model:** Random Forest Regression trained to predict expenses.
- **Integration:** Flask API serves predictions to the Next.js backend.
- **Pipeline:**
  1. Data preprocessing in Jupyter Notebook.
  2. Model training.
  3. Deployment of the model as an API using Flask.
