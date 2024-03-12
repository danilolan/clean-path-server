export type Customer = {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  email: string;
  positionx: number;
  positiony: number;
};

export type CustomerDTO = {
  id?: string;
  createdAt?: string;
  updatedAt?: string;
  name: string;
  email: string;
  position: {
    x: number;
    y: number;
  };
};
