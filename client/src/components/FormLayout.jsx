import formfield from "../helper/formfield";
import { useState } from "react";

const FormLayout = ({ formtype, setFormType, handleForm }) => {
  const [formdata, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleForm(formdata);
  };

  return (
    <form className="" onSubmit={handleSubmit}>
      {formfield[formtype]?.map((item, index) => (
        <div
          key={item.name || index}
          className="flex flex-col mt-2 md:grid md:grid-cols-2"
        >
          <label htmlFor={item.name}>{item.label}</label>

          {item.label === "Address" ? (
            <textarea
              name={item.name}
              value={formdata[item.name] || ""}
              onChange={handleChange}
              placeholder={item.placeholder}
              className="border-1 rounded-sm border-blue-900 p-1"
            />
          ) : (
            <input
              type={item.type}
              name={item.name}
              value={formdata[item.name] || ""}
              onChange={handleChange}
              placeholder={item.placeholder}
              className="border-1 rounded-md border-blue-900 p-1"
            />
          )}
        </div>
      ))}

      <div className="flex justify-center p-3">
        <button
          className="py-2 px-5  bg-blue-900 w-fit rounded-md text-white shadow-sm shadow-blue-900"
          type="submit"
        >
          {formtype.toUpperCase()}
        </button>
      </div>

      <p className="text-sm mt-3 mb-3">
        {formtype === "login" ? (
          <>
            Don't have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer font-medium"
              onClick={() => setFormType("register")}
            >
              Register
            </span>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <span
              className="text-blue-600 cursor-pointer font-medium"
              onClick={() => setFormType("login")}
            >
              Login
            </span>
          </>
        )}
      </p>
    </form>
  );
};

export default FormLayout;
