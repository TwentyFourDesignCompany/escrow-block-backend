
const express = require('express');
const User = require("../models/UserModel");
const Transaction = require("../models/TransactionModel");
const jwt = require("jsonwebtoken");

const router = express.Router();

const isAuthenticated = (req, res, next) => {
  if (req.headers["authorization"]){
    let token = req.headers["authorization"];

    jwt.verify(token, process.env.TOKEN_KEY || "wole-escrow-block", function(err, decoded){
      if (err){
        return res.status("404").json({
          error: "Invalid Authorization token"
        })
      } else {
        User.findOne({email: decoded.email}).then(usr => {
          req.profile = usr;
          next();
        })
      }
    });
  } else {
    return res.status("400").json({
      error: "You have to be logged in to perform this operation"
    })
  }
}

const isAdmin = (req, res, next) => {
  if (req.profile.role === "admin"){
    next();
  } else {
    return res.status("404").json({
      error: "Not authorized to make this request"
    })
  }
}

router.get("/allTransactions", isAuthenticated, isAdmin, function(req, res){
  Transaction.find({}).select("date _id walletAddress paymentAmount status transactionType").sort("-date").then(rs => {
    res.json(rs);
  })
})

router.post("/buyBitcoin", isAuthenticated, async function(req, res){
  let body = req.body;

  console.log(body);

  try{
    let transaction = new Transaction(body);
    transaction.owner = req.profile;
    transaction.status = "pending";
    transaction.transactionType = "buying";

    await transaction.save(async (err, t) => {
      if (err){
        console.log("here");
        return res.status("400").json({
          errors: err
        })
      }else{
        let currentUser = req.profile;
        currentUser.transactions.push(t);
        await currentUser.save();
        res.json({success: "successfully created transaction"})
      }
    })
  } catch(err){
    return res.status("400").json({
      error: err.message
    })
  }
})

router.post("/sellBitcoin", isAuthenticated, async function(req, res){
  let body = req.body;

  try{
    let transaction = new Transaction(body);
    transaction.owner = req.profile;
    transaction.status = "pending";
    transaction.transactionType = "selling";

    await transaction.save(async (err, t) => {
      if (err){
        return res.status("400").json({
          errors: err
        })
      }else{
        let currentUser = req.profile;
        currentUser.transactions.push(t);
        await currentUser.save();
        res.json({success: "successfully created transaction"})
      }
    })
  } catch(err){
    return res.status("400").json({
      error: err.message
    })
  }
})

router.get("/userTransactions", isAuthenticated, function(req, res){
  Transaction.find({owner: req.profile._id}).then(rs => {
    res.json(rs);
  }).catch(err => {
    return res.status("400").json({
      error: err.message
    })
  })
})

router.post("/setStatus", isAuthenticated, isAdmin, (req, res) => {
  let {status, id} = req.body;

  Transaction.findById(id).then(transaction => {
    transaction.status = status;
    transaction.save((err, tr) => {
      if (err){
        return res.status("400").json({
          error: err.message
        })
      } else {
        res.json({success: "successfully updated transaction status", status: tr.status})
      }
    })
  })
})

module.exports = router;
