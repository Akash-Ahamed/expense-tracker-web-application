import { NextResponse } from "next/server";
import connectMongoDB from "@/lib/db";
import Expense from "@/models/Expense";

export async function POST(request) {
  await connectMongoDB();
  //const funds = useFetchFunds();
  const { amount } = await request.json();

  if (isNaN(amount)) {
    return NextResponse.json(
      { message: "Invalid amount provided" },
      { status: 400 }
    );
  }
  const numericAmount = parseFloat(amount);

  let data = await Expense.findOne({});
  if (!data) {
    data = new Expense({ availableFunds: numericAmount, expenses: [] });
  } else {
    // data.availableFunds -= amount;
    data.availableFunds += numericAmount;
  }
  await data.save();

  // Return the updated availableFunds in the response
  return NextResponse.json(
    { message: "Add Fund Successfully", availableFunds: data.availableFunds },
    { status: 201 }
  );
}

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
