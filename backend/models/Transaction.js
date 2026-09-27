const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  senderAccount: { type: String, default: null },
  receiverAccount: { type: String, default: null },
  amount: { type: Number, required: true },
  type: { type: String, required: true },
  status: { type: String, default: "Success" },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transaction", transactionSchema);
