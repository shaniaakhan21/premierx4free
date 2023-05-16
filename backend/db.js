const mongoose = require("mongoose");
require("dotenv").config()



module.exports.connect = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/publicwebsite", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("MongoDB connected successfully");
    })
    .catch((error) => console.log("Error: ", error));
};
