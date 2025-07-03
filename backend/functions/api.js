const express = require('express');
const serverless = require('serverless-http');
const { getBudgets, addBudget, deleteBudget } = require('./db');

const app = express();
app.use(express.json());

// GET /budgets
app.get('/budgets', async (req, res) => {
  try {
    const budgets = await getBudgets();
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /budgets
app.post('/budgets', async (req, res) => {
  try {
    const budget = req.body;
    const newBudget = await addBudget(budget);
    res.status(201).json(newBudget);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /budgets/:id
app.delete('/budgets/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await deleteBudget(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports.handler = serverless(app);
