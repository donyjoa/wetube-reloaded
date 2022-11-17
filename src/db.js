import mongoose from "mongoose";

mongoose.connect(process.env.DB_URL, {
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
