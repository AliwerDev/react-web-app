import React, { useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useWebApp from "../../hooks/use-webapp";
import useMainButton from "../../hooks/use-main-button";
import { request } from "../../services/api";
import Form, { IField } from "../../components/form/Form";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/use-api";
import PageTitle from "../../components/page-title";
import { Material } from "../../utils/models";
import { makeOptions } from "../../utils/helpers";
import { units, unitsLabels } from "../../utils/constants";

const initialValues: Partial<Material> = {
  name: "",
  unitOfMeasurement: "PIECE",
  type: "RAW",
};

const AddSemiFinishedProduct = () => {
  const webapp = useWebApp();
  const { id } = useParams();
  const submitRef = useRef<HTMLButtonElement>(null);
  const { control, handleSubmit, reset, setFocus } = useForm({ defaultValues: initialValues });
  const { toggleProgress } = useMainButton({ ref: submitRef, text: "+ Qo'shish" });
  const { data: material } = useApi<Material>(`material/${id}`, !!id);

  const fields = useMemo(() => {
    const items: IField<Material>[] = [
      {
        label: "Nomi",
        name: "name",
        rules: { required: true },
      },
    ];

    if (!id) {
      items.push({
        label: "O'lchov birligi",
        name: "unitOfMeasurement",
        type: "select",
        options: makeOptions(units, unitsLabels),
      });
    }
    return items;
  }, [id]);

  const clearForm = () => {
    setFocus("name");
    reset(initialValues);
  };

  const onSubmit: SubmitHandler<Material> = (data) => {
    toggleProgress(true);
    if (!id) data.type = "SEMI_FINISHED";

    request({
      url: id ? `/material/${id}` : "/material",
      method: id ? "PUT" : "POST",
      data,
      success: () => {
        webapp.showPopup(
          {
            title: "🎉 Muvaffaqqiyatli qo'shildi!",
            message: `Nomi: ${data.name}, O'lchov birligi: ${data.unitOfMeasurement}`,
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
    if (material) {
      reset({ name: material.name });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [material]);

  return (
    <div className="main-container">
      <PageTitle type={id ? "edit" : "create"} label="Yarm tayyor mahsulot" />

      <Form<Material>
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

export default AddSemiFinishedProduct;
