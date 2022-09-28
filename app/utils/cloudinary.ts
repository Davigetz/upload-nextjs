import cloudinary from "cloudinary";

const cloud = cloudinary.v2;

cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloud;
