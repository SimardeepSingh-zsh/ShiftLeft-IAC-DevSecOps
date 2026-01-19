const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Simple health endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Example "secure" endpoint (no user input eval, no secrets in code)
app.get('/greet', (req, res) => {
  const name = (req.query.name || 'world').toString().slice(0, 50);
  res.json({ message: `Hello, ${name}!` });
});

// Example insecure pattern (documented for SAST demo)
app.get('/insecure-eval', (req, res) => {
  const userInput = req.query.code;
  // DO NOT DO THIS IN REAL CODE – used only for SAST demo
  // eslint-disable-next-line no-eval
  const result = eval(userInput || '1+1');
  res.json({ result });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});