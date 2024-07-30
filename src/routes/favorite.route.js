import { addFavorite,RemovefromFavourite,GetallFavProperty } from "../controller/favorite.controller.js";
import { VerifyJWT } from "../middleware/auth.middleware.js";
import { Router } from "express";

const router = Router()

router.route("/:propertyId").post(VerifyJWT, addFavorite)
router.route("/").get(VerifyJWT,GetallFavProperty)
router.route("/F/:propertyId").delete(VerifyJWT,RemovefromFavourite)

export default router