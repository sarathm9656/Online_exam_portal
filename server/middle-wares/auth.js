import jwt from "jsonwebtoken";
const {verify} = jwt;

export default async function auth (req,res,next) {
    try {
        let token = req.headers.authorization.split("")[1];
        let details = await verify (token,process.env.JWT_SECRET);
        if (details) {
            req.user= details;
            next();
            return;
        }
        return res.status(403).json({msg:"forbidden"});
    } catch (error) {
        console.log(error);
        return res.status(403).json({msg:"forbidden"});
        
        
    }    



}
