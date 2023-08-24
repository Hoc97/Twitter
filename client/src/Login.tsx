import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

const Login = () => {
  const [searchParams] = useSearchParams()
  const nav = useNavigate()
  useEffect(() => {
    const access_token = searchParams.get('access_token')
    const refresh_token = searchParams.get('refresh_token')
    const new_user = searchParams.get('new_user')
    const verify = searchParams.get('verify')
    localStorage.setItem('access_token', access_token!)
    localStorage.setItem('refresh_token', refresh_token!)
    nav('/')
  }, [searchParams])
  return (
    <>
      <div>Login</div>
    </>
  )
}

export default Login
