import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { clearChats } from '@/app/actions'
import { Button, buttonVariants } from '@/components/ui/button'
import { Sidebar } from '@/components/sidebar'
import { SidebarList } from '@/components/sidebar-list'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { SidebarFooter } from '@/components/sidebar-footer'
import { ThemeToggle } from '@/components/theme-toggle'
import { ClearHistory } from '@/components/clear-history'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'

async function UserOrLogin() {
  const session = {
    user: {}
  }
  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={"abchsfef"} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/" target="_blank" rel="nofollow">
          <IconNextChat className="w-6 h-6 mr-2 dark:hidden" inverted />
          <IconNextChat className="hidden w-6 h-6 mr-2 dark:block" />
        </Link>
      )}
      
    </>
  )
}

export function Header() {
  return (
    <header className="sticky font-bold top-0 z-50 flex items-center justify-between w-full h-16 px-4 border-b shrink-0 bg-gradient-to-b from-background/10 via-background/50 to-background/80 backdrop-blur-xl">
      Connect
    </header>
  )
}
