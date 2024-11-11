import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "../../components/select/Select";
import Input from "../../components/input/Input";
import useWebApp from "../../hooks/use-webapp";

const roles = [
  { value: "seller", label: "Sotuvchi" },
  { value: "director", label: "Direktor" },
  { value: "purchaser", label: "Xarid qiluvchi" },
  { value: "sewer", label: "Bichuvchi" },
  { value: "tailor", label: "Tikuvchi" },
  { value: "packer", label: "Upakovkachi" },
  { value: "warehouse_worker", label: "Skladchi" },
];

type IEmployee = {
  firstName: string;
  phoneNumber: string;
  role: string;
};

const initialValues: IEmployee = {
  role: roles[0].value,
  firstName: "",
  phoneNumber: "",
};

const uzbPhoneRegex = /^\d{9}$/;

const AddEmployee: React.FC = () => {
  const webapp = useWebApp();
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    webapp.MainButton.text = "Hodim qo'shish";
    webapp.MainButton.onClick(() => submitRef.current?.click());
    webapp.MainButton.show();
    webapp.MainButton.enable();
  }, [webapp]);

  const {
    control,
    handleSubmit,
    reset,
    setFocus,
    // formState: { isValid },
  } = useForm({ defaultValues: initialValues });

  const clearForm = () => {
    setFocus("firstName");
    reset(initialValues);
  };

  const onSubmit: SubmitHandler<IEmployee> = (data) => {
    webapp.MainButton?.showProgress(true);
    window.setTimeout(() => {
      webapp.MainButton?.hideProgress();
      webapp.showPopup(
        {
          title: "🎉 Muvaffaqqiyatli qo'shildi!",
          message: `Ismi: ${data.firstName}, Lavozimi: ${data.role}, Telefon: +998${data.phoneNumber}`,
          buttons: [
            { id: "CLOSE", text: "Yopish", type: "default" },
            { id: "AGAIN", text: "Yana qo'shish", type: "default" },
          ],
        },
        (id) => {
          if (id === "AGAIN") clearForm();
          else if (id === "CLOSE") {
            webapp.close();
          }
        }
      );
    }, 2000);
    console.log(data);
  };

  return (
    <div className="main-container">
      <h1>Hodim qo'shish</h1>
      <p>Hodim qo'shish uchun quidagi malumotlarni to'ldiring:</p>

      <form style={{ marginBlock: "20px" }} onSubmit={handleSubmit(onSubmit)}>
        <Input label="Ism" control={control} placeholder="Ism kiriting" name="firstName" rules={{ required: true, minLength: { value: 3, message: "Ism kamida 3 harf bo'lishi kerak" } }} />

        <Input
          label="Telefon raqam"
          control={control}
          name="phoneNumber"
          type="phone"
          placeholder="99 999 99 99"
          rules={{
            required: true,
            maxLength: { value: 9 },
            pattern: {
              value: uzbPhoneRegex,
              message: "Telefon raqam formati xato, (Misol: +998901234567)",
            },
          }}
        />

        <Select label="Hodim roli" placeholder="Rol qidirish" control={control} name="role" options={roles} rules={{ required: true }} />

        <button ref={submitRef} type="submit" className="hidden" />
      </form>
    </div>
  );
};

export default AddEmployee;
