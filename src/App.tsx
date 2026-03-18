// src/App.tsx
import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { BrandProvider, useBrand } from './context/BrandContext';
import { CartProvider } from './context/CartContext';
import { MainLayout } from './layouts/MainLayout';

import { ThemeHandler } from './components/common/ThemeHandler';
import { CartDrawer } from './components/common/CartDrawer';
import { LoadingScreen } from './components/ui/LoadingScreen';

const Home = lazy(() => import('./pages/Home').then(module => ({ default: module.Home })));
const Shop = lazy(() => import('./pages/Shop').then(module => ({ default: module.Shop })));
const CakeDetails = lazy(() => import('./pages/CakeDetails').then(module => ({ default: module.CakeDetails })));
const Gallery = lazy(() => import('./pages/Gallery').then(module => ({ default: module.Gallery })));
const Contact = lazy(() => import('./pages/Contact').then(module => ({ default: module.Contact })));
const CustomOrder = lazy(() => import('./pages/CustomOrder').then(module => ({ default: module.CustomOrder })));
const AdminDashboard = lazy(() => import('./components/admin/AdminDashboard'));



import type { Cake } from './types';



// ----------------------------------------------

const AppContent = () => {
  const { data, isLoading, error } = useBrand();
  const [selectedCake, setSelectedCake] = useState<Cake | null>(null);
  const [isDev, setIsDev] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // 2. Add this useEffect to handle the dynamic favicon
  useEffect(() => {
    if (data?.brand?.logo) {
      // Dynamically update favicon
      const link: HTMLLinkElement = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.href = data.brand.logo;
      if (!document.querySelector("link[rel*='icon']")) {
        document.head.appendChild(link);
      }

      // Performance Hack: Preconnect to the image source to reduce DNS/Handshake time
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = data.brand.logo; 
      document.head.appendChild(preconnect);
    }
  }, [data?.brand?.logo]);


  useEffect(() => {
    if (localStorage.getItem('DEV_MODE') === 'true') {
      setIsDev(true);
    }

    const params = new URLSearchParams(location.search);
    const devKey = params.get('dev');

    // To unlock: visit /?dev=adison
    if (devKey === 'adison') {
      localStorage.setItem('DEV_MODE', 'true');
      setIsDev(true);

      const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({path: newUrl}, '', newUrl);
    }
    // To lock: visit /?dev=lock
    else if (devKey === 'lock') {
      localStorage.removeItem('DEV_MODE');
      setIsDev(false);
      const newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({path: newUrl}, '', newUrl);
    }
  }, [location.search]);

  const handleSelectCake = (cake: Cake) => {
    setSelectedCake(cake);
    navigate(`/details${location.search}`);
    window.scrollTo(0, 0);
  };

  const clearBrandLock = () => {
    localStorage.removeItem('locked_brand');
    window.location.href = '/'; 
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  // If no brand is found in URL or LocalStorage, show the Admin Dashboard
// 2. Handle the Admin Portal view
  if (error === "NO_BRAND_PROVIDED") {
    return (
      <Suspense fallback={<LoadingScreen />}>
        <AdminDashboard />
      </Suspense>
    );
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
        {isDev && (
          <div className="fixed bottom-4 left-4 z-[100] bg-white/80 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-slate-200 flex gap-2">
            <button 
              onClick={clearBrandLock} 
              className="px-3 py-1 text-xs bg-red-100 text-red-600 font-bold rounded"
            >
              ← Admin Hub
            </button>
            <button onClick={() => navigate(`/${location.search}`)} className="px-4 py-2 text-sm font-bold bg-slate-100 rounded-xl hover:bg-slate-200 transition-all">Home</button>
            <button onClick={() => navigate(`/shop${location.search}`)} className="px-4 py-2 text-sm font-bold bg-slate-100 rounded-xl hover:bg-slate-200 transition-all">Shop</button>
            <button onClick={() => navigate(`/gallery${location.search}`)} className="px-4 py-2 text-sm font-bold bg-slate-100 rounded-xl hover:bg-slate-200 transition-all">Gallery</button>
            <button onClick={() => navigate(`/contact${location.search}`)} className="px-4 py-2 text-sm font-bold bg-slate-100 rounded-xl hover:bg-slate-200 transition-all">Contact</button>
          </div>
        )}

        <Routes>
          <Route path="/" element={<Home onSelectCake={handleSelectCake} />} />
          <Route path="/shop" element={<Shop onSelectCake={handleSelectCake} />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/custom-order" element={<CustomOrder />} />
          <Route 
            path="/details" 
            element={
              selectedCake 
                ? <CakeDetails cake={selectedCake} onBack={() => navigate(`/shop${location.search}`)} /> 
                : <Navigate to={`/shop${location.search}`} replace /> 
            } 
          />
        </Routes>
      </MainLayout>
    </>
  );
};

function App() {
  return (
    <Router>
      <BrandProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </BrandProvider>
    </Router>
  );
}

export default App;


// localStorage.setItem('DEV_MODE', 'true')
// localStorage.removeItem('DEV_MODE')