import express from "express";

const PORT = 4000;

const app = express();

const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

const privateMiddleWare = (req, res, next) => {
  const url = req.url;
  if (url === "/protected") {
    return res.send("<h1>Not here</h1>");
  }
  console.log("ok go");
  next();
};

app.use(logger);
app.use(privateMiddleWare);

app.get("/", (req, res) => {
  return res.end();
});

app.get("/protected", (req, res) => {
  return res.send("welcome");
});

const handleListenging = () => {
  console.log(`server on port http://localhost:${PORT}`);
};

app.listen(PORT, handleListenging);
