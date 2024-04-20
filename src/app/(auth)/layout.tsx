import { Package2Icon, SearchIcon } from '@/components/icons/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { MenuIcon, UserCircleIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

interface LayoutProps {
  children: React.ReactNode
}

export default function layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen w-full flex-col relative z-20">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
            href="#"
          >
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Next restaurant</span>
          </Link>
          <Link
            className="text-foreground transition-colors hover:text-foreground"
            href="/dashboard"
          >
            Dashboard
          </Link>
          <Link
            className="text-muted-foreground transition-colors hover:text-foreground"
            href="/orders"
          >
            Pedidos
          </Link>
          <Link
            className="text-muted-foreground transition-colors hover:text-foreground"
            href="/products"
          >
            Produtos
          </Link>
          <Link
            className="text-muted-foreground transition-colors hover:text-foreground"
            href="#"
          >
            Clientes
          </Link>
          <Link
            className="text-muted-foreground transition-colors hover:text-foreground"
            href="#"
          >
            Analytics
          </Link>
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              className="shrink-0 md:hidden"
              size="icon"
              variant="outline"
            >
              <MenuIcon className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="z-50">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                className="flex items-center gap-2 text-lg font-semibold"
                href="#"
              >
                <Package2Icon className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              <Link className="hover:text-foreground" href="#">
                Dashboard
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground"
                href="#"
              >
                Orders
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground"
                href="#"
              >
                Products
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground"
                href="#"
              >
                Customers
              </Link>
              <Link
                className="text-muted-foreground hover:text-foreground"
                href="#"
              >
                Analytics
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <form className="ml-auto flex-1 sm:flex-initial">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                placeholder="Pesquisar produtos..."
                type="search"
              />
            </div>
          </form>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="rounded-full" size="icon" variant="secondary">
                <UserCircleIcon className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Configurações</DropdownMenuItem>
              <DropdownMenuItem>Suporte</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Sair</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  )
}
