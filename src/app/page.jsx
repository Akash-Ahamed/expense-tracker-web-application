"use client";

import Link from "next/link";
import { useFetchFunds } from "@/hooks/useFetchFunds";

export default function Home() {
  const funds = useFetchFunds();
  return (
    <div className="items-center justify-items-center p-10">
      {/* Title of the Dashboard */}
      <h1 className="text-5xl font-bold">Expense Tracker</h1>
      <div>
        <h2 className="text-4xl font-bold">Available Funds</h2>
        <p className="text-4xl font-bold">TK {funds}</p>
      </div>

      {/* Button Add Fund, Expenses Report, Pie Chart Report, Future Prediction */}
      <div className="flex justify-between items-center px-6 py-6 container">
        <div className="bg-blue-500 font-bold text-2xl p-2 text-white">
          <Link href={"/addFund"}>Add Fund</Link>
        </div>

        <div className="bg-blue-500 font-bold text-2xl p-2 text-white">
          <Link href={"/addExpense"}>Add Expense</Link>
        </div>
        <div className="bg-blue-500 font-bold text-2xl p-2 text-white">
          <Link href={"/expenseReport"}>Expenses Report</Link>
        </div>
        <div className="bg-blue-500 font-bold text-2xl p-2 text-white">
          <Link href={"/expensePieChart"}>Pie Chart Report</Link>
        </div>
        <div className="bg-blue-500 font-bold text-2xl p-2 text-white">
          <Link href={"/ForcastPage"}>Future Prediction</Link>
        </div>
      </div>
    </div>

    // Options for selection
  );
}
