/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { FaEnvelope, FaLock, FaSpinner } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "./styles.css";
import { useRouter } from "next/navigation";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { TResponse } from "@/types";
import { toast } from "sonner";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/features/auth/authSlice";
import { storeUserInfo } from "@/service/auth.service";
import { verifyToken } from "@/utils/verifyToken";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginMutation(undefined);
  const dispatch = useAppDispatch();

  const handleLogin = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const data = { email, password };
    const res = (await loginUser(data)) as unknown as TResponse<any>;

    if (res.error) {
      toast.error(res.error.data.message, { duration: 2000 });
    } else {
      toast.success(res.data.message, { duration: 2000 });

      const token = res.data?.data?.accessToken;
      const decoded = await verifyToken(token);

      dispatch(
        setUser({
          token: res.data?.data?.accessToken,
          user: decoded,
        })
      );

      router.push("/");

      storeUserInfo({ accessToken: token });
    }
  };

  const setDefaultValues = async () => {
    setEmail("abdullahalfahin183@gmail.com");
    setPassword("12345678");

    const data = {
      email: "abdullahalfahin183@gmail.com",
      password: "12345678",
    };
    const res = (await loginUser(data)) as unknown as TResponse<any>;

    if (res.error) {
      toast.error(res.error.data.message, { duration: 2000 });
    } else {
      toast.success(res.data.message, { duration: 2000 });

      const token = res.data?.data?.accessToken;
      const decoded = await verifyToken(token);

      dispatch(
        setUser({
          token: res.data?.data?.accessToken,
          user: decoded,
        })
      );
      router.push("/");

      storeUserInfo({ accessToken: token });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <div className="container">
      <form onSubmit={handleLogin} className="card">
        <h1 className="title">Welcome Back!</h1>
        <p className="subtitle">Please login to your account</p>

        <div className="inputGroup">
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="inputGroup">
          <FaLock className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="passwordToggle"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible className="icon" />
            ) : (
              <AiOutlineEye className="icon" />
            )}
          </button>
        </div>

        <button type="submit" className="button">
          {isLoading ? <FaSpinner className="loadingSpinner" /> : "Sign Up"}
        </button>

        <button
          type="button"
          className="defaultButton"
          onClick={setDefaultValues}
        >
          Quick login
        </button>

        <p className="signup">
          Don&apos;t have an account?{" "}
          <span onClick={() => router.push("/signup")}>Sign Up</span>
        </p>
      </form>
    </div>
  );
};

export default Login;
