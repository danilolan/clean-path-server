import CustomerModel from "../models/customer";
import { Request, Response } from "express";
import { AllCustomersDTO, CustomerDTO } from "../types/customer";
import remapCustomers, { remapCustomer } from "../utils/customers";

export default class customerController {
  static async getAllCustomers(req: Request, res: Response) {
    try {
      const sort = req.query.sort as keyof CustomerDTO | undefined;
      const order = req.query.order as string | undefined;
      const filter = req.body as CustomerDTO;
      const page = req.query.page as string | undefined;
      const limit = req.query.limit as string | undefined;

      const allCustomers = await CustomerModel.findAll({
        sort,
        order,
        filter,
        page,
        limit,
      });

      const allCustomersDto: AllCustomersDTO = {
        customers: remapCustomers(allCustomers),
        limit: parseInt(limit || "5"),
        page: parseInt(page || "0"),
        total: await CustomerModel.countAll(),
      };

      res.status(200).json(allCustomersDto as AllCustomersDTO);
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

      const remapedCustomer = remapCustomer(customer);

      res.status(200).json(remapedCustomer as CustomerDTO);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Server internal error" });
    }
  }

  static async createCustomer(req: Request, res: Response) {
    try {
      const requestCostumer: CustomerDTO = req.body;
      const newCustomer = await CustomerModel.create(requestCostumer);

      const remapedCustomer = remapCustomer(newCustomer);

      res.status(200).json(remapedCustomer as CustomerDTO);
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

      const remapedCustomer = remapCustomer(updatedCustomer);

      res.status(200).json(remapedCustomer as CustomerDTO);
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
