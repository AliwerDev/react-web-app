import { FieldError } from "react-hook-form";

export const inputErrorMessage = (error: FieldError, label = "") => {
  if (error.message) return error.message;

  if (error.type === "required") return `${label}ni kiritish majburiy`;

  return "";
};

export const makeOptions = (arr: string[]) => {
  return arr.map((item) => ({ label: item, value: item }));
};
