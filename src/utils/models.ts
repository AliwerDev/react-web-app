import { materialTypes, units } from "./constants";

export type User = {
  id?: string;
  firstName: string;
  lastName?: string;
  phoneNumber: string;
  role: string;
};

export type Provider = {
  id?: string;
  firstName: string;
  lastName?: string;
  phoneNumber: string;
};

export type Client = {
  id?: string;
  firstName: string;
  lastName?: string;
  phoneNumber: string;
};

export type Material = {
  id?: string;
  name: string;
  unitOfMeasurement: (typeof units)[number];
  type: (typeof materialTypes)[number];
  typeOfMaterial?: (typeof materialTypes)[number];
};

export type Product = {
  productId?: string;
  name: string;
  unitOfMeasurement: (typeof units)[number];
  minimumPrice: string;
  sewingPrice: string;
  materialId?: string;
  maxAmount?: number;
  material?: Material;
};
