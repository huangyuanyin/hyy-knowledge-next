'use client'
import LoginForm from './_components/LoginForm'

const LoginPage = () => {
  return (
    <div className={`w-[100vw] h-[100vh] flex items-center justify-center bg-[url('../assets/img/login-bg.jpg')]`}>
      <div className="absolute w-[350px] rounded-[5px] bg-[rgba(255,255,255,0.3)] overflow-hidden">
        <div className="w-[100%] text-center text-[#fff] text-[20px] leading-[50px] border-b-[1px] border-solid border-[#ddd]">
          信安知识库
        </div>
        <LoginForm />
      </div>
    </div>
  )
}

export default LoginPage
