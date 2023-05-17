const express = require("express");
const router = express.Router();

const userDB = require('../schema/userSchema')


router.post("/signin", async(req,res) => {
    const{email,password}  = req.body

        try{
            const check = await userDB.findOne({email:email, password:password})
            .then((result) => {
                console.log("result",result)
                if(result)
                {
                    res.send({
                        status:true,
                        result
                    })
                }
                else{
                    res.send({
                        status:false,
                        msg:"Invalid email ID or password"
                    })
                }
            })
            
            // res.send({
            //     msg:"sign in route hit"
            // })
        }
        catch(e){
            console.log(e)
            res.json("notexists")
        }
})

router.post("/signup", async(req,res) => {
    const{email,password,fullname,phonenumber,address,city,state,zipcode,referredBy,referralLink}  = req.body
    const data = {
        email:email,
        password:password,
        fullname,
        phonenumber,
        address,
        city,
        state,
        zipcode,
        referredBy,
        referralLink
    }

        try{
            const check = await userDB.findOne({email:email})

            if(check){
                res.send({
                    status:false,
                    msg:"email Id already exists"
                })
            }
            else{
                await userDB.create(data)
                .then((result) => {
                    res.send({
                        status:true,
                        result
                    })
                })
                .catch((e) => {
                    res.send({
                        status:false,
                        msg:`error occoured ${e}`
                    })
                })
            }

            // res.send({
            //     msg:"signUp route hit"
            // })
        }
        catch(e){
            res.json("notexists")
        }
})

module.exports=router