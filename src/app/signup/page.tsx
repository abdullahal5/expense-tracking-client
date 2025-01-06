"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUpload, FaUser } from "react-icons/fa";
import styles from "./Signup.module.css";
import Image from "next/image";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { useRouter } from "next/navigation";
import { uploadImageToImgBB } from "@/utils/uploadImagetoimgbb";
import { verifyToken } from "@/utils/verifyToken";
import { setUser } from "@/redux/features/auth/authSlice";
import { storeUserInfo } from "@/service/auth.service";
import { toast } from "sonner";
import { TResponse } from "@/types";

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
  const router = useRouter();

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

      router.push("/");
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
    <div className={styles.signupContainer}>
      <form onSubmit={handleSignup} className={styles.signupCard}>
        <h1 className={styles.signupTitle}>Create an Account</h1>
        <p className={styles.signupSubtitle}>Join us and enjoy the journey!</p>

        <div className={styles.inputGroup}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <FaEnvelope className={styles.icon} />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputGroup}>
          <FaLock className={styles.icon} />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={handlePasswordToggle}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className={`${styles.inputGroup} ${styles.fileInput}`}>
          <FaUpload className={styles.icon} />
          <label className={styles.fileLabel}>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className={styles.hiddenInput}
            />
            Upload Profile Picture
          </label>
        </div>

        <div className={styles.imageUpload}>
          {imagePreview && (
            <div className={styles.imagePreview}>
              <Image
                src={imagePreview}
                alt="Profile Preview"
                width={100}
                height={100}
                className={styles.previewImage}
              />
              <button
                type="button"
                className={styles.removeImageButton}
                onClick={() => {
                  setImagePreview(null);
                  setFormData((prev) => ({ ...prev, profilePicture: null }));
                }}
              >
                X
              </button>
            </div>
          )}
        </div>

        <button
          type="submit"
          className={styles.signupButton}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className={styles.loadingSpinner}></div>
          ) : (
            "Sign Up"
          )}
        </button>

        <p className={styles.signupFooter}>
          Already have an account?{" "}
          <span className={styles.link} onClick={() => router.push("/login")}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Signup;
