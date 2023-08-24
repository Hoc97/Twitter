import { Link } from 'react-router-dom'
import './App.css'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { useState } from 'react'

const getGoogleAuthUrl = () => {
  const { VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta.env
  const url = `https://accounts.google.com/o/oauth2/v2/auth`
  const query = {
    client_id: VITE_GOOGLE_CLIENT_ID,
    redirect_uri: VITE_GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'].join(
      ' '
    ),
    prompt: 'consent',
  }
  const queryString = new URLSearchParams(query).toString()
  return `${url}?${queryString}`
}
const googleOauthUrL = getGoogleAuthUrl()

const Home = () => {
  const [isLogin, setIsLogin] = useState(Boolean(localStorage.getItem('access_token')))
  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setIsLogin(false)
  }
  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <video width='750' controls>
        <source src='http://localhost:8081/static/video-stream/d3853c7468b62425d172c9400.mp4' type='video/mp4' />
      </video>
      <h1>Google Oauth 2.0</h1>
      {isLogin ? (
        <>
          <span>Hello My friend, you're logged in</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <Link to={googleOauthUrL}>Login with google</Link>
      )}
    </>
  )
}

export default Home
