import CustomerModel from "../models/customer";
import { Request, Response } from "express";
import { PathDto } from "../types/path";
import { customersToPath, calculatePath } from "../utils/path";

export default class pathController {
  static async getPath(req: Request, res: Response) {
    const customers = await CustomerModel.findAll({
      limit: "100",
    });

    if (!customers) {
      res.status(404).json({ error: "Customers not found" });
    }

    //#TODO path algoritm logic
    const unorderedPath = customersToPath(customers);
    const orderedPath = calculatePath(unorderedPath);

    res.status(200).json(orderedPath as PathDto);
  }
}
