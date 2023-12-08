import React, { useState } from "react";
import { Link } from "react-router-dom";
import validation from "./LoginValidation";
export default function Login() {
  const [values, setValues] = useState({
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
  };
  return (
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign In</h2>
        <form action="" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              onChange={handleInput}
              className="form-control rounded-0"
              type="email"
              placeholder="Enter Email "
              name="email"
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
              placeholder="Enter Password"
              name="password"
            />
            {errors.password && <span className="text-danger">{errors.password} </span>}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
          <p>You are agree to aour terms and policies </p>

          <Link
            to="/signup"
            className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          >
            Create Account
          </Link>
        </form>
      </div>
    </div>
  );
}
