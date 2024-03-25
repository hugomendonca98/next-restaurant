'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAuth } from '@/hooks/useAuth'

type Inputs = {
  username: string
  email: string
  password: string
}

export function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const { handleCreateUser, loading } = useAuth()

  const onSubmit: SubmitHandler<Inputs> = async (data) =>
    await handleCreateUser({
      username: data.username,
      email: data.email,
      password: data.password,
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center min-h-[600px] py-12 px-4 space-y-6 md:px-6 flex-col">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Criar Conta</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Insira suas informações para criar uma conta
          </p>
        </div>
        <div className="w-full max-w-sm space-y-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">Nome</Label>
            <Input
              id="first-name"
              placeholder="John"
              {...register('username', { required: true })}
            />
            {errors.username && (
              <span className="text-red-500 block mt-2">
                O campo de nome é obrigatório.
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="johndoe@example.com"
              {...register('email', { required: true })}
              type="email"
            />
            {errors.email && (
              <span className="text-red-500 block mt-2">
                O campo de email é obrigatório.
              </span>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              {...register('password', { required: true })}
              type="password"
            />
            {errors.password && (
              <span className="text-red-500 block mt-2">
                O campo de senha é obrigatório.
              </span>
            )}
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            Criar Conta
          </Button>
        </div>
        <div className="space-y-2 text-center w-full">
          <p className="text-sm">
            Já possui conta?
            <Link className="underline ml-1" href="/">
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </form>
  )
}
