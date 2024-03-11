const express = require("express");
const mongoose = require("mongoose");
const { userRouter } = require("./routes/userRouter");
const { courseRouter } = require("./routes/courseRouter");
const app = express();
const cors = require("cors")
app.use(express.json());
app.use(cors());

const connect = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ka5452488:mongodb123@cluster0.10yjjlt.mongodb.net/idea-clan?retryWrites=true&w=majority"
    );
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};

app.use("/users", userRouter);
app.use("/course", courseRouter);

const PORT = 4000;
app.listen(PORT, async () => {
  await connect();
  console.log(`server is running on the port ${PORT}`);
});
