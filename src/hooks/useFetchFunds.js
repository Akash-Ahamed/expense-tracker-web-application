"use client";
import { useEffect, useState } from "react";

export const useFetchFunds = () => {
  const [funds, setFunds] = useState(0);

  useEffect(() => {
    const fetchAvailableFunds = async () => {
      try {
        const response = await fetch("/api/getAvailableFunds");
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

  return funds;
};
