import express, { json, urlencoded } from "express"
import './mongo.mjs'
import { findOne, insertMany } from './mongo.mjs';
import cors from "cors"
const app = express()
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cors())

app.get("/", cors(), (req,res) => {

})

app.post("/signin", async(req,res) => {
    const{email,password}  = req.body

        try{
            const check = await findOne({email:email, password:password})

            if(check){
                res.json("exists")
            }
            else{
                res.json("notexists")
            }
        }
        catch(e){
            res.json("notexists")
        }
})

app.post("/signup", async(req,res) => {
    const{email,password}  = req.body
    const data = {
        email:email,
        password:password
    }

        try{
            const check = await findOne({email:email})

            if(check){
                res.json("exists")
            }
            else{
                res.json("notexists")
                await insertMany([data])
            }
        }
        catch(e){
            res.json("notexists")
        }
})

app.listen(8000, () => {
    console.log("Server running")
})