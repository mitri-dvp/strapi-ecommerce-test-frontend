import { useEffect, useContext } from 'react'
import { API_URL } from '../../../utils/urls'

import AuthContext from '../../../context/AuthContext'

export default function Facebook() {
  
  const { login } = useContext(AuthContext)

  useEffect(async () => {
    console.log(location.search)
    const res = await fetch(`${API_URL}/auth/facebook/callback${location.search}`)
    const data = await res.json()
    console.log(data)
    sessionStorage.setItem('jwt', data.jwt)
    login(data.user.email)
  }, [])


  return (
    <div className='spinner'></div>
  )
}
