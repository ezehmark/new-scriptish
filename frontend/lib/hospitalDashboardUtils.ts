/**
 * Constants and utilities for the Hospital Dashboard
 */

// Status definitions
export const REFERRAL_STATUSES = {
  new: 'new',
  verifying: 'verifying',
  pa_pending: 'pa_pending',
  scheduled: 'scheduled',
  in_treatment: 'in_treatment',
  completed: 'completed',
} as const;

export const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  verifying: 'Verifying Insurance',
  pa_pending: 'PA Pending',
  scheduled: 'Scheduled',
  in_treatment: 'In Treatment',
  completed: 'Completed',
};

// Color configurations for statuses
export const STATUS_COLORS: Record<string, string> = {
  new: 'bg-blue-400/10 border-blue-400/30 text-blue-300',
  verifying: 'bg-yellow-400/10 border-yellow-400/30 text-yellow-300',
  pa_pending: 'bg-orange-400/10 border-orange-400/30 text-orange-300',
  scheduled: 'bg-cyan-400/10 border-cyan-400/30 text-cyan-300',
  in_treatment: 'bg-purple-400/10 border-purple-400/30 text-purple-300',
  completed: 'bg-green-400/10 border-green-400/30 text-green-300',
};

// Urgency levels
export const URGENCY_LEVELS = {
  routine: 'routine',
  urgent: 'urgent',
  stat: 'stat',
} as const;

export const URGENCY_LABELS: Record<string, string> = {
  routine: 'Routine',
  urgent: 'Urgent',
  stat: 'STAT',
};

// Partner clinic status
export const CLINIC_STATUS = {
  active: 'active',
  pending: 'pending',
  inactive: 'inactive',
} as const;

export const CLINIC_STATUS_COLORS: Record<string, string> = {
  active: 'bg-green-400/20 text-green-300 border border-green-400/30',
  pending: 'bg-yellow-400/20 text-yellow-300 border border-yellow-400/30',
  inactive: 'bg-gray-400/20 text-gray-300 border border-gray-400/30',
};

// Treatment types
export const TREATMENT_TYPES = [
  'IV Therapy',
  'Ketamine Therapy',
  'NAD+ Therapy',
  'Biologic Therapy',
  'Antibiotic Therapy',
  'Hormone TRT',
  'Home Infusion',
  'Other',
];

// Specialty areas
export const SPECIALTIES = [
  'IV Therapy',
  'Ketamine Therapy',
  'NAD+ Therapy',
  'Biologic Therapy',
  'Pain Management',
  'Mental Health',
  'Drug & Alcohol Recovery',
  'Anti-Aging',
  'General Infusion',
];

/**
 * Helper function to get status label
 */
export function getStatusLabel(status: string): string {
  return STATUS_LABELS[status] || status;
}

/**
 * Helper function to get status color classes
 */
export function getStatusColor(status: string): string {
  return STATUS_COLORS[status] || STATUS_COLORS.new;
}

/**
 * Helper function to get urgency label
 */
export function getUrgencyLabel(urgency: string): string {
  return URGENCY_LABELS[urgency] || urgency;
}

/**
 * Helper function to get clinic status color classes
 */
export function getClinicStatusColor(status: string): string {
  return CLINIC_STATUS_COLORS[status] || CLINIC_STATUS_COLORS.inactive;
}

/**
 * Format date to readable format
 */
export function formatDate(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format date with time
 */
export function formatDateTime(date: string | Date): string {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Calculate age from date of birth
 */
export function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate phone number format
 */
export function isValidPhone(phone: string): boolean {
  const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
  return phoneRegex.test(phone);
}

/**
 * Format phone number to XXX-XXX-XXXX format
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 10) return phone;
  return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
}

/**
 * Get dashboard metrics summary text
 */
export function getMetricsSummary(metrics: {
  totalReferrals: number;
  pendingVerification: number;
  pendingPA: number;
  scheduled: number;
  completed: number;
}): string {
  const pending = metrics.pendingVerification + metrics.pendingPA + metrics.scheduled;
  return `${metrics.totalReferrals} total referrals • ${pending} pending • ${metrics.completed} completed`;
}

/**
 * Get previous month date range
 */
export function getLastMonthDateRange(): { from: string; to: string } {
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
  const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0);

  return {
    from: lastMonth.toISOString().split('T')[0],
    to: lastMonthEnd.toISOString().split('T')[0],
  };
}

/**
 * Sort referrals by status priority
 */
export function sortReferralsByPriority(
  referrals: Array<{ status: string }>,
  order: string[] = [
    'stat',
    'urgent',
    'pa_pending',
    'verifying',
    'scheduled',
    'in_treatment',
    'new',
    'completed',
  ]
): typeof referrals {
  return [...referrals].sort((a, b) => {
    const priorityA = order.indexOf(a.status);
    const priorityB = order.indexOf(b.status);
    return (priorityA === -1 ? order.length : priorityA) -
           (priorityB === -1 ? order.length : priorityB);
  });
}

/**
 * Export referrals to CSV
 */
export function exportReferralsToCSV(referrals: any[]): void {
  const headers = [
    'Patient Name',
    'DOB',
    'Clinic',
    'Treatment Type',
    'Status',
    'Urgency',
    'Diagnosis',
    'Referral Date',
  ];

  const data = referrals.map((ref) => [
    ref.patientName,
    ref.patientDOB,
    ref.clinicName,
    ref.treatmentType,
    getStatusLabel(ref.status),
    getUrgencyLabel(ref.urgency),
    ref.diagnosis,
    ref.referralDate,
  ]);

  const csv = [
    headers.join(','),
    ...data.map((row) => row.map((cell) => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob([csv], { type: 'text/csv' });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `referrals-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  window.URL.revokeObjectURL(url);
}

/**
 * Parse CSV file for referral bulk upload
 */
export async function parseReferralCSV(file: File): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const csv = event.target?.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',');

        const data = lines.slice(1).map((line) => {
          const values = line.split(',');
          const obj: any = {};

          headers.forEach((header, index) => {
            obj[header.trim()] = values[index]?.trim() || '';
          });

          return obj;
        });

        resolve(data.filter((row) => Object.values(row).some((val) => val)));
      } catch (error) {
        reject(error);
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsText(file);
  });
}
