import { Schema, model } from "mongoose";

const electricityBillSchema = new Schema({
  billNumber: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stdRate: {
    type: Number,
    required: true,
    default: 8,
  },
  prevRating: {
    type: Number,
    required: true,
  },
  currRating: {
    type: Number,
    required: true,
  },
  billDate: {
    type: Date,
    required: true,
  },
  billAmount: {
    type: Number,
    required: true,
  },
  isPaid: {
    type: Boolean,
    required: true,
    default: false,
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
}, {timestamps:true});

const ElectricityBill = model('Bill', electricityBillSchema);

export default ElectricityBill;
