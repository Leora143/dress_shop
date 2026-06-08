const app = require("./src/app");

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const uploadRoutes = require("./src/routes/upload.routes");
  app.use("/upload",uploadRoutes
);
require("dotenv").config();
console.log(
  process.env.AWS_BUCKET_NAME
);