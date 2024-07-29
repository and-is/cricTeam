import express from "express";
const app = express();
import bodyParser from "body-parser";

app.get("/", (req, res) => {
  res.send("hi");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

export default app;
