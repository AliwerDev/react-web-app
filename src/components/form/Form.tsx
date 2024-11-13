import { Control, FormState, UseFormHandleSubmit } from "react-hook-form";
import Input from "../input/Input";
import Select, { Option } from "../select/Select";

export interface IField {
  label: string;
  name: string;
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
}

interface FormProps {
  fields: IField[];
  onSubmit: (data: any) => void;
  control: Control<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  formState?: FormState<any>;
  submitButton?: React.ReactNode;
  style?: React.CSSProperties;
}

const Form: React.FC<FormProps> = ({ fields, onSubmit, handleSubmit, control, submitButton, style = {} }) => {
  return (
    <form style={style} onSubmit={handleSubmit(onSubmit)}>
      {fields.map((field) => {
        if (field.type === "select") return <Select isMulti={!!field.isMulti} name={field.name} label={field.label} placeholder={field.placeholder} control={control} options={field.options || []} rules={field.rules} />;
        if (field.type === "phone") return <Input type="phone" name={field.name} label={field.label} placeholder={field.placeholder} control={control} rules={field.rules} />;
        return <Input name={field.name} label={field.label} placeholder={field.placeholder} control={control} rules={field.rules} />;
      })}

      {submitButton ? submitButton : <button type="submit">submit</button>}
    </form>
  );
};
export default Form;
