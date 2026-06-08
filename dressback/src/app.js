const express = require("express");
const cors = require("cors");

const productRoutes = require("./routes/product.routes");
const authRoutes = require("./routes/auth.routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(authRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Backend Working",
  });
});

app.use("/products", productRoutes);

module.exports = app;