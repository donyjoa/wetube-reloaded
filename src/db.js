import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/wetube", {
  // 아래 조건은 없어도 에러가 발생하지 않음
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useFindAndModify: false,
});

const db = mongoose.connection;

// funtion
const handelOpen = () => {
  console.log("👍 connect db");
};

const handleError = (error) => {
  console.log("👎 db error", error);
};

// event
db.on("error", handleError);
db.once("open", handelOpen);
