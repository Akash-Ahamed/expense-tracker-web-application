import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/db";
import Expense from "@/models/Expense";

// This GET() Fetch the available fund from the database
export async function GET() {
  await connectMongoDB();
  const data = await Expense.findOne({});
  if (!data) {
    return NextResponse.json({ availableFunds: 0 }, { status: 200 });
  }
  return NextResponse.json(
    { availableFunds: data.availableFunds },
    { status: 200 }
  );
}
