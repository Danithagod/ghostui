'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Package, Truck, Home, Ghost, ArrowLeft, Sparkles } from 'lucide-react';
import { GooeyButton, useThemeOptional } from 'ghostui-react';
import { Cart, CheckoutForm } from '../types';

export interface OrderSuccessProps {
  cart: Cart;
  formData: CheckoutForm;
  onContinueShopping: () => void;
  onTrackOrder: () => void;
}

type DeliveryStage = 'brewing' | 'bottling' | 'dispatched' | 'arriving';

const deliveryStages: { id: DeliveryStage; label: string; icon: React.ReactNode; spookyText: string }[] = [
  { id: 'brewing', label: 'Brewing', icon: <Ghost className="w-5 h-5" />, spookyText: 'Your potions are being conjured...' },
  { id: 'bottling', label: 'Bottling', icon: <Package className="w-5 h-5" />, spookyText: 'Sealing with ancient wax...' },
  { id: 'dispatched', label: 'Dispatched', icon: <Truck className="w-5 h-5" />, spookyText: 'Ravens have taken flight...' },
  { id: 'arriving', label: 'Arriving', icon: <Home className="w-5 h-5" />, spookyText: 'Materializing at your crypt...' },
];

const spookyMessages = [
  "Our spectral couriers are preparing your package...",
  "The bats are loading your order onto the midnight carriage...",
  "Your potions are being blessed by the moon...",
  "The spirits are wrapping your items with care...",
  "Our ghostly team is double-checking your order...",
];

