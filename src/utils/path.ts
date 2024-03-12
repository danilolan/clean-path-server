import { Customer } from "../types/customer";
import { PathDto, Position } from "../types/path";

export function customersToPath(customers: Customer[]): PathDto {
  return customers.map((customer) => ({
    name: customer.name,
    position: {
      x: customer.positionx,
      y: customer.positiony,
    },
  }));
}
