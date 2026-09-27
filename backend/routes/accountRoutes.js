const express = require("express");
const Account = require("../models/Account");
const Transaction = require("../models/Transaction");

const router = express.Router();

router.post("/deposit", async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    const account = await Account.findOne({ accountNumber });
    if (!account) return res.status(404).json({ message: "Account not found" });

    account.balance += Number(amount);
    await account.save();

    await Transaction.create({
      receiverAccount: accountNumber,
      amount: Number(amount),
      type: "Deposit"
    });

    res.json({ message: "Money deposited successfully", balance: account.balance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/withdraw", async (req, res) => {
  try {
    const { accountNumber, amount } = req.body;
    if (!Number.isFinite(Number(amount)) || Number(amount) <= 0)
      return res.status(400).json({ message: "Invalid amount" });

    const account = await Account.findOne({ accountNumber });
    if (!account) return res.status(404).json({ message: "Account not found" });
    if (account.balance < Number(amount))
      return res.status(400).json({ message: "Insufficient balance" });

    account.balance -= Number(amount);
    await account.save();

    await Transaction.create({
      senderAccount: accountNumber,
      amount: Number(amount),
      type: "Withdraw"
    });

    res.json({ message: "Money withdrawn successfully", balance: account.balance });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
