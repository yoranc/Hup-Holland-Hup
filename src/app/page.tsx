'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const fundingTypes = [
    {
      title: 'Venture Capital',
      description: 'Professionele investeerders die grote bedragen investeren in ruil voor aandelen',
      amount: '€500K - €10M',
      link: '/venture-capital'
    },
    {
      title: 'Angel Investors',
      description: 'Particuliere investeerders die in vroege fase startups investeren',
      amount: '€25K - €500K',
      link: '/funding?type=angel'
    },
    {
      title: 'Subsidies & Grants',
      description: 'Overheidssteun en EU-subsidies die je niet hoeft terug te betalen',
      amount: '€10K - €2M',
      link: '/funding?type=grant'
    },
    {
      title: 'Accelerators',
      description: 'Programmas met begeleiding, netwerk en initiële financiering',
      amount: '€15K - €150K',
      link: '/funding?type=accelerator'
    },
    {
      title: 'Bankleningen',
      description: 'Traditionele zakelijke leningen met vaste rente en aflossing',
      amount: '€50K - €5M',
      link: '/funding?type=loan'
    },
    {
      title: 'Crowdfunding',
      description: 'Kapitaal ophalen van vele kleine investeerders via online platforms',
      amount: '€5K - €1M',
      link: '/funding?type=crowdfunding'
    }
  ]

  const popularFunding = [
    { name: 'Innovation Box', type: 'Subsidie', amount: 'Tot €2M', match: '94%' },
    { name: 'Techleap Scale-up Program', type: 'Accelerator', amount: '€100K', match: '89%' },
    { name: 'EIC Accelerator', type: 'EU Grant', amount: '€2.5M', match: '87%' },
    { name: 'Dutch Founders Fund', type: 'VC', amount: '€500K-€3M', match: '85%' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-12">
              <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Hup Holland
              </Link>
              <div className="hidden md:flex items-center space-x-8">
                <Link href="/funding" className="text-gray-600 hover:text-gray-900 font-medium transition">
                  Funding
                </Link>
                <Link href="/recommendations" className="text-gray-600 hover:text-gray-900 font-medium transition">
                  Platform
                </Link>
                <Link href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition">
                  Features
                </Link>
                <Link href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition">
                  Pricing
                </Link>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2">
                Sign in
              </Link>
              <Link href="/signup">
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:shadow-lg hover:scale-105 transition transform font-medium">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Modern SaaS Style */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-indigo-600 rounded-full animate-pulse"></span>
                Nieuw: AI-powered matching
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Vind de perfecte
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> funding </span>
                voor jouw startup
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Vergelijk 136 Nederlandse funding opties in seconden. Van Crowdfunding tot Venture Capital - wij matchen je met de juiste investeerders.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href="/recommendations">
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition transform text-lg">
                    Start vergelijken →
                  </button>
                </Link>
                <Link href="#demo">
                  <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-300 hover:bg-gray-50 transition text-lg">
                    Bekijk demo
                  </button>
                </Link>
              </div>

              <div className="flex items-center gap-8 text-sm">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600 font-medium">Gratis vergelijken</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600 font-medium">500+ opties</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <span className="text-gray-600 font-medium">AI matching</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Mockup */}
            <div className="relative">
              <div className="relative bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-2xl p-8 transform rotate-2">
                <div className="bg-white rounded-2xl p-6 shadow-xl transform -rotate-2">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                      <div>
                        <div className="font-bold text-gray-900 text-lg">Innovation Box</div>
                        <div className="text-sm text-gray-600">Subsidie • Tot €2M</div>
                      </div>
                      <div className="text-3xl font-bold text-green-600">94%</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-bold text-gray-900">Techleap Scale-up</div>
                        <div className="text-sm text-gray-600">Accelerator • €100K</div>
                      </div>
                      <div className="text-2xl font-bold text-indigo-600">89%</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <div className="font-bold text-gray-900">EIC Accelerator</div>
                        <div className="text-sm text-gray-600">EU Grant • €2.5M</div>
                      </div>
                      <div className="text-2xl font-bold text-indigo-600">87%</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 border border-gray-100">
                <div className="text-sm text-gray-600 mb-1">Gem. match score</div>
                <div className="text-3xl font-bold text-indigo-600">87%</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Funding Types Grid - Modern Cards */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Alle soorten <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">funding</span> op één plek
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Van subsidies tot venture capital - wij helpen je de perfecte match te vinden
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fundingTypes.map((type, idx) => (
              <Link key={idx} href={type.link}>
                <div className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-indigo-300 hover:shadow-2xl transition-all duration-300 cursor-pointer h-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl flex items-center justify-center mb-6">
                      <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{type.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{type.description}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                      <span className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">{type.amount}</span>
                      <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 transition">
                        <svg className="w-5 h-5 text-indigo-600 group-hover:text-white transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Funding */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-3 text-center">Populaire Funding Opties</h2>
          <p className="text-gray-600 mb-12 text-center text-lg">De meest gekozen financieringen door Nederlandse startups</p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {popularFunding.map((funding, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl shadow-sm border-2 border-gray-200 hover:border-indigo-400 transition">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{funding.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{funding.type}</p>
                  </div>
                  <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                    {funding.match} match
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-lg font-semibold text-indigo-600">{funding.amount}</span>
                  <Link href="/funding">
                    <button className="text-indigo-600 hover:text-indigo-700 font-semibold text-sm">
                      Meer info →
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Modern Steps */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Zo <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">werkt</span> het
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Van profiel tot funding in 4 simpele stappen
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200"></div>
            
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                1
              </div>
              <div className="mt-6">
                <div className="text-4xl mb-4">📝</div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">Vertel over je startup</h3>
                <p className="text-gray-600">Vul je bedrijfsgegevens en funding behoefte in - duurt slechts 2 minuten</p>
              </div>
            </div>
            
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                2
              </div>
              <div className="mt-6">
                <div className="text-4xl mb-4">🤖</div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">AI matching</h3>
                <p className="text-gray-600">Onze AI analyseert 500+ funding opties en berekent je match score</p>
              </div>
            </div>
            
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                3
              </div>
              <div className="mt-6">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">Vergelijk & kies</h3>
                <p className="text-gray-600">Bekijk alle details, voorwaarden en reviews op één overzichtelijke plek</p>
              </div>
            </div>
            
            <div className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition">
              <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-xl flex items-center justify-center text-xl font-bold shadow-lg">
                4
              </div>
              <div className="mt-6">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="font-bold text-gray-900 text-xl mb-3">Aanvragen</h3>
                <p className="text-gray-600">Verstuur je aanvraag direct via ons platform - wij regelen de rest</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Gradient */}
      <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 rounded-3xl p-12 md:p-16 shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Klaar om te starten?
                </h2>
                <p className="text-xl text-indigo-100 mb-8">
                  Ontdek binnen 5 minuten welke funding het beste bij jouw startup past. Volledig gratis, geen creditcard nodig.
                </p>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-lg font-semibold">100% gratis vergelijken</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-lg font-semibold">Binnen 5 minuten resultaat</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-lg font-semibold">Al 1000+ startups geholpen</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/recommendations">
                    <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 hover:scale-105 transition transform shadow-lg">
                      Start nu gratis →
                    </button>
                  </Link>
                  <Link href="#demo">
                    <button className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition backdrop-blur">
                      Plan een demo
                    </button>
                  </Link>
                </div>
              </div>

              <div className="relative">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                  <div className="text-center mb-6">
                    <div className="text-5xl font-bold text-white mb-2">€87M</div>
                    <div className="text-indigo-200">Totaal funding gematched</div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">500+</div>
                      <div className="text-sm text-indigo-200">Funding opties</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">1000+</div>
                      <div className="text-sm text-indigo-200">Startups</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">87%</div>
                      <div className="text-sm text-indigo-200">Match rate</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white">2.5x</div>
                      <div className="text-sm text-indigo-200">Meer kans</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">Hup Holland Funding</h3>
              <p className="text-gray-400 text-sm">
                Het grootste vergelijkingsplatform voor startup funding in Nederland.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Funding Types</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/funding?type=vc" className="hover:text-white">Venture Capital</Link></li>
                <li><Link href="/funding?type=angel" className="hover:text-white">Angel Investors</Link></li>
                <li><Link href="/funding?type=grant" className="hover:text-white">Subsidies</Link></li>
                <li><Link href="/funding?type=accelerator" className="hover:text-white">Accelerators</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Over Ons</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="#" className="hover:text-white">Over Hup Holland</Link></li>
                <li><Link href="#" className="hover:text-white">Contact</Link></li>
                <li><Link href="#" className="hover:text-white">Privacy</Link></li>
                <li><Link href="#" className="hover:text-white">Voorwaarden</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Voor Startups</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/recommendations" className="hover:text-white">Vind Funding</Link></li>
                <li><Link href="/dashboard" className="hover:text-white">Dashboard</Link></li>
                <li><Link href="/signup" className="hover:text-white">Account Aanmaken</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>© 2025 Hup Holland Funding. Alle rechten voorbehouden.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
