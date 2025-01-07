import connectMongoDB from "@/lib/db";
import Expense from "@/models/Expense";
import mongoose from "mongoose";

export async function PUT(req, context) {
  try {
    const params = await context.params;
    const id = params.id; // ID of the expense to be updated
    const updatedData = await req.json();

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ message: "Invalid ID format" }), {
        status: 400,
      });
    }

    // Connect to the database
    await connectMongoDB();

    // Update a specific expense within the array
    const result = await Expense.updateOne(
      { "expenses._id": id }, // Match the expense by its ID
      {
        $set: {
          "expenses.$.title": updatedData.title,
          "expenses.$.amount": updatedData.amount,
          "expenses.$.category": updatedData.category,
        },
      }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Expense not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({ message: "Expense updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in PUT handler:", error);
    return new Response(JSON.stringify({ message: "Internal server error" }), {
      status: 500,
    });
  }
}
