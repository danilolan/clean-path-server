import CustomerModel from "../models/customer";
import { Request, Response } from "express";
import { CustomerDTO } from "../types/customer";

export default class customerController {
  static async getAllCustomers(req: Request, res: Response) {
    try {
      const allCustomers = await CustomerModel.findAll();
      res.status(200).json(allCustomers);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server internal error" });
    }
  }

  static async getCustomer(req: Request, res: Response) {
    try {
      const customer = await CustomerModel.findOne(req.params.id);
      if (!customer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.status(200).json(customer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server internal error" });
    }
  }

  static async createCustomer(req: Request, res: Response) {
    try {
      const requestCostumer: CustomerDTO = req.body;
      const newCustomer = await CustomerModel.create(requestCostumer);
      res.status(200).json(newCustomer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server internal error" });
    }
  }

  static async updateCustomer(req: Request, res: Response) {
    try {
      const updatedCustomer = await CustomerModel.update(
        req.params.id,
        req.body
      );
      if (!updatedCustomer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.status(200).json(updatedCustomer);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server internal error" });
    }
  }

  static async deleteCustomer(req: Request, res: Response) {
    try {
      const deletedCustomer = await CustomerModel.delete(req.params.id);
      if (!deletedCustomer) {
        return res.status(404).json({ error: "Customer not found" });
      }
      res.status(204).send("Customer deleted");
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server internal error" });
    }
  }
}
