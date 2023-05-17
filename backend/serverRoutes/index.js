const express = require("express")
const router = express.Router();


const userRouter = require("./userModel.js")



router.get("/", (req, res) => {
  res.send("This api is reserved for premierx4free");
});

router.use("/user",userRouter)

// router.use("/questions", questionRouter);
// router.use("/answers", answerRouter);
// router.use("/register",registerRouter);
// router.use("/login",loginRouter)
// router.use("/comments",commentRouter)
// router.use("/coin",coinRouter)
// router.use("/images",imageRouter)
// router.use("/notifications",notificationRouter)
// router.use("/user",userRouter)

module.exports=router
