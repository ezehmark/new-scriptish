import { useState, useEffect, useCallback } from 'react';

// Types
export interface Referral {
  id: string;
  patientName: string;
  patientDOB: string;
  clinicName: string;
  treatmentType: string;
  status: 'new' | 'verifying' | 'pa_pending' | 'scheduled' | 'in_treatment' | 'completed';
  referralDate: string;
  urgency: 'routine' | 'urgent' | 'stat';
  diagnosis: string;
}

export interface ClinicPartner {
  id: string;
  name: string;
  specialty: string;
  address: string;
  phone: string;
  referralCount: number;
  status: 'active' | 'pending' | 'inactive';
}

export interface ReferralMetrics {
  totalReferrals: number;
  pendingVerification: number;
  pendingPA: number;
  scheduled: number;
  completed: number;
}

export interface AnalyticsData {
  trends: Array<{
    date: string;
    referrals: number;
    completed: number;
  }>;
  clinicPerformance: Array<{
    clinicId: string;
    clinicName: string;
    acceptanceRate: number;
    avgTAT: number;
  }>;
}

// Hook for fetching dashboard metrics
export function useDashboardMetrics(hospitalId: string) {
  const [metrics, setMetrics] = useState<ReferralMetrics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/hospitals/${hospitalId}/dashboard/metrics`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch metrics');
        }

        const data = await response.json();
        setMetrics(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    if (hospitalId) {
      fetchMetrics();
    }
  }, [hospitalId]);

  return { metrics, loading, error };
}

// Hook for fetching referrals
export function useReferrals(
  hospitalId: string,
  filters?: {
    status?: string;
    clinicId?: string;
    search?: string;
  }
) {
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchReferrals = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (filters?.status) params.append('status', filters.status);
        if (filters?.clinicId) params.append('clinicId', filters.clinicId);
        if (filters?.search) params.append('search', filters.search);

        const response = await fetch(
          `/api/hospitals/${hospitalId}/referrals?${params.toString()}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch referrals');
        }

        const data = await response.json();
        setReferrals(data.referrals || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    if (hospitalId) {
      fetchReferrals();
    }
  }, [hospitalId, filters]);

  return { referrals, loading, error };
}

// Hook for fetching clinic partners
export function useClinicPartners(hospitalId: string) {
  const [partners, setPartners] = useState<ClinicPartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `/api/hospitals/${hospitalId}/partners`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch partners');
        }

        const data = await response.json();
        setPartners(data.partners || []);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    if (hospitalId) {
      fetchPartners();
    }
  }, [hospitalId]);

  return { partners, loading, error };
}

// Hook for fetching analytics data
export function useAnalytics(
  hospitalId: string,
  dateRange?: {
    from: string;
    to: string;
  }
) {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (dateRange) {
          params.append('from', dateRange.from);
          params.append('to', dateRange.to);
        }

        const response = await fetch(
          `/api/hospitals/${hospitalId}/analytics?${params.toString()}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch analytics');
        }

        const data = await response.json();
        setAnalytics(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    if (hospitalId) {
      fetchAnalytics();
    }
  }, [hospitalId, dateRange]);

  return { analytics, loading, error };
}

// Hook for creating a referral
export function useCreateReferral() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const createReferral = useCallback(
    async (hospitalId: string, referralData: Omit<Referral, 'id' | 'referralDate'>) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/hospitals/${hospitalId}/referrals`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(referralData),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to create referral');
        }

        const data = await response.json();
        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { createReferral, loading, error };
}

// Hook for updating a referral
export function useUpdateReferral() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const updateReferral = useCallback(
    async (
      hospitalId: string,
      referralId: string,
      updates: Partial<Referral>
    ) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/hospitals/${hospitalId}/referrals/${referralId}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updates),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to update referral');
        }

        const data = await response.json();
        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { updateReferral, loading, error };
}

// Hook for adding a partner clinic
export function useAddPartner() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const addPartner = useCallback(
    async (
      hospitalId: string,
      clinicData: Pick<ClinicPartner, 'name' | 'specialty' | 'address' | 'phone'>
    ) => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/hospitals/${hospitalId}/partners`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(clinicData),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to add partner');
        }

        const data = await response.json();
        return data;
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { addPartner, loading, error };
}
