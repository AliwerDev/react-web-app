import React, { useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useWebApp from "../../hooks/use-webapp";
import useMainButton from "../../hooks/use-main-button";
import { request } from "../../services/api";
import Form, { IField } from "../../components/form/Form";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/use-api";
import PageTitle from "../../components/page-title";

type IEmployee = {
  firstName: string;
  phoneNumber: string;
  role: string;
};

const initialValues: IEmployee = {
  role: "BUYER",
  firstName: "",
  phoneNumber: "",
};

const uzbPhoneRegex = /^\d{9}$/;

const AddProvider: React.FC = () => {
  const webapp = useWebApp();
  const { id } = useParams();
  const submitRef = useRef<HTMLButtonElement>(null);
  const { control, handleSubmit, reset, setFocus } = useForm({ defaultValues: initialValues });
  const { toggleProgress } = useMainButton({ ref: submitRef, text: "+ Qo'shish" });
  const { data: provider = {} } = useApi<any>(`provider/${id}`, !!id);

  const fields = useMemo((): IField[] => {
    return [
      {
        label: "Ism",
        name: "firstName",
        rules: { required: true, minLength: { value: 3, message: "Ism kamida 3 harf bo'lishi kerak" } },
      },
      {
        label: "Familiya",
        name: "lastName",
      },
      {
        label: "Telefon raqam",
        name: "phoneNumber",
        type: "phone",
        placeholder: "99 999 99 99",
        rules: {
          required: true,
          maxLength: { value: 9, message: "Telefon raqam formati xato, (Misol: +998901234567)" },
          pattern: {
            value: uzbPhoneRegex,
            message: "Telefon raqam formati xato, (Misol: +998901234567)",
          },
        },
      },
    ];
  }, []);

  const clearForm = () => {
    setFocus("firstName");
    reset(initialValues);
  };

  const onSubmit: SubmitHandler<IEmployee> = (data) => {
    toggleProgress(true);
    data.phoneNumber = "+998" + data.phoneNumber;
    request({
      url: id ? `/provider/${id}` : "/provider",
      method: id ? "PUT" : "POST",
      data,
      success: () => {
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
      },
    });
  };

  useEffect(() => {
    provider.phoneNumber = provider.phoneNumber?.slice(4);
    if (provider.id) reset(provider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provider]);

  return (
    <div className="main-container">
      <PageTitle type={id ? "edit" : "create"} label="Hom ashyo sotuvchi" />

      <Form
        style={{ marginBlock: "20px" }}
        {...{ control, onSubmit, handleSubmit, fields }}
        submitButton={
          <button ref={submitRef} type="submit" className="hidden">
            Submit
          </button>
        }
      />
    </div>
  );
};

export default AddProvider;
