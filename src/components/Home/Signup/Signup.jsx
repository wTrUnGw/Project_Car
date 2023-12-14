import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { signupAPI } from "../../../apis/user";

const validationSchema = object({
  taiKhoan: string().required("Tài khoản không được để trống"),
  matKhau: string()
    .required("Mật khẩu không được để trống")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "Mật khẩu phải có ít nhất 8 kí tự, gồm 1 kí tự hoa, 1 kí tự thường và 1 kí tự số"
    ),
  email: string().required("Email không được để trống").email("Email không đúng định dạng"),
  hoTen: string().required("Họ tên không được để trống"),
  soDt: string().required("Số điện thoại không được để trống"),
});

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      taiKhoan: "",
      matKhau: "",
      hoTen: "",
      email: "",
      soDt: "",
    },
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      await signupAPI(values);
      navigate("/sign-in");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>Signup</h1>

      <form noValidate onSubmit={handleSubmit(handleSignup)}>
        <div>
          <label>Tài Khoản</label>
          <input {...register("taiKhoan")} />
          {errors.taiKhoan && <span>{errors.taiKhoan.message}</span>}
        </div>

        <div>
          <label>Mật Khẩu</label>
          <input {...register("matKhau")} />
          {errors.matKhau && <span>{errors.matKhau.message}</span>}
        </div>

        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <span>{errors.email.message}</span>}
        </div>

        <div>
          <label>Họ Tên</label>
          <input {...register("hoTen")} />
          {errors.hoTen && <span>{errors.hoTen.message}</span>}
        </div>

        <div>
          <label>Số Điện Thoại</label>
          <input {...register("soDt")} />
          {errors.soDt && <span>{errors.soDt.message}</span>}
        </div>

        {error && <p>{error}</p>}

        <button disabled={isLoading}>Đăng Ký</button>
      </form>
    </div>
  );
}
