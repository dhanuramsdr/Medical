const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config({ path: './config/.env' });

const app = express();
const Connection = require('./config/db');
const AllRouters = require('./route/allRoute');
 const allowedOrigins = [
      'http://medicalfrontendweb.s3-website.eu-north-1.amazonaws.com',
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ];
app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.options("*", cors());  // ✅ Handle preflight requests globally
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Connection();
app.use("/api/v1", AllRouters);

app.listen(process.env.PORT, (err) => {
  if (err) console.log(err);
  else console.log("Port successfully connected");
});
