import API from "./axiosInstance";

//Register User
export const registerUser = async (userData) => API.post("user/register", userData);

//Login User
export const loginUser = async (credentials) => API.post("/user/login", credentials);

//Logout User
export const logoutUser = async () => API.post("/user/logout");

//Update Full Name
export const updateFullName = async (nameData) => API.patch("/user/update-fullname", nameData);

//Update Email
export const updateEmail = async (emailData) => API.patch("/user/update-email", emailData);

//Update Username
export const updateUsername = async (usernameData) => API.patch("/user/update-username", usernameData);

//Change Password
export const changePassword = async (passwordData) => API.patch("/user/change-password", passwordData);

//Forgot Password Process
export const sendForgotPasswordOTP = async (email) => API.post("/user/send-forgot-password-otp", email);
export const verifyForgotPasswordOTP = async (otpData) => API.post("/user/verify-forgot-password-otp", otpData);
export const resetPassword = async (passwordData) => API.patch("/user/forgot-password", passwordData);
