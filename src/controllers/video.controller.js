import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description} = req.body;
    const user = req.user;
  
    const videoFile = req.files?.videoFile?.[0];
    const thumbnail = req.files?.thumbnail?.[0];
  
    if (!videoFile || !thumbnail) {
      throw new ApiError(400, "Video file and thumbnail are required");
    }
  
    const videoUploadResult = await uploadOnCloudinary(videoFile.path);
    const thumbnailUploadResult = await uploadOnCloudinary(thumbnail.path);
  
    if (!videoUploadResult || !thumbnailUploadResult) {
      throw new ApiError(500, "Failed to upload video or thumbnail");
    }
    console.log("video result",videoUploadResult)
    console.log("thumbnail", thumbnailUploadResult)
    const video = await Video.create({
      videoFile: videoUploadResult.secure_url,
      thumbnail: thumbnailUploadResult.secure_url,
      title,
      description,
      duration:videoUploadResult.duration,
      owner: user._id,
    });
    //Todo: do not send whole data
    return res.status(201).json(
        new ApiResponse(200,video, "video uploaded Successfully")
    )

})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}
