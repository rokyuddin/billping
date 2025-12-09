'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { createSubscription } from '@/app/actions/subscriptions'
import { Loader2, Sparkles, Upload, X, FileText } from 'lucide-react'
import Link from 'next/link'

const CATEGORIES = [
  'Entertainment',
  'Productivity',
  'Utilities',
  'Software',
  'Health & Fitness',
  'Education',
  'News & Media',
  'Cloud Storage',
  'Other',
]

const BILLING_CYCLES = ['monthly', 'yearly', 'weekly', 'custom']

export default function AddSubscriptionForm() {
  const [loading, setLoading] = useState(false)
  const [aiLoading, setAiLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [category, setCategory] = useState('')
  const [name, setName] = useState('')

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }

    const file = e.target.files[0]
    setSelectedFile(file)
    
    // Create a local preview URL
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)
  }

  const removeFile = () => {
    setSelectedFile(null)
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }

  const handleAICategorize = async () => {
    if (!name) return

    setAiLoading(true)
    try {
      const response = await fetch('/api/ai/categorize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })

      const data = await response.json()
      if (data.category && CATEGORIES.includes(data.category)) {
        setCategory(data.category)
      } else if (data.category) {
        // If AI returns something else, default to Other or keep as is if valid
        setCategory('Other')
      }
    } catch (error) {
      console.error('AI Error:', error)
    } finally {
      setAiLoading(false)
    }
  }

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    
    let uploadedUrl = null

    if (selectedFile) {
      setUploading(true)
      const fileExt = selectedFile.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `${fileName}`

      const supabase = createClient()
      const { error: uploadError } = await supabase.storage
        .from('receipts')
        .upload(filePath, selectedFile)

      if (uploadError) {
        console.error('Error uploading receipt:', uploadError)
        alert('Error uploading receipt: ' + uploadError.message)
        setUploading(false)
        setLoading(false)
        return
      }

      const { data } = supabase.storage.from('receipts').getPublicUrl(filePath)
      uploadedUrl = data.publicUrl
      setUploading(false)
    }

    if (uploadedUrl) {
      formData.append('receipt_url', uploadedUrl)
    }
    
    await createSubscription(formData)
    setLoading(false)
  }

  return (
    <form action={handleSubmit} className="brutal-card p-8 bg-card">
      <div className="space-y-6">
        <div>
          <label className="block font-bold mb-2 text-sm uppercase" htmlFor="name">
            Service Name *
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id="name"
              name="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => {
                if (name && !category) handleAICategorize()
              }}
              className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
              placeholder="Netflix, Spotify, etc."
            />
            <button
              type="button"
              onClick={handleAICategorize}
              disabled={aiLoading || !name}
              className="px-3 border-2 border-border bg-accent hover:bg-accent/80 disabled:opacity-50 transition-colors flex items-center justify-center"
              title="Auto-categorize with AI"
            >
              {aiLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Sparkles className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        <div>
          <label className="block font-bold mb-2 text-sm uppercase" htmlFor="category">
            Category *
          </label>
          <select
            id="category"
            name="category"
            required
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
          >
            <option value="">Select a category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-2 text-sm uppercase" htmlFor="amount">
              Amount *
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              required
              step="0.01"
              min="0"
              className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
              placeholder="9.99"
            />
          </div>

          <div>
            <label className="block font-bold mb-2 text-sm uppercase" htmlFor="currency">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="BDT">BDT (৳)</option>
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold mb-2 text-sm uppercase" htmlFor="billing_cycle">
              Billing Cycle *
            </label>
            <select
              id="billing_cycle"
              name="billing_cycle"
              required
              className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
            >
              <option value="">Select cycle</option>
              {BILLING_CYCLES.map((cycle) => (
                <option key={cycle} value={cycle}>
                  {cycle.charAt(0).toUpperCase() + cycle.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold mb-2 text-sm uppercase" htmlFor="next_billing_date">
              Next Billing Date *
            </label>
            <input
              type="date"
              id="next_billing_date"
              name="next_billing_date"
              required
              className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold mb-2 text-sm uppercase" htmlFor="website_url">
            Website URL (Optional)
          </label>
          <input
            type="url"
            id="website_url"
            name="website_url"
            className="w-full p-3 border-2 border-border bg-input focus:outline-none focus:ring-2 focus:ring-ring/50 font-mono"
            placeholder="https://example.com"
          />
        </div>

        <div>
          <label className="block font-bold mb-2 text-sm uppercase">
            Receipt Attachment (Optional)
          </label>
          <div className="border-2 border-dashed border-border p-6 text-center hover:bg-muted/50 transition-colors relative">
            {selectedFile ? (
              <div className="flex items-center justify-between bg-card p-3 border-2 border-border">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  <div className="text-left">
                    <p className="text-sm font-bold truncate max-w-[200px]">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={removeFile}
                  className="text-destructive hover:bg-destructive/10 p-1 rounded"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <p className="font-bold text-sm">
                    Click or Drag to Upload Receipt
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Supports JPG, PNG, PDF
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button 
            type="submit" 
            disabled={loading || uploading}
            className="brutal-btn px-8 py-3 font-bold flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : (
              'Add Subscription'
            )}
          </button>
          <Link
            href="/dashboard"
            className="px-8 py-3 font-bold border-2 border-border hover:bg-muted transition-colors text-center flex items-center justify-center"
          >
            Cancel
          </Link>
        </div>
      </div>
    </form>
  )
}
