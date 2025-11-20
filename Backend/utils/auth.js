const jwt=require("jsonwebtoken");
const SECRET="MUSIC_APP_SECRET";
exports.login=(req,res)=>{
 const{username,password}=req.body;
 if(username!=="music"||password!=="1234")
   return res.status(401).json({message:"Invalid login"});
 const token=jwt.sign({username},SECRET,{expiresIn:"1d"});
 res.json({success:true,token});
};
