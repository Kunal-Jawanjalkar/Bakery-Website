const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");
const mongoose = require("mongoose");
// const HOSTNAME = process.env.HOST_NAME || '127.0.0.1';
const PORT = process.env.PORT || 5000;
const cors = require('cors');


// cors middleware
// app.use(cors({
//   exposedHeaders: ['auth-token'],
// }));

// Connect to db
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    if (err) throw err;
    console.log("not able to connect db");
  });

// SET THE TEMPLATE ENGINE AS PUG
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Set static folder
app.use("/static", express.static(path.join(__dirname, "static")));

// Body parser middleware 
app.use(express.urlencoded({extended:false}));
app.use(express.json())

// Routing middleware
app.use("/", require("./routes/routes"));

app.listen( PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
