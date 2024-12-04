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

const RequestToProduct = () => {
  const webapp = useWebApp();
  const submitRef = useRef<HTMLButtonElement>(null);
  const { toggleProgress } = useMainButton({ ref: submitRef, text: "So'rov yuborish" });
  const { data: warehouseManagers } = usePaginatedData<User>("/user/search?userRole=WAREHOUSE_MANAGER", 1000, false);
  const { data: products } = usePaginatedData<Product>("/product/search?searchType=REQUESTING_PRODUCT", 1000, false);

  const { control, handleSubmit, setValue, watch } = useForm();

  const productId = watch("productId");

  const fields = useMemo(() => {
    const product = products.find((m) => m.productId === productId);
    const unit = product?.unitOfMeasurement;

    return [
      {
        label: "Skladchi",
        name: "warehouseManagerId",
        type: "select",
        isSearchable: true,
        rules: { required: true },
        options: makeOptionsFromUsers(warehouseManagers),
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
  }, [warehouseManagers, products, productId]);

  const onSubmit: SubmitHandler<Record<string, any>> = useCallback(
    (data) => {
      toggleProgress(true);
      delete data.totalPrice;

      request({
        url: "/selling-process/product",
        method: "POST",
        data,
        success: () => {
          toggleProgress(false);
          webapp.showAlert("Sizning so'rovingiz skladchiga yuborildi!", webapp.close);
        },
      });
    },
    [toggleProgress, webapp]
  );

  useEffect(() => {
    if (warehouseManagers.length) {
      setValue("warehouseManagerId", warehouseManagers[0].id);
    }
  }, [setValue, warehouseManagers]);

  return (
    <div className="main-container">
      <h1 style={{ marginBottom: "10px" }}>Mahsulotga uchun so'rov yuborish</h1>

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

export default RequestToProduct;
