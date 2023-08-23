const auth = require("../controller/seller");
// const { authJwt, authorizeRoles } = require("../middlewares");
var multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, "uploads"); }, filename: (req, file, cb) => { cb(null, Date.now() + path.extname(file.originalname)); },
});
const upload = multer({ storage: storage });
const express = require("express")
const router = express()
router.post("/registrationSeller", auth.registrationSeller);
router.post("/sellerloginPhone", auth.sellerloginPhone);
// router.post("/:id", auth.verifyOtp);
router.post("/resendOTPSeller/:id", auth.resendOTPSeller);
// router.get("/getProfile", [authJwt.verifyToken], auth.getProfile);
// router.put("/updateLocation", [authJwt.verifyToken], auth.updateLocation);
// router.put("/editProfile", [authJwt.verifyToken], auth.editProfile);
module.exports = router;