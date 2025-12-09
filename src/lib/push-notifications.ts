/**
 * Push Notification Utilities
 * Handles browser push notification registration and management
 */

import { publicConfig } from './config';

export async function registerPushNotifications(): Promise<PushSubscription | null> {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    console.warn('Push notifications are not supported');
    return null;
  }

  try {
    // Register service worker
    const registration = await navigator.serviceWorker.register('/sw.js');
    console.log('Service Worker registered:', registration);

    // Wait for service worker to be ready
    await navigator.serviceWorker.ready;

    // Request notification permission
    const permission = await Notification.requestPermission();
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    // Check if already subscribed
    let subscription = await registration.pushManager.getSubscription();
    
    if (!subscription) {
      // Subscribe to push notifications using VAPID public key
      const publicKey = publicConfig.vapidPublicKey;
      
      if (!publicKey) {
        console.error('VAPID public key not configured. Please set NEXT_PUBLIC_VAPID_PUBLIC_KEY in your environment variables.');
        throw new Error('VAPID public key not configured');
      }
      
      console.log('Subscribing to push notifications with VAPID key');
      
      try {
        const applicationServerKey = urlBase64ToUint8Array(publicKey);
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey as BufferSource
        });
        console.log('Successfully subscribed to push notifications');
      } catch (subError) {
        console.error('Subscription error:', subError);
        throw subError;
      }
    }

    console.log('Push subscription:', subscription);
    return subscription;
  } catch (error) {
    console.error('Error registering push notifications:', error);
    return null;
  }
}

export async function unregisterPushNotifications(): Promise<boolean> {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      await subscription.unsubscribe();
      console.log('Push subscription removed');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error unregistering push notifications:', error);
    return false;
  }
}

export async function getPushSubscription(): Promise<PushSubscription | null> {
  if (!('serviceWorker' in navigator)) {
    return null;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    return await registration.pushManager.getSubscription();
  } catch (error) {
    console.error('Error getting push subscription:', error);
    return null;
  }
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Send subscription to server
export async function savePushSubscription(subscription: PushSubscription): Promise<boolean> {
  try {
    const response = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        subscription: subscription.toJSON()
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Error saving push subscription:', error);
    return false;
  }
}

// Remove subscription from server
export async function removePushSubscription(): Promise<boolean> {
  try {
    const response = await fetch('/api/push/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    return response.ok;
  } catch (error) {
    console.error('Error removing push subscription:', error);
    return false;
  }
}
