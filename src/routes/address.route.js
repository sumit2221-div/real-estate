import express from "express";
import { getAddressById } from "../controller/address.controller.js";

const router = express.Router();

router.get("/:id", getAddressById);

export default router;
 