'use client';

import { useClinicDashboardView } from '@/components/ClinicDashboardLayout';
import OverviewView from '@/components/clinic-dashboard/OverviewView';
import PatientsView from '@/components/clinic-dashboard/PatientsView';
import SettingsView from '@/components/clinic-dashboard/SettingsView';

export default function ClinicDashboardPage() {
  const { currentView, setCurrentView, patients, patientsError, patientsLoading} = useClinicDashboardView();

  // Render different views based on currentView state
  if (currentView === 'patients') {
    return <PatientsView
    patients={patients}
    patientsError={patientsError}
    patientsLoading={patientsLoading}
     onBack={() => setCurrentView('overview')} />;
  }

  if (currentView === 'settings') {
    return <SettingsView onBack={() => setCurrentView('overview')} />;
  }

  return <OverviewView onBack={() => setCurrentView('overview')} />;
}
