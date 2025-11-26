import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'

interface FundingOpportunity {
  id: number
  name: string
  type: string
  amount: string
  stage: string
  description: string
  sector?: string
  year?: number
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') // Crowdfunding vs Venture Capital
    const sector = searchParams.get('sector')
    const stage = searchParams.get('stage')

    const db = getDatabase()
    if (!db) {
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // Bouw query met filters
    let query = 'SELECT * FROM funding_opportunities WHERE 1=1'
    const params: any[] = []

    if (category && category !== 'all') {
      query += ' AND fund_name LIKE ?'
      params.push(`%${category}%`)
    }

    if (sector && sector !== 'all') {
      query += ' AND sector LIKE ?'
      params.push(`%${sector}%`)
    }

    if (stage && stage !== 'all') {
      query += ' AND stage = ?'
      params.push(stage)
    }

    query += ' ORDER BY amount_eur DESC LIMIT 500'

    const opportunities = db.prepare(query).all(...params)

    // Format data voor frontend
    const formatted = opportunities.map((opp: any) => {
      const isCrowdfunding = opp.fund_name && opp.fund_name.includes('Crowdfunding')
      const category = isCrowdfunding ? 'Crowdfunding' : 'Venture Capital'
      
      return {
        id: opp.id,
        name: opp.startup_name,
        fundName: opp.fund_name,
        type: category,
        amount: `€${Math.round(opp.amount_eur).toLocaleString()}`,
        stage: opp.stage,
        description: `${opp.sector} - ${category}`,
        sector: opp.sector,
        year: opp.year,
      }
    })

    return NextResponse.json({
      success: true,
      data: formatted,
      total: formatted.length,
    })
  } catch (error) {
    console.error('Error fetching funding opportunities:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
