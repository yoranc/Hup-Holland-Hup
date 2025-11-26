const Database = require('better-sqlite3')
const path = require('path')

const dbPath = path.join(process.cwd(), 'hup-holland.db')
const db = new Database(dbPath)

console.log('Seeding demo funding data...')

// Demo funding opportunities
const demoData = [
  { startup_name: 'TechVenture NL', fund_name: 'Peak Capital', stage: 'Series A', sector: 'FinTech', amount_eur: 5000000, year: 2024 },
  { startup_name: 'HealthTech Solutions', fund_name: 'Inkef Capital', stage: 'Seed', sector: 'HealthTech', amount_eur: 1500000, year: 2024 },
  { startup_name: 'EduInnovate', fund_name: 'Volta Ventures', stage: 'Series B', sector: 'EdTech', amount_eur: 8000000, year: 2024 },
  { startup_name: 'GreenEnergy BV', fund_name: 'SET Ventures', stage: 'Growth', sector: 'CleanTech', amount_eur: 12000000, year: 2024 },
  { startup_name: 'DataDrive', fund_name: 'henQ', stage: 'Pre-Seed', sector: 'DeepTech', amount_eur: 500000, year: 2024 },
  { startup_name: 'SmartLogistics', fund_name: 'Graduate Entrepreneur', stage: 'Seed', sector: 'IoT', amount_eur: 2000000, year: 2023 },
  { startup_name: 'FoodTech Innovations', fund_name: 'Rabobank FoodBytes', stage: 'Series A', sector: 'FoodTech', amount_eur: 6000000, year: 2023 },
  { startup_name: 'CyberSecure', fund_name: 'Peak Capital', stage: 'Series A', sector: 'CyberSecurity', amount_eur: 4500000, year: 2024 },
  { startup_name: 'AIAssist', fund_name: 'Innovation Industries', stage: 'Growth', sector: 'AI/ML', amount_eur: 15000000, year: 2024 },
  { startup_name: 'MobilityNow', fund_name: 'LUMO Labs', stage: 'Seed', sector: 'Mobility', amount_eur: 1800000, year: 2023 },
  { startup_name: 'RetailRevolution', fund_name: 'Newion', stage: 'Series A', sector: 'E-commerce', amount_eur: 7000000, year: 2024 },
  { startup_name: 'PropTech Solutions', fund_name: 'Venture IQ', stage: 'Series B', sector: 'PropTech', amount_eur: 10000000, year: 2023 },
  { startup_name: 'BioInnovate', fund_name: 'LSP', stage: 'Series A', sector: 'BioTech', amount_eur: 9000000, year: 2024 },
  { startup_name: 'CloudScale', fund_name: 'Keen Venture Partners', stage: 'Growth', sector: 'SaaS', amount_eur: 20000000, year: 2024 },
  { startup_name: 'MediaStream', fund_name: 'Forward.one', stage: 'Seed', sector: 'MediaTech', amount_eur: 1200000, year: 2023 },
  { startup_name: 'QuantumLeap', fund_name: 'Innovation Industries', stage: 'Pre-Seed', sector: 'DeepTech', amount_eur: 750000, year: 2024 },
  { startup_name: 'SportsTech Pro', fund_name: 'Value Creation Capital', stage: 'Series A', sector: 'SportsTech', amount_eur: 5500000, year: 2023 },
  { startup_name: 'TravelTech Global', fund_name: 'Peak Capital', stage: 'Series B', sector: 'TravelTech', amount_eur: 11000000, year: 2024 },
  { startup_name: 'InsurTech NL', fund_name: 'Achmea Innovation Fund', stage: 'Seed', sector: 'InsurTech', amount_eur: 2500000, year: 2024 },
  { startup_name: 'AgriTech Solutions', fund_name: 'Pymwymic', stage: 'Series A', sector: 'AgriTech', amount_eur: 6500000, year: 2023 },
  { startup_name: 'LegalTech Hub', fund_name: 'henQ', stage: 'Seed', sector: 'LegalTech', amount_eur: 1700000, year: 2024 },
  { startup_name: 'HRTech Innovations', fund_name: 'Volta Ventures', stage: 'Growth', sector: 'HRTech', amount_eur: 13000000, year: 2024 },
  { startup_name: 'EnergyStorage BV', fund_name: 'SET Ventures', stage: 'Series B', sector: 'CleanTech', amount_eur: 14000000, year: 2023 },
  { startup_name: 'BlockchainLabs', fund_name: 'Innovation Industries', stage: 'Series A', sector: 'Blockchain', amount_eur: 8500000, year: 2024 },
  { startup_name: 'GameStudio NL', fund_name: 'Curiosity Capital', stage: 'Seed', sector: 'Gaming', amount_eur: 2200000, year: 2023 },
  { startup_name: 'MarketingAI', fund_name: 'Peak Capital', stage: 'Series A', sector: 'MarTech', amount_eur: 4800000, year: 2024 },
  { startup_name: 'VoiceTech', fund_name: 'Forward.one', stage: 'Pre-Seed', sector: 'AI/ML', amount_eur: 600000, year: 2024 },
  { startup_name: 'SmartHome Systems', fund_name: 'Invest-NL', stage: 'Growth', sector: 'IoT', amount_eur: 16000000, year: 2024 },
  { startup_name: 'WearableTech', fund_name: 'Graduate Entrepreneur', stage: 'Seed', sector: 'HealthTech', amount_eur: 1900000, year: 2023 },
  { startup_name: 'DataAnalytics Pro', fund_name: 'Keen Venture Partners', stage: 'Series B', sector: 'DeepTech', amount_eur: 9500000, year: 2024 },
]

const insert = db.prepare(
  `INSERT INTO funding_opportunities (startup_name, fund_name, stage, sector, amount_eur, year)
   VALUES (?, ?, ?, ?, ?, ?)`
)

let count = 0
for (const item of demoData) {
  insert.run(
    item.startup_name,
    item.fund_name,
    item.stage,
    item.sector,
    item.amount_eur,
    item.year
  )
  count++
}

console.log(`✅ ${count} demo funding opportunities toegevoegd!`)

// Show statistics
const stats = {
  total: db.prepare('SELECT COUNT(*) as count FROM funding_opportunities').get().count,
  byStage: db.prepare('SELECT stage, COUNT(*) as count FROM funding_opportunities GROUP BY stage ORDER BY count DESC').all(),
  bySector: db.prepare('SELECT sector, COUNT(*) as count FROM funding_opportunities GROUP BY sector ORDER BY count DESC').all(),
}

console.log(`\n📊 Database Statistieken:`)
console.log(`Total opportunities: ${stats.total}`)
console.log(`\nBy Stage:`)
stats.byStage.forEach(s => console.log(`  ${s.stage}: ${s.count}`))
console.log(`\nBy Sector:`)
stats.bySector.forEach(s => console.log(`  ${s.sector}: ${s.count}`))

db.close()
