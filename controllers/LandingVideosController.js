const LandingVideos = require("../model/LandingPageVideoUpload");
const cloudinary = require("cloudinary").v2;
const cloudinaryutil = require('../utils/cloudinary');
const fs = require('fs');

cloudinary.config({
  cloud_name: "df1qnqmit",
  api_key: "944177449749656",
  api_secret: "8N1gnuaZd0dChIEz6klOeNZopD4",
  secure: true,
});

const uploadVideos = async (req, res) => {
  try {
    const {
      firstvideo,
      recruitmentvideo,
      employeeselfservicevideo,
      learningvideo,
      travelvideo,
      procurementvideo,
    } = req.body;
    const LandingVideo = await LandingVideos.create({
      firstvideo,
      recruitmentvideo,
      employeeselfservicevideo,
      learningvideo,
      travelvideo,
      procurementvideo,
    });
    res
      .status(200)
      .send({ message: "Videos Uploaded Successfully", LandingVideo });
  } catch (error) {
    console.error("Internal Server Error: ", error);
    res.status(400).send({ errormessage: "Video Upload Failed" });
  }
};

const getAllVideos = async (req, res) => {
  try {
    const AllVideos = await LandingVideos.find({});
    if (AllVideos) {
      res.status(200).send({ message: "All Data", AllVideos });
    } else {
      res.status(400).send({ errormessage: "No data found" });
    }
  } catch (error) {
    console.error("error: ", error);
    res.status(500).send({ errormessage: "Internal server error" });
  }
};

const updateVideos = async (req, res) => {
  const { id } = req.params;
  try {
    const findvideo = await LandingVideos.findById(id);
    if(!findvideo){
        res.status(400).send({errormessage: "Video update failed"});
    }
    const files = req.file;
    const uploader = async (path) => {
        return await cloudinaryutil.uploads(path, "landing_videos");
      };
      const { path } = files;
      const newPath = await uploader(path);
      if (findvideo.firstvideo) {
        const deleteResult = await cloudinaryutil.cloudinaryDeleteImg(
            findvideo.firstvideo
        );
        console.log("Cloudinary deletion result:", deleteResult);
      }
      findvideo.firstvideo = newPath.url;
      fs.unlinkSync(path);
      await findvideo.save();
      return res.status(200).send({ message: "Video Has Been Updated", findvideo });
    }catch (error) {
    console.log('error: ', error);
    res.status(500).send({errormessage : "Internal Server Error"});
  }
};

// const uploadProfile = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const employeeData = await Employee.findById(id);
//       if (!employeeData) {
//         return res.status(400).json({ message: "No Data Has Been Found" });
//       }
//       const files = req.file;
//       const uploader = async (path) => {
//         return await cloudinary.uploads(path, "profile");
//       };
//       const { path } = files;
//       const newPath = await uploader(path);
//       if (employeeData.profilepic && employeeData.profilepic.public_id) {
//         const deleteResult = await cloudinary.cloudinaryDeleteImg(
//           employeeData.profilepic.public_id
//         );
//         console.log("Cloudinary deletion result:", deleteResult);
//       }
//       employeeData.profilepic = {
//         public_id: newPath.public_id,
//         url: newPath.url,
//       };
//       fs.unlinkSync(path);
//       await employeeData.save();
//       return res
//         .status(200)
//         .json({ message: "Profile Picture Has Been Uploaded", employeeData });
//     } catch (error) {
//       console.log(error);
//       return res.status(500).json(error);
//     }
//   };

module.exports = { uploadVideos, getAllVideos, updateVideos };
