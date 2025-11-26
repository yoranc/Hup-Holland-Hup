import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getDatabase } from '@/lib/db'

export async function GET() {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Niet ingelogd' },
        { status: 401 }
      )
    }

    const db = getDatabase()
    if (!db) {
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    const profile = db
      .prepare('SELECT * FROM user_profiles WHERE user_id = ?')
      .get(user.id)

    return NextResponse.json(profile || {})
  } catch (error) {
    console.error('Get profile error:', error)
    return NextResponse.json(
      { error: 'Serverfout' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()
    
    if (!user) {
      return NextResponse.json(
        { error: 'Niet ingelogd' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { revenue, employees, market_share, valuation, funding_stage } = body

    const db = getDatabase()
    if (!db) {
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // Check if profile exists
    const existing = db
      .prepare('SELECT user_id FROM user_profiles WHERE user_id = ?')
      .get(user.id)

    if (existing) {
      // Update
      db.prepare(
        `UPDATE user_profiles 
         SET revenue = ?, employees = ?, market_share = ?, valuation = ?, funding_stage = ?
         WHERE user_id = ?`
      ).run(revenue || null, employees || null, market_share || null, valuation || null, funding_stage || null, user.id)
    } else {
      // Insert
      db.prepare(
        `INSERT INTO user_profiles (user_id, revenue, employees, market_share, valuation, funding_stage)
         VALUES (?, ?, ?, ?, ?, ?)`
      ).run(user.id, revenue || null, employees || null, market_share || null, valuation || null, funding_stage || null)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Update profile error:', error)
    return NextResponse.json(
      { error: 'Serverfout' },
      { status: 500 }
    )
  }
}
