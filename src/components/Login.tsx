'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

type Inputs = {
  email: string
  password: string
}

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const { handleSign, loading } = useAuth()

  const onSubmit: SubmitHandler<Inputs> = async (data) =>
    await handleSign({
      email: data.email,
      password: data.password,
    })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center min-h-[600px] py-12 px-4 space-y-6 md:px-6 flex-col">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Bem vindo de volta</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Digite seu e-mail abaixo para fazer login em sua conta
          </p>
        </div>
        <div className="w-full max-w-sm space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              type="email"
              {...register('email', { required: true })}
            />
            {errors.email && (
              <span className="text-red-500 block mt-2">
                O campo de email é obrigatório.
              </span>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Senha</Label>
              <Link className="ml-auto inline-block text-sm underline" href="#">
                Esqueceu sua senha?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              {...register('password', { required: true })}
            />
            {errors.password && (
              <span className="text-red-500 block mt-2">
                O campo de senha é obrigatório.
              </span>
            )}
          </div>
          <Button className="w-full" type="submit" disabled={loading}>
            {!loading ? (
              'Entrar'
            ) : (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
          </Button>
          <Button className="w-full" variant="outline" disabled={loading}>
            Entrar com Google
          </Button>
        </div>
        <div className="space-y-2 text-center w-full">
          <p className="text-sm">
            Não tem uma conta?
            <Link className="underline ml-1" href="/?createAccount=true">
              Criar conta
            </Link>
          </p>
        </div>
      </div>
    </form>
  )
}
