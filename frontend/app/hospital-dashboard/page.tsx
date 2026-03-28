import ReferringHospitalDashboard from '@/components/ReferringHospitalDashboard';

export const metadata = {
  title: 'Hospital Dashboard | Scriptish',
  description: 'Manage referrals and track patient progress across partner clinics',
};

export default function HospitalDashboardPage() {
  return (
    <main className="w-full min-h-screen bg-background">
      <ReferringHospitalDashboard />
    </main>
  );
}
