import User from "../models/user.models.js";
import bcrypt from "bcryptjs"
import createTokenAndSaveCookie from "../jwt/generateToken.js";
// signup function
export const signUp = async (req, res) => {
    const { fullName, password, email, confirmPassword } = req.body
    try {

        if (!fullName || !password || !email || !confirmPassword) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password != confirmPassword) {
            return res.status(400).json({ message: "Password is not same " });
        }
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await new User({
            fullName,
            email,
            password: hashPassword,

        });

        await newUser.save();
        if (newUser) {
            createTokenAndSaveCookie(newUser._id, res);
            res.status(201).json({
                message: "User created successfully", user: {
                    _id: newUser._id,
                    email: newUser.email,
                    fullName: newUser.fullName
                }
            });
        }

    } catch (error) {
        console.log("Error occurs while creating user ", error);
        res.status(501).json({ message: "Something went wrong" })

    }
}
// login function
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        // Check if user exists first
        if (!user) {
            return res.status(400).json({ message: "Invalid user credentials" });
        }

        // Then check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid user credentials" });
        }
        createTokenAndSaveCookie(user._id, res);
        res.status(200).json({
            message: "User logged in successfully",
            user: {
                _id: user._id,
                email: user.email,
                fullName: user.fullName
            }
        })
    } catch (error) {
        console.log("Error occur while logging the user ", error);
        res.status(501).json({ message: "Something went wrong" });
    }
}

// logout function
export const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        res.status(201).json({ message: "User logged out successfully" });


    } catch (error) {
        console.log("Error occur while logging out the user ", error);
        res.status(501).json({ message: "Something went wrong" });
    }
}

// get all users from db
export const allUsers =async (req,res)=>{
try {
    const loggedInUser = req.user._id
    // ne means not equal
    const filteredUsers =await User.find({_id: {$ne: loggedInUser}}).select("-password")
    res.status(201).json(filteredUsers)
} catch (error) {
    console.log("Error in getting allUsers from db:"+ error);
    
}
}