const express = require("express");
const run = require("./database/connectDB");
const app = express();
require("dotenv").config();
const cors = require("cors");
app.use(cors());
app.use(express.json());

const adminRoutes = require("./routes/adminRoutes");
const authRoutes = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");

const PORT = process.env.PORT || 3000;

run();

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
