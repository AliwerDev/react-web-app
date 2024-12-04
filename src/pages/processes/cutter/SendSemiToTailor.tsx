import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useWebApp from "../../../hooks/use-webapp";
import useMainButton from "../../../hooks/use-main-button";
import { request } from "../../../services/api";
import Form from "../../../components/form/Form";
import { Material, User } from "../../../utils/models";
import { makeOptionsFromUsers } from "../../../utils/helpers";
import usePaginatedData from "../../../hooks/use-paginated-data";
import { unitsLabels } from "../../../utils/constants";

const SendSemiToTailor = () => {
  const webapp = useWebApp();
  const submitRef = useRef<HTMLButtonElement>(null);
  const { toggleProgress } = useMainButton({ ref: submitRef, text: "Yuborish" });
  const { data: tailors } = usePaginatedData<User>("/user/search?userRole=TAILOR", 1000, false);
  const { data: materials } = usePaginatedData<Material>("/material/search?type=SEMI_FINISHED&maxAmount=true", 1000, false);

  const { control, handleSubmit, setValue, watch } = useForm();

  const materialId = watch("materialId");

  const fields = useMemo(() => {
    const material = materials.find((m) => m.id === materialId);
    const unit = material?.unitOfMeasurement;

    return [
      {
        label: "Yarm tayyor mahsulot",
        name: "materialId",
        type: "select",
        isSearchable: true,
        rules: { required: true },
        options: materials.map((m) => ({ value: m.id, label: `${m.name} | Mavjud: ${m.maxAmount || 0} ${unitsLabels[m.unitOfMeasurement]?.toLowerCase()}` })),
      },
      {
        label: "Tikuvchi",
        name: "tailorId",
        type: "select",
        isSearchable: true,
        rules: { required: true },
        options: makeOptionsFromUsers(tailors),
      },
      {
        label: unit ? `Necha ${unitsLabels[unit]?.toLowerCase()}` : "Soni",
        name: "quantity",
        type: "number",
        rules: { required: true, max: { value: material?.maxAmount || 0, message: "Mahsulotlar yetarli emas!" } },
      },
    ];
  }, [tailors, materials, materialId]);

  const onSubmit: SubmitHandler<Record<string, any>> = useCallback(
    (data) => {
      toggleProgress(true);
      delete data.totalPrice;

      request({
        url: "/material/send-semi",
        method: "POST",
        data,
        success: () => {
          webapp.showAlert("🎉 Sizning so'rovingiz tikuvchiga yuborildi!", webapp.close);
        },
      });
    },
    [toggleProgress, webapp]
  );

  useEffect(() => {
    if (tailors.length) {
      setValue("tailorId", tailors[0].id);
    }
  }, [setValue, tailors]);

  return (
    <div className="main-container">
      <h1 style={{ marginBottom: "10px" }}>Tikishga berish</h1>

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

export default SendSemiToTailor;
