const mongoose = require('mongoose');

const VideoUpload = new mongoose.Schema({
    firstvideo : {type : String , required : true},
    recruitmentvideo : {type : String, required : true},
    employeeselfservicevideo : {type : String, required : true},
    learningvideo : {type : String, required : true},
    travelvideo : {type : String, required : true},
    procurementvideo : {type : String, required : true},
},{
    timestamps: true,
});

module.exports = mongoose.model("LandingVideos",VideoUpload);