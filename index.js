const express = require("express");
const mongoose = require("mongoose");
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_IP,
} = require("./config/config");

const app = express();

const mongoURI = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

const connectToDb = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("SUCCESS CONNECT TO DATABASE");
  } catch (error) {
    console.log("ERROR TO CONNECT DATABASE => ", error);
    setTimeout(connectToDb, 5000);
  }
};

connectToDb();

app.get("/", (req, res) => {
  res.send({ message: "hi there ii" });
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`listening at port ${port}`));
