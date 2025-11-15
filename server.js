import express from "express";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config({ path: "config.env" });

const app = express();

app.use(express.json());

const port = process.env.PORT || 8000;

//
let users = [];
//

app.post("/auth/register", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const existUser = users.find((user) => user.userName === userName);
    if (existUser) {
      return res.status(400).json({ message: "Invalid Username or Password" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    users.push({ userName, password: hashedPassword });
    res.status(201).json({ message: "User Registered Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/auth/login", async (req, res) => {
  const { userName, password } = req.body;
  try {
    const findUser = users.find((user) => user.userName === userName);
    if (!findUser) {
      return res.status(404).json({ message: "Invalid Username or Password" });
    }
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (isMatch) {
      res.status(200).json({ message: "Login Successfully" });
    } else {
      res.status(401).json({ message: "Invalid Username or Password" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
