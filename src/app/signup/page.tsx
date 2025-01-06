/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaUpload,
  FaEye,
  FaEyeSlash,
  FaSpinner,
} from "react-icons/fa";
import "./styles.css";
import Link from "next/link";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { uploadImageToImgBB } from "@/utils/uploadImagetoimgbb";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { TResponse } from "@/types";
import { toast } from "sonner";
import { verifyToken } from "@/utils/verifyToken";
import { useAppDispatch } from "@/redux/hook";
import { setUser } from "@/redux/features/auth/authSlice";
import { storeUserInfo } from "@/service/auth.service";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profilePicture: null,
  });
  const [createUser, { isLoading }] = useRegisterMutation(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    setFormData((prev) => ({ ...prev, profilePicture: file }));

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword((prev) => !prev);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData((prev) => ({ ...prev, profilePicture: null }));
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const eventTarget = e.target as HTMLFormElement;
    let image = "";
    if (imagePreview) {
      const imageFile = eventTarget.profilePicture?.files[0];
      image = await uploadImageToImgBB(imageFile);
    }

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      profilePicture: image,
    };

    const res = (await createUser(data)) as unknown as TResponse<any>;

    if (res.error) {
      toast.error(res.error.data.message, {
        duration: 2000,
      });
    } else {
      toast.success(res.data.message, {
        duration: 2000,
      });

      const token = res.data?.data?.accessToken;
      const decoded = await verifyToken(token);

      dispatch(
        setUser({
          token: res.data?.data?.accessToken,
          user: decoded,
        })
      );

      // router.push("/");
      storeUserInfo({ accessToken: token });

      setFormData({
        name: "",
        email: "",
        password: "",
        profilePicture: null,
      });
      setImagePreview(null);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-card">
        <h1 className="signup-title">Create an Account</h1>
        <p className="signup-subtitle">Join us and enjoy the journey!</p>

        <div className="inputGroup">
          <FaUser className="icon" />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="inputGroup">
          <FaEnvelope className="icon" />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="inputGroup">
          <FaLock className="icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={handlePasswordToggle}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="inputGroup fileInput">
          <FaUpload className="icon uploadIcon" />
          <label className="fileLabel">
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className="hiddenInput"
            />
            Upload Profile Picture
          </label>
        </div>

        <div className="imageUpload">
          {imagePreview && (
            <div className="imagePreview">
              <Image
                src={imagePreview}
                alt="Profile Preview"
                width={50}
                height={50}
                className="previewImage"
              />
              <button
                type="button"
                className="removeImageButton"
                onClick={removeImage}
              >
                <AiOutlineClose />
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="profileImage"
            style={{ display: "none" }}
          />
        </div>

        <button disabled={isLoading} type="submit" className="signup-button">
          {isLoading ? <FaSpinner className="loadingSpinner" /> : "Sign Up"}
        </button>

        <p className="signup-footer">
          Already have an account? <Link href={"/login"}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
