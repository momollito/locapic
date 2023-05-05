//import Express
const express = require("express");
const router = express.Router();

//if API, import node fetch (not in this case)
const fetch = require("node-fetch");

//import model
const Place = require("../models/place");

//ROUTE POST CREATE NEW MARKER
router.post("/", async (req, res) => {
  const { nickname, name, latitude, longitude } = req.body;
  const resDoublon = await Place.findOne({ nickname: nickname, name: name });

  if (!resDoublon) {
    const newPLace = await Place.create({
      nickname: nickname,
      name: name,
      latitude: latitude,
      longitude: longitude,
    });
    return res.json({ result: true });
  } else {
    res.json({ result: false, message: "Ville de merde déjà créée" });
  }
});

//ROUTE GET ALL MARKER OF NICKNAME

router.get("/:nickname", async (req, res) => {
  const nickname = req.params.nickname;
  const resAllMarkers = await Place.find({ nickname: nickname });
  console.log(resAllMarkers);
  resAllMarkers.length
    ? res.json({ result: true, places: resAllMarkers })
    : res.json({
        result: false,
        message: `No places associated to ${nickname}`,
      });
});

//ROUTE DELETE MARKER OF NICKNAME
router.delete("/", async (req, res) => {
  const { nickname, name } = req.body;
  const deleteMarker = await Place.deleteOne({
    nickname: nickname,
    name: name,
  });
  deleteMarker.deletedCount > 0
    ? res.json({ result: true })
    : res.json({
        result: false,
      });
});

//export
module.exports = router;
