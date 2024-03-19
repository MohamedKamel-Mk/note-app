import { useFormik } from "formik";
import notesImg from "../../images/notes1.png";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  let [signUpMsg, setSignUpMsg] = useState();
  let [signUpFaildMsg, setSignUpFaildMsg] = useState();
  let navigate = useNavigate()

  let validationSchema = yup.object({
    name: yup
      .string()
      .min(3, "Minimum 3 chars")
      .max(40, "Maximum 40 chars")
      .required("name is required"),
    email: yup
      .string()
      .email("Please enter valid Email")
      .required("Email is required"),
    password: yup
      .string()
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
        "at least uppercase, lowercase one digit, special char allowed"
      )
      .required("password is required"),
    age: yup
      .number()
      .min(16, "Under Age")
      .max(80, "Over Age")
      .required("Age is required"),
    phone: yup
      .string()
      .matches(/^01[0125][0-9]{8}$/, "please enter egyption number")
      .required("Phone is required"),
  });
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema,
    // validate: function (values) {
    //   console.log(values);
    //   console.log(formik.errors);
    // },
    onSubmit: signUp,
  });
  function signUp(values) {
    console.log(values);
    axios
      .post(`https://note-sigma-black.vercel.app/api/v1/users/signUp`, values)
      .then((res) => {
        console.log(res);
        setSignUpMsg(res.data.msg);
        navigate("/login")
      })
      .catch((err) => {
        console.log(err);
        setSignUpFaildMsg(err.response.data.msg);
      });
  }
  function clearMsg() {
    setSignUpMsg("");
    setSignUpFaildMsg("");
  }
  return (
    <>
      <li className="fixed-top p-3 pe-lg-5 d-lg-flex d-none  ">
        {/* <i className="fa-regular fa-note-sticky text-info fs-2"></i> */}
        <p className="ps-2 fs-4 fw-bold"></p>
      </li>
      <div className="container">
        <div className="row">
          <div className="col-lg-5 d-none d-lg-flex justify-content-center align-items-center">
            <img className="w-100 p-5" src={notesImg} alt="" />
          </div>
          <div className="col-lg-7">
            <div className="min-vh-100 d-flex justify-content-center align-items-center text-center signup-container">
              <div className="bg-light bg-opacity-25 shadow w-100 mx-auto  p-5 rounded-2">
                <h1 className="fw-bold">Sign Up Now</h1>
                <div className="pt-3">
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      onFocus={clearMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Enter Your Name"
                    />
                    {formik.touched.name ? (
                      <p className="bg-danger text-white">
                        {formik.errors.name}
                      </p>
                    ) : null}
                    <input
                    onFocus={clearMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Your Email"
                    />
                    {formik.touched.email ? (
                      <p className="bg-danger text-white">
                        {formik.errors.email}
                      </p>
                    ) : null}
                    <input
                    onFocus={clearMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Enter Your Password"
                    />
                    {formik.touched.password ? (
                      <p className="bg-danger text-white">
                        {formik.errors.password}
                      </p>
                    ) : null}
                    <input
                    onFocus={clearMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="number"
                      name="age"
                      id="age"
                      placeholder="Enter Your Age"
                    />
                    {formik.touched.age ? (
                      <p className="bg-danger text-white">
                        {formik.errors.age}
                      </p>
                    ) : null}
                    <input
                    onFocus={clearMsg}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      className="form-control my-2"
                      type="text"
                      name="phone"
                      id="phone"
                      placeholder="Enter Your Phone Number"
                    />
                    {formik.touched.phone ? (
                      <p className="bg-danger text-white">
                        {formik.errors.phone}
                      </p>
                    ) : null}
                    <button
                      type="submit"
                      className="btn btn-info text-light w-100 rounded-2 mt-2"
                    >
                      Sign Up
                    </button>
                    {signUpMsg ? <p>{signUpMsg}</p> : null}
                    {signUpFaildMsg ? <p>{signUpFaildMsg}</p> : null}
                  </form>
                  <p>Already Have Account ? <Link to={'/login'}>Login</Link></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
