const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Server is working 🚀");
});

const PORT = process.env.PORT || 3004;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});