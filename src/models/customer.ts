import pool from "../db/config";
import { CustomerDTO, Customer } from "../types/customer";

export default class CustomerModel {
  static async findAll(
    sort: string = "id",
    order: string = "ASC",
    filter: Partial<CustomerDTO> = {}
  ) {
    const validSortColumns = ["id", "name", "email", "positionX", "positionY"];
    const sortColumn = validSortColumns.includes(sort) ? sort : "id";

    const sortOrder = ["ASC", "DESC"].includes(order.toUpperCase())
      ? order.toUpperCase()
      : "ASC";

    let whereClauses = [];
    let queryParams = [];
    let queryParamIndex = 1;

    const remapFilter = {
      name: filter.name,
      email: filter.email,
      positionx: filter.position?.x,
      positiony: filter.position?.y,
    };

    for (const [key, value] of Object.entries(remapFilter)) {
      if (value !== null && value !== undefined) {
        whereClauses.push(`${key} = $${queryParamIndex}`);
        queryParams.push(value);
        queryParamIndex++;
      }
    }

    let whereClause =
      whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

    const query = `
      SELECT * FROM customer
      ${whereClause}
      ORDER BY "${sortColumn}" ${sortOrder}
    `;

    const allCustomers = await pool.query(query, queryParams);

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
      "INSERT INTO customer(name, email, positionx, positiony) VALUES($1, $2, $3, $4) RETURNING *",
      [name, email, position.x, position.y]
    );
    return newCustomer.rows[0];
  }

  static async update(id: string, data: CustomerDTO) {
    const { name, email, position } = data;
    const updatedCustomer = await pool.query<Customer>(
      "UPDATE customer SET name = $2, email = $3, positionx = $4, positiony = $5 WHERE id = $1 RETURNING *",
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
