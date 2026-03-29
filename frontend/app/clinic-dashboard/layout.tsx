import ClinicDashboardLayout from '@/components/ClinicDashboardLayout';

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClinicDashboardLayout>
      {children}
    </ClinicDashboardLayout>
  );
}
