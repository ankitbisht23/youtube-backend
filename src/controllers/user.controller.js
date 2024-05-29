import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ValidateEmail } from "../utils/validation.js"
const registerUser =asyncHandler( async (req, res) => {
    //get user detail
    const {fullName,email,username,password}=req.body
    if(
        [fullName,email,username,password]
        .some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"All fields are requried")
    }

    //validation: mainly for email :todo
    const isemail=ValidateEmail(email);
    if(!isemail){
        throw new ApiError(400,"enter valid email")
    }

    // check if user already exists
    const existedUser= await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"user already exist")
    }

    //multer give req.files
    const avatarLocalPath= req.files?.avatar[0]?.path;
    let coverImageLocalPath
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0){
        coverImageLocalPath=req.files.coverImage[0].path;
    }
    if(!avatarLocalPath){
        throw new ApiError(400, "avatar file is required")
    }

    //udload on cloudinary
    const avatar=await uploadOnCloudinary(avatarLocalPath);
    const coverImage= await uploadOnCloudinary(coverImageLocalPath);
    
    if(!avatar){
        throw new ApiError(400, "avatar file is requiredd")
    }

    //add user to db
    console.log({
        fullName,
        avatar: avatar,
        coverImage: coverImage || "",
        email,
        password,
        username: username.toLowerCase()
    });
    const user= await User.create({
        fullName,
        avatar: avatar,
        coverImage: coverImage|| "",
        email,
        password,
        username:username.toLowerCase()
    })

    //check if user is created in db
    const createdUser= await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser){
        throw new ApiError(500,"somthing went wrong while registering")
    }
    return res.status(201).json(
        new ApiResponse(200, createdUser,"user created successfully")
    )

})

export {registerUser}