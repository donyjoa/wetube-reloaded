import "./db";
import Video from "./models/Video";
import app from "./server";

// 연결
const PORT = 4000;
const handleListenging = () => {
  console.log(`👍 server on port http://localhost:${PORT}`);
};
app.listen(PORT, handleListenging);
