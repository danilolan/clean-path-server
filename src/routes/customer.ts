import express from "express";
import customerController from "../controllers/customer";

const customerRouter = express.Router();

customerRouter.get("/customers", customerController.getAllCustomers);
customerRouter.get("/customers/:id", customerController.getCustomer);
customerRouter.post("/customers", customerController.createCustomer);
customerRouter.put("/customers/:id", customerController.updateCustomer);
customerRouter.delete("/customers/:id", customerController.deleteCustomer);

export default customerRouter;
