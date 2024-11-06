import React, { useEffect, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Select from "../components/select/Select";
import Input from "../components/input/Input";
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Home: React.FC = () => {
  const submitRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const mainButton = window.Telegram.WebApp.MainButton;

    mainButton.onClick(() => submitRef.current?.click());
    mainButton.enable();
    mainButton.show();
  }, []);

  const { control, handleSubmit } = useForm();
  const onSubmit: SubmitHandler<any> = (data) => console.log(data);

  return (
    <div className="main-container">
      <h1>Home Page</h1>
      <p>Welcome! Select an option to proceed:</p>

      <form style={{ marginBlock: "20px" }} onSubmit={handleSubmit(onSubmit)}>
        <Input label="Input" control={control} name="name" rules={{ required: "Username is required", minLength: { value: 4, message: "Username must be at least 4 characters" } }} />
        <Select label="Multi Select" control={control} name="multipleFlavors" options={options} rules={{ required: { value: true, message: "Select is required" } }} />

        <button ref={submitRef} type="submit" className="hidden" />
      </form>
      <pre>
        <code>{JSON.stringify(window.Telegram.WebApp.initDataUnsafe || {})}</code>
      </pre>

      <nav>
        <Link to="/">Home</Link> |<Link to="/add-product">Add Product</Link> |<Link to="/add-member">Add Member</Link>
      </nav>
    </div>
  );
};

export default Home;
