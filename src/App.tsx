// src/App.tsx
import { useState } from 'react';
import { BrandProvider, useBrand } from './context/BrandContext';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { CakeDetails } from './pages/CakeDetails';
import { ThemeHandler } from './components/common/ThemeHandler';
import { CartProvider } from './context/CartContext'; // Add this import
import { CartDrawer } from './components/common/CartDrawer';

import { Lock, ChevronRight } from 'lucide-react';
import type { Cake } from './types';

type ViewState = 'home' | 'shop' | 'details';

// --- UPDATED: PRIVATE ADMIN DASHBOARD COMPONENT ---
const AdminDashboard = () => {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [clients, setClients] = useState<{name: string, id: string}[]>([]);

  // Fetch the registry once the dashboard is unlocked
  const loadClients = async () => {
    try {
      const response = await fetch('/brands/registry.json');
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      }
    } catch (err) {
      console.error("Could not load client registry.");
    }
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '123') {
      setIsUnlocked(true);
      loadClients(); // Trigger fetch here
    } else {
      alert('Incorrect passcode');
    }
  };

  if (!isUnlocked) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50">
        <form onSubmit={handleUnlock} className="bg-white p-8 rounded-3xl shadow-xl border border-slate-200 max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Lock className="w-8 h-8 text-slate-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Admin Portal</h1>
          <p className="text-slate-500 text-sm mb-6">Enter passcode to view active client mockups.</p>
          <input 
            type="password" 
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            // Added font-mono, tracking, and larger text
            className="w-full px-4 py-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 text-center text-2xl font-mono tracking-[0.5em] outline-none focus:border-brand-primary focus:ring-4 focus:ring-brand-primary/10 transition-all placeholder:tracking-normal placeholder:text-sm"
            placeholder="••••"
          />
          <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-brand-primary hover:shadow-lg hover:shadow-brand-primary/20 transition-all active:scale-95">
            Access Dashboard
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Client Mockups</h1>
        <p className="text-slate-600 mb-8">Select a brand to view their specific storefront.</p>
        
        {clients.length === 0 ? (
          <p className="text-slate-400 text-center py-10">No clients found. Run the generator script!</p>
        ) : (
          <div className="grid gap-4">
            {clients.map(client => (
              <a 
                key={client.id}
                href={`/?brand=${client.id}`}
                className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:border-brand-primary hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                <div className="flex flex-col gap-1">
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-brand-primary transition-colors">{client.name}</h2>
                  {/* Styled as a clean technical tag */}
                  <span className="inline-flex items-center w-fit px-2 py-0.5 rounded-md bg-slate-50 border border-slate-100 text-[10px] font-mono text-slate-400">
                    ID: {client.id}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-brand-primary/10 transition-colors">
                  <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-brand-primary transition-all" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
// ----------------------------------------------

const AppContent = () => {
  const { isLoading, error } = useBrand();
  const [view, setView] = useState<ViewState>('home');
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);

  const handleSelectCake = (cake: Cake) => {
    setSelectedCake(cake);
    setView('details');
    window.scrollTo(0, 0);
  };

  const clearBrandLock = () => {
    localStorage.removeItem('locked_brand');
    window.location.href = '/'; 
  };

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-brand-primary rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-400 tracking-widest uppercase animate-pulse">
          Loading Bakery...
        </p>
      </div>
    );
  }

  // If no brand is found in URL or LocalStorage, show the Admin Dashboard
  if (error === "NO_BRAND_PROVIDED") {
    return <AdminDashboard />;
  }

  // If it's a real error (e.g., brand folder doesn't exist)
  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-50 text-center p-6">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Access Restricted</h1>
          <p className="text-slate-600 mb-8">{error}</p>
          <button onClick={clearBrandLock} className="px-4 py-2 bg-slate-200 rounded-lg text-sm font-bold text-slate-700">
            Reset Lock
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <ThemeHandler />
      <CartDrawer />
      <MainLayout>
        {/* Dev Nav */}
        <div className="fixed bottom-4 left-4 z-[100] bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-slate-200 flex gap-2">
          <button 
            onClick={clearBrandLock} 
            className="px-3 py-1 text-xs bg-red-100 text-red-600 font-bold rounded"
          >
            ← Admin Hub
          </button>
          <button onClick={() => setView('home')} className="px-4 py-2 text-sm font-bold bg-slate-100 rounded-xl hover:bg-slate-200 transition-all">Home</button>
          <button onClick={() => setView('shop')} className="px-4 py-2 text-sm font-bold bg-slate-100 rounded-xl hover:bg-slate-200 transition-all">Shop</button>
        </div>

        {view === 'home' && <Home onSelectCake={handleSelectCake} />}
        {view === 'shop' && <Shop onSelectCake={handleSelectCake} />}
        {view === 'details' && selectedCake && <CakeDetails cake={selectedCake} onBack={() => setView('shop')} />}
      </MainLayout>
    </>
  );
};

function App() {
  return (
    <BrandProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrandProvider>
  );
}

export default App;