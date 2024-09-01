import { RegisterUser, loginUser,logoutUser,changeAvatar,changePassword,getUserDetails } from "../controller/user.controller.js";
import {VerifyJWT} from "../middleware/auth.middleware.js"
import { Router } from "express";
import {upload} from "../middleware/multer.js"



const router = Router()

router.route("/register").post(upload.single("avatar"),RegisterUser)
router.route("/login").post(loginUser)
router.route("/logout").post(VerifyJWT,logoutUser)
router.route("/change-avatar").patch(VerifyJWT , upload.single("avatar"), changeAvatar)
router.route("change-password").post(VerifyJWT, changePassword)
router.route("/user-Details/").get(VerifyJWT, getUserDetails)


export default router
