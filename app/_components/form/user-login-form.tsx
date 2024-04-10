'use client'

import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import CryptoJS from 'crypto-js'
import { message } from 'antd'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

const formSchema = z.object({
  username: z.string().refine((value) => value !== undefined && value !== '', {
    message: '请输入用户名',
  }),
  password: z.string().refine((value) => value !== undefined && value !== '', {
    message: '请输入密码',
  }),
})

interface IProps {
  username: string
  password: string
  onLoginSuccess: () => void
}

export function UserLoginForm(props: IProps) {
  const [messageApi, contextHolder] = message.useMessage()
  const [successStatus, setSuccessStatus] = useState(false)

  // Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: props.username,
      password: props.password,
    },
  })

  // Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const params = {
      username: values.username,
      password: CryptoJS.SHA512(values.password).toString(CryptoJS.enc.Base64),
    }

    const res = await fetch('http://10.4.150.56:8032/oauth/login/', {
      body: JSON.stringify({
        ...params,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const data = await res.json()
    if (data.code === 1000) {
      setSuccessStatus(true)
      storageUserInfo(data.data)
      messageApi.success('登录成功')
    } else {
      messageApi.error(data.msg || '未知错误')
    }
  }

  function storageUserInfo(info: any) {
    localStorage.setItem('userInfo', JSON.stringify(info))
    localStorage.setItem('token', info.token)
    localStorage.setItem('isAuth', true.toString())
    props.onLoginSuccess() // 调用父组件传递的处理登录成功的函数
  }

  return (
    <>
      {contextHolder}
      <div className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Input your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Input your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={successStatus}>
              {successStatus ? '提交成功' : '提交'}
            </Button>
          </form>
        </Form>
      </div>
    </>
  )
}
