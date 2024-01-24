const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
  // 3 chize chahiye
  // cloudnaem ,apikey,apisecret
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  } catch (err) {
    console.log(err);
  }
};
