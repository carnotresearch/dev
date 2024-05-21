const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 5000;
const MONGO_URI = "mongodb+srv://user2:user2@cluster0.sfiyids.mongodb.net/";

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
const items = require("./routes/items");
app.use("/api/items", items);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