// Delivery Timeline Component with Gooey Progress Bar
function DeliveryTimeline({ 
  stages, 
  currentStageIndex, 
  theme,
  accentColor,
  accentRgb 
}: { 
  stages: typeof deliveryStages;
  currentStageIndex: number;
  theme: string;
  accentColor: string;
  accentRgb: string;
}) {
  const filterId = React.useId().replace(/:/g, '');
  const progress = ((currentStageIndex) / (stages.length - 1)) * 100;

  const colors = useMemo(() => {
    if (theme === 'blood') {
      return {
        fill: '#8a1c1c',
        glow: 'rgba(220, 38, 38, 0.4)',
      };
    }
    return {
      fill: '#7c3aed',
      glow: 'rgba(139, 92, 246, 0.4)',
    };
  }, [theme]);

  return (
    <div className="w-full">
      {/* SVG Filter for goo effect */}
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id={`delivery-goo-${filterId}`} colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feGaussianBlur in="goo" stdDeviation="2" result="smoothGoo" />
            <feSpecularLighting
              in="smoothGoo"
              surfaceScale="5"
              specularConstant="1.2"
              specularExponent="20"
              lightingColor="#ffffff"
              result="specular"
            >
              <fePointLight x="-100" y="-200" z="200" />
            </feSpecularLighting>
            <feComposite in="specular" in2="goo" operator="in" result="specularClean" />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" result="solidGoo" />
            <feComposite in="specularClean" in2="solidGoo" operator="over" />
          </filter>
        </defs>
      </svg>

      {/* Stage Icons Row */}
      <div className="relative flex justify-between items-start mb-4">
        {/* Background Track Line */}
        <div className="absolute top-4 left-[3%] right-[3%] h-2.5 bg-gray-700/50 rounded-full" />
        
        {/* Animated Fill Line */}
        <div 
          className="absolute top-4 left-[3%] h-2.5 rounded-full overflow-visible"
          style={{ 
            width: '94%',
            filter: `url(#delivery-goo-${filterId})` 
          }}
        >
          <motion.div
            className="h-full rounded-full relative"
            style={{ 
              backgroundColor: colors.fill,
              boxShadow: `0 0 15px ${colors.glow}`,
            }}
            initial={false}
            animate={{ width: `${Math.max(progress, 2)}%` }}
            transition={{ type: 'spring', stiffness: 50, damping: 15 }}
          >
            {/* Drips */}
            {progress > 0 && (
              <>
                <motion.div
                  className="absolute right-0 top-full w-2.5 h-2.5 -mt-1 rounded-full"
                  style={{ backgroundColor: colors.fill }}
                  animate={{ height: [8, 18, 8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                  className="absolute right-3 top-full w-2 h-2 -mt-1 rounded-full"
                  style={{ backgroundColor: colors.fill }}
                  animate={{ height: [6, 14, 6] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                />
              </>
            )}
          </motion.div>
        </div>

        {/* Stage Icons */}
        {stages.map((stage, index) => {
          const isActive = index <= currentStageIndex;
          const isCurrent = index === currentStageIndex;

          return (
            <div key={stage.id} className="flex flex-col items-center z-10" style={{ width: `${100 / stages.length}%` }}>
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                style={{
                  backgroundColor: isActive ? accentColor : 'rgba(31, 41, 55, 0.8)',
                  borderColor: isActive ? accentColor : 'rgba(75, 85, 99, 0.5)',
                  color: isActive ? '#fff' : 'rgba(156, 163, 175, 1)',
                  boxShadow: isCurrent ? `0 0 20px rgba(${accentRgb}, 0.6)` : 'none',
                }}
                animate={isCurrent ? { scale: [1, 1.1, 1] } : {}}
                transition={{ duration: 1.5, repeat: isCurrent ? Infinity : 0 }}
              >
                {stage.icon}
              </motion.div>
              <span className={`text-xs font-medium mt-3 text-center ${isActive ? 'text-white' : 'text-gray-500'}`}>
                {stage.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Progress indicator */}
      <div className="flex justify-end mt-2">
        <span className="text-xs text-gray-500">
          Stage {currentStageIndex + 1} of {stages.length}
        </span>
      </div>
    </div>
  );
}

export function OrderSuccess({ cart, formData, onContinueShopping, onTrackOrder }: OrderSuccessProps) {
  const [currentStage, setCurrentStage] = useState<DeliveryStage>('brewing');
  const [spookyMessage, setSpookyMessage] = useState(spookyMessages[0]);
  const [showConfetti, setShowConfetti] = useState(true);

  const themeContext = useThemeOptional();
  const theme = themeContext?.theme ?? 'spectral';
  const accentColor = theme === 'blood' ? '#ef4444' : '#a855f7';
  const accentRgb = theme === 'blood' ? '239, 68, 68' : '168, 85, 247';

  // Generate order number
  const orderNumber = `HAUNT-${new Date().getFullYear()}-${Math.floor(Math.random() * 9000 + 1000)}`;
  
  // Generate delivery date (3-5 days from now)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + Math.floor(Math.random() * 3) + 3);
  const deliveryDateStr = deliveryDate.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });

  // Animate through delivery stages
  useEffect(() => {
    const stages: DeliveryStage[] = ['brewing', 'bottling', 'dispatched', 'arriving'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % stages.length;
      setCurrentStage(stages[currentIndex]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Rotate spooky messages
  useEffect(() => {
    const interval = setInterval(() => {
      setSpookyMessage(spookyMessages[Math.floor(Math.random() * spookyMessages.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Hide confetti after animation
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  const currentStageIndex = deliveryStages.findIndex(s => s.id === currentStage);

  return (
    <div className="min-h-screen bg-[var(--ghost-bg)] p-8 relative overflow-hidden">
      {/* Confetti Animation */}
      <AnimatePresence>
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                initial={{ 
                  top: -50, 
                  left: `${Math.random() * 100}%`,
                  rotate: 0,
                  opacity: 1 
                }}
                animate={{ 
                  top: '110%',
                  rotate: Math.random() * 720 - 360,
                  opacity: [1, 1, 0]
                }}
                transition={{ 
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  ease: 'easeIn'
                }}
              >
                {['🧪', '💀', '🦇', '✨', '🌙', '👻', '🔮'][Math.floor(Math.random() * 7)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated Success Icon */}
          <motion.div
            className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6"
            style={{ 
              backgroundColor: `rgba(${accentRgb}, 0.2)`,
              boxShadow: `0 0 40px rgba(${accentRgb}, 0.4), 0 0 80px rgba(${accentRgb}, 0.2)`
            }}
            animate={{ 
              scale: [1, 1.1, 1],
              boxShadow: [
                `0 0 40px rgba(${accentRgb}, 0.4), 0 0 80px rgba(${accentRgb}, 0.2)`,
                `0 0 60px rgba(${accentRgb}, 0.6), 0 0 100px rgba(${accentRgb}, 0.3)`,
                `0 0 40px rgba(${accentRgb}, 0.4), 0 0 80px rgba(${accentRgb}, 0.2)`,
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <CheckCircle className="w-12 h-12" style={{ color: accentColor }} />
          </motion.div>

          <h1 className="text-4xl font-bold text-white mb-3">
            Your Order Has Been Summoned! 👻
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            The spirits have accepted your offering
          </p>
          <p className="text-sm text-gray-500">
            Order #{orderNumber}
          </p>
        </motion.div>

        {/* Delivery Timeline */}
        <motion.div
          className="bg-[var(--ghost-bg-primary)] rounded-2xl p-8 mb-8 border"
          style={{ borderColor: `rgba(${accentRgb}, 0.2)` }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl font-bold text-white mb-10 flex items-center gap-2">
            <Sparkles className="w-5 h-5" style={{ color: accentColor }} />
            Delivery Timeline
          </h2>

          {/* Timeline with integrated progress */}
          <DeliveryTimeline 
            stages={deliveryStages}
            currentStageIndex={currentStageIndex}
            theme={theme}
            accentColor={accentColor}
            accentRgb={accentRgb}
          />

          {/* Current Status Message */}
          <motion.div 
            className="text-center p-4 rounded-lg mt-6"
            style={{ backgroundColor: `rgba(${accentRgb}, 0.1)` }}
            key={currentStage}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-white font-medium">
              {deliveryStages[currentStageIndex].spookyText}
            </p>
          </motion.div>

          {/* Estimated Delivery */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">Expected to materialize</p>
            <p className="text-white text-lg font-semibold">{deliveryDateStr}</p>
            <p className="text-gray-500 text-xs mt-1">
              Delivered by our spectral couriers under the cover of night 🌙
            </p>
          </div>
        </motion.div>

        {/* Order Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Order Summary */}
          <motion.div
            className="bg-[var(--ghost-bg-primary)] rounded-2xl p-6 border"
            style={{ borderColor: `rgba(${accentRgb}, 0.2)` }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Package className="w-5 h-5" style={{ color: accentColor }} />
              Order Summary
            </h3>
            
            <div className="space-y-3 mb-4">
              {cart.items.map((item) => (
                <div key={item.product.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">🧪</span>
                    <div>
                      <p className="text-white text-sm font-medium">{item.product.name}</p>
                      <p className="text-gray-500 text-xs">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-green-400 font-medium">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-700/50 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold">Total Paid</span>
                <span className="text-green-400 font-bold text-xl">${cart.total.toFixed(2)}</span>
              </div>
            </div>
          </motion.div>

          {/* Shipping Details */}
          <motion.div
            className="bg-[var(--ghost-bg-primary)] rounded-2xl p-6 border"
            style={{ borderColor: `rgba(${accentRgb}, 0.2)` }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Home className="w-5 h-5" style={{ color: accentColor }} />
              Delivery Crypt
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Recipient</p>
                <p className="text-white font-medium">{formData.name}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Spirit Communication</p>
                <p className="text-white font-medium">{formData.email}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Address</p>
                <p className="text-white font-medium">{formData.address}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-wide">Payment Method</p>
                <p className="text-white font-medium">{formData.paymentMethod}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Spooky Message */}
        <motion.div
          className="text-center mb-8 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.p 
            className="text-gray-400 italic"
            key={spookyMessage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            "{spookyMessage}"
          </motion.p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <GooeyButton variant="slime" onClick={onContinueShopping}>
            <span className="inline-flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Summon More Potions
            </span>
          </GooeyButton>
          <GooeyButton variant="ectoplasm" onClick={onTrackOrder}>
            <span className="inline-flex items-center gap-2">
              <Ghost className="w-4 h-4" />
              Track Through Spirit Realm
            </span>
          </GooeyButton>
        </motion.div>
      </div>
    </div>
  );
}
