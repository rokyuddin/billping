import { groq } from '@ai-sdk/groq'
import { generateText } from 'ai'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { name } = await req.json()

    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 })
    }

    const { text } = await generateText({
      model: groq('llama-3.1-8b-instant'),
      system: 'You are a helpful assistant that categorizes subscription services. Return only the category name from this list: Entertainment, Productivity, Utilities, Software, Health & Fitness, Education, News & Media, Cloud Storage, Other. If unsure, return Other.',
      prompt: `Categorize this subscription: ${name}`,
    })

    return NextResponse.json({ category: text.trim() })
  } catch (error) {
    console.error('AI Error:', error)
    return NextResponse.json({ error: 'Failed to categorize' }, { status: 500 })
  }
}
