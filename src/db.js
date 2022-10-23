import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
});

const db = mongoose.connection;

// funtion
const handelOpen = () => {
  console.log("👍 connect db");
};

const handleError = (error) => {
  console.log("👎 db error");
};

// event
db.on("error", handleError);
db.once("open", handelOpen);
