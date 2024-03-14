export type Customer = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  phone: string;
  positionx: number;
  positiony: number;
};

export type CustomerDTO = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  email: string;
  phone: string;
  position: {
    x: number;
    y: number;
  };
};

export type AllCustomersDTO = {
  total: number;
  page: number;
  limit: number;
  customers: CustomerDTO[];
};
