'use client';

import { useState } from 'react';
import { GraveModal, SpiritInput, GooeyButton } from 'ghostui-react';
import { CheckoutModalProps, CheckoutForm } from '../types';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { StepProgress } from './StepProgress';

type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

export function CheckoutModal({
  cart,
  isOpen,
  onClose,
  onComplete,
}: CheckoutModalProps) {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('shipping');
  const [formData, setFormData] = useState<CheckoutForm>({
    name: '',
    email: '',
    address: '',
    paymentMethod: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm, string>>>({});

  // Reset state when modal closes
  const handleClose = () => {
    setCurrentStep('shipping');
    setFormData({ name: '', email: '', address: '', paymentMethod: '' });
    setErrors({});
    onClose();
  };

  // Validate current step
  const validateStep = (step: CheckoutStep): boolean => {
    const newErrors: Partial<Record<keyof CheckoutForm, string>> = {};

    if (step === 'shipping') {
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email format';
      }
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required';
      }
    }

    if (step === 'payment') {
      if (!formData.paymentMethod.trim()) {
        newErrors.paymentMethod = 'Payment method is required';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    if (currentStep === 'shipping' && validateStep('shipping')) {
      setCurrentStep('payment');
    } else if (currentStep === 'payment' && validateStep('payment')) {
      setCurrentStep('confirmation');
    }
  };

  // Handle previous step
  const handleBack = () => {
    if (currentStep === 'payment') {
      setCurrentStep('shipping');
    } else if (currentStep === 'confirmation') {
      setCurrentStep('payment');
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    onComplete(formData);
    setCurrentStep('shipping');
    setFormData({ name: '', email: '', address: '', paymentMethod: '' });
    setErrors({});
  };

  // Update form field
  const updateField = (field: keyof CheckoutForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Render step content
  const renderStepContent = () => {
    switch (currentStep) {
      case 'shipping':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Shipping Information</h3>
            
            <div>
              <SpiritInput
                label="Full Name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                error={errors.name}
                required
              />
            </div>

            <div>
              <SpiritInput
                label="Email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={(e) => updateField('email', e.target.value)}
                error={errors.email}
                required
              />
            </div>

            <div>
              <SpiritInput
                label="Shipping Address"
                placeholder="123 Haunted Lane, Spooky Town"
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
                error={errors.address}
                required
              />
            </div>
          </div>
        );

      case 'payment':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Payment Method</h3>
            
            <div>
              <SpiritInput
                label="Payment Method"
                placeholder="Credit Card, PayPal, Soul Coins, etc."
                value={formData.paymentMethod}
                onChange={(e) => updateField('paymentMethod', e.target.value)}
                error={errors.paymentMethod}
                required
              />
            </div>

            <div className="bg-gray-800/30 rounded-lg p-4 border border-[var(--ghost-border)] mt-6">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Order Summary</h4>
              <div className="space-y-2">
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-400">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-[var(--ghost-border)] pt-2 mt-2 flex justify-between font-bold">
                  <span className="text-white">Total</span>
                  <span className="text-[var(--ghost-accent)]">${cart.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'confirmation':
        return (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center py-6">
              <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Review Your Order</h3>
              <p className="text-gray-400 text-center mb-6">
                Please review your information before completing the purchase
              </p>
            </div>

            <div className="bg-gray-800/30 rounded-lg p-4 border border-[var(--ghost-border)] space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">Shipping To</p>
                <p className="text-white font-medium">{formData.name}</p>
                <p className="text-gray-400 text-sm">{formData.email}</p>
                <p className="text-gray-400 text-sm">{formData.address}</p>
              </div>

              <div className="border-t border-[var(--ghost-border)] pt-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide">Payment Method</p>
                <p className="text-white font-medium">{formData.paymentMethod}</p>
              </div>

              <div className="border-t border-[var(--ghost-border)] pt-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Order Items</p>
                {cart.items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm mb-1">
                    <span className="text-gray-400">
                      {item.product.name} × {item.quantity}
                    </span>
                    <span className="text-white">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="flex justify-between font-bold mt-2 pt-2 border-t border-[var(--ghost-border)]">
                  <span className="text-white">Total</span>
                  <span className="text-[var(--ghost-accent)] text-lg">${cart.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  // Render step indicator
  const steps: CheckoutStep[] = ['shipping', 'payment', 'confirmation'];
  const currentStepIndex = steps.indexOf(currentStep);
  const stepLabels = ['Shipping', 'Payment', 'Confirm'];

  return (
    <GraveModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Checkout"
    >
      {/* Step Progress Indicator */}
      <div className="mb-10 px-4">
        <StepProgress 
          currentStep={currentStepIndex + 1} 
          totalSteps={steps.length}
          labels={stepLabels}
        />
      </div>

      {/* Step Content */}
      <div className="min-h-[300px]">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[var(--ghost-border)]">
        <GooeyButton
          variant="blood"
          onClick={currentStep === 'shipping' ? handleClose : handleBack}
        >
          <span className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            {currentStep === 'shipping' ? 'Cancel' : 'Back'}
          </span>
        </GooeyButton>

        {currentStep === 'confirmation' ? (
          <GooeyButton
            variant="slime"
            onClick={handleSubmit}
          >
            <span className="inline-flex items-center gap-2">
              Complete Order
              <CheckCircle className="w-4 h-4" />
            </span>
          </GooeyButton>
        ) : (
          <GooeyButton
            variant="ectoplasm"
            onClick={handleNext}
          >
            <span className="inline-flex items-center gap-2">
              Next
              <ArrowRight className="w-4 h-4" />
            </span>
          </GooeyButton>
        )}
      </div>
    </GraveModal>
  );
}
