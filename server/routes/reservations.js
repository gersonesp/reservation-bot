var express = require("express");
var router = express.Router();

/* GET reservations listing. */
router.get("/", function(req, res, next) {
  res.json([
    { id: 1, name: "Dorotea Azra, party of 2 @ 8pm" },
    { id: 2, name: "Elsje Braňka, party of 5 @ 2pm" },
    { id: 3, name: "Joachim Apoorva, party of 3 @ 4pm" }
  ]);
});

module.exports = router;
