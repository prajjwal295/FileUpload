const file = require("../Models/files");
const cloudinary = require("cloudinary").v2;

async function uploadFileToCloudinery(file, folder) {
 const options = { folder, resource_type: "auto" };
  console.log({ file });
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.videoUpload = async (req, res) => {
  try {
    const { name, tags, email } = req.body;
    // console.log(name, tags, email);

    const vdoFile = req.files.videoFile;
    // console.log(vdoFile);

    const supportedTypes = ["mp4", "avi", "mov"];

    const fileType = vdoFile.name.split(".")[1].toLowerCase();

    if (!supportedTypes.includes(fileType)) {
      console.log("file format not supported");
      return res.status(400).json({
        success: false,
        message: "file format not supported",
      });
    }

    // file format supported
    const response = await uploadFileToCloudinery(vdoFile, "vdoFolder");

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
      message: "video successfully uploaded",
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
  }
};
