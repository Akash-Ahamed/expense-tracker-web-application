import connectMongoDB from "@/lib/db";
import Expense from "../../../models/Expense";

export async function POST(request) {
  await connectMongoDB();
  const { title, category, amount, note } = await request.json();
  const data = await Expense.findOne({});

  if (data) {
    data.expenses.push({ title, category, amount, note });
    data.availableFunds -= amount;
    await data.save();
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}
