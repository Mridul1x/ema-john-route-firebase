import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const handleButton = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.username.value;
    console.log(email, password, name);

    setError("");

    if (password.length < 6) {
      setError("Password must be 6 character or longer");
      return;
    }

    createUser(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        console.log(user);
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
          <h1 className="text-5xl font-bold">Please Register!</h1>
        </div>
        <div className="card w-96 max-w-sm shadow-2xl bg-base-100">
          <form onSubmit={handleButton} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your Full Name"
                name="username"
                required
                className="input input-bordered"
              />
            </div>
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
              <input
                type="password"
                name="password"
                required
                placeholder="password"
                className="input input-bordered"
              />
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  Forgot password?
                </a>
              </label>
            </div>
            <p>
              Already Have an account? Please{" "}
              <Link
                className="link link-hover text-cyan-800 font-bold"
                to="/login"
              >
                Login
              </Link>{" "}
            </p>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Sign Up</button>
            </div>
            <p className="text-red-500">{error}</p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
