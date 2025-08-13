const mongoose = require("mongoose");
const app = require("./app");
const port = 3000;
require("dotenv").config();

const mongooseUrl = process.env.MONGO_URL;
mongoose
  .connect(mongooseUrl)
  .then(() => {
    console.log("Mongoose connected successfully!");
    app.listen(port, () =>
      console.log(`Example app listening on port http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.log("Error while connecting to mongo", err);
  });
