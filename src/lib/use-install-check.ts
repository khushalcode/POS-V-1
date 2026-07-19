'use client'

import { useState, useEffect } from 'react'

const TRIAL_DAYS = 365
const INSTALL_KEY = 'servingsync-install-date'

export function useInstallCheck() {
  const [status, setStatus] = useState<'loading' | 'active' | 'expired' | 'device_locked'>('loading')
  const [daysLeft, setDaysLeft] = useState<number | null>(null)
  const [installDate, setInstallDate] = useState<string | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    let storedDate = localStorage.getItem(INSTALL_KEY)
    if (!storedDate) {
      storedDate = new Date().toISOString()
      localStorage.setItem(INSTALL_KEY, storedDate)
    }
    const installed = new Date(storedDate)
    const expiresAt = new Date(installed)
    expiresAt.setDate(expiresAt.getDate() + TRIAL_DAYS)
    const now = new Date()
    setInstallDate(storedDate)
    if (now < expiresAt) {
      const left = Math.ceil((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      setStatus('active')
      setDaysLeft(left)
    } else {
      const newDate = new Date().toISOString()
      localStorage.setItem(INSTALL_KEY, newDate)
      setStatus('active')
      setDaysLeft(TRIAL_DAYS)
    }
  }, [])

  return { status, daysLeft, installDate }
}
