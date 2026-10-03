import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// short way is importing schema also instead of this (new mongoose.Schema({})) then write
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            // isse db k searching mei aa jata h
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,  //cloudinary url -> its like aws service which provide url of video or image by keeping it 
            required: true,
        },
        coverImage: {
            type: String, //cloudinary url
        },
        watchHistory: [
            {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {
        type: String,
        // in all true fields u can give message
        required: [true, "Password is required"]
    },
    refreshToken: {
        type: String
    }
    },
    {
        timestamps: true
    }
)

// for password encryption only to run when there is change in password or 1st time saving pasword
// i.e. agar modified nhi hua to direct next otherwiise encrypt kro then next
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)
    next()
})

// methods to check password by user ab db mei to encrypted h which is different from user's typed password
userSchema.methods.isPasswordCorrect = async function(password){
    // this return t or false jaise pre k pass access tha password ka iske pass bhi hota h
    return await bcrypt.compare(password, this.password)
}


// injecting 2 more methods in our methods
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            // this walla db se aa rha h
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function()
{
    // same code is there for refresh token as that of access token
     return jwt.sign(
        {
            // this walla db se aa rha h but info is less
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)