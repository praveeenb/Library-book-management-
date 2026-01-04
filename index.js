const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");

const app = express();
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/libraryDB")
  .then(() => console.log("Connected to libraryDB"))
  .catch(err => console.log(err));

// Routes
app.use("/books", bookRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
