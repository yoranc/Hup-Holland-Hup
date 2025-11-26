'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface UserProfile {
  id: number
  email: string
  company_name: string
  industry?: string
  created_at: string
}

interface ProfileData {
  revenue?: string
  employees?: string
  market_share?: string
  valuation?: string
  funding_stage?: string
}

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [profile, setProfile] = useState<ProfileData>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchUserData()
  }, [])

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (!response.ok) {
        router.push('/login')
        return
      }
      const data = await response.json()
      setUser(data.user)
      
      // Fetch profile data
      const profileResponse = await fetch('/api/profile')
      if (profileResponse.ok) {
        const profileData = await profileResponse.json()
        setProfile(profileData)
      }
    } catch (error) {
      console.error('Error fetching user data:', error)
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })

      if (response.ok) {
        setMessage('Profiel succesvol opgeslagen!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Er is iets misgegaan bij het opslaan')
      }
    } catch (error) {
      setMessage('Er is een fout opgetreden')
    } finally {
      setSaving(false)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Laden...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-lg bg-white/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Hup Holland
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/funding" className="text-gray-600 hover:text-gray-900 font-medium">
                Funding
              </Link>
              <Link href="/recommendations" className="text-gray-600 hover:text-gray-900 font-medium">
                Aanbevelingen
              </Link>
              <Link href="/dashboard" className="text-gray-600 hover:text-gray-900 font-medium">
                Dashboard
              </Link>
              <Link href="/account" className="text-indigo-600 font-semibold">
                Account
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-12 text-white">
            <h1 className="text-3xl font-bold mb-2">Mijn Account</h1>
            <p className="text-indigo-100">Beheer je profiel en accountgegevens</p>
          </div>

          {/* Account Info */}
          <div className="px-8 py-8 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Informatie</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Bedrijfsnaam
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                  {user?.company_name}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                  {user?.email}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Sector
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200 capitalize">
                  {user?.industry || 'Niet ingevuld'}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lid sinds
                </label>
                <div className="px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                  {user?.created_at ? new Date(user.created_at).toLocaleDateString('nl-NL') : '-'}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <form onSubmit={handleSaveProfile} className="px-8 py-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Bedrijfsprofiel</h2>
            
            {message && (
              <div className={`mb-6 p-4 rounded-lg ${message.includes('succesvol') ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className={`text-sm font-medium ${message.includes('succesvol') ? 'text-green-600' : 'text-red-600'}`}>
                  {message}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Omzet (jaarlijks)
                </label>
                <input
                  type="text"
                  value={profile.revenue || ''}
                  onChange={(e) => setProfile({ ...profile, revenue: e.target.value })}
                  placeholder="Bijv. €500.000"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Aantal medewerkers
                </label>
                <input
                  type="text"
                  value={profile.employees || ''}
                  onChange={(e) => setProfile({ ...profile, employees: e.target.value })}
                  placeholder="Bijv. 10-25"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Marktaandeel
                </label>
                <input
                  type="text"
                  value={profile.market_share || ''}
                  onChange={(e) => setProfile({ ...profile, market_share: e.target.value })}
                  placeholder="Bijv. 5%"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Waardering
                </label>
                <input
                  type="text"
                  value={profile.valuation || ''}
                  onChange={(e) => setProfile({ ...profile, valuation: e.target.value })}
                  placeholder="Bijv. €5M"
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Funding Stage
                </label>
                <select
                  value={profile.funding_stage || ''}
                  onChange={(e) => setProfile({ ...profile, funding_stage: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-600 focus:outline-none transition"
                >
                  <option value="">Selecteer een fase</option>
                  <option value="pre-seed">Pre-seed</option>
                  <option value="seed">Seed</option>
                  <option value="series-a">Series A</option>
                  <option value="series-b">Series B</option>
                  <option value="series-c">Series C+</option>
                  <option value="growth">Growth</option>
                </select>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:scale-105 transition transform disabled:opacity-50"
              >
                {saving ? 'Opslaan...' : 'Profiel opslaan'}
              </button>
              <button
                type="button"
                onClick={handleLogout}
                className="px-8 py-4 border-2 border-red-200 text-red-600 rounded-xl font-bold hover:bg-red-50 transition"
              >
                Uitloggen
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
