require("dotenv").config();
const express = require("express");
const app = express();

const Port = process.env.PORT || 8000;

// file upload middleware
app.use(express.json());
const fileupload = require("express-fileupload");
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// db se connect
const db = require("./config/database");
db.connect();

// cloud se connect
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

// api route mounting
const Upload = require("./routes/FileUpload");
app.use("/api/v1/upload", Upload);

app
  .listen(Port, () => {
    console.log(`app listens at ${Port}`);
  })
  .on("error", (err) => {
    console.error("Server start error:", err);
  });
