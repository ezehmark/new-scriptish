import HospitalDashboardLayout from '@/components/HospitalDashboardLayout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HospitalDashboardLayout>
      {children}
    </HospitalDashboardLayout>
  );
}
