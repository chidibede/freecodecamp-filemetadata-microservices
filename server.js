"use strict";

var express = require("express");
var cors = require("cors");
const fileUpload = require("express-fileupload");

var app = express();

app.use(cors());
app.use(fileUpload({ createParentPath: true }));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", function (req, res) {
  if (!req.files) {
    res.json({ message: "No file selected, please select a file" });
  } else {
    const file = req.files.upfile;
    const fileInfo = {
      name: file.name,
      size: file.size
    }
    res.json(fileInfo);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server running on localhost:${port}`);
});
