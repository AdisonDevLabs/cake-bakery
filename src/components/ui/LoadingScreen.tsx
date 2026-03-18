// src/components/ui/LoadingScreen.tsx

export const LoadingScreen = () => {
  return (
      <div className="h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-slate-100 border-t-brand-primary rounded-full animate-spin mb-4" />
        <p className="text-sm font-bold text-slate-400 tracking-widest uppercase animate-pulse">
          Loading Bakery...
        </p>
      </div>
  );
};