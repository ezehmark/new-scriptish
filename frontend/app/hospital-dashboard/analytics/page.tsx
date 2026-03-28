import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Analytics | Hospital Dashboard',
  description: 'Referral Analytics and performance insights',
};

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/30 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3 mb-3">
            <Link href="/hospital-dashboard">
              <button className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-accent" />
              </button>
            </Link>
            <h1 className="text-3xl font-bold text-accent">
              Analytics & Insights
            </h1>
          </div>
          <p className="text-foreground/60">
            Track performance metrics and referral trends across your partner network
          </p>
        </div>
      </div>

      {/* Content Placeholder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-primary/10 border border-border/30 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-3">
            Referral Analytics
          </h2>
          <p className="text-foreground/60 mb-6">
            Comprehensive analytics dashboard showing referral trends, clinic performance, and key metrics.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="p-4 bg-background/50 rounded-xl border border-border/20">
              <h3 className="font-semibold text-accent mb-2">Referral Trends</h3>
              <p className="text-sm text-foreground/60">View historical data and forecasts</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl border border-border/20">
              <h3 className="font-semibold text-accent mb-2">Clinic Performance</h3>
              <p className="text-sm text-foreground/60">Compare clinics by acceptance rate and TAT</p>
            </div>
            <div className="p-4 bg-background/50 rounded-xl border border-border/20">
              <h3 className="font-semibold text-accent mb-2">Export Reports</h3>
              <p className="text-sm text-foreground/60">Download custom reports in multiple formats</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
