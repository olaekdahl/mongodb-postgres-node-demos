var express = require("express");
const { json } = require("express/lib/response");
var router = express.Router();
var mongodao = require("../../mongodb-dao");
var postgresdao = require("../../postgres-dao");

// test with static data
router.get("/v1", function (req, res, next) {
  res.send({
    sales: [
      {
        _id: "6351b2495c51f679c2a372aa",
        item: "abc",
        price: 10,
        quantity: 2,
        date: {
          $date: "2014-03-01T08:00:00Z",
        },
      },{
        _id: "6351b2495c51f679c2a372ab",
        item: "def",
        price: 10,
        quantity: 2,
        date: {
          $date: "2014-03-01T08:00:00Z",
        },
      },{
        _id: "6351b2495c51f679c2a372ac",
        item: "ghi",
        price: 10,
        quantity: 2,
        date: {
          $date: "2014-03-01T08:00:00Z",
        },
      }
    ],
  });
});


// use mongodb dao
router.get("/v2", function (req, res, next) {
  mongodao.getAllSales((data) => {
    res.send({ "sales": data });
  });
});


router.get("/v3", function (req, res, next) {
  postgresdao.getAllSales((data) => {
    res.send({ "sales": data });
  });
});

module.exports = router;
