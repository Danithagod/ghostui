'use client';

import { GooeyProgressBar } from 'ghostui-react';
import { OrderProgressProps, OrderStatus } from '../types';
import { Flame, Droplet, Truck, Package } from 'lucide-react';

const ORDER_STAGES: { status: OrderStatus; label: string; icon: React.ReactNode }[] = [
  { status: 'brewing', label: 'Brewing', icon: <Flame className="w-5 h-5" /> },
  { status: 'bottling', label: 'Bottling', icon: <Droplet className="w-5 h-5" /> },
  { status: 'shipping', label: 'Shipping', icon: <Truck className="w-5 h-5" /> },
  { status: 'delivered', label: 'Delivered', icon: <Package className="w-5 h-5" /> },
];

export function OrderProgress({ status }: OrderProgressProps) {
  // Calculate progress percentage based on current status
  const getProgressValue = (currentStatus: OrderStatus): number => {
    const statusIndex = ORDER_STAGES.findIndex((stage) => stage.status === currentStatus);
    if (statusIndex === -1) return 0;
    
    // Calculate percentage: each stage represents 25% (100 / 4 stages)
    return ((statusIndex + 1) / ORDER_STAGES.length) * 100;
  };

  const progressValue = getProgressValue(status);
  const currentStageIndex = ORDER_STAGES.findIndex((stage) => stage.status === status);

  return (
    <div className="w-full space-y-6">
      {/* Progress Bar */}
      <div className="px-4">
        <GooeyProgressBar value={progressValue} variant="blood" />
      </div>

      {/* Stage Indicators */}
      <div className="grid grid-cols-4 gap-2">
        {ORDER_STAGES.map((stage, index) => {
          const isActive = index === currentStageIndex;
          const isCompleted = index < currentStageIndex;
          const isPending = index > currentStageIndex;

          return (
            <div
              key={stage.status}
              className={`
                flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all duration-300
                ${
                  isActive
                    ? 'border-purple-500 bg-purple-500/10 scale-105'
                    : isCompleted
                    ? 'border-green-500/50 bg-green-500/5'
                    : 'border-gray-700/50 bg-gray-800/30'
                }
              `}
            >
              {/* Icon */}
              <div
                className={`
                  mb-2 transition-colors duration-300
                  ${
                    isActive
                      ? 'text-purple-400'
                      : isCompleted
                      ? 'text-green-400'
                      : 'text-gray-500'
                  }
                `}
              >
                {stage.icon}
              </div>

              {/* Label */}
              <p
                className={`
                  text-xs font-semibold text-center transition-colors duration-300
                  ${
                    isActive
                      ? 'text-purple-400'
                      : isCompleted
                      ? 'text-green-400'
                      : 'text-gray-500'
                  }
                `}
              >
                {stage.label}
              </p>

              {/* Status Indicator */}
              {isActive && (
                <div className="mt-2 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse delay-75" />
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse delay-150" />
                </div>
              )}

              {isCompleted && (
                <div className="mt-2">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Current Status Message */}
      <div className="text-center">
        <p className="text-gray-400 text-sm">
          {status === 'brewing' && 'Your potions are being carefully brewed...'}
          {status === 'bottling' && 'Bottling your magical concoctions...'}
          {status === 'shipping' && 'Your order is on its way!'}
          {status === 'delivered' && 'Your order has been delivered! Enjoy your potions!'}
        </p>
      </div>
    </div>
  );
}
