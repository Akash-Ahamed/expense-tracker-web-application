"use client";

import { useState } from "react";
import { useEffect } from "react";

export default function AddFund() {
  const [funds, setFunds] = useState(0);
  //const funds = useFetchFunds();

  // Call the useFetchFunds hook

  const [newFunds, setNewFunds] = useState("");

  // Fetch available founds from the MongoDB databas when app is open
  useEffect(() => {
    const fetchAvailableFunds = async () => {
      try {
        const response = await fetch("/api/updateFund");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setFunds(data.availableFunds);
      } catch (error) {
        console.error("Error fetching available funds:", error);
      }
    };

    fetchAvailableFunds();
  }, []);

  // When user add new fund,it save to the database

  const updateFunds = async () => {
    try {
      const response = await fetch("/api/updateFund", {
        cache: "no-store",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: parseFloat(newFunds) }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setFunds(data.availableFunds); // Update funds with new value from server
      setNewFunds("");
      window.location.reload();
    } catch (error) {
      console.error("Error updating funds:", error);
    }
  };
  // Add Fund show page
  return (
    <div>
      <div className="items-center justify-items-center p-10">
        <h2 className="text-4xl font-bold">Available Funds</h2>
        <p className="text-4xl font-bold">TK {funds}</p>
      </div>

      <div>
        <h2>Update Funds</h2>
        <input
          type="number"
          value={newFunds}
          onChange={(e) => setNewFunds(e.target.value)}
          placeholder="Add Fund Amount (TK)"
        />
        <button className="bg-green-500" onClick={updateFunds}>
          SUBMIT
        </button>
      </div>
    </div>
  );
}
