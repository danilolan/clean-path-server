import CustomerModel from "../models/customer";
import { Request, Response } from "express";
import { PathDto } from "../types/path";
import customersToPath from "../utils/customersToPath";

export default class pathController {
  static async getPath(req: Request, res: Response) {
    const customers = await CustomerModel.findAll();

    if (!customers) {
      res.status(404).json({ error: "Customers not found" });
    }

    //#TODO path algoritm logic
    const path = customersToPath(customers);

    res.status(200).json(path as PathDto);
  }
}
