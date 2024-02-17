import express from "express";
import { check_user_is_provider } from "../controller/user_providerController.js";

const route = express.Router();

route.post("/check", check_user_is_provider);

export default route;
