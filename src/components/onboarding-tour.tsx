'use client'

import { useState } from 'react'
import { X, ArrowRight, Check } from 'lucide-react'

export default function OnboardingTour() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(() => {
    // Initialize from localStorage
    if (typeof window !== 'undefined') {
      return !localStorage.getItem('billping_tour_completed')
    }
    return false
  })

  const steps = [
    {
      title: 'WELCOME TO BILLPING!',
      description: 'Track all your subscriptions in one place and never miss a payment again.',
      action: 'Get Started',
    },
    {
      title: 'ADD YOUR SUBSCRIPTIONS',
      description: 'Click the "Add Subscription" button to start tracking your recurring expenses.',
      action: 'Next',
      highlight: 'add-button',
    },
    {
      title: 'VIEW ANALYTICS',
      description: 'See where your money goes with visual charts and spending insights.',
      action: 'Next',
      highlight: 'analytics-link',
    },
    {
      title: 'GET REMINDERS',
      description: 'Enable email notifications in Settings to get reminded before bills are due.',
      action: 'Finish Tour',
      highlight: 'settings-link',
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      completeTour()
    }
  }

  const completeTour = () => {
    localStorage.setItem('billping_tour_completed', 'true')
    setIsVisible(false)
  }

  const skipTour = () => {
    completeTour()
  }

  if (!isVisible) return null

  const step = steps[currentStep]

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="brutal-card bg-card max-w-md w-full p-8 relative">
        <button
          onClick={skipTour}
          className="absolute top-4 right-4 p-2 hover:bg-muted rounded-sm transition-colors"
          aria-label="Skip tour"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mb-6">
          <div className="flex items-center gap-2 mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 flex-1 border-2 border-border ${
                  index <= currentStep ? 'bg-accent' : 'bg-muted'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        <h2 className="font-heading text-3xl font-bold mb-4">{step.title}</h2>
        <p className="text-lg text-muted-foreground mb-8">{step.description}</p>

        <div className="flex gap-4">
          <button onClick={handleNext} className="brutal-btn px-8 py-3 font-bold flex-1 flex items-center justify-center gap-2">
            {currentStep === steps.length - 1 ? (
              <>
                <Check className="w-5 h-5" /> {step.action}
              </>
            ) : (
              <>
                {step.action} <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          {currentStep > 0 && (
            <button
              onClick={() => setCurrentStep(currentStep - 1)}
              className="px-6 py-3 font-bold border-2 border-border hover:bg-muted transition-colors"
            >
              Back
            </button>
          )}
        </div>

        {currentStep === 0 && (
          <button
            onClick={skipTour}
            className="w-full mt-4 text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip tour
          </button>
        )}
      </div>
    </div>
  )
}
