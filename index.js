const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const redis = require("redis");
let redisStore = require("connect-redis")(session);
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_PORT,
  MONGO_IP,
  REDIS_URL,
  REDIS_PORT,
  REDIS_SECRET,
} = require("./config/config");

let redisClient = redis.createClient({
  socket: {
    host: REDIS_URL,
    port: REDIS_PORT,
  },
  legacyMode: true
});

redisClient.connect().catch(console.error)
const postRouter = require("./routes/post-routes");
const userRouter = require("./routes/user.routes");
const port = process.env.PORT || 4000;

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

app.use(
  session({
    store: new redisStore({ client: redisClient }),
    secret: REDIS_SECRET,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 1000 * 60,
    },
  })
);

app.use(express.json());
app.get("/api/v1", (req, res) => {
  res.send({ message: "api" });
});

app.use("/api/v1/posts", postRouter);
app.use("/api/v1/auth", userRouter);

app.listen(port, () => console.log(`listening at port ${port}`));
