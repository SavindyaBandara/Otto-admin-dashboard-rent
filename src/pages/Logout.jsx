import React, {useEffect} from 'react'
import { useNavigate } from "react-router-dom";

const Logout = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    const handleLogOut = () => {
      localStorage.removeItem('authToken');
      navigate("/");
    };
    handleLogOut()
  })
  
  return (
    <div>
      <h1>Logout</h1>
    </div>
  )
}

export default Logout
