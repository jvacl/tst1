const express = require("express");
const Bumbani = require("../models/Bumbani");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("\n\nHello, world. This is root of API \n\n");
});

// TODO vytknout /bumbani router do vlastniho filu. asi něco jako router.use("/bumbani", novyRouter)
router.get("/bumbani", (req, res) => {
  const bumbani = Bumbani.getList();
  res.json(bumbani);
});

router.get("/bumbani/:id", (req, res) => {
  const id = req.params.id;

  const bumbani = Bumbani.getById(id);
  res.json(bumbani);
});

module.exports = router;
