const express = require("express");
const connectDB = require("./config/db");

const app = express();

//Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/cart", require("./routes/api/cart"));
app.use("/api/item", require("./routes/api/item"));
app.use("/api/coupon", require("./routes/api/coupon"));

//Define Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
