import connectMongoDB from "@/lib/db";
import Expense from "@/models/Expense";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  await connectMongoDB();

  const expenses = await Expense.find({
    "expenses.create_at": {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    },
  });

  const groupedExpenses = expenses.reduce((acc, expense) => {
    expense.expenses.forEach((item) => {
      const date = item.create_at.toISOString().split("T")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
    });
    return acc;
  }, {});

  return new Response(JSON.stringify(groupedExpenses), { status: 200 });
}

export async function POST(request) {
  const data = await request.json();
  await connectMongoDB();

  const newExpense = new Expense(data);
  await newExpense.save();

  return new Response(JSON.stringify(newExpense), { status: 201 });
}

export async function DELETE(request) {
  const { id } = await request.json();

  await connectMongoDB();

  await Expense.updateOne({}, { $pull: { expenses: { _id: id } } });

  return new Response("Expense deleted", { status: 200 });
}
