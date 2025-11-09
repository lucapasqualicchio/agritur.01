import { useState, useEffect } from 'react';
import { X, Settings, Check } from 'lucide-react';
import { getCookiePreferences, saveCookiePreferences, hasGivenConsent, CookiePreferences } from '../utils/cookieUtils';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false
  });

  useEffect(() => {
    // Check if user has already given consent
    if (!hasGivenConsent()) {
      setShowBanner(true);
      setPreferences(getCookiePreferences());
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    saveCookiePreferences(allAccepted);
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    saveCookiePreferences(preferences);
    setShowBanner(false);
    setShowSettings(false);
  };

  const handleRejectAll = () => {
    const rejected: CookiePreferences = {
      necessary: true, // Necessary cookies cannot be rejected
      analytics: false,
      marketing: false,
      preferences: false
    };
    saveCookiePreferences(rejected);
    setShowBanner(false);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === 'necessary') return; // Necessary cookies cannot be disabled
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop for settings modal */}
      {showSettings && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={() => setShowSettings(false)}
        />
      )}

      {/* Cookie Banner */}
      <div className="fixed bottom-4 left-4 right-4 md:left-8 md:right-8 bg-white rounded-lg shadow-lg border border-gray-200 z-50 p-6 max-w-2xl mx-auto">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">🍪 Gestione dei Cookie</h3>
          <button
            onClick={() => setShowBanner(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!showSettings ? (
          // Main banner view
          <>
            <p className="text-gray-600 text-sm mb-4">
              Utilizziamo cookie per migliorare la tua esperienza, analizzare il traffico e personalizzare contenuti. 
              Puoi gestire le tue preferenze qui sotto.
            </p>
            
            <div className="flex flex-wrap gap-3">
              <button
                onClick={handleAcceptAll}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Accetta tutti
              </button>
              
              <button
                onClick={() => setShowSettings(true)}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                <Settings className="h-4 w-4 mr-2" />
                Personalizza
              </button>
              
              <button
                onClick={handleRejectAll}
                className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Rifiuta tutti
              </button>
            </div>
          </>
        ) : (
          // Settings view
          <div className="space-y-4">
            <p className="text-gray-600 text-sm">
              Scegli quali cookie vuoi accettare. I cookie necessari non possono essere disabilitati.
            </p>

            <div className="space-y-3">
              {/* Necessary cookies - always enabled */}
              <label className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                <div>
                  <span className="font-medium text-gray-900">Cookie Necessari</span>
                  <p className="text-sm text-gray-600">Essenziali per il funzionamento del sito</p>
                </div>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-3">Sempre attivi</span>
                  <Check className="h-5 w-5 text-green-600" />
                </div>
              </label>

              {/* Analytics cookies */}
              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                <div>
                  <span className="font-medium text-gray-900">Cookie Analitici</span>
                  <p className="text-sm text-gray-600">Ci aiutano a migliorare il sito</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => togglePreference('analytics')}
                    className="sr-only"
                  />
                  <div className={`w-10 h-6 rounded-full transition-colors ${
                    preferences.analytics ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.analytics ? 'transform translate-x-4' : ''
                  }`} />
                </div>
              </label>

              {/* Marketing cookies */}
              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                <div>
                  <span className="font-medium text-gray-900">Cookie Marketing</span>
                  <p className="text-sm text-gray-600">Per mostrarti contenuti personalizzati</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={preferences.marketing}
                    onChange={() => togglePreference('marketing')}
                    className="sr-only"
                  />
                  <div className={`w-10 h-6 rounded-full transition-colors ${
                    preferences.marketing ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.marketing ? 'transform translate-x-4' : ''
                  }`} />
                </div>
              </label>

              {/* Preferences cookies */}
              <label className="flex items-center justify-between p-3 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50">
                <div>
                  <span className="font-medium text-gray-900">Cookie Preferenze</span>
                  <p className="text-sm text-gray-600">Per ricordare le tue scelte</p>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={preferences.preferences}
                    onChange={() => togglePreference('preferences')}
                    className="sr-only"
                  />
                  <div className={`w-10 h-6 rounded-full transition-colors ${
                    preferences.preferences ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                  <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    preferences.preferences ? 'transform translate-x-4' : ''
                  }`} />
                </div>
              </label>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSavePreferences}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors flex-1"
              >
                Salva preferenze
              </button>
              
              <button
                onClick={() => setShowSettings(false)}
                className="border border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Annulla
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}