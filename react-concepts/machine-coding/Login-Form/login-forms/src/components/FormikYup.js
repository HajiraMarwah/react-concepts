import React from 'react'
import {useFormik} from "formik"
import * as Yup from "yup"

function FormikYup() {
  const validationSchema=Yup.object({
    email:Yup.string()
    .email("please enter valid email")
    .required("email is required"),
    password:Yup.string()
    .min(6,"please charcter should be atleast 6")
    .required("password is required")
  })
  const formik=useFormik({
      initialValues:{
        email:"",
        password:""
      },
      validationSchema,
      onSubmit:(values)=>{
        console.log("login successfully")
        alert("login successfully")
      }
  })
  return (
    <div>
     <h1>Form</h1>
     <form onSubmit={formik.handleSubmit}>
       <div>
        <label>Email</label>
        <input type='email' name='email' value={formik.values.email} onChange={formik.handleChange}/>
        {formik.touched.email && formik.errors.email?(<p style={{color:"red"}}>{formik.errors.email}</p>):null}
       </div>
              <div>
        <label>password</label>
        <input type='password' name='password' value={formik.values.password} onChange={formik.handleChange}/>
        {formik.touched.password && formik.errors.password?(<p style={{color:"red"}}>{formik.errors.password}</p>):null}

       </div>
       <button type='submit'>Login</button>
     </form>
    </div>
  )
}

export default FormikYup