import API from "./axiosInstance";

//Send OTP
export const sendOTP = async (email) => API.post("/send-otp", email);

//Verify OTP
export const verifyOTP = async (otpData) => API.post("/verify-otp", otpData);
