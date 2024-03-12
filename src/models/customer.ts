import pool from "../db/config";
import { CustomerDTO, Customer } from "../types/customer";

export default class CustomerModel {
  static async findAll() {
    const allCustomers = await pool.query<Customer>("SELECT * FROM customer");
    return allCustomers.rows;
  }

  static async findOne(id: string) {
    const customer = await pool.query<Customer>(
      "SELECT * FROM customer WHERE id = $1",
      [id]
    );
    return customer.rows[0];
  }

  static async create(data: CustomerDTO) {
    const { name, email, position } = data;
    const newCustomer = await pool.query<Customer>(
      "INSERT INTO customer(name, email, positionX, positionY) VALUES($1, $2, $3, $4) RETURNING *",
      [name, email, position.x, position.y]
    );
    return newCustomer.rows[0];
  }

  static async update(id: string, data: CustomerDTO) {
    const { name, email, position } = data;
    const updatedCustomer = await pool.query<Customer>(
      "UPDATE customer SET name = $2, email = $3, positionX = $4, positionY = $5 WHERE id = $1 RETURNING *",
      [id, name, email, position.x, position.y]
    );
    return updatedCustomer.rows[0];
  }

  static async delete(id: string) {
    const deletedCustomer = await pool.query<Customer>(
      "DELETE FROM customer WHERE id = $1 RETURNING *",
      [id]
    );
    return deletedCustomer.rows[0];
  }
}
