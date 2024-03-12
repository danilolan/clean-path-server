import { Customer, CustomerDTO } from "../types/customer";

export default function remapCustomers(customers: Customer[]): CustomerDTO[] {
  return customers.map((customer) => remapCustomer(customer));
}

export function remapCustomer(customer: Customer): CustomerDTO {
  const { id, createdAt, updatedAt, name, email, positionx, positiony } =
    customer;

  return {
    id,
    createdAt,
    updatedAt,
    name,
    email,
    position: {
      x: positionx,
      y: positiony,
    },
  };
}
