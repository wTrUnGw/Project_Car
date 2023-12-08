// import axios from "axios";

// const token = JSON.parse(localStorage.getItem("currentFiverrUser"));
// // Setup axios instance - tạo ra cấu hình mặc định
// const fetcher = axios.create({
//   baseURL: "http://localhost:8080",
// });

// // THƯ VIỆN GỌI API

// // Request interceptor
// fetcher.interceptors.request.use((request) => {
//   // kiểm tra xem user đã đăng nhập hay chưa để thêm token của user vào headers
//   const user = JSON.parse(localStorage.getItem("currentFiverrUser"));

//   if (user) {
//     // update request
//     request.headers.Authorization = `Bearer ${user.token}`;
//   }

//   // tiếp tục gửi request lên server típ
//   return request;
// });

// // Response interceptor
// fetcher.interceptors.response.use(
//   // thành công thì đi vào đây , TA CÓ THỂ THAY ĐỔI RESPONSE TRƯỚC KHI TRẢ VỀ
//   (response) => {
//     return response;
//   },
//   // lỗi thì đi vào callback này
//   (error) => {
//     // Kiểm tra nếu lỗi là 401 => token không hợp lệ => đăng xuất
//     if (error.response.status === 401) {
//       localStorage.removeItem("currentFiverrUser");
//       window.location.replace("/sign-in");
//     }

//     return Promise.reject(error);
//   }
// );

// export default fetcher;
