import express from "express";
import authentication from "./routes/auth.js";

import dotenv from "dotenv";
dotenv.config({ path: "config.env" });

const app = express();

app.use(express.json());

const port = process.env.PORT || 8000;

app.use("/auth", authentication);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
