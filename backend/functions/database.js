require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Please check SUPABASE_URL and SUPABASE_KEY.');
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function getBudgets() {
  const { data, error } = await supabase.from('budgets').select('*').order('date', { ascending: false });
  if (error) throw error;
  return data;
}

async function addBudget(budget) {
  const { data, error } = await supabase.from('budgets').insert([budget]).select();
  if (error) throw error;
  return data;
}

async function deleteBudget(id) {
  const { data, error } = await supabase.from('budgets').delete().eq('id', id);
  if (error) throw error;
  return data;
}

module.exports = { getBudgets, addBudget, deleteBudget };

