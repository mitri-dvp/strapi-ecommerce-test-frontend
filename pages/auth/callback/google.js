import { useEffect, useContext } from 'react'
import { API_URL } from '../../../utils/urls'

import AuthContext from '../../../context/AuthContext'

export default function Google() {
  
  const { login } = useContext(AuthContext)

  useEffect(async () => {
    const res = await fetch(`${API_URL}/auth/google/callback?${location.search}`)
    const data = await res.json()
    sessionStorage.setItem('jwt', data.jwt)
    login(data.user.email)
  }, [])


  return (
    <div className='spinner'></div>
  )
}
