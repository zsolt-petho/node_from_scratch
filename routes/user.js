const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    res.status(200).send("user data");
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;
