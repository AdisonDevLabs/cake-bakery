// src/App.tsx (Final Wiring)
import { useState } from 'react';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { CakeDetails } from './pages/CakeDetails';
import { ThemeHandler } from './components/common/ThemeHandler';
import { cakes } from './data';
import type { Cake } from './types';

type ViewState = 'home' | 'shop' | 'details';

function App() {
  const [view, setView] = useState<ViewState>('home');
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);

  const handleSelectCake = (cake: Cake) => {
    setSelectedCake(cake);
    setView('details');
    window.scrollTo(0, 0);
  };

  return (
    <>
      <ThemeHandler />
      <MainLayout>
        {/* Simple Global Navigation Toggle for testing */}
        <div className="fixed bottom-4 left-4 z-[100] bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-slate-200 flex gap-2">
          <button onClick={() => setView('home')} className="px-4 py-2 text-sm font-bold bg-slate-100 rounded-xl hover:bg-brand-primary hover:text-white transition-all">Home</button>
          <button onClick={() => setView('shop')} className="px-4 py-2 text-sm font-bold bg-slate-100 rounded-xl hover:bg-brand-primary hover:text-white transition-all">Shop</button>
        </div>

        {view === 'home' && <Home onSelectCake={handleSelectCake} />}
        
        {view === 'shop' && <Shop onSelectCake={handleSelectCake} />}

        {view === 'details' && selectedCake && (
          <CakeDetails 
            cake={selectedCake} 
            onBack={() => setView('shop')} 
          />
        )}
      </MainLayout>
    </>
  );
}

export default App;