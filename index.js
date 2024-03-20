const express = require("express");
const app = express();
const router = require("./src/routes/routes");
const path = require("path");
require("dotenv").config();

const port = process.env.PORT || 8080;

app.listen(port)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src/presentation/views"));
app.use(express.static(path.join(__dirname,'src/presentation/views/public')));
app.use("/", router);
