const express = require('express')
const serverless = require('serverless-http')

const app = express()
app.use(express.json())

// Example route
app.get('/hello', (req, res) => {
  res.json({ message: 'Hello from backend!' })
})

// Add more routes here 

module.exports.handler = serverless(app)

