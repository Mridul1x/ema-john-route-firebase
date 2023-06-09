import React, { useState } from "react";
import { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";


const Login = () => {
  const { userSignIn } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [check, setCheck] = useState(false);

  const handleButton = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    const from = location.state?.from?.pathname || "/";

    form.reset();
    setSuccess("");
    setError("");
    userSignIn(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        console.log(user);
        setSuccess("Login Successful");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
        setError(errorMessage);
      });
  };

  return (
    <div className="hero mt-12">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card w-96 max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleButton} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
                name="email"
                required
                className="input input-bordered"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <div></div>
              <input
                type={check ? "text" : "password"}
                name="password"
                required
                placeholder="password"
                className="input input-bordered"
              />
              <input
                onChange={() => setCheck(!check)}
                type="checkbox"
                className="toggle mt-2"
              />

              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <p>
              New to this website? Please{" "}
              <Link
                className="link link-hover text-cyan-800 font-bold"
                to="/signup"
              >
                Register
              </Link>{" "}
            </p>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
            <p className="text-red-500">{error}</p>
            <p className="text-green-500">{success}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
