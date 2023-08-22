const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const authConfig = require("../configs/auth.config");
var newOTP = require("otp-generators");
const User = require("../model/user");


exports.registration = async (req, res) => {
  try {
    var { name,phone,email,password,lati,longi } = req.body;

    
    const saltRounds = 10; 

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    var user = await User.findOne({ phone: phone, userType: "user" });
    
    if (!user) {
      req.body.otp = newOTP.generate(4, {
        alphabets: false,
        upperCase: false,
        specialChar: false,
      });
      req.body.otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
      req.body.accountVerification = false;
      req.body.userType = "USER"

      const userCreate = await User.create({
        name,
        phone,
        email,
        password: hashedPassword,
        lati,
        longi,
        otp,
        otpExpiration,
        accountVerification,
        userType
        });


      let obj = {
        name: userCreate.name,
        phone: userCreate.phone,
        email:userCreate.email,
        otp: userCreate.otp,
        password: userCreate.password,
        lati: userCreate.lati,
        longi: userCreate.longi,
        userType: userCreate.userType,
      };

      res.status(200).send({
        status: 200,
        message: "data processed and will be verfied by admin",
        data: obj
      });
    } else {
      return res.status(409).send({ status: 409, msg: "Already Exit" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// exports.loginWithPhone = async (req, res) => {
//   try {
//     const { phone } = req.body;
//     const user = await User.findOne({ phone: phone, userType: "USER" });
//     if (!user) {
//       return res.status(400).send({ msg: "not found" });
//     }
//     const userObj = {};
//     userObj.otp = newOTP.generate(4, {
//       alphabets: false,
//       upperCase: false,
//       specialChar: false,
//     });
//     userObj.otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
//     userObj.accountVerification = false;
//     const updated = await User.findOneAndUpdate(
//       { phone: phone, userType: "USER" },
//       userObj,
//       { new: true }
//     );
//     let obj = {
//       id: updated._id,
//       otp: updated.otp,
//       phone: updated.phone,
//     };
//     res
//       .status(200)
//       .send({ status: 200, message: "logged in successfully", data: obj });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// exports.verifyOtp = async (req, res) => {
//   try {
//     const { otp } = req.body;
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).send({ message: "user not found" });
//     }
//     if (user.otp !== otp || user.otpExpiration < Date.now()) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }
//     const updated = await User.findByIdAndUpdate(
//       { _id: user._id },
//       { accountVerification: true },
//       { new: true }
//     );
//     const accessToken = jwt.sign({ id: user._id }, authConfig.secret, {
//       expiresIn: authConfig.accessTokenTime,
//     });
//     let obj = {
//       id: updated._id,
//       otp: updated.otp,
//       phone: updated.phone,
//       accessToken: accessToken,
//     };
//     res
//       .status(200)
//       .send({ status: 200, message: "logged in successfully", data: obj });
//   } catch (err) {
//     console.log(err.message);
//     res.status(500).send({ error: "internal server error" + err.message });
//   }
// };

// exports.getProfile = async (req, res) => {
//   try {
//     const data = await User.findOne({ _id: req.user._id });
//     if (data) {
//       return res
//         .status(200)
//         .json({ status: 200, message: "get Profile", data: data });
//     } else {
//       return res
//         .status(404)
//         .json({ status: 404, message: "No data found", data: {} });
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(501).send({ status: 501, message: "server error.", data: {} });
//   }
// };

// exports.resendOTP = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const user = await User.findOne({ _id: id, userType: "USER" });
//     if (!user) {
//       return res.status(404).send({ status: 404, message: "User not found" });
//     }
//     const otp = newOTP.generate(4, {
//       alphabets: false,
//       upperCase: false,
//       specialChar: false,
//     });
//     const otpExpiration = new Date(Date.now() + 5 * 60 * 1000);
//     const accountVerification = false;
//     const updated = await User.findOneAndUpdate(
//       { _id: user._id },
//       { otp, otpExpiration, accountVerification },
//       { new: true }
//     );
//     let obj = {
//       id: updated._id,
//       otp: updated.otp,
//       phone: updated.phone,
//     };
//     res.status(200).send({ status: 200, message: "OTP resent", data: obj });
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .send({ status: 500, message: "Server error" + error.message });
//   }
// };

// exports.updateLocation = async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.user.id });
//     if (!user) {
//       return res.status(404).send({ status: 404, message: "User not found" });
//     } else {
//       if (req.body.currentLat || req.body.currentLong) {
//         coordinates = [
//           parseFloat(req.body.currentLat),
//           parseFloat(req.body.currentLong),
//         ];
//         req.body.currentLocation = { type: "Point", coordinates };
//       }
//       let update = await User.findByIdAndUpdate(
//         { _id: user._id },
//         {
//           $set: {
//             currentLocation: req.body.currentLocation,
//             city: req.body.city,
//           },
//         },
//         { new: true }
//       );
//       if (update) {
//         res.status(200).send({
//           status: 200,
//           message: "Location update successfully.",
//           data: update,
//         });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .send({ status: 500, message: "Server error" + error.message });
//   }
// };

// exports.editProfile = async (req, res) => {
//   try {
//     const findUser = await User.findById({ _id: req.user._id });
//     if (findUser) {
//       const data = {
//         fullName: req.body.fullName || findUser.fullName,
//         email: req.body.email || findUser.email,
//         phone: req.body.phone || findUser.phone,
//         address: req.body.address || findUser.address,
//       };
//       const user = await User.findByIdAndUpdate({ _id: req.user._id }, data, {
//         new: true,
//       });
//       return res
//         .status(200)
//         .json({ msg: "profile details updated", user: user });
//     } else {
//       return res.status(404).json({ msg: "user not found", user: {} });
//     }
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .send({ status: 500, message: "Server error" + error.message });
//   }
// };
