const express = require("express");
const router = express.Router();

const {
   isAuthenticatedUser,
   authorizeRole,
} = require("../app/middlewares/auth");

const OrderController = require("../app/controllers/OrderController");

router.get("/list", OrderController.getAllOrders);

router.post("/create", OrderController.createOrder);

router.put(
   "/update/:id",
   isAuthenticatedUser,
   authorizeRole("admin"),
   OrderController.updateOrder,
);

router.delete(
   "/delete/:id",
   isAuthenticatedUser,
   authorizeRole("admin"),
   OrderController.deleteOrder,
);

router.post("/payment/momo", OrderController.sendmomo);

router.get("/payment/momo/success", OrderController.momoSuccess);

router.post("/sendVNPost", OrderController.sendVNPay);

router.get("/sendVNPost/return", OrderController.sendVNPayReturn);

module.exports = router;