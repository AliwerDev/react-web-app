import React, { useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useWebApp from "../../hooks/use-webapp";
import useMainButton from "../../hooks/use-main-button";
import { request } from "../../services/api";
import Form from "../../components/form/Form";
import { Material, User } from "../../utils/models";
import { makeOptionsFromIdName, makeOptionsFromUsers } from "../../utils/helpers";
import usePaginatedData from "../../hooks/use-paginated-data";

const GetRawForCutting = () => {
  const webapp = useWebApp();
  const submitRef = useRef<HTMLButtonElement>(null);
  const { toggleProgress } = useMainButton({ ref: submitRef, text: "+ Qo'shish" });
  const { data: materials } = usePaginatedData("/material/search", 1000, false);
  const { data: warehouseManagers } = usePaginatedData<User>("/user/search?userRole=WAREHOUSE_MANAGER", 1000, false);

  const { control, handleSubmit, reset, setFocus, setValue } = useForm();

  const fields = useMemo(
    () => [
      {
        label: "Skladchi",
        name: "warehouseManagerId",
        type: "select",
        isSearchable: true,
        options: makeOptionsFromUsers(warehouseManagers),
      },
      {
        label: "Hom ashyo",
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
    [materials, warehouseManagers]
  );

  const clearForm = () => {
    setFocus("name");
    reset();
  };

  const onSubmit: SubmitHandler<Material> = (data) => {
    toggleProgress(true);

    request({
      url: "/material/add-semi",
      method: "POST",
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
    if (warehouseManagers.length) {
      setValue("warehouseManagerId", warehouseManagers[0].id);
    }
  }, [setValue, warehouseManagers]);

  return (
    <div className="main-container">
      <h1 style={{ marginBottom: "10px" }}>Bichishga mahsulot olish</h1>

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

export default GetRawForCutting;