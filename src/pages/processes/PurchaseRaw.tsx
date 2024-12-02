import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useWebApp from "../../hooks/use-webapp";
import useMainButton from "../../hooks/use-main-button";
import { request } from "../../services/api";
import Form from "../../components/form/Form";
import { Material, User } from "../../utils/models";
import { makeOptionsFromIdName, makeOptionsFromUsers } from "../../utils/helpers";
import usePaginatedData from "../../hooks/use-paginated-data";
import { unitsLabels } from "../../utils/constants";

const AddSemiFinishedProduct = () => {
  const webapp = useWebApp();
  const submitRef = useRef<HTMLButtonElement>(null);
  const { toggleProgress } = useMainButton({ ref: submitRef, text: "+ Qo'shish" });
  const { data: providers } = usePaginatedData("/provider/search", 1000, false);
  const { data: warehouseManagers } = usePaginatedData<User>("/user/search?userRole=WAREHOUSE_MANAGER", 1000, false);
  const { data: materials } = usePaginatedData<Material>("/material/search", 1000, false);

  const { control, handleSubmit, reset, setValue, watch } = useForm();

  const materialId = watch("materialId");

  const fields = useMemo(() => {
    const unit = materials.find((m) => m.id === materialId)?.unitOfMeasurement;

    return [
      {
        label: "Hom ashyo",
        name: "materialId",
        type: "select",
        isSearchable: true,
        options: makeOptionsFromIdName(materials),
      },
      {
        label: "Hom ashyo sotuvchi",
        name: "providerId",
        type: "select",
        isSearchable: true,
        options: makeOptionsFromUsers(providers),
      },
      {
        label: unit ? `Necha ${unitsLabels[unit]?.toLowerCase()}` : "Soni",
        name: "quantity",
        type: "number",
        rules: { required: true },
      },
      {
        label: unit ? `1 ${unitsLabels[unit]?.toLowerCase()} narxi` : "1 birlik narxi",
        name: "unitPrice",
        type: "money",
        rules: { required: true },
      },
      {
        label: "Umumiy narxi",
        name: "totalPrice",
        type: "money",
        readOnly: true,
      },
      {
        label: "To'langan summa",
        name: "paid",
        type: "money",
      },
      {
        label: "Skladchi",
        name: "warehouseManagerId",
        type: "select",
        isSearchable: true,
        options: makeOptionsFromUsers(warehouseManagers),
      },
    ];
  }, [providers, materials, warehouseManagers, materialId]);

  const onSubmit: SubmitHandler<Record<string, any>> = useCallback(
    (data) => {
      toggleProgress(true);
      delete data.totalPrice;

      request({
        url: "/material/buy-raw",
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
              if (id === "AGAIN") reset({});
              else if (id === "CLOSE") {
                webapp.close();
              }
            }
          );
        },
      });
    },
    [reset, toggleProgress, webapp]
  );

  const quantity = watch("quantity");
  const unitPrice = watch("unitPrice");

  useEffect(() => {
    if (quantity > 0 && unitPrice > 0) {
      setValue("totalPrice", quantity * unitPrice);
    } else {
      setValue("totalPrice", "");
    }
  }, [quantity, setValue, unitPrice]);

  useEffect(() => {
    if (warehouseManagers.length) {
      setValue("warehouseManagerId", warehouseManagers[0].id);
    }
  }, [setValue, warehouseManagers]);

  return (
    <div className="main-container">
      <h1 style={{ marginBottom: "10px" }}>Hom ashyo sotib olish</h1>

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

export default AddSemiFinishedProduct;
