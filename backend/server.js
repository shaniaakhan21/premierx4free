const express = require("express");
const cors = require("cors");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const db = require("./db");
const router = require("./serverRoutes/index.js");

//database connection

db.connect();

//middle ware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//cors
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Headers", "*");
  next();
});

//routes

app.use("/api", router);

// app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));

// app.use(express.static(path.join(__dirname, "/../frontend/build")));
 //app.use(express.static(path.join(__dirname, "/../frontend/public")));



 app.get("/*", (req, res) => {
   try {

     res.sendFile(path.join(__dirname,'/../frontend/build','index.html'));
     //res.sendFile(path.join(`${__dirname}/../frontend/public/index.html`));
  
  
   } catch (e) {
     res.send("Oops! unexpected error");
   }
 });







app.use(cors());

//server listening
app.listen( PORT, () => {
  console.log(`Listening on port number ${PORT}`);
});
