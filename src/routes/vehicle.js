const express = require("express");
const router = express.Router();

const {
   isAuthenticatedUser,
   authorizeRole,
} = require("../app/middlewares/auth");

const VehicleController = require("../app/controllers/VehicleController");

router.get("/list", VehicleController.findAllVehicle);

router.get("/reviews", VehicleController.getAllReviews);

router.put(
   "/review",
   isAuthenticatedUser,
   VehicleController.createVehicleReview,
);

router.get(
   "/reviews",
   isAuthenticatedUser,
   authorizeRole("admin"),
   VehicleController.getAllReviews,
);

router.get(
   "/review/search",
   isAuthenticatedUser,
   authorizeRole("admin"),
   VehicleController.getReviewByNameVehilce,
);

router.put(
   "/update/:id",
   isAuthenticatedUser,
   authorizeRole("admin"),
   VehicleController.updateVehilce,
);

router.delete(
   "/delete/:id",
   isAuthenticatedUser,
   authorizeRole("admin"),
   VehicleController.deleteVehicle,
);

router.post(
   "/create",
   isAuthenticatedUser,
   authorizeRole("admin"),
   VehicleController.createVehicle,
);

module.exports = router;
