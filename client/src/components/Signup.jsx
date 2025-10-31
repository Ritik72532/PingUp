
import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/Authprovider";
import { Link } from "react-router-dom";
function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  //  Live validation
  useEffect(() => {
    validate(formData);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validate = (data) => {
    let newErrors = {};

    if (!data.fullName.trim()) newErrors.fullName = "Full name is required";

    if (!data.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      newErrors.email = "Invalid email format";

    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(data.password))
      newErrors.password =
        "Must include uppercase, lowercase, and a number";

    if (data.password !== data.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate(formData);

    if (Object.keys(errors).length === 0) {
      const userInfo = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      axios
        .post("/api/user/signup", userInfo, { withCredentials: true })
        .then((response) => {
          // console.log(response.data);
          if (response.data) {
            alert(" Successfully signed up!");
          }
          localStorage.setItem("Pingup", JSON.stringify(response.data.user));
          setAuthUser(response.data.user);
        })
        .catch((error) => {
          console.log(error);
          if (error.response) {
            // data.message the message keyword is important as i define it in backend if in backend it is error then here we write like data.error 
            alert(` ${error.response.data.message}`);
          }
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <form
        className="flex flex-col gap-4 bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center text-primary">PingUp</h1>
        <h2 className="text-xl font-semibold text-center mb-2">Sign Up</h2>

        {/* Full Name */}
        <label className="form-control">
          <div className="label">
            <span className="label-text">Full Name</span>
          </div>
          <input
            type="text"
            name="fullName"
            placeholder="Your name"
            className={`input input-bordered ${touched.fullName && errors.fullName
                ? "input-error"
                : touched.fullName && !errors.fullName
                  ? "input-success"
                  : ""
              }`}
            value={formData.fullName}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.fullName && (
            <span
              className={`text-sm mt-1 ${errors.fullName ? "text-error" : "text-success"
                }`}
            >
              {errors.fullName || "Looks good!"}
            </span>
          )}
        </label>

        {/* Email */}
        <label className="form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            name="email"
            placeholder="mail@site.com"
            className={`input input-bordered ${touched.email && errors.email
                ? "input-error"
                : touched.email && !errors.email
                  ? "input-success"
                  : ""
              }`}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.email && (
            <span
              className={`text-sm mt-1 ${errors.email ? "text-error" : "text-success"
                }`}
            >
              {errors.email || "Valid email!"}
            </span>
          )}
        </label>

        {/* Password */}
        <label className="form-control">
          <div className="label">
            <span className="label-text">Password</span>
          </div>
          <input
            type="password"
            name="password"
            placeholder="********"
            className={`input input-bordered ${touched.password && errors.password
                ? "input-error"
                : touched.password && !errors.password
                  ? "input-success"
                  : ""
              }`}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.password && (
            <span
              className={`text-sm mt-1 ${errors.password ? "text-error" : "text-success"
                }`}
            >
              {errors.password || "Strong password!"}
            </span>
          )}
        </label>

        {/* Confirm Password */}
        <label className="form-control">
          <div className="label">
            <span className="label-text">Confirm Password</span>
          </div>
          <input
            type="password"
            name="confirmPassword"
            placeholder="********"
            className={`input input-bordered ${touched.confirmPassword && errors.confirmPassword
                ? "input-error"
                : touched.confirmPassword && !errors.confirmPassword
                  ? "input-success"
                  : ""
              }`}
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {touched.confirmPassword && (
            <span
              className={`text-sm mt-1 ${errors.confirmPassword ? "text-error" : "text-success"
                }`}
            >
              {errors.confirmPassword || "Passwords match!"}
            </span>
          )}
        </label>

        {/* Submit */}
        <div className="text-center mt-4">
          <p className="text-sm mb-3">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline">
              Login
            </Link>
          </p>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={Object.keys(errors).length > 0}
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
