const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const Protect = async (req, res, next) => {
    // let token
    // let authHeader = req.headers.Authorization || req.headers.authorization
    // if (authHeader && authHeader.startsWith("Bearer")){
    //     token= authHeader.split(" ")[1]
    // } 

    const token = req.header("Authorization")
    if (!token) {
        return res.status(401).json({ message: "Unauthorized HHTP,TOken not provide" })
    }

    // "Bearer<jwtToken,Removing the "Bearer
    const jwtToken = token.replace("Bearer", "").trim()
    //  console.log(jwtToken)
    try {
        //verifying the token
        const isVerified = jwt.verify(jwtToken, process.env.JWT_SECRET)

        const userData = await User.findOne({ email: isVerified.email }).select({ password: 0 })
        if (!userData) return res.status(401).json({ message: "User not found" });
        // console.log("userData")
        req.token = token
        req.user = userData
        console.log(req.user)
        req.userID = userData._id
        //Move on to the next middleware or route handler
        console.log("userData", userData)
        next()
        

    } catch (error) {
        return res.status(400).json({ message: "Unauthorized.Invalid..." })
    }
}

// const adminOnly = async (req, res, next) => {

//     if (req.user && req.user.role === "admin")
//     return next()
//     return res.status(403).json({ message: "Admin only" });

// }
module.exports =  Protect ;



