const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileSchema.post("save", async function (doc) {
  console.log({ doc });

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: "Happy - prajjwal", // sender address
    to: doc.email, // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: `<h1>Hello world?</h1>
        open your file :<a href = ${doc.imageUrl}> ${doc.imageUrl}</a>`, // html body
  });

  console.log({ info });
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
