const express = require("express");
const router = express.Router();

//C
router.post("/", (req, res) => {
  res.json({ message: req.body.message });
});

//R
router.get("/", (req, res) => {
  res.json({ message: "Voici les données" });
});

//U
router.put("/:id", (req, res) => {
  res.json({ messageId: req.params.id });
});

//D
router.delete("/:id", (req, res) => {
  res.json({ message: "Supprimé : " + req.params.id });
});

module.exports = router;
