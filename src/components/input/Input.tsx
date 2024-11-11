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
}

const Input: React.FC<InputProps> = ({ control, name, placeholder = "", label, type = "text", rules = {}, defaultValue = "" }) => {
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

            {type === "phone" ? (
              <div className="phone-input-container">
                <input {...field} id={name} type={"number"} placeholder={placeholder} className={`input-field phone-input ${error ? "input-error" : ""}`} />
              </div>
            ) : (
              //
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
