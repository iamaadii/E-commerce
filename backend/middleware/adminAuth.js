import jwt from "jsonwebtoken"

export const adminAuth = async(req,res,next)=>{
    try{
        const token = req.headers?.token;
        if(!token){
            return res.json({success:false,message:"Not authorized"})
        } 

        const decode_token = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decode_token);

        if(decode_token?.email!==process.env.ADMIN_EMAIL || decode_token?.password!==process.env.ADMIN_PASSWORD){
            return res.json({success:false,message:"Not authorized"})
        }
        next()
    }
    catch(error){
        console.log(error);
        return res.json({success:false,message:"Error while verifying admin token"})
    }
}