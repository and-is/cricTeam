import app from "./app.js";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/dbconfig.js";

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
