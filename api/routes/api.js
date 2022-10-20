var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  res.send({
    sales: [
      {
        _id: {
          $oid: "6351b2495c51f679c2a372aa",
        },
        item: "abc",
        price: 10,
        quantity: 2,
        date: {
          $date: "2014-03-01T08:00:00Z",
        },
      },
    ],
  });
});

module.exports = router;
