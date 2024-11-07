import React from "react";
import ReactSelect, { MultiValue, SingleValue } from "react-select";
import { Control, Controller } from "react-hook-form";
import "./select.scss";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  control: Control<any>;
  name: string;
  options: Option[];
  isMulti?: boolean;
  placeholder?: string;
  label?: string;
  rules?: Record<string, any>;
  isSearchable?: boolean;
}

const Select: React.FC<SelectProps> = ({ control, name, options, isMulti = false, placeholder = "Select...", label, rules = {}, isSearchable = false }) => {
  return (
    <div className="select-container">
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            {label && (
              <label htmlFor={name} className={`input-label ${error ? "error" : ""} ${!!rules.required ? "required" : ""}`}>
                {label}
              </label>
            )}
            <ReactSelect
              {...field}
              options={options}
              isMulti={isMulti}
              placeholder={placeholder}
              isSearchable={isSearchable}
              classNamePrefix="react-select"
              onChange={(selected) => {
                const value = isMulti ? (selected as MultiValue<Option>)?.map((option) => option.value) || [] : (selected as SingleValue<Option>)?.value || null;
                field.onChange(value);
              }}
              value={isMulti ? options.filter((option) => (field.value as string[])?.includes(option.value)) : options.find((option) => option.value === field.value)}
              className={error ? "react-select-error" : ""}
            />
            {error && <span className="error-message">{error.message || error.type === "required" ? label + "ni tanlash majburiy" : ""}</span>}
          </>
        )}
      />
    </div>
  );
};

export default Select;
