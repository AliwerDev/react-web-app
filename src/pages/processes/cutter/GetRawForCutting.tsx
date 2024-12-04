import React, { useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useWebApp from "../../../hooks/use-webapp";
import useMainButton from "../../../hooks/use-main-button";
import { request } from "../../../services/api";
import Form from "../../../components/form/Form";
import { Material, User } from "../../../utils/models";
import { makeOptionsFromUsers } from "../../../utils/helpers";
import usePaginatedData from "../../../hooks/use-paginated-data";
import { unitsLabels } from "../../../utils/constants";

const GetRawForCutting = () => {
  const webapp = useWebApp();
  const submitRef = useRef<HTMLButtonElement>(null);
  const { toggleProgress } = useMainButton({ ref: submitRef, text: "So'rov yuborish" });
  const { data: materials } = usePaginatedData<Material>("/material/search?type=RAW&maxAmount=true", 1000, false);
  const { data: warehouseManagers } = usePaginatedData<User>("/user/search?userRole=WAREHOUSE_MANAGER", 1000, false);

  const { control, handleSubmit, setValue, watch } = useForm();

  const materialId = watch("materialId");

  const fields = useMemo(() => {
    const material = materials.find((m) => m.id === materialId);
    const unit = material?.unitOfMeasurement;

    return [
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
        options: materials.map((m) => ({ value: m.id, label: `${m.name} | Mavjud: ${m.maxAmount || 0} ${unitsLabels[m.unitOfMeasurement]?.toLowerCase()}` })),
      },
      {
        label: unit ? `Necha ${unitsLabels[unit]?.toLowerCase()}` : "Soni",
        name: "quantity",
        type: "number",
        rules: { required: true, max: { value: material?.maxAmount || 0, message: "Xom ashyo yetarli emas!" } },
      },
    ];
  }, [materials, warehouseManagers, materialId]);

  const onSubmit: SubmitHandler<Record<string, any>> = (data) => {
    toggleProgress(true);
    request({
      url: "/material/get-raw",
      method: "POST",
      data,
      success: () => {
        webapp.showAlert("🎉 Xom ashyo uchun so'rov skladchiga yuborildi!", webapp.close);
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
      <h1 style={{ marginBottom: "10px" }}>Bichishga xom ashyo olish</h1>

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
