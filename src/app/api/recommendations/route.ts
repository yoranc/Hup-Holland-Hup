import { NextRequest, NextResponse } from 'next/server'
import { getDatabase } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { industry, region, revenue, employees, marketShare, valuation, fundingAmount, yearFounded, profitable } = body

    if (!industry || !region) {
      return NextResponse.json({ error: 'Industry en region zijn verplicht' }, { status: 400 })
    }

    const db = getDatabase()
    if (!db) {
      return NextResponse.json({ error: 'Database error' }, { status: 500 })
    }

    // Haal alle funding opportunities op uit database
    const allOpportunities = db.prepare('SELECT * FROM funding_opportunities ORDER BY amount_eur DESC LIMIT 1000').all()

    // Map industry naar sectors in database
    const industryMapping: { [key: string]: string[] } = {
      'fintech': ['Technology', 'FinTech', 'Algemeen'],
      'healthtech': ['Technology', 'HealthTech', 'Algemeen'],
      'edtech': ['Technology', 'EdTech', 'Algemeen'],
      'iot': ['Technology', 'IoT', 'Tech', 'Algemeen'],
      'cleantech': ['Technology', 'CleanTech', 'Duurzaamheid', 'Algemeen'],
      'other': ['Technology', 'Tech', 'Algemeen', 'Innovatie']
    }

    const relevantSectors = industryMapping[industry.toLowerCase()] || ['Technology', 'Algemeen']

    // Bereken match scores
    const recommendations = allOpportunities.map((opp: any) => {
      let score = 0
      
      // Sector match (40 punten)
      const sectorMatch = relevantSectors.some(sector => 
        opp.sector && opp.sector.toLowerCase().includes(sector.toLowerCase())
      )
      if (sectorMatch) {
        score += 40
      }
      
      // Funding type match (20 punten) - Venture Capital vs Crowdfunding
      const userFunding = Number(fundingAmount) || 250000
      const fundType = opp.fund_name || ''
      
      if (userFunding > 1000000 && fundType.includes('Venture Capital')) {
        score += 20
      } else if (userFunding <= 500000 && fundType.includes('Crowdfunding')) {
        score += 20
      } else if (fundType.includes('Venture Capital') || fundType.includes('Crowdfunding')) {
        score += 10
      }
      
      // Funding amount match (25 punten)
      const oppAmount = opp.amount_eur
      const amountRatio = Math.min(userFunding, oppAmount) / Math.max(userFunding, oppAmount)
      score += amountRatio * 25
      
      // Stage match (15 punten)
      const userRevenue = Number(revenue) || 0
      let userStage = 'Seed'
      if (userRevenue > 2000000) userStage = 'Growth'
      else if (userRevenue > 1000000) userStage = 'Series A'
      else if (userRevenue > 100000) userStage = 'Seed'
      else userStage = 'Pre-Seed'
      
      if (opp.stage === userStage) {
        score += 15
      } else if (
        (opp.stage === 'Series A' && userStage === 'Seed') ||
        (opp.stage === 'Growth' && userStage === 'Series A') ||
        (opp.stage === 'Seed' && userStage === 'Pre-Seed')
      ) {
        score += 10 // Volgende stage ook relevant
      }

      return {
        name: opp.startup_name,
        fundName: opp.fund_name,
        fundingType: opp.stage,
        matchScore: parseFloat(score.toFixed(2)),
        fundingAmount: Math.round(opp.amount_eur),
        sector: opp.sector,
        year: opp.year
      }
    })

    // Sorteer en neem top 10
    const topRecommendations = recommendations
      .filter(rec => rec.matchScore > 30) // Minimale threshold
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 10)

    return NextResponse.json({
      success: true,
      recommendations: topRecommendations,
      totalMatches: topRecommendations.length,
      message: `Gevonden ${topRecommendations.length} matches uit ${allOpportunities.length} Nederlandse funding opportunities`
    })
  } catch (error) {
    console.error('Error processing recommendations:', error)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
