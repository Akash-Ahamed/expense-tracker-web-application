import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/db";
import Expense from "@/models/Expense";

export async function GET() {
  try {
    await connectMongoDB();

    // Fetch the document containing availableFunds and expenses
    const data = await Expense.findOne({});

    if (!data || !data.expenses.length) {
      return NextResponse.json(
        { message: "No expenses found." },
        { status: 404 }
      );
    }

    // Return the expenses array
    return NextResponse.json({ expenses: data.expenses }, { status: 200 });
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return NextResponse.json(
      { message: "Error fetching expenses." },
      { status: 500 }
    );
  }
}
