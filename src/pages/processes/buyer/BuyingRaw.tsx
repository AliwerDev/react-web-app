import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useWebApp from "../../../hooks/use-webapp";
import useMainButton from "../../../hooks/use-main-button";
import { request } from "../../../services/api";
import Form from "../../../components/form/Form";
import { Material, User } from "../../../utils/models";
import { makeOptionsFromIdName, makeOptionsFromUsers } from "../../../utils/helpers";
import usePaginatedData from "../../../hooks/use-paginated-data";
import { unitsLabels } from "../../../utils/constants";

const BuyingRaw = () => {
  const webapp = useWebApp();
  const submitRef = useRef<HTMLButtonElement>(null);
  const { toggleProgress } = useMainButton({ ref: submitRef, text: "So'rov yuborish" });
  const { data: providers } = usePaginatedData("/provider/search", 1000, false);
  const { data: warehouseManagers } = usePaginatedData<User>("/user/search?userRole=WAREHOUSE_MANAGER", 1000, false);
  const { data: materials } = usePaginatedData<Material>("/material/search", 1000, false);

  const { control, handleSubmit, setValue, watch } = useForm();

  const quantity = watch("quantity");
  const unitPrice = watch("unitPrice");
  const totalAmount = quantity > 0 && unitPrice > 0 ? quantity * unitPrice : 0;

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
        rules: {
          validate: (value: string) => Number(value) <= Number(totalAmount) || "To'langan summa umumiy narxdan kichik yoki teng bo'lishi kerak!",
        },
      },
      {
        label: "Skladchi",
        name: "warehouseManagerId",
        type: "select",
        isSearchable: true,
        options: makeOptionsFromUsers(warehouseManagers),
      },
    ];
  }, [providers, materials, warehouseManagers, materialId, totalAmount]);

  const onSubmit: SubmitHandler<Record<string, any>> = useCallback(
    (data) => {
      toggleProgress(true);
      delete data.totalPrice;

      request({
        url: "/material/buy-raw",
        method: "POST",
        data,
        success: () => {
          webapp.showAlert("Sizning so'rovingiz sklatchiga yuborildi!", webapp.close);
        },
      });
    },
    [toggleProgress, webapp]
  );

  useEffect(() => {
    if (totalAmount) {
      setValue("totalPrice", totalAmount);
    } else {
      setValue("totalPrice", "");
    }
  }, [totalAmount, setValue]);

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

export default BuyingRaw;
