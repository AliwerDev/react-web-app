import React from "react";
import { Control, Controller } from "react-hook-form";
import { inputErrorMessage } from "../../utils/helpers";
import InputStyledContainer from "./styled";
import Label from "../label";

interface InputProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  label?: string;
  type?: string;
  rules?: Record<string, any>;
  defaultValue?: string;
  maxLength?: number;
  readOnly?: boolean;
}

const formatMoney = (value: string = "") => {
  value = String(value).trim();
  const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Add commas
};

const Input: React.FC<InputProps> = ({ control, name, placeholder = "", label, type = "text", rules = {}, defaultValue = "", readOnly }) => {
  return (
    <InputStyledContainer>
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <>
            {label ? (
              <Label htmlFor={name} required={rules.required} error={!!error}>
                {label}
              </Label>
            ) : null}

            {type === "money" ? (
              <input {...field} id={name} type="text" placeholder={placeholder} className={`input-field ${error ? "input-error" : ""}`} readOnly={readOnly} value={formatMoney(field.value || "")} onChange={(e) => field.onChange(e.target.value?.replace(/,/g, ""))} />
            ) : type === "phone" ? (
              <div className="phone-input-container">
                <input readOnly={readOnly} {...field} id={name} type="number" placeholder={placeholder} className={`input-field phone-input ${error ? "input-error" : ""}`} />
              </div>
            ) : (
              <input {...field} id={name} type={type} placeholder={placeholder} className={`input-field ${error ? "input-error" : ""}`} />
            )}

            {error ? <Label.Error message={inputErrorMessage(error, label)} /> : null}
          </>
        )}
      />
    </InputStyledContainer>
  );
};

export default Input;
