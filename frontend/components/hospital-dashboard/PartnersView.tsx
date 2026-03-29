'use client';

import { Plus, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PartnersViewProps {
  onBack?: () => void;
}

export default function PartnersView({ onBack }: PartnersViewProps) {
  return (
    <>
      {/* Header */}
      <div className="border-b border-border/30 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                {onBack && (
                  <button
                    onClick={onBack}
                    className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5 text-accent" />
                  </button>
                )}
                <h1 className="text-3xl font-bold text-accent">Partner Clinics</h1>
              </div>
              <p className="text-foreground/75">Connect and manage your infusion clinic partnerships</p>
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white font-semibold gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Add Partner
            </Button>
          </div>
        </div>
      </div>

      {/* Content Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-primary/10 border border-border/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">Partner Integration</h2>
          <p className="text-foreground/75 mb-6">
            Manage connections with infusion clinics, view partnership status, and handle clinic communications.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 bg-background/50 rounded-xl border border-border/20">
              <h3 className="font-semibold text-accent mb-2">Active Partners</h3>
              <p className="text-sm text-foreground/75">View all connected clinics</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl border border-border/20">
              <h3 className="font-semibold text-accent mb-2">Partnership Status</h3>
              <p className="text-sm text-foreground/75">Manage integration settings</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl border border-border/20">
              <h3 className="font-semibold text-accent mb-2">Communications</h3>
              <p className="text-sm text-foreground/75">Send messages and updates</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
