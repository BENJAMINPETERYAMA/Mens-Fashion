// Imports
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = 7000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/e-shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", () => console.log("Error in Connecting to Database"));
db.once("open", () => console.log("Connected to Database"));

// Static Files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));

// Set Views
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { text: "This is EJS" });
});

app.get("/about", (req, res) => {
  res.render("about", { text: "About Page" });
});
app.get("/signup", (req, res) => {
  res.render("signup", { text: "signup Page" });
});

//  Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`));

// mongo setup
app.post("/", (req, res) => {
  var fname = req.body.fname;
  var lname = req.body.lname;
  var name = req.body.name;
  var email = req.body.email;
  var phno = req.body.phno;
  var password = req.body.password;
  var cpassword = req.body.cpassword;

  var data = {
    fname: fname,
    lname: lname,
    name: fname + lname,
    email: email,
    phno: phno,
    password: password,
    cpassword: cpassword,
  };

  db.collection("users").insertOne(data, (err, collection) => {
    if (err) {
      throw err;
    }
    console.log("Record Inserted Successfully");
  });

  return res.redirect("/");
});
