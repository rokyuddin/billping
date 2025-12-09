'use client'

import { useState, useEffect } from 'react'
import { Bell, BellOff, Check, Loader2 } from 'lucide-react'
import { 
  registerPushNotifications, 
  unregisterPushNotifications,
  savePushSubscription,
  removePushSubscription 
} from '@/lib/push-notifications'

export default function PushNotificationToggle({
  enabled,
  onToggle,
}: {
  enabled: boolean
  onToggle: (enabled: boolean) => void
}) {
  const [isSupported, setIsSupported] = useState(false)
  const [isRegistering, setIsRegistering] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [permission, setPermission] = useState<NotificationPermission | null>(null)

  useEffect(() => {
    // Check if push notifications are supported
    if ('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      setPermission(Notification.permission)
    }
  }, [])

  const handleToggle = async () => {
    if (!isSupported) {
      setError('Push notifications are not supported in your browser')
      return
    }

    setIsRegistering(true)
    setError(null)
    setSuccess(null)

    try {
      if (!enabled) {
        // Enable push notifications
        const subscription = await registerPushNotifications()
        
        if (subscription) {
          // Save subscription to server
          const saved = await savePushSubscription(subscription)
          
          if (saved) {
            setPermission(Notification.permission)
            onToggle(true)
            setSuccess('Push notifications enabled successfully!')
            
            // Show a test notification
            if (Notification.permission === 'granted') {
              new Notification('BillPing Notifications Enabled', {
                body: 'You will now receive reminders for upcoming bills',
                icon: '/icon-192.png',
                tag: 'billping-welcome'
              })
            }
          } else {
            setError('Failed to save notification settings. Please try again.')
          }
        } else {
          setError('Failed to enable notifications. Please check your browser permissions.')
          setPermission(Notification.permission)
        }
      } else {
        // Disable push notifications
        const unsubscribed = await unregisterPushNotifications()
        const removed = await removePushSubscription()
        
        if (unsubscribed || removed) {
          onToggle(false)
          setSuccess('Push notifications disabled')
        } else {
          setError('Failed to disable notifications')
        }
      }
    } catch (err) {
      console.error('Push notification error:', err)
      setError('An error occurred. Please try again.')
    } finally {
      setIsRegistering(false)
      
      // Clear success message after 3 seconds
      if (success) {
        setTimeout(() => setSuccess(null), 3000)
      }
    }
  }

  if (!isSupported) {
    return (
      <div className="flex items-center justify-between p-4 border-2 border-border bg-muted/30">
        <div>
          <p className="font-bold text-muted-foreground">Push Notifications</p>
          <p className="text-sm text-muted-foreground">Not supported in your browser</p>
        </div>
        <BellOff className="w-6 h-6 text-muted-foreground" />
      </div>
    )
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between p-4 border-2 border-border">
        <div className="flex-1">
          <p className="font-bold">Push Notifications</p>
          <p className="text-sm text-muted-foreground">
            {permission === 'denied' 
              ? 'Permission blocked - check browser settings' 
              : enabled
              ? 'Enabled - You will receive browser notifications'
              : 'Receive browser push notifications'}
          </p>
        </div>
        <button
          onClick={handleToggle}
          disabled={isRegistering || permission === 'denied'}
          className={`relative w-14 h-7 rounded-full border-2 border-border transition-colors ${
            enabled ? 'bg-accent' : 'bg-muted'
          } ${isRegistering || permission === 'denied' ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
          aria-label={enabled ? 'Disable push notifications' : 'Enable push notifications'}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-card border-2 border-border rounded-full transition-transform ${
              enabled ? 'translate-x-7' : ''
            } flex items-center justify-center`}
          >
            {isRegistering ? (
              <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
            ) : enabled ? (
              <Check className="w-3 h-3 text-accent" />
            ) : (
              <Bell className="w-3 h-3 text-muted-foreground" />
            )}
          </span>
        </button>
      </div>
      
      {error && (
        <div className="px-4 py-2 bg-destructive/10 border-l-4 border-l-destructive">
          <p className="text-sm text-destructive font-medium">{error}</p>
        </div>
      )}
      
      {success && (
        <div className="px-4 py-2 bg-accent/10 border-l-4 border-l-accent">
          <p className="text-sm text-accent-foreground font-medium">{success}</p>
        </div>
      )}
      
      {permission === 'denied' && (
        <div className="px-4 py-2 bg-muted/50 border-l-4 border-l-muted-foreground">
          <p className="text-xs text-muted-foreground">
            To enable notifications, please update your browser settings and reload the page.
          </p>
        </div>
      )}
    </div>
  )
}
