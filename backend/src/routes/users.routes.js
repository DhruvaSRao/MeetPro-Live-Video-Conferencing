import { Router } from "express";
import { 
    login, 
    register,
    getUserHistory,  // <-- Use the name from your controller file
    addToHistory     // <-- Use the name from your controller file
} from "../controllers/user.controller.js";

const router = Router();

router.route("/login").post(login);
router.route("/register").post(register);

// This links your route to your new function
router.route("/add_to_activity").post(addToHistory);

// I'm assuming this one is a GET request
router.route("/get_all_activity").get(getUserHistory);

export default router;