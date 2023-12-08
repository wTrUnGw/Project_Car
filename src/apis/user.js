import fetcher from "./fetcher";

// ĐĂNG KÝ
export const signup = async (payload) => {
  try {
    const response = await fetcher.post("/signup", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};

// ĐĂNG NHẬP
export const login = async (payload) => {
  try {
    const response = await fetcher.post("/login", payload);
    return response.data?.content;
  } catch (error) {
    throw error.response.data?.content;
  }
};
