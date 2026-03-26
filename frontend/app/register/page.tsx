'use client';

import { useEffect, useState } from 'react';
import SignupHeader from '@/components/SignupHeader';
import ProgressIndicator from '@/components/ProgressIndicator';
import ClinicInfoForm, { ClinicInfo } from '@/components/ClinicInfoForm';
import EligibilityForm, { EligibilityData } from '@/components/EligibilityForm';
import AccountSetupForm, { AccountData } from '@/components/AccountSetupForm';
import SuccessScreen from '@/components/SuccessScreen';
import Link from 'next/link';

type Step = 1 | 2 | 3 | 4;

function DevOngoingScreen() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0a0a0f',
        fontFamily: "'Georgia', 'Times New Roman', serif",
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Subtle grid background */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          pointerEvents: 'none',
        }}
      />

      {/* Glowing orb */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          textAlign: 'center',
          maxWidth: '480px',
          padding: '0 24px',
        }}
      >
        {/* Animated icon */}
        <div
          style={{
            width: '72px',
            height: '72px',
            margin: '0 auto 32px',
            border: '1.5px solid rgba(99,102,241,0.5)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(99,102,241,0.08)',
            animation: 'pulse 3s ease-in-out infinite',
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(129,140,248,0.9)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5z" />
            <path d="M2 17l10 5 10-5" />
            <path d="M2 12l10 5 10-5" />
          </svg>
        </div>

        {/* Status pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(99,102,241,0.1)',
            border: '1px solid rgba(99,102,241,0.25)',
            borderRadius: '100px',
            padding: '6px 16px',
            marginBottom: '28px',
          }}
        >
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#818cf8',
              display: 'inline-block',
              animation: 'blink 1.4s ease-in-out infinite',
            }}
          />
          <span
            style={{
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#818cf8',
              fontFamily: "'Courier New', monospace",
            }}
          >
            In Progress
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.75rem)',
            fontWeight: '400',
            color: '#f8fafc',
            lineHeight: '1.2',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}
        >
          Development
          <br />
          <span
            style={{
              color: 'transparent',
              backgroundImage:
                'linear-gradient(135deg, #818cf8 0%, #c084fc 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
            }}
          >
            Ongoing
          </span>
        </h1>

        {/* Subtext */}
        <p
          style={{
            color: 'rgba(148,163,184,0.75)',
            fontSize: '15px',
            lineHeight: '1.7',
            marginBottom: '40px',
            fontFamily: "'Georgia', serif",
          }}
        >
          This page is currently being built. Check back soon {'\n'}~ Engr. Mark.
        </p>

        {/* Divider */}
        <div
          style={{
            width: '40px',
            height: '1px',
            background: 'rgba(99,102,241,0.4)',
            margin: '0 auto',
          }}
        />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(99,102,241,0.0); }
          50% { box-shadow: 0 0 24px 4px rgba(99,102,241,0.18); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo | null>(null);
  const [eligibilityData, setEligibilityData] = useState<EligibilityData | null>(null);
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const user = localStorage.getItem('user');
    setAuthorized(user === 'ezehmark');
  }, []);

  // Avoid flash of content before localStorage is read
  if (authorized === null) return null;
  if (!authorized) return <DevOngoingScreen />;

  const stepLabels = ['Clinic Info', 'Eligibility', 'Account Setup', 'Confirmation'];

  const handleClinicInfoNext = (data: ClinicInfo) => {
    setClinicInfo(data);
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEligibilityNext = (data: EligibilityData) => {
    setEligibilityData(data);
    setCurrentStep(3);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAccountSetupNext = (data: AccountData) => {
    setAccountData(data);
    setCurrentStep(4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToEligibility = () => {
    setCurrentStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="h-full bg-background pt-4 md:pt-18">
      <Link href="/" className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-foreground via-gray-600 to-foreground bg-clip-text top-4 left-4 absolute fixed z-[500] text-transparent">
        Register
      </Link>

      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 mt-20 md:mt-2">
        <ProgressIndicator currentStep={currentStep} totalSteps={4} stepLabels={stepLabels} />

        <div className="bg-card border border-border/20 rounded-lg sm:rounded-xl p-6 sm:p-8 lg:p-10">
          {currentStep === 1 && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 sm:mb-3">
                Tell us about your clinic
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg mb-8 sm:mb-10">
                Help us understand your clinic's needs and verify your eligibility for Scriptish.
              </p>
              <ClinicInfoForm onNext={handleClinicInfoNext} />
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 sm:mb-3">
                Eligibility Check
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg mb-8 sm:mb-10">
                We need to confirm your clinic meets our platform requirements.
              </p>
              <EligibilityForm onNext={handleEligibilityNext} onBack={() => setCurrentStep(1)} />
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2 sm:mb-3">
                Create Your Account
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg mb-8 sm:mb-10">
                Set up your admin account to access the Scriptish platform.
              </p>
              <AccountSetupForm onNext={handleAccountSetupNext} onBack={handleBackToEligibility} />
            </div>
          )}

          {currentStep === 4 && accountData && (
            <SuccessScreen email={accountData.email} />
          )}
        </div>

        <div className="mt-2 sm:mt-4 text-center text-sm text-muted-foreground">
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-brand hover:underline font-semibold">
              Log in here
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}