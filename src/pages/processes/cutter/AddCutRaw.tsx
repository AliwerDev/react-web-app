import React, { useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useWebApp from "../../../hooks/use-webapp";
import useMainButton from "../../../hooks/use-main-button";
import { request } from "../../../services/api";
import Form from "../../../components/form/Form";
import { Material } from "../../../utils/models";
import { makeOptionsFromIdName } from "../../../utils/helpers";
import usePaginatedData from "../../../hooks/use-paginated-data";

const AddCutRaw = () => {
  const webapp = useWebApp();
  const submitRef = useRef<HTMLButtonElement>(null);
  const { control, handleSubmit } = useForm();
  const { toggleProgress } = useMainButton({ ref: submitRef, text: "Qo'shish" });
  const { data: materials } = usePaginatedData("/material/search?type=SEMI_FINISHED", 1000, false);

  const fields = useMemo(
    () => [
      {
        label: "Yarm tayyor mahsulot",
        name: "materialId",
        type: "select",
        isSearchable: true,
        options: makeOptionsFromIdName(materials),
      },
      {
        label: "Soni",
        name: "quantity",
        type: "number",
        rules: { required: true },
      },
    ],
    [materials]
  );

  const onSubmit: SubmitHandler<Material> = (data) => {
    toggleProgress(true);

    request({
      url: "/material/add-semi",
      method: "POST",
      data,
      success: () => {
        webapp.showAlert("🎉 Muvaffaqqiyatli qo'shildi!", webapp.close);
      },
    });
  };

  return (
    <div className="main-container">
      <h1 style={{ marginBottom: "10px" }}>Bichilgan mahsulotni qo'shish</h1>

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

export default AddCutRaw;
