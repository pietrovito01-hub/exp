let expenses = [];

export default function handler(req, res) {
  if (req.method === "GET") {
    return res.status(200).json(expenses);
  }

  if (req.method === "POST") {
    const { description, amount } = req.body || {};

    if (!description || amount === undefined) {
      return res.status(400).json({ error: "description and amount are required" });
    }

    const newExpense = {
      id: Date.now(),
      description,
      amount: Number(amount),
      createdAt: new Date().toISOString(),
    };

    expenses.push(newExpense);
    return res.status(201).json(newExpense);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
