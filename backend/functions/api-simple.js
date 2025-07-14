const { getBudgets, addBudget, deleteBudget } = require('./database');

exports.handler = async (event, context) => {
  const { httpMethod, path, body } = event;
  
  // Add CORS headers
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
  };
  
  try {
    // Handle OPTIONS request for CORS
    if (httpMethod === 'OPTIONS') {
      return {
        statusCode: 200,
        headers,
        body: ''
      };
    }
    
    // Parse the path to get the endpoint
    const pathParts = path.split('/').filter(Boolean);
    const endpoint = pathParts[pathParts.length - 1]; // Get the last part after /api
    
    if (httpMethod === 'GET' && (endpoint === 'budgets' || pathParts.length === 3)) {
      const budgets = await getBudgets();
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(budgets)
      };
    }
    
    if (httpMethod === 'POST' && endpoint === 'budgets') {
      const budget = JSON.parse(body);
      const newBudget = await addBudget(budget);
      return {
        statusCode: 201,
        headers,
        body: JSON.stringify(newBudget)
      };
    }
    
    if (httpMethod === 'DELETE' && pathParts.length === 4) {
      const id = pathParts[3]; // budgets/:id
      await deleteBudget(id);
      return {
        statusCode: 204,
        headers,
        body: ''
      };
    }
    
    // Default route
    if (httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ message: 'Budget API is running' })
      };
    }
    
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Not found' })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
