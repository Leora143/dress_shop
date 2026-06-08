require("dotenv").config();

const app = require("./src/app");

const uploadRoutes =
  require("./src/routes/upload.routes");

app.use(
  "/upload",
  uploadRoutes
);

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});