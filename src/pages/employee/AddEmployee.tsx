import React, { useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useWebApp from "../../hooks/use-webapp";
import useMainButton from "../../hooks/use-main-button";
import { request } from "../../services/api";
import Form, { IField } from "../../components/form/Form";
import useApi from "../../hooks/use-api";
import { makeOptions } from "../../utils/helpers";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/page-title";
import { User } from "../../utils/models";
import { uzbPhoneRegex } from "../../utils/constants";

const initialValues: Partial<User> = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
  roles: [],
};

const AddEmployee: React.FC = () => {
  const webapp = useWebApp();
  const { id } = useParams();
  const submitRef = useRef<HTMLButtonElement>(null);
  const { control, handleSubmit, reset, setFocus } = useForm({ defaultValues: initialValues });
  const { toggleProgress } = useMainButton({ ref: submitRef, text: "+ Hodim qo'shish" });
  const { data: roles = [] } = useApi("user/roles");
  const { data: user } = useApi<User>(`user/${id}`, !!id);

  const fields = useMemo((): IField<User>[] => {
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
          maxLength: { value: 9 },
          pattern: {
            value: uzbPhoneRegex,
            message: "Telefon raqam formati xato, (Misol: +998901234567)",
          },
        },
      },
      {
        label: "Hodim roli",
        name: "roles",
        type: "select",
        options: makeOptions(roles as string[]),
        isMulti: true,
        rules: { required: true },
      },
    ];
  }, [roles]);

  const clearForm = () => {
    setFocus("firstName");
    reset(initialValues);
  };

  const onSubmit: SubmitHandler<User> = (data) => {
    toggleProgress(true);

    request({
      url: id ? `/user/${id}` : "/user",
      method: id ? "PUT" : "POST",
      data,
      success: () => {
        webapp.showPopup(
          {
            title: "🎉 Muvaffaqqiyatli qo'shildi!",
            message: `Ismi: ${data.firstName}, Telefon: +998${data.phoneNumber}`,
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
    if (user) {
      user.phoneNumber = user.phoneNumber?.slice(4);
      reset(user);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="main-container">
      <PageTitle type={id ? "edit" : "create"} label="Hodim" />

      <Form<User>
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

export default AddEmployee;
