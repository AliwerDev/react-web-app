import React from "react";
import ReactSelect, { MultiValue, SingleValue } from "react-select";
import { Control, Controller } from "react-hook-form";
import StyledSelectContainer from "./styled";
import Label from "../label";
import { inputErrorMessage } from "../../utils/helpers";

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
    <StyledSelectContainer>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field, fieldState: { error } }) => (
          <>
            {label ? (
              <Label htmlFor={name} required={rules.required} error={!!error}>
                {label}
              </Label>
            ) : null}

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

            {error ? <Label.Error message={inputErrorMessage(error, label)} /> : null}
          </>
        )}
      />
    </StyledSelectContainer>
  );
};

export default Select;
