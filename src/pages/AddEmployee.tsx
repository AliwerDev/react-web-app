import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Select from "../components/select/Select";
import Input from "../components/input/Input";

const roles = [
  { value: "director", label: "Direktor" },
  { value: "purchaser", label: "Xarid qiluvchi" },
  { value: "sewer", label: "Bichuvchi" },
  { value: "tailor", label: "Tikuvchi" },
  { value: "packer", label: "Upakovkachi" },
  { value: "seller", label: "Sotuvchi" },
  { value: "warehouse_worker", label: "Skladchi" },
];

const uzbPhoneRegex = /^\d{9}$/;

const AddEmployee: React.FC = () => {
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const app = window.Telegram.WebApp;
    app.expand();
    app.enableClosingConfirmation("Qilgan o'zgarishlaringiz saqlanmagan bo'lishi mumkin");

    const mainButton = app.MainButton;
    mainButton.text = "Saqlash";
    mainButton.onClick(() => submitRef.current?.click());
    mainButton.show();
    mainButton.enable();
  }, []);

  const {
    control,
    handleSubmit,
    // formState: { isValid },
  } = useForm();

  // useEffect(() => {
  //   const mainButton = window.Telegram.WebApp.MainButton;

  //   if (isValid) {
  //     mainButton.show();
  //   } else {
  //     mainButton.hide();
  //   }
  // }, [isValid]);

  const onSubmit: SubmitHandler<any> = (data) => {
    window.Telegram.WebApp.MainButton?.showProgress(true);
    window.setTimeout(() => {
      window.Telegram.WebApp.MainButton?.hideProgress();
      window.Telegram.WebApp.showAlert("🚀 Hodim muvaffiqiyatli qo'shildi!");
      window.Telegram.WebApp.close();
    }, 2000);
    console.log(data);
  };

  return (
    <div className="main-container">
      <h1>Hodim qo'shish</h1>
      <p>Hodim qo'shish uchun quidagi malumotlarni to'ldiring:</p>

      <form style={{ marginBlock: "20px" }} onSubmit={handleSubmit(onSubmit)}>
        <Select label="Hodim roli" placeholder="Rol qidirish" control={control} name="role" options={roles} rules={{ required: true }} />
        <Input label="Ism" control={control} placeholder="Ism kiriting" name="firstName" rules={{ required: true, minLength: { value: 3, message: "Ism kamida 3 harf bo'lishi kerak" } }} />
        <Input label="Familiya" control={control} placeholder="Familiya kiriting" name="lastName" />

        <Input
          label="Telefon raqam"
          control={control}
          name="phoneNumber"
          type="phone"
          placeholder="99 999 99 99"
          rules={{
            required: true,
            pattern: {
              value: uzbPhoneRegex,
              message: "Telefon raqam formati xato, (Misol: +998901234567)",
            },
          }}
        />

        <button ref={submitRef} type="submit" className="hidden" />
      </form>
    </div>
  );
};

export default AddEmployee;
