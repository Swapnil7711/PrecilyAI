import express from "express"
import dataController from "../controllers/dataController.js";
const router = express.Router()

router.get("/getdata", dataController.getData)

router.post("/postdata", dataController.postData)

router.put("/updatedata", dataController.updateData)

export default router;