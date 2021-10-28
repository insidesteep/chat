const express = require("express");
const passport = require("passport");
const session = require("express-session");
const MemoryStore = require("memorystore")(session);
const cookieParser = require("cookie-parser");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./utils/connectDB");
require("dotenv").config();
require("./utils/passport");

const app = express();

connectDB();

// Middlewaresvar session = require("express-session"),
app.use(cors()); // for Heroku
app.set("trust proxy", 1);
app.use(
  session({
    secret: "secretcode",
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
    cookie: {
      secure: true,
      maxAge: 60000,
    },
  })
);
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

app.use(express.static(__dirname));
app.use(express.static("client/build"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/v1/auth", require("./routes/auth.route"));
app.use("/api/v1/user", require("./routes/user.route"));
app.use("/api/v1/messages", require("./routes/message.route"));
app.use("/api/v1/conversations", require("./routes/conversation.route"));

const PORT = process.env.PORT || 5000;

console.log(process.env.NODE_ENV);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`The server is running on port: ${PORT}`);
});
