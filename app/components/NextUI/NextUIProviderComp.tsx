'use client'

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider } from 'next-themes';
import { dark, light } from './themes';

export default function NextUIProviderComp({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      defaultTheme='system'
      enableSystem={true}
      attribute="class"
      value={{
        light: light.className,
        dark: dark.className
      }}
    >
      <NextUIProvider>
        {children}
      </NextUIProvider>
    </ThemeProvider>
  )
}