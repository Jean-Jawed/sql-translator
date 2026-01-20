import { useState } from 'react'
import { LanguageProvider, useLanguage } from './i18n/LanguageContext'
import { Header } from './components/Layout/Header'
import { Footer } from './components/Layout/Footer'
import { Tabs } from './components/Layout/Tabs'
import { Generator } from './components/Generator/Generator'
import { Translator } from './components/Translator/Translator'
import { Limitations } from './components/UI/Limitations'

function MobileWarning() {
  const { t } = useLanguage()
  
  return (
    <div className="mobile-warning min-h-screen flex items-center justify-center p-6 text-center bg-slate-50">
      <div className="card p-8 max-w-md">
        <svg className="w-16 h-16 mx-auto mb-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        <p className="text-slate-500">{t('mobileWarning')}</p>
      </div>
    </div>
  )
}

function AppContent() {
  const [activeTab, setActiveTab] = useState('generator')

  return (
    <>
      <MobileWarning />
      
      <div className="desktop-content min-h-screen flex flex-col">
        <Header />
        
        <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-8">
            {/* Main content */}
            <div>
              <div className="card overflow-hidden">
                <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
                
                <div className="p-6">
                  {activeTab === 'generator' ? <Generator /> : <Translator />}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Decorative image */}
              <div className="card overflow-hidden">
                <img 
                  src="/sql.jpg" 
                  alt="SQL illustration" 
                  className="w-full h-48 object-cover opacity-80"
                  onError={(e) => {
                    e.target.style.display = 'none'
                  }}
                />
              </div>
              
              {/* Limitations */}
              <Limitations />
            </aside>
          </div>
        </main>
        
        <Footer />
      </div>
    </>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  )
}
