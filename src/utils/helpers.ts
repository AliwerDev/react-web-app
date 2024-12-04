import { FieldError } from "react-hook-form";

export const inputErrorMessage = (error: FieldError, label = "") => {
  if (error.message) return error.message;

  if (error.type === "required") return `${label}ni kiritish majburiy`;

  return "";
};

export const makeOptions = (arr: string[], labelsObject?: Record<string, string>) => {
  return arr.map((item) => ({ value: item, label: labelsObject ? labelsObject[item] : item }));
};

export const makeOptionsFromUsers = (arr: any[]) => {
  return arr.map((item) => ({ value: item.id, label: `${item.firstName || ""} ${item.lastName || ""}`.trim() }));
};

export const makeOptionsFromIdName = (arr: any[]) => {
  return arr.map((item) => ({ value: item.id, label: item.name }));
};

export const formatMoney = (value: string | number = "") => {
  value = String(value).trim();
  const numericValue = value.replace(/[^0-9]/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
