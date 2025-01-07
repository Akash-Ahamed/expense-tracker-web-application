"use client";
import { useState } from "react";
export default function ExpenseReport() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [expenses, setExpenses] = useState({});
  const [expanded, setExpanded] = useState({});
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});

  // Fetch data in database with Date
  const fetchExpenses = async () => {
    const response = await fetch(
      `/api/expenseReport?startDate=${startDate}&endDate=${endDate}`
    );
    const data = await response.json();
    setExpenses(data);
  };

  const toggleExpand = (date) => {
    setExpanded((prev) => ({ ...prev, [date]: !prev[date] }));
  };

  const handleEdit = (id, item) => {
    setEditing(id);
    setEditData({
      category: item.category,
      title: item.title,
      amount: item.amount,
    });
  };

  const saveEdit = async () => {
    try {
      const response = await fetch(`/api/expenseReport/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      const result = await response.json();
      console.log("Response:", response.status, result);

      if (response.ok) {
        setEditing(null);
        fetchExpenses(); // Refresh the expense list
      } else {
        console.error("Failed to update expense:", result.message);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  const handleDelete = async (id) => {
    await fetch(`/api/expenseReport`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchExpenses();
  };

  return (
    <div>
      <h1>Expenditure Report</h1>
      <div>
        <label>
          From:{" "}
          <input type="date" onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          To: <input type="date" onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button className="bg-green-500" onClick={fetchExpenses}>
          Go
        </button>
      </div>
      <div>
        {Object.entries(expenses).map(([date, entries]) => (
          <div
            key={date}
            style={{ margin: "10px 0", border: "1px solid #ccc" }}
          >
            <div
              onClick={() => toggleExpand(date)}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <strong>Total Expense of {date}:</strong>{" "}
              {entries.reduce((sum, item) => sum + item.amount, 0)} Tk
              <span>{expanded[date] ? "▲" : "▼"}</span>
            </div>
            {expanded[date] && (
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Item Name</th>
                    <th>Cost</th>
                    <th>Update</th>
                  </tr>
                </thead>
                <tbody>
                  {entries.map((item) => (
                    <tr key={item._id}>
                      <td>
                        {editing === item._id ? (
                          <input
                            value={editData.category}
                            onChange={(e) =>
                              setEditData((prev) => ({
                                ...prev,
                                category: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          item.category
                        )}
                      </td>
                      <td>
                        {editing === item._id ? (
                          <input
                            value={editData.title}
                            onChange={(e) =>
                              setEditData((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          item.title
                        )}
                      </td>
                      <td>
                        {editing === item._id ? (
                          <input
                            type="number"
                            value={editData.amount}
                            onChange={(e) =>
                              setEditData((prev) => ({
                                ...prev,
                                amount: e.target.value,
                              }))
                            }
                          />
                        ) : (
                          `${item.amount} Tk`
                        )}
                      </td>
                      <td>
                        {editing === item._id ? (
                          <button onClick={saveEdit}>Save | </button>
                        ) : (
                          <button onClick={() => handleEdit(item._id, item)}>
                            Edit
                          </button>
                        )}
                        <button onClick={() => handleDelete(item._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
