"use client";
import { useState } from "react";

export default function AddExpense() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const addExpense = async () => {
    await fetch("/api/addExpense", {
      method: "POST",
      body: JSON.stringify({
        title,
        category,
        amount: parseFloat(amount),
        note,
      }),
    });
    setTitle("");
    setCategory("Food");
    setAmount("");
    setNote("");
  };
  return (
    <div>
      <div className="items-center justify-items-center p-10">
        <h1 className="text-4xl font-bold">Add Expense</h1>
      </div>

      <div className="flex flex-col gap-4 mx-20">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder=" Title"
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
          placeholder="Amount (TK)"
        />
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Note"
        />
        <div className="flex justify-between mx-10">
          <button
            className="bg-green-400 font-bold text-white py-1 px-2 w-fit mx-20"
            onClick={addExpense}
          >
            SUBMIT
          </button>

          <button
            className="bg-red-600 font-bold text-white py-1 px-2 w-fit mx-20 "
            onClick={addExpense}
          >
            CANCLE
          </button>
        </div>
      </div>
    </div>
  );
}