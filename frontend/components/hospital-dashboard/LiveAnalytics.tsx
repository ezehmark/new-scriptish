'use client';

import { useDashboardView } from '@/components/HospitalDashboardLayout';
import {
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader,
  BarChart3,
  PieChart,
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface AnalyticsMetrics {
  totalPatients: number;
  activePatients: number;
  completedPatients: number;
  urgentReferrals: number;
  averageTimeToSchedule: number;
  pipelineBreakdown: {
    new: number;
    verifying: number;
    pending: number;
    scheduled: number;
    treatment: number;
    complete: number;
  };
  urgencyDistribution: {
    LOW: number;
    MEDIUM: number;
    HIGH: number;
    URGENT: number;
  };
}

export default function LiveAnalytics() {
  const { patients, patientsLoading, clinics } = useDashboardView();
  const [metrics, setMetrics] = useState<AnalyticsMetrics | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Calculate metrics from patients data
  useEffect(() => {
    const calculateMetrics = () => {
      if (!patients || patients.length === 0) {
        setMetrics({
          totalPatients: 0,
          activePatients: 0,
          completedPatients: 0,
          urgentReferrals: 0,
          averageTimeToSchedule: 0,
          pipelineBreakdown: {
            new: 0,
            verifying: 0,
            pending: 0,
            scheduled: 0,
            treatment: 0,
            complete: 0,
          },
          urgencyDistribution: {
            LOW: 0,
            MEDIUM: 0,
            HIGH: 0,
            URGENT: 0,
          },
        });
        return;
      }

      const totalPatients = patients.length;

      // Pipeline breakdown
      const pipelineBreakdown = {
        new: patients.filter((p) => p.pipelineStage === 'NEW_REFERRAL').length,
        verifying: patients.filter((p) => p.pipelineStage === 'VERIFYING_INS').length,
        pending: patients.filter((p) => p.pipelineStage === 'PA_PENDING').length,
        scheduled: patients.filter((p) => p.pipelineStage === 'SCHEDULED').length,
        treatment: patients.filter((p) => p.pipelineStage === 'IN_TREATMENT').length,
        complete: patients.filter((p) => p.pipelineStage === 'COMPLETE').length,
      };

      // Urgency distribution
      const urgencyDistribution = {
        LOW: patients.filter((p) => p.urgencyLevel === 'LOW').length,
        MEDIUM: patients.filter((p) => p.urgencyLevel === 'MEDIUM').length,
        HIGH: patients.filter((p) => p.urgencyLevel === 'HIGH').length,
        URGENT: patients.filter((p) => p.urgencyLevel === 'URGENT').length,
      };

      const activePatients =
        pipelineBreakdown.new +
        pipelineBreakdown.verifying +
        pipelineBreakdown.pending +
        pipelineBreakdown.scheduled +
        pipelineBreakdown.treatment;

      const completedPatients = pipelineBreakdown.complete;
      const urgentReferrals = urgencyDistribution.URGENT + urgencyDistribution.HIGH;

      setMetrics({
        totalPatients,
        activePatients,
        completedPatients,
        urgentReferrals,
        averageTimeToSchedule: 5.2, // Mock data - would calculate from dates
        pipelineBreakdown,
        urgencyDistribution,
      });

      setLastUpdated(new Date());
    };

    calculateMetrics();
  }, [patients]);

  if (patientsLoading || !metrics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader className="w-8 h-8 text-primary animate-spin" />
          <p className="text-foreground/60">Loading analytics...</p>
        </div>
      </div>
    );
  }

  const StatCard = ({
    icon: Icon,
    label,
    value,
    subtext,
    bgColor,
    iconColor,
    textColor,
    borderColor,
    cardBgColor,
  }: {
    icon: any;
    label: string;
    value: string | number;
    subtext?: string;
    bgColor?: string;
    iconColor?: string;
    textColor?: string;
    borderColor?: string;
    cardBgColor?: string;
  }) => (
    <div className={`border rounded-xl p-6 transition-all hover:shadow-lg hover:border-opacity-100 ${
      cardBgColor || 'bg-secondary/50'
    } ${borderColor || 'border-border/30'}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-foreground/60 mb-1">{label}</p>
          <p className={`text-3xl font-bold ${textColor || 'text-accent'}`}>{value}</p>
          {subtext && <p className="text-xs text-foreground/40 mt-2">{subtext}</p>}
        </div>
        <div
          className={`p-3 rounded-lg ${
            bgColor || 'bg-primary/20'
          }`}
        >
          <Icon className={`w-6 h-6 ${iconColor || 'text-primary'}`} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-accent mb-2">Live Analytics</h1>
          <p className="text-foreground/60 text-sm">
            Last updated: {lastUpdated.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-lg border border-green-500/30">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm text-green-600">Live</span>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={Users}
          label="Total Patients"
          value={metrics.totalPatients}
          subtext={`${metrics.activePatients} active`}
          bgColor="bg-blue-500/30"
          iconColor="text-blue-600"
          textColor="text-blue-600"
          borderColor="border-blue-500/40"
          cardBgColor="bg-blue-500/10"
        />
        <StatCard
          icon={Clock}
          label="Active Referrals"
          value={metrics.activePatients}
          subtext={`${((metrics.activePatients / metrics.totalPatients) * 100).toFixed(1)}% of total`}
          bgColor="bg-purple-500/30"
          iconColor="text-purple-600"
          textColor="text-purple-600"
          borderColor="border-purple-500/40"
          cardBgColor="bg-purple-500/10"
        />
        <StatCard
          icon={CheckCircle}
          label="Completed"
          value={metrics.completedPatients}
          subtext={`${((metrics.completedPatients / metrics.totalPatients) * 100).toFixed(1)}% completion rate`}
          bgColor="bg-green-500/30"
          iconColor="text-green-600"
          textColor="text-green-600"
          borderColor="border-green-500/40"
          cardBgColor="bg-green-500/10"
        />
        <StatCard
          icon={AlertCircle}
          label="Urgent Cases"
          value={metrics.urgentReferrals}
          subtext="Require immediate attention"
          bgColor="bg-red-500/30"
          iconColor="text-red-600"
          textColor="text-red-600"
          borderColor="border-red-500/40"
          cardBgColor="bg-red-500/10"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pipeline Breakdown */}
        <div className="bg-blue-500/10 border border-blue-500/40 rounded-xl p-6 hover:shadow-lg transition-all">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-blue-500/30 rounded-lg">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <h3 className="text-lg font-bold text-blue-600">Pipeline Breakdown</h3>
          </div>
          <div className="space-y-4">
            {[
              { label: 'New Referrals', value: metrics.pipelineBreakdown.new, color: 'bg-blue-500' },
              {
                label: 'Verifying Insurance',
                value: metrics.pipelineBreakdown.verifying,
                color: 'bg-yellow-500',
              },
              {
                label: 'Prior Auth Pending',
                value: metrics.pipelineBreakdown.pending,
                color: 'bg-orange-500',
              },
              { label: 'Scheduled', value: metrics.pipelineBreakdown.scheduled, color: 'bg-purple-500' },
              {
                label: 'In Treatment',
                value: metrics.pipelineBreakdown.treatment,
                color: 'bg-indigo-500',
              },
              { label: 'Completed', value: metrics.pipelineBreakdown.complete, color: 'bg-green-500' },
            ].map((stage, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-foreground/70">{stage.label}</p>
                  <p className="text-sm font-semibold text-accent">{stage.value}</p>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${stage.color}`}
                    style={{
                      width: `${
                        metrics.totalPatients > 0 ? (stage.value / metrics.totalPatients) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Urgency Distribution */}
        <div className="bg-red-500/10 border border-red-500/40 rounded-xl p-6 hover:shadow-lg transition-all">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-red-500/30 rounded-lg">
              <PieChart className="w-5 h-5 text-red-600" />
            </div>
            <h3 className="text-lg font-bold text-red-600">Urgency Distribution</h3>
          </div>
          <div className="space-y-4">
            {[
              {
                label: 'Urgent',
                value: metrics.urgencyDistribution.URGENT,
                color: 'bg-red-500',
                textColor: 'text-red-600',
              },
              {
                label: 'High',
                value: metrics.urgencyDistribution.HIGH,
                color: 'bg-orange-500',
                textColor: 'text-orange-600',
              },
              {
                label: 'Medium',
                value: metrics.urgencyDistribution.MEDIUM,
                color: 'bg-yellow-500',
                textColor: 'text-yellow-600',
              },
              {
                label: 'Low',
                value: metrics.urgencyDistribution.LOW,
                color: 'bg-green-500',
                textColor: 'text-green-600',
              },
            ].map((urgency, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${urgency.color}`} />
                    <p className="text-sm text-foreground/70">{urgency.label}</p>
                  </div>
                  <p className={`text-sm font-semibold ${urgency.textColor}`}>{urgency.value}</p>
                </div>
                <div className="w-full bg-background/50 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full ${urgency.color}`}
                    style={{
                      width: `${
                        metrics.totalPatients > 0 ? (urgency.value / metrics.totalPatients) * 100 : 0
                      }%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Clinic Performance */}
        <div className="bg-secondary/50 border border-border/30 rounded-xl p-6">
          <h3 className="text-lg font-bold text-accent mb-4">Partner Clinic Summary</h3>
          <div className="space-y-2">
            <p className="text-sm text-foreground/60">
              Active Clinics: <span className="font-bold text-accent">{clinics.length}</span>
            </p>
            <p className="text-sm text-foreground/60">
              Total Capacity:{' '}
              <span className="font-bold text-accent">
                {clinics.reduce((sum, c) => sum + (c.capacity || 0), 0)} slots
              </span>
            </p>
            <p className="text-sm text-foreground/60">
              Utilization:{' '}
              <span className="font-bold text-accent">
                {clinics.length > 0
                  ? ((metrics.activePatients / (clinics.reduce((sum, c) => sum + (c.capacity || 0), 0) || 1)) * 100).toFixed(1)
                  : 0}
                %
              </span>
            </p>
          </div>
        </div>

        {/* Key Insights */}
        <div className="bg-secondary/50 border border-border/30 rounded-xl p-6">
          <h3 className="text-lg font-bold text-accent mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Key Insights
          </h3>
          <ul className="space-y-2">
            <li className="text-sm text-foreground/60">
              ✓ <span className="text-accent font-semibold">{metrics.pipelineBreakdown.new}</span> new
              referrals pending review
            </li>
            <li className="text-sm text-foreground/60">
              ✓ Average time to schedule:{' '}
              <span className="text-accent font-semibold">
                {metrics.averageTimeToSchedule?.toFixed(1) || 0} days
              </span>
            </li>
            <li className="text-sm text-foreground/60">
              ✓{' '}
              <span className="text-accent font-semibold">
                {metrics.urgentReferrals} urgent
              </span>{' '}
              cases requiring immediate attention
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
