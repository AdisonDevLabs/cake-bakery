import { useState } from 'react';

import { Lock, ChevronRight } from 'lucide-react';

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

export default AdminDashboard;