import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Manage Partners | Hospital Dashboard',
  description: 'Manage clinic partnerships and integrations',
};

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/30 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Link href="/hospital-dashboard">
                  <button className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
                    <ArrowLeft className="w-5 h-5 text-accent" />
                  </button>
                </Link>
                <h1 className="text-3xl font-bold text-accent">
                  Partner Clinics
                </h1>
              </div>
              <p className="text-foreground/60">
                Connect and manage your infusion clinic partnerships
              </p>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-primary font-semibold gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Add Partner
            </Button>
          </div>
        </div>
      </div>

      {/* Content Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-primary/10 border border-border/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Partner Integration
          </h2>
          <p className="text-foreground/60 mb-6">
            Manage connections with infusion clinics, view partnership status, and handle clinic communications.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 bg-background/50 rounded-xl border border-border/20">
              <h3 className="font-semibold text-accent mb-2">Add Partner</h3>
              <p className="text-sm text-foreground/60">Connect with new partner clinics via integration</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl border border-border/20">
              <h3 className="font-semibold text-accent mb-2">Manage Access</h3>
              <p className="text-sm text-foreground/60">Control sharing and data access permissions</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl border border-border/20">
              <h3 className="font-semibold text-accent mb-2">View Reports</h3>
              <p className="text-sm text-foreground/60">Performance metrics and partnership insights</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
