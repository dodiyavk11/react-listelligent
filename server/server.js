require('dotenv').config();
const express = require("express");
const helmet = require("helmet");
const compression = require("compression");
const db = require("./models/index");
const cors = require("cors");
const config = require("./config/config.js")
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3001;
const router = express.Router();

const corsOpts = {
  origin: [process.env.FRONT_URL],
  methods: ['GET', 'POST', 'PATCH','DELETE'],
  credentials: true,
  exposedHeaders: ['Authorization'],
};


app.use(cors(corsOpts));
app.use(express.static(path.join(__dirname, "views")));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(/\/((?!webhooks).)*/, express.json());
app.use(helmet());
app.use(compression());
app.use(router);

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);

  });

require("./routes")(router);

app.get("/", (req, res) => res.send("<b>Hi your application is running on Port : "+PORT+"<b/>"));
app.listen(PORT, (err) => {
  if (err) {
    console.error("Server failed to start:", err);
  } else {
    console.log("Server connected to port " + PORT);
  }
});

app.use((req,res)=>{
    res.status(404).json({
    error: "Not Found",
    message: "The requested resource does not exist.",
  });
})

