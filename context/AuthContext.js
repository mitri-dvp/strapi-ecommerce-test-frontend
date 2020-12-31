import { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { API_URL } from '../utils/urls'

import styles from '../styles/Auth.module.css'


const AuthContext = createContext()

export const AuthProvider = (props) => {

  const [user, setUser] = useState(null)
  const [product, setProduct] = useState(null)
  const router = useRouter()

  const login = async (email) => {
    setUser({ email })
    router.push('/')
  }

  const logout = async () => {
    sessionStorage.setItem('jwt', '')
    setUser(null)
    router.push('/')
  }

  const getToken = () => {
    if(sessionStorage.getItem('jwt')) return sessionStorage.getItem('jwt')
    return null
  }

  const GoogleLoginBtn = () => {
    return (
      <div>
        <button className={styles.login}
          onClick={() =>
            (window.location = `${API_URL}/connect/google`)
          }>
            <div className={styles.login_div}><svg width="18" height="18" xmlns="http://www.w3.org/2000/svg"><g fill="#000" fillRule="evenodd"><path d="M9 3.48c1.69 0 2.83.73 3.48 1.34l2.54-2.48C13.46.89 11.43 0 9 0 5.48 0 2.44 2.02.96 4.96l2.91 2.26C4.6 5.05 6.62 3.48 9 3.48z" fill="#EA4335"></path><path d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z" fill="#4285F4"></path><path d="M3.88 10.78A5.54 5.54 0 0 1 3.58 9c0-.62.11-1.22.29-1.78L.96 4.96A9.008 9.008 0 0 0 0 9c0 1.45.35 2.82.96 4.04l2.92-2.26z" fill="#FBBC05"></path><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.4-1.57-5.12-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z" fill="#34A853"></path><path fill="none" d="M0 0h18v18H0z"></path></g></svg></div><span className={styles.login_span}>Log in with Google</span>
        </button>
      </div>
    )
  }

  const FacebookLoginBtn = () => {
    return (
      <div>
        <button className={styles.login}
          onClick={() =>
            (window.location = `${API_URL}/connect/facebook`)
          }>
          <div className={styles.login_div}>
            <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 167.657 167.657">
              <g fill="#1278f3"><path d="M83.829,0.349C37.532,0.349,0,37.881,0,84.178c0,41.523,30.222,75.911,69.848,82.57v-65.081H49.626 v-23.42h20.222V60.978c0-20.037,12.238-30.956,30.115-30.956c8.562,0,15.92,0.638,18.056,0.919v20.944l-12.399,0.006 c-9.72,0-11.594,4.618-11.594,11.397v14.947h23.193l-3.025,23.42H94.026v65.653c41.476-5.048,73.631-40.312,73.631-83.154
                C167.657,37.881,130.125,0.349,83.829,0.349z"/></g>
            </svg>
          </div><span className={styles.login_span}>Log in with Facebook</span>
        </button>
      </div>
    )
  }

  const GoogleLogoutBtn = () => {
    return (
        <button className={styles.login}
        onClick={logout}>
          <span className={styles.logout}>Log out</span>
      </button>
    )
  }

  useEffect(async () => {
    const token = await getToken()
    if(token) {
      const user = await fetch(`${API_URL}/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      const data = await user.json()
      setUser({ email: data.email });
    }
  }, []);

    return (
    <AuthContext.Provider value={{user, login, logout, product, setProduct, getToken, GoogleLoginBtn, GoogleLogoutBtn, FacebookLoginBtn}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthContext