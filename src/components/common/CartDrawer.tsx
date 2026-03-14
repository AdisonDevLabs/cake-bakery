// src/components/common/CartDrawer.tsx
import { X, Minus, Plus, ShoppingBag, MessageCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useBrand } from '../../context/BrandContext';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, cartTotal } = useCart();
  const { data } = useBrand();

  if (!data) return null;
  const { brand } = data;

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    // 1. Clean the phone number (removes dashes, spaces, and brackets)
    // IMPORTANT: Ensure your brand.json phone number includes the country code! 
    // Example: "15551234567" instead of "(555) 123-4567"
    const cleanPhone = brand.contact.phone.replace(/\D/g, '');

    // 2. Build the personalized message using WhatsApp formatting (*bold*, _italic_)
    let message = `Hello *${brand.name}* 👋\nI would like to place an order:\n\n`;
    
    items.forEach(item => {
      message += `▪️ ${item.quantity}x ${item.cake.name} - Ksh ${(item.cake.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n*Order Total: Ksh ${cartTotal.toFixed(2)}*\n\n`;
    message += `Please let me know the next steps for payment and delivery details. Thank you`;

    // 3. Encode the text so it works safely in a URL
    const encodedMessage = encodeURIComponent(message);

    // 4. Generate the official WhatsApp "Click to Chat" link
    const whatsappUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

    // 5. Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      {/* Dark overlay background */}
      <div 
        aria-hidden="true"
        className={cn(
          "fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] transition-opacity duration-300",
          isCartOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out panel */}
      <div 
        className={cn(
          "fixed top-0 right-0 h-full w-full sm:w-[400px] bg-white z-[101] shadow-2xl flex flex-col transition-transform duration-300 ease-in-out",
          isCartOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-primary" />
            Your Order
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 pb-20">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-slate-200" />
              <p className="text-lg font-medium text-slate-600">Your cart is empty.</p>
              <Button variant="ghost" className="mt-6" onClick={() => setIsCartOpen(false)}>
                Keep Browsing
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.cake.id} className="flex gap-4">
                {/* Added shrink-0 so the image retains its shape */}
                <img src={item.cake.image} alt={item.cake.name} className="w-20 h-20 rounded-xl object-cover border border-slate-100 shrink-0" />
                
                {/* Added flex flex-col so mt-auto actually pushes the controls to the bottom */}
                <div className="flex-1 flex flex-col">
                  <h3 className="font-bold text-slate-900 leading-tight mb-1">{item.cake.name}</h3>
                  <p className="text-brand-primary font-bold text-sm mb-3">Ksh {item.cake.price.toFixed(2)}</p>
                  
                  {/* mt-auto now works perfectly here */}
                  <div className="flex items-center justify-between mt-auto">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1 border border-slate-100">
                      <button onClick={() => updateQuantity(item.cake.id, item.quantity - 1)} className="p-1 hover:bg-white rounded text-slate-600 shadow-sm transition-all">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cake.id, item.quantity + 1)} className="p-1 hover:bg-white rounded text-slate-600 shadow-sm transition-all">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeItem(item.cake.id)}
                      className="text-xs text-slate-400 hover:text-red-500 font-bold transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-slate-100 bg-slate-50">
            <div className="flex justify-between items-center mb-6">
              <span className="font-medium text-slate-600">Subtotal</span>
              <span className="text-2xl font-bold text-slate-900">Ksh {cartTotal.toFixed(2)}</span>
            </div>
            
            {/* The WhatsApp Button */}
            <button 
              onClick={handleWhatsAppCheckout}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-xl font-bold text-white text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              style={{ backgroundColor: '#25D366' }} // Official WhatsApp Green
            >
              <MessageCircle className="w-6 h-6" />
              Order via WhatsApp
            </button>
            
            <p className="text-center text-xs text-slate-400 mt-4 leading-relaxed">
              Taxes, delivery, and pickup times will be arranged <br/> directly with {brand.name}.
            </p>
          </div>
        )}
      </div>
    </>
  );
};