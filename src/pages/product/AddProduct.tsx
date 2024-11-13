import React, { useEffect, useMemo, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useWebApp from "../../hooks/use-webapp";
import useMainButton from "../../hooks/use-main-button";
import { request } from "../../services/api";
import Form, { IField } from "../../components/form/Form";
import { useParams } from "react-router-dom";
import useApi from "../../hooks/use-api";
import PageTitle from "../../components/page-title";
import { Material, Product } from "../../utils/models";
import { Option } from "../../components/select/Select";
import usePaginatedData from "../../hooks/use-paginated-data";

const initialValues: Product = {
  name: "",
  unitOfMeasurement: "PIECE",
  minimumPrice: "",
  sewingPrice: "",
  materialId: "",
};

const AddProduct: React.FC = () => {
  const webapp = useWebApp();
  const { id } = useParams();
  const submitRef = useRef<HTMLButtonElement>(null);
  const { control, handleSubmit, reset, setFocus } = useForm({ defaultValues: initialValues });
  const { toggleProgress } = useMainButton({ ref: submitRef, text: "+ Qo'shish" });
  const { data: product } = useApi<Product>(`product/${id}`, !!id);
  const { data: materials } = usePaginatedData<Material>(`material/search`, 100, false);

  const fields = useMemo((): IField<Product>[] => {
    return [
      {
        label: "Nomi",
        name: "name",
        rules: { required: true },
      },
      {
        label: "Hom ashyo",
        name: "materialId",
        type: "select",
        options: materials.map((m) => ({ label: m.name, value: m.id } as Option)),
        rules: { required: true },
      },
      {
        label: "Minimal narxi",
        name: "minimumPrice",
        type: "number",
        rules: { required: true },
      },
      {
        label: "Tikish narxi",
        name: "sewingPrice",
        type: "number",
        rules: { required: true },
      },
    ];
  }, [materials]);

  const clearForm = () => {
    setFocus("name");
    reset(initialValues);
  };

  const onSubmit: SubmitHandler<Product> = (data) => {
    toggleProgress(true);
    data.unitOfMeasurement = materials?.find((m) => m.id === data.materialId)?.unitOfMeasurement as string;

    request({
      url: id ? `/product/${id}` : "/product",
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
    if (product) {
      delete product.material;
      delete product.maxAmount;
      reset(product);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <div className="main-container">
      <PageTitle type={id ? "edit" : "create"} label="Mahsulot" />

      <Form<Product>
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

export default AddProduct;
