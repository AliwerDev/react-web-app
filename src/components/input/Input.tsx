import React from "react";
import { Control, Controller } from "react-hook-form";
import "./input.scss";
import { inputErrorMessage } from "../../utils/helpers";

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
    <div className="input-container">
      <Controller
        name={name}
        control={control}
        rules={rules}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <>
            {label && (
              <label htmlFor={name} className={`input-label ${error ? "error" : ""} ${!!rules.required ? "required" : ""}`}>
                {label}
              </label>
            )}

            {type === "phone" ? (
              <div className="phone-input-container">
                <input {...field} id={name} type={"number"} placeholder={placeholder} className={`input-field phone-input ${error ? "input-error" : ""}`} />
              </div>
            ) : (
              //
              <input {...field} id={name} type={type} placeholder={placeholder} className={`input-field ${error ? "input-error" : ""}`} />
            )}

            {error && <span className="error-message">{inputErrorMessage(error, label)}</span>}
          </>
        )}
      />
    </div>
  );
};

export default Input;
