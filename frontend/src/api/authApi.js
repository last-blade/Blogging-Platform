import API from "./axiosInstance";

//Register User
export const registerUser = async (userData) => API.post("/register", userData);

//Login User
export const loginUser = async (credentials) => API.post("/login", credentials);

//Logout User
export const logoutUser = async () => API.post("/logout");

//Update Full Name
export const updateFullName = async (nameData) => API.patch("/update-fullname", nameData);

//Update Email
export const updateEmail = async (emailData) => API.patch("/update-email", emailData);

//Update Username
export const updateUsername = async (usernameData) => API.patch("/update-username", usernameData);

//Change Password
export const changePassword = async (passwordData) => API.patch("/change-password", passwordData);

//Forgot Password Process
export const sendForgotPasswordOTP = async (email) => API.post("/send-forgot-password-otp", email);
export const verifyForgotPasswordOTP = async (otpData) => API.post("/verify-forgot-password-otp", otpData);
export const resetPassword = async (passwordData) => API.patch("/forgot-password", passwordData);
