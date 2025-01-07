"use client";
import { useState } from "react";

const AddExpense = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");

  const addExpense = async () => {
    await fetch("http://localhost:3000/api/addExpense", {
      method: "POST",
      body: JSON.stringify({ title, category, amount: parseFloat(amount) }),
    });
    setTitle("");
    setCategory("Food");
    setAmount("");
  };

  return (
    <div>
      <h1>Add Expense</h1>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Expense Title"
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Utilities">Utilities</option>
        <option value="Clothing">Clothing</option>
        <option value="Others">Others</option>
      </select>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button className="bg-green-400" onClick={addExpense}>
        Add Expense
      </button>
    </div>
  );
};

export default AddExpense;
