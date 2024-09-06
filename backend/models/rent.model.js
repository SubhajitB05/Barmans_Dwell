import { Schema, model } from "mongoose";

const rentSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Ensure the ref matches the model name exactly
      required: true,
    },
    rentAmount: {
      type: Number,
      required: true,
      default: 1500,
    },
    dueDate: { // Joining date
      type: Date, // Use Date type for dates
      required: true,
    },
    paymentHistory: [
      {
        paymentDate: {
          type: Date, // Use Date type for dates
          required: true,
        },
        amountPaid: {
          // Optionally track amount paid for each payment
          type: Number,
          required: true,
        },
      },
    ],
    dueList: [
      {
        dueDate: {
          // Use Date type for dates
          type: Date,
          required: true,
        },
        amountDue: {
          // Optionally track amount due for each entry
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const Rent = model("Rent", rentSchema);

export default Rent;
