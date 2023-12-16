import React from "react";
import { useForm } from "react-hook-form";

export default function Signin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
    },
    mode: "onSubmit",
  });

  const handleSignin = (values) => {
    console.log(values);
  };
  const handleError = (errors) => {
    console.log(errors);
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center bg-primary vh-100"
      style={{
        backgroundImage: `url(
        "https://sohanews.sohacdn.com/2020/4/25/dsc9157-1587790663914971258389.jpg"
      )`,
      }}
    >
      <div className="bg-info p-3 rounded w-25">
        <h1 className="text-center">Signin</h1>
        <form onSubmit={handleSubmit(handleSignin, handleError)}>
          <div>
            <label>Tài khoản</label>
            <input
              className="form-control rounded-0"
              {...register("taiKhoan", {
                required: {
                  value: true,
                  message: "Tài khoản không được để trống",
                },
              })}
            />
            {errors.taiKhoan && <span>{errors.taiKhoan.message}</span>}
          </div>
          <div>
            <label>Mật khẩu</label>
            <input
              className="form-control rounded-0"
              type="password"
              {...register("matKhau", {
                required: { value: true, message: "Mật khẩu không được để trống" },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                  message:
                    "Mật khẩu phải có ít nhất 8 kí tự, gồm 1 kí tự hoa, 1 kí tự thường và 1 kí tự sớ",
                },
              })}
            />
            {errors.matKhau && <span>{errors.matKhau.message}</span>}
          </div>
          <button className="btn btn-success mt-3">Đăng Nhập</button>
        </form>
      </div>
    </div>
  );
}
