const express=require("express");
const cors=require("cors");
const songRoutes=require("./routes/songRoutes");
const app=express();
app.use(cors());
app.use(express.json());
app.use("/api/songs", songRoutes);
app.listen(3000,()=>console.log("Running on 3000"));
