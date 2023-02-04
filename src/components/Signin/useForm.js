import { useState, useContext } from "react";
import { DataContext } from "../DataProvider";
import { authLogin } from "../../api/index";
import ROUTES from "../../api/apiRoutes";

const useForm = (validate) => {
  const [values, setValues] = useState({
    Email: "",
    Password: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const value = useContext(DataContext);
  const [users] = value.users;

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // setErrors(validate(values));
    // users.forEach((user) => {
    //   if (
    //     user.username === values.username &&
    //     user.email === values.email &&
    //     user.password === values.password
    //   ) {
    //     setIsSubmitting(true);
    //     value.setCurrentUser(user);
    //     localStorage.setItem("productUser674", JSON.stringify(user));
    //   }
    // });

    let response = await authLogin(ROUTES.login, values);
    if (response.data.login) {
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("role", response.data.role);
      setIsSubmitting(true);
      value.setCurrentUser(response.data.role);
    } else {
      setErrors(validate(values));
    }
  };

  return {
    handleInput,
    handleSubmit,
    values,
    errors,
    isSubmitting,
  };
};

export default useForm;
