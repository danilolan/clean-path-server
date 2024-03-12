import { Customer } from "../types/customer";
import { PathDto } from "../types/path";

export default function customersToPath(customers: Customer[]): PathDto {
  return customers.map((customer) => ({
    name: customer.name,
    position: {
      x: customer.positionx,
      y: customer.positiony,
    },
  }));
}
