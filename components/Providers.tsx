// components/Providers.tsx
'use client'

import { type PropsWithChildren } from 'react'
import { PostHogProvider } from 'posthog-js/react'
import { posthog } from '@/lib/posthog'
import { Analytics } from '@vercel/analytics/react'

export default function Providers({ children }: PropsWithChildren) {
  return (
    <PostHogProvider client={posthog}>
      {children}
      <Analytics />
    </PostHogProvider>
  )
}