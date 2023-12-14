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
    <div>
      <h1>Signin</h1>
      <form onSubmit={handleSubmit(handleSignin, handleError)}>
        <div>
          <label>Tài khoản</label>
          <input
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
        <button>Đăng Nhập</button>
      </form>
    </div>
  );
}
