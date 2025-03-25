import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/Button";
import Logo from "../../components/Logo";

const VerifyOTP = ({ length = 4, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputsRef = useRef([]);

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }

    // Callback when all fields are filled
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="flex justify-center gap-4 p-6 items-center min-h-screen flex-col">
      <Logo />
      <h2 className="text-2xl font-bold text-center">Verify OTP</h2>
      <div className="flex justify-center gap-4 p-6">
        {otp.map((digit, index) => (
          <motion.input
            key={index}
            ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            className="w-14 h-14 md:w-16 md:h-16 text-center text-2xl md:text-3xl font-bold bg-transparent text-white rounded-xl shadow-xl border-[1px] border-[#2563EB] focus:border-none focus:outline-none focus:ring-4 focus:ring-[#2563EB] transition-all backdrop-blur-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
        ))}
      </div>
      <Button type='submit' size="xl" disabled={!otp.every((digit) => digit !== "")}>
        Verify
      </Button>
    </div>
  );
};

export default VerifyOTP;