// const { validateUser } = require("../middlewares");
const auth = require("../controller/user");
// const { authJwt, authorizeRoles } = require("../middlewares");
var multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
    destination: (req, file, cb) => { cb(null, "uploads"); }, filename: (req, file, cb) => { cb(null, Date.now() + path.extname(file.originalname)); },
});
const upload = multer({ storage: storage });
const express = require("express");
const router = express()
router.post("/registration", auth.registration);
// router.post("/loginWithPhone", auth.loginWithPhone);
// router.post("/:id", auth.verifyOtp);
// router.post("/resendOtp/:id", auth.resendOTP);
// router.get("/getProfile", [authJwt.verifyToken], auth.getProfile);
// router.put("/updateLocation", [authJwt.verifyToken], auth.updateLocation);
// router.put("/editProfile", [authJwt.verifyToken], auth.editProfile);
module.exports = router;