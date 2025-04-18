'use client'

import { useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export function useUpdateSearchParams() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateSearchParams = useCallback(
    (params) => {
      const updatedParams = new URLSearchParams(searchParams.toString())

      Object.entries(params).forEach(([name, value]) => {
        if (value === null || value === undefined) {
          updatedParams.delete(name)
        } else {
          updatedParams.set(name, encodeURIComponent(value))
        }
      })

      router.push(pathname + '?' + updatedParams.toString())
    },
    [searchParams, pathname, router]
  )

  return updateSearchParams
}
