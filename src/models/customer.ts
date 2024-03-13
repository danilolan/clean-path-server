import pool from "../db/config";
import { CustomerDTO, Customer } from "../types/customer";

interface FindAllParams {
  sort?: keyof CustomerDTO;
  order?: string;
  filter?: Partial<CustomerDTO>;
  page?: string;
  limit?: string;
}

export default class CustomerModel {
  static async findAll({
    sort = "id",
    order = "ASC",
    filter = {},
    page = "1",
    limit = "5",
  }: FindAllParams = {}) {
    const validSortColumns = ["id", "name", "email", "positionX", "positionY"];
    const sortColumn = validSortColumns.includes(sort) ? sort : "id";
    const sortOrder = ["ASC", "DESC"].includes(order.toUpperCase())
      ? order.toUpperCase()
      : "ASC";

    const pageNum = parseInt(page, 10) > 0 ? parseInt(page || "", 10) : 1;
    const limitNum =
      parseInt(limit || "", 10) > 0 ? parseInt(limit || "", 10) : 5;
    const offset = (pageNum - 1) * limitNum;

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
      LIMIT $${queryParamIndex++} OFFSET $${queryParamIndex}
    `;

    queryParams.push(limitNum, offset);

    console.log(query);

    const allCustomers = await pool.query<Customer>(query, queryParams);

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

  static async countAll() {
    const query = "SELECT COUNT(*) AS total FROM customer";
    const result = await pool.query(query);
    const totalCount = result.rows[0].total;
    return parseInt(totalCount, 10);
  }
}
