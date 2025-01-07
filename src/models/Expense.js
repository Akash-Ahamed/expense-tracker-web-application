import mongoose, { Schema } from "mongoose";

const expenseSchema = new Schema({
  availableFunds: {
    type: Number,
    //require: [true],
    description: " The current available funds.",
  },
  expenses: [
    {
      title: {
        type: String,
        required: [true, "Provide a title"],
        description: "The name of the expense item.",
      },
      amount: {
        type: Number,
        required: [true, "Provide the spent amount"],
        description: "The ammount spent on the expense item.",
      },
      category: {
        type: String,
        enum: [
          "Food",
          "Transport",
          "Entertainment",
          "Utilities",
          "Health Care",
          "Gardening",
          "Clothing",
          "Others",
        ],
        required: [true, "Only listed items are accepted"],
        description: "The predefined category of the expene",
      },
      create_at: {
        type: Date,
        default: Date.now,
        description: "The date and time of the expense.",
      },
      note: {
        type: String,
        description: "The name of the expense item.",
      },
    },
  ],
});

const Expense =
  mongoose.models.Expense || mongoose.model("Expense", expenseSchema);
export default Expense;
