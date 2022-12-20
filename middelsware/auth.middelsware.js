const jwt =require("jsonwebtoken")
const userModel = require("../db/models/user.model")
const myHelper = require("../app/helper")


const auth=async (req,res,next)=>{
    try{
        const token=req.header("Authorization").replace("Bearer ","")
        const decote= jwt.verify(token,"mustafa")
        const userData= await userModel.findOne({
            _id:decote._id,
            "tokens.token":token
        })
        req.user=userData
        req.token=token
        next()
    }
    catch(e){
        myHelper.resHandler(res, 500, false, e, "unazurized")
    }


}
module.exports=auth
