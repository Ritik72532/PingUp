import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/Authprovider";
import { Link } from "react-router-dom";
function Login() {
  const [authUser,setAuthUser] = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [backendError, setBackendError] = useState("");

  useEffect(() => {
    validate(formData);
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setBackendError(""); // clear backend error when typing
  };

  const handleBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  const validate = (data) => {
    let newErrors = {};
    if (!data.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      newErrors.email = "Invalid email format";

    if (!data.password) newErrors.password = "Password is required";
    else if (data.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validate(formData);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await axios.post(
          "/api/user/login",
          formData,
           { withCredentials: true }
        );

        alert(" Login successful!");
        console.log(response.data);

        localStorage.setItem("Pingup", JSON.stringify(response.data.user));
        setAuthUser(response.data.user);
        setFormData({ email: "", password: "" });
      } catch (error) {
        if (error.response) {
          console.log("Login Error:", error.response.data.message);
          setBackendError(error.response.data.message);
        } else {
          setBackendError("Something went wrong. Please try again.");
        }
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200">
      <form
        className="flex flex-col gap-4 bg-base-100 p-8 rounded-2xl shadow-xl w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold text-center text-primary">PingUp</h1>
        <h2 className="text-xl font-semibold text-center mb-2">Login</h2>

        {/* Email */}
        <label className="form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>
          <input
            type="email"
            name="email"
            placeholder="mail@site.com"
            className={`input input-bordered ${
              touched.email && errors.email
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
              className={`text-sm mt-1 ${
                errors.email ? "text-error" : "text-success"
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
            className={`input input-bordered ${
              touched.password && errors.password
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
              className={`text-sm mt-1 ${
                errors.password ? "text-error" : "text-success"
              }`}
            >
              {errors.password || "Looks good!"}
            </span>
          )}
        </label>

        {/* Backend Error */}
        {backendError && (
          <div className="text-error text-center text-sm mt-2">
            {backendError}
          </div>
        )}

        {/* Submit */}
        <div className="text-center mt-4">
          <p className="text-sm mb-3">
            New user?{" "}
             <Link to="/signup" className="text-primary hover:underline">
              Signup
            </Link>
          </p>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={Object.keys(errors).length > 0}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
