import { Control, FormState, UseFormHandleSubmit } from "react-hook-form";
import Input from "../input/Input";
import Select, { Option } from "../select/Select";

export interface IField<T> {
  label: string;
  name: keyof T;
  placeholder?: string;
  rules?: Record<string, any>;
  type?: string;
  errorMessage?: string;
  disabled?: boolean;
  onChange?: (value: any) => void;
  value?: any;
  initialValue?: any;
  isSearchable?: boolean;
  options?: Option[];
  isMulti?: boolean;
  isDate?: boolean;
  isTime?: boolean;
  readOnly?: boolean;
}

interface FormProps<T> {
  fields: IField<T>[];
  onSubmit: (data: any) => void;
  control: Control<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  formState?: FormState<any>;
  submitButton?: React.ReactNode;
  style?: React.CSSProperties;
}

const Form = <T,>({ fields, onSubmit, handleSubmit, control, submitButton, style = {} }: FormProps<T>) => {
  return (
    <form style={style} onSubmit={handleSubmit(onSubmit)}>
      {fields.map(({ type, name, label, placeholder, rules, options, isMulti, isSearchable, readOnly }) => {
        if (type === "select")
          return (
            <Select
              readOnly={readOnly}
              key={name as string}
              isMulti={!!isMulti}
              isSearchable={!!isSearchable}
              name={name as string}
              label={label}
              placeholder={placeholder}
              control={control}
              options={options || []}
              rules={rules}
              //
            />
          );
        return (
          <Input
            readOnly={readOnly}
            key={name as string}
            type={type || "text"}
            name={name as string}
            label={label}
            placeholder={placeholder}
            control={control}
            rules={rules}
            //
          />
        );
      })}

      {submitButton ? submitButton : <button type="submit">submit</button>}
    </form>
  );
};
export default Form;
