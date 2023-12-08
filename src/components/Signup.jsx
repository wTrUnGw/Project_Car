import { useState } from "react";
import { Link } from "react-router-dom";
import validation from "./SignupValidation";
import axios from "axios";
export default function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErros] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: [event.target.value] }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErros(validation(values));
    if (errors.name === " " && errors.email === "" && errors.password === "") {
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>SignUp</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              className="form-control rounded-0"
              type="name"
              autocomplete="username"
              placeholder="Enter Name"
              name="name"
              onChange={handleInput}
            />
            {errors.name && <span className="text-danger">{errors.name} </span>}
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              className="form-control rounded-0"
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={handleInput}
            />
            {errors.email && <span className="text-danger">{errors.email} </span>}
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              className="form-control rounded-0"
              type="password"
              autocomplete="current-password"
              placeholder="Enter Password"
              name="password"
              onChange={handleInput}
            />
            {errors.password && <span className="text-danger">{errors.password} </span>}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Sign up
          </button>
          <p>You are agree to aour terms and policies </p>
          {/* <button className="btn btn-default border w-100 rounded-0">Create Account</button> */}
          <Link
            to="/login"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
