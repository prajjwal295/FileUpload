const file = require("../Models/files");

// localfileUpload --> handlerFunction create krna hai

// server pr upload krega naaki cloudinary pr
// client ke pc se data leke server ke kisi path pr upload krega

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("file -> ", file);

    // providing the path on server
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    console.log("path-> ", path);

    // move file on the given path
    file.mv(path, (err) => {
      console.log(err);
    });

    res.json({
      success: true,
      message: "Local file upload successfully",
    });
  } catch (error) {
    console.log(error);
    message:"file upload issue"
  }
};
