const userModel = require("../../db/models/user.model")
const myHelper = require("../../app/helper")
const { find, findById } = require("../../db/models/user.model")
//Allusers
class User{
    static register = async(req,res) => {
        try{
            if(req.body.password.length<6) throw new Error("password must be more than 6")
            const userData = new userModel(req.body)
            await userData.save()
            console.log(userData)
            const token =await userData.generateToken()
            myHelper.resHandler(res, 200, true, {userData,token}, "user added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static login = async(req,res) => {
        try{

            const userData = await userModel.loginUser(req.body.email, req.body.password)
            const token =await userData.generateToken()
            myHelper.resHandler(res, 200, true, {userData,token}, "user login successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }

    static Allusers = async(req,res) => {
        try{
            const users = await userModel.find()
            myHelper.resHandler(res, 200, true, users, "user fined successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static activate = async(req,res) => {
        try{
            // req.user.status=true
            const user = await userModel.findById(req.params.id)
            if(user.status==false) user.status=true
            myHelper.resHandler(res, 200, true, user, "user activate successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static deactivate = async(req,res) => {
        try{
            // req.user.status=false
            const user = await userModel.findById(req.params.id)
            if(user.status==true) user.status=false
            myHelper.resHandler(res, 200, true, user, "user deactivte successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static AddAddress = async(req,res) => {
        try{
           // const address={"addressType","details"}
            req.user.addresses.push(req.body.addresses)
            await req.user.save()
            myHelper.resHandler(res, 200, true, req.user, "address added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static deleteAddres = async(req,res) => {
        try{
            req.user.addresses.forEach(addres => {
                if(addres._id==req.params.id) req.user.addresses.pull(addres)
            })
            
            await req.user.save()
            // delete req.user.addresses[addres]
            //  req.user.addresses.delete(addres)
            myHelper.resHandler(res, 200, true, req.user, "address added successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static showalladdresess = async(req,res) => {
        try{
            myHelper.resHandler(res, 200, true, req.user.addresses, "addresss showed successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }
    static showsingleaddress = async(req,res) => {
        try{
            const addres= req.user.addresses.filter(addres => {
                if(addres._id==req.params.id) return addres
            })
            
        
            myHelper.resHandler(res, 200, true, addres, "show single addedrss successfully")
        }
        catch(e){
            myHelper.resHandler(res, 500, false, e, e.message)
        }
    }


    
}
module.exports = User