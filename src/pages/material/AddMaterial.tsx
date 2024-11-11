import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import Input from "../../components/input/Input";
import useWebApp from "../../hooks/use-webapp";

type IRaw = {
  name: string;
  unit: string;
};

const initialValues: IRaw = {
  name: "",
  unit: "",
};

const AddRaw: React.FC = () => {
  const webapp = useWebApp();
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    webapp.MainButton.text = "Qo'shish";
    webapp.MainButton.onClick(() => submitRef.current?.click());
    webapp.MainButton.show();
    webapp.MainButton.enable();
  }, [webapp]);

  const { control, handleSubmit, reset, setFocus } = useForm({ defaultValues: initialValues });

  const clearForm = () => {
    setFocus("name");
    reset(initialValues);
  };

  const onSubmit: SubmitHandler<IRaw> = (data) => {
    webapp.MainButton?.showProgress(true);
    window.setTimeout(() => {
      webapp.MainButton?.hideProgress();
      webapp.showPopup(
        {
          title: "🎉 Muvaffaqqiyatli qo'shildi!",
          message: `Nomi: ${data.name}, O'lchov birligi: ${data.unit}`,
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
    }, 2000);
    console.log(data);
  };

  return (
    <div className="main-container">
      <h1>Xom ashyo qo'shish</h1>
      <p>Quidagi malumotlarni to'ldiring:</p>

      <form style={{ marginBlock: "20px" }} onSubmit={handleSubmit(onSubmit)}>
        <Input label="Xom ashyo nomi" control={control} placeholder="Xom ashyo nomi" name="name" rules={{ required: true, minLength: { value: 3, message: "Xom ashyo nomi kamida 3 harf bo'lishi kerak" } }} />
        <Input label="O'lchov birligi" control={control} placeholder="Birlik" name="unit" rules={{ required: true }} />

        <button ref={submitRef} type="submit" className="hidden" />
      </form>
    </div>
  );
};

export default AddRaw;
