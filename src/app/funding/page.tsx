'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface FundingOpportunity {
  id: number
  name: string
  fundName: string
  type: string
  amount: string
  stage: string
  description: string
  sector: string
  year: number
}

export default function FundingPage() {
  const [opportunities, setOpportunities] = useState<FundingOpportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSector, setSelectedSector] = useState('all')

  useEffect(() => {
    fetchOpportunities()
  }, [selectedCategory, selectedSector])

  const fetchOpportunities = async () => {
    setLoading(true)
    try {
      let url = '/api/funding?'
      if (selectedCategory !== 'all') url += `category=${selectedCategory}&`
      if (selectedSector !== 'all') url += `sector=${selectedSector}&`
      
      const response = await fetch(url)
      const result = await response.json()
      setOpportunities(result.data || [])
    } catch (error) {
      console.error('Error fetching opportunities:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Hup Holland
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">
                Home
              </Link>
              <Link href="/recommendations">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition transform font-medium">
                  Get Matched
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Ontdek <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">500+</span> funding opties
            </h1>
            <p className="text-xl text-gray-600">
              Van subsidies tot venture capital - vind de perfecte financiering voor jouw startup
            </p>
          </div>

          {/* Filters */}
          <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-12">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Categorie</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-600 focus:outline-none transition"
                >
                  <option value="all">Alle categorieën</option>
                  <option value="Venture Capital">Venture Capital</option>
                  <option value="Crowdfunding">Crowdfunding</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Sector</label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:border-indigo-600 focus:outline-none transition"
                >
                  <option value="all">Alle sectoren</option>
                  <option value="Technology">Technology</option>
                  <option value="FinTech">FinTech</option>
                  <option value="HealthTech">HealthTech</option>
                  <option value="EdTech">EdTech</option>
                  <option value="CleanTech">CleanTech</option>
                  <option value="Algemeen">Algemeen</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedCategory('all')
                    setSelectedSector('all')
                  }}
                  className="w-full border-2 border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition"
                >
                  Reset filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
                <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-gray-600 text-lg">Funding opties laden...</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  {opportunities.length} funding opties gevonden
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  Live data
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {opportunities.map((opp: FundingOpportunity) => (
                  <div
                    key={opp.id}
                    className="group relative bg-white rounded-2xl border-2 border-gray-200 hover:border-indigo-300 p-6 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="absolute top-6 right-6">
                      <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                        {opp.type}
                      </span>
                    </div>

                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 pr-20">{opp.name}</h3>
                      <p className="text-sm text-gray-600">{opp.fundName}</p>
                      <p className="text-xs text-gray-500 mt-1">{opp.description}</p>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">💰</span>
                        <span className="font-semibold text-gray-900">{opp.amount}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">🏢</span>
                        <span className="text-gray-600 capitalize">{opp.sector}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">📈</span>
                        <span className="text-gray-600 capitalize">{opp.stage}</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition transform">
                      Meer info →
                    </button>
                  </div>
                ))}
              </div>

              {opportunities.length === 0 && !loading && (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Geen resultaten gevonden</h3>
                  <p className="text-gray-600 mb-6">Probeer je filters aan te passen</p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all')
                      setSelectedSector('all')
                    }}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg hover:scale-105 transition transform"
                  >
                    Reset filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Krijg gepersonaliseerde matches
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Laat onze AI de perfecte funding voor jouw startup vinden
          </p>
          <Link href="/recommendations">
            <button className="bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition transform shadow-xl">
              Start nu gratis →
            </button>
          </Link>
        </div>
      </section>
    </div>
  )
}
