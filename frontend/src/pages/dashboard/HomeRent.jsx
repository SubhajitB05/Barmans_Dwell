import React from 'react'
import { useSelector } from "react-redux";

const HomeRent = () => {
  const { isAuthenticated, role, token } = useSelector((state) => state.auth);

  return (
    <div>HomeRent</div>
  )
}

export default HomeRent