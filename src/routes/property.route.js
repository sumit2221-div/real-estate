// routes/property.route.js
import { Router } from "express";
import { addProperty, GetPropertyById, DeleteProperty, GetAllProperties } from "../controller/property.controller.js";
import { VerifyJWT } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.js";

const router = Router();

router.route("/").post(VerifyJWT, upload.array("photos"), addProperty).get(VerifyJWT, GetAllProperties);
router.route("/P/:propertyId").delete(VerifyJWT, DeleteProperty);
router.route("/propertyId").get(VerifyJWT, GetPropertyById);


export default router;
