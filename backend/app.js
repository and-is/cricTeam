import express from "express";
const app = express();
import bodyParser from "body-parser";
import teamsRouter from "./routes/teams.routes.js";
import playersRouter from "./routes/players.routes.js";
import statsRouter from "./routes/stats.routes.js";
import matchesRouter from "./routes/matches.routes.js";
import cors from "cors";

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.get("/", (req, res) => {
  res.send("hi");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/teams", teamsRouter);
app.use("/players", playersRouter);
app.use("/matches", matchesRouter);
app.use("/stats", statsRouter);

export default app;
