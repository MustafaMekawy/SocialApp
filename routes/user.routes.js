const router = require("express").Router()
const User = require('../app/controller/user.contoller')
const auth = require("../middelsware/auth.middelsware")

router.post("/register", User.register)
router.post("/login", User.login)
router.use(auth)
router.get("/",User.Allusers)
router.post("/activate/:id", User.activate)
router.post("/deactivate/:id",User.deactivate)
//add address
router.post("/addaddress",User.AddAddress)
//delete address
router.delete("/deleteaddress/:id",User.deleteAddres)

//show all addresses
router.get("/showalladdresess",User.showalladdresess)

//show single address
router.get("/showsingleaddress/:id",User.showsingleaddress)


module.exports = router