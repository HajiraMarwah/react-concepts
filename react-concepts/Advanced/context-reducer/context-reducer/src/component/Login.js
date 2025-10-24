import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { state, dispatch } = useContext(AuthContext);
  console.log("stateAuth",state)
  const handleLogin=()=>{
    const user={name:"hajira",email:"haj298@gmail.com"}
    dispatch({type:"LOGIN",payload:user})
  }
  const handleLogout=()=>{
    dispatch({type:"LOGOUT"})
  }
  return (
    <div>
      <h1>Login with Authentication</h1>
      {state.isAuthenticated ? (
        <>
          <p>Welcome,{state.user.name}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>Pleasin Login</p>
          <button onClick={handleLogin}>Login</button>
        </>
      )}
    </div>
  );
}

export default Login;
