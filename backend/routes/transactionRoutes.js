const express = require("express");
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.post("/transfer", async (req, res) => {
  try {
    const { senderAccount, receiverAccount, amount } = req.body;
    const value = Number(amount);

    if (!Number.isFinite(value) || value <= 0)
      return res.status(400).json({ message: "Invalid amount" });
    if (senderAccount === receiverAccount)
      return res.status(400).json({ message: "Cannot transfer to the same account" });

    const sender = await Account.findOne({ accountNumber: senderAccount });
    const receiver = await Account.findOne({ accountNumber: receiverAccount });

    if (!sender || !receiver)
      return res.status(404).json({ message: "Account not found" });
    if (sender.balance < value)
      return res.status(400).json({ message: "Insufficient balance" });

    sender.balance -= value;
    receiver.balance += value;
    await sender.save();
    await receiver.save();

    await Transaction.create({
      senderAccount,
      receiverAccount,
      amount: value,
      type: "Transfer"
    });

    res.json({ message: "Money transferred successfully", balance: sender.balance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/history/:accountNumber", async (req, res) => {
  try {
    const accountNumber = req.params.accountNumber;
    const transactions = await Transaction.find({
      $or: [{ senderAccount: accountNumber }, { receiverAccount: accountNumber }]
    }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
