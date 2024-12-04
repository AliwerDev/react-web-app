import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useWebApp from "../../../hooks/use-webapp";
import useMainButton from "../../../hooks/use-main-button";
import { request } from "../../../services/api";
import Form from "../../../components/form/Form";
import { Product, User } from "../../../utils/models";
import { formatMoney, makeOptionsFromUsers } from "../../../utils/helpers";
import usePaginatedData from "../../../hooks/use-paginated-data";
import { unitsLabels } from "../../../utils/constants";

const CashSubmission = () => {
  const webapp = useWebApp();
  const submitRef = useRef<HTMLButtonElement>(null);
  const { toggleProgress } = useMainButton({ ref: submitRef, text: "So'rov yuborish" });
  const { data: cashiers } = usePaginatedData<User>("/user/search?userRole=CASHIER", 1000, false);
  const { data: products } = usePaginatedData<Product>("/product/search?searchType=SUBMITTING_MONEY", 1000, false);

  const { control, handleSubmit, setValue, watch } = useForm();

  const quantity = watch("quantity");
  const unitPrice = watch("unitPrice");
  const totalAmount = quantity > 0 && unitPrice > 0 ? quantity * unitPrice : 0;

  const productId = watch("productId");

  const fields = useMemo(() => {
    const product = products.find((m) => m.id === productId);
    const unit = product?.unitOfMeasurement;

    return [
      {
        label: "Kassir",
        name: "cashierId",
        type: "select",
        isSearchable: true,
        options: makeOptionsFromUsers(cashiers),
      },
      {
        label: "Mahsulot",
        name: "productId",
        type: "select",
        isSearchable: true,
        options: products.map((m) => ({ value: m.id, label: `${m.name} | Mavjud: ${m.maxAmount || 0} ${unitsLabels[m.unitOfMeasurement]?.toLowerCase()}` })),
      },
      {
        label: unit ? `Necha ${unitsLabels[unit]?.toLowerCase()}` : "Soni",
        name: "quantity",
        type: "number",
        rules: { required: true, max: { value: product?.maxAmount || 0, message: "Mahsulotlar yetarli emas!" } },
      },
      {
        label: unit ? `1 ${unitsLabels[unit]?.toLowerCase()} narxi` : "1 birlik narxi",
        name: "unitPrice",
        type: "money",
        rules: { required: true, min: { value: product?.minimumPrice, message: `Minimal narx: ${formatMoney(product?.minimumPrice)}` } },
      },
      {
        label: "Umumiy summa",
        name: "totalPrice",
        type: "money",
        readOnly: true,
      },
      {
        label: "Topshirilayotgan summa",
        name: "givenToBoxOffice",
        type: "money",
        rules: {
          validate: (value: string) => Number(value) <= Number(totalAmount) || "Topshirilayotgan summa umumiy summadan kichik yoki teng bo'lishi kerak!",
        },
      },
    ];
  }, [cashiers, products, productId, totalAmount]);

  const onSubmit: SubmitHandler<Record<string, any>> = useCallback(
    (data) => {
      toggleProgress(true);
      delete data.totalPrice;

      request({
        url: "/selling-process/box-office",
        method: "POST",
        data,
        success: () => {
          toggleProgress(false);
          webapp.showAlert("Sizning so'rovingiz kassirga yuborildi!", webapp.close);
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
    if (cashiers.length) {
      setValue("cashierId", cashiers[0].id);
    }
  }, [setValue, cashiers]);

  return (
    <div className="main-container">
      <h1 style={{ marginBottom: "10px" }}>Savdo pulini topshirish</h1>

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

export default CashSubmission;
