import React, { useEffect } from 'react'

export const Logout = () => {

localStorage.removeItem("token")
localStorage.removeItem("loglevel")
localStorage.removeItem("role")

useEffect(()=>{
    setTimeout(()=>{
        window.location.href="/"
    }, 2000)
})




  return (
    <div>
¡Hasta pronto!
    </div>
  )
}

export default Logout;
