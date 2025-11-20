const express=require("express");
const router=express.Router();
const {getSongs,getSongById,downloadSong,getThumbnail}=require("../controllers/songController");
const {login}=require("../utils/auth");

router.post("/login",login);
router.get("/download/:id",downloadSong);
router.get("/thumbnail/:img",getThumbnail);
router.get("/:id",getSongById);
router.get("/",getSongs);



module.exports=router;
