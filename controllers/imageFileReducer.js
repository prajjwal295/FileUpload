const file = require("../Models/files");
const cloudinary = require("cloudinary").v2;

async function uploadFileToClodinery(file, folder, quality) {
  const options = { folder, quality: quality };
  console.log({ file });
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageFileReducer = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const imgFile = req.files.imageFile;
    console.log(imgFile);

    const supportedTypes = ["jpg", "png", "jpeg"];

    const fileType = imgFile.name.split(".")[1].toLowerCase();

    if (!supportedTypes.includes(fileType)) {
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    // file format supported
    // providing quality as well
    const response = await uploadFileToClodinery(imgFile, "imgFolder", 30);

    console.log({ response });

    // db me entry save krni hai

    const fileData = await file.create({
      name,
      imageUrl: response.secure_url,
      email,
      tags,
    });

    res.json({
      success: true,
      data: fileData,
      message: "image successfully uploaded",
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};
