'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Form, Button, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import CryptoJS from 'crypto-js'

const LoginForm = () => {
  const [messageApi, contextHolder] = message.useMessage()
  const nav = useRouter()
  const [loading, setLoading] = useState<boolean>(false)

  return (
    <>
      {contextHolder}
      <Form
        className="p-[30px]"
        labelCol={{ span: 6 }}
        onFinish={async (v) => {
          const params = {
            username: v.username,
            password: CryptoJS.SHA512(v.password).toString(CryptoJS.enc.Base64),
          }
          setLoading(true)
          await fetch('http://10.4.150.56:8032/oauth/login/', {
            method: 'POST',
            body: JSON.stringify(params),
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then((response) => {
              console.log(response)
              setLoading(false)
              if (!response.ok) {
                throw new Error('网络请求失败')
              }
              return response.json()
            })
            .then((res) => {
              console.log(res)
              const { code, data, msg } = res
              if (code === 1000) {
                localStorage.setItem('token', data.token)
                localStorage.setItem('userInfo', JSON.stringify(data))
                nav.push('/dashboard')
              } else {
                messageApi.error(msg)
              }
            })
        }}
      >
        <Form.Item name="username">
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item name="password">
          <Input prefix={<LockOutlined className="site-form-item-icon" />} placeholder="请输入密码" />
        </Form.Item>
        <Form.Item>
          <Button className="bg-[#00b96b] hover:!bg-[#009456]" block type="primary" loading={loading} htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}

export default LoginForm
