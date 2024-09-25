const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const connectDb = require("./config/db");
const productRoutes = require("./routes/productRoutes");

//creating Db conncetion
connectDb();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/products?", productRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
