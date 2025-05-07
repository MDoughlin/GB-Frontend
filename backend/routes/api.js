const express = require("express");
const router = express.Router();

router.post("/vendor", (req, res) => {
  const {
    businessName,
    phoneNumber,
    businessHours,
    socialMedia,
    location,
    payment,
    ordering,
    cuisine,
  } = req.body;
});

module.exports = router;
