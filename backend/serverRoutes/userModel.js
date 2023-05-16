const express = require("express");
const router = express.Router();

const userDB = require('../schema/userSchema')


router.post("/signin", async(req,res) => {
    const{email,password}  = req.body

        try{
            // const check = await userDB.findOne({email:email, password:password})

            // if(check){
            //     res.json("exists")
            // }
            // else{
            //     res.json("notexists")
            // }
            res.send({
                msg:"sign in route hit"
            })
        }
        catch(e){
            res.json("notexists")
        }
})

router.post("/signup", async(req,res) => {
    const{email,password}  = req.body
    const data = {
        email:email,
        password:password
    }

        try{
            // const check = await findOne({email:email})

            // if(check){
            //     res.json("exists")
            // }
            // else{
            //     res.json("notexists")
            //     await insertMany([data])
            // }
            res.send({
                msg:"signUp route hit"
            })
        }
        catch(e){
            res.json("notexists")
        }
})

module.exports=router