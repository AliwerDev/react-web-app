import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useWebApp from "../../../hooks/use-webapp";
import useMainButton from "../../../hooks/use-main-button";
import { request } from "../../../services/api";
import Form from "../../../components/form/Form";
import { Product, User } from "../../../utils/models";
import { makeOptionsFromUsers } from "../../../utils/helpers";
import usePaginatedData from "../../../hooks/use-paginated-data";
import { unitsLabels } from "../../../utils/constants";

const SendFinishedProduct = () => {
  const webapp = useWebApp();
  const submitRef = useRef<HTMLButtonElement>(null);
  const { toggleProgress } = useMainButton({ ref: submitRef, text: "Yuborish" });
  const { data: packagers } = usePaginatedData<User>("/user/search?userRole=PACKAGER", 1000, false);
  const { data: products } = usePaginatedData<Product>("/product/search?searchType=SENDING_TO_PACKAGING", 1000, false);

  const { control, handleSubmit, setValue, watch } = useForm();

  const productId = watch("productId");

  const fields = useMemo(() => {
    const product = products.find((m) => m.productId === productId);
    const unit = product?.unitOfMeasurement;

    return [
      {
        label: "Qadoqlovchi",
        name: "packagerId",
        type: "select",
        isSearchable: true,
        rules: { required: true },
        options: makeOptionsFromUsers(packagers),
      },
      {
        label: "Mahsulot",
        name: "productId",
        type: "select",
        isSearchable: true,
        rules: { required: true },
        options: products.map((m) => ({ value: m.productId, label: `${m.name} | Mavjud: ${m.maxAmount || 0} ${unitsLabels[m.unitOfMeasurement]?.toLowerCase()}` })),
      },
      {
        label: unit ? `Necha ${unitsLabels[unit]?.toLowerCase()}` : "Soni",
        name: "quantity",
        type: "number",
        rules: { required: true, max: { value: product?.maxAmount || 0, message: "Mahsulotlar yetarli emas!" } },
      },
    ];
  }, [packagers, products, productId]);

  const onSubmit: SubmitHandler<Record<string, any>> = useCallback(
    (data) => {
      toggleProgress(true);

      request({
        url: "/product/send-finished",
        method: "POST",
        data,
        success: () => {
          toggleProgress(false);
          webapp.showAlert("Sizning so'rovingiz qadoqlovchiga yuborildi!", webapp.close);
        },
      });
    },
    [toggleProgress, webapp]
  );

  useEffect(() => {
    if (packagers.length) {
      setValue("packagerId", packagers[0].id);
    }
  }, [setValue, packagers]);

  return (
    <div className="main-container">
      <h1 style={{ marginBottom: "10px" }}>Mahsulotni qadoqlashga berish</h1>

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

export default SendFinishedProduct;
