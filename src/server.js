import express from "express";

const PORT = 4000;

const app = express();

app.get("/", (req, res) => {
  return res.send("wow");
});

const handleListenging = () => {
  console.log(`server on port http://localhost:${PORT}`);
};

app.listen(PORT, handleListenging);
