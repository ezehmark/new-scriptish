# Referring Hospital Dashboard - Implementation Guide

## Quick Start

The Referring Hospital Dashboard is now fully designed and ready for backend integration. All frontend components are in place with mock data.

### Access Points
- **Main Dashboard**: `/hospital-dashboard`
- **Referrals**: `/hospital-dashboard/referrals`
- **Partners**: `/hospital-dashboard/partners`
- **Analytics**: `/hospital-dashboard/analytics`

## File Structure

```
frontend/
├── app/
│   └── hospital-dashboard/
│       ├── layout.tsx                    # Shared layout with sidebar navigation
│       ├── page.tsx                      # Main dashboard page
│       ├── referrals/
│       │   └── page.tsx                  # Referrals management page
│       ├── partners/
│       │   └── page.tsx                  # Partners management page
│       └── analytics/
│           └── page.tsx                  # Analytics page
├── components/
│   ├── ReferringHospitalDashboard.tsx   # Main dashboard component
│   └── HospitalDashboardLayout.tsx      # Sidebar layout component
├── hooks/
│   └── useHospitalDashboard.ts          # Custom hooks for data fetching
├── lib/
│   └── hospitalDashboardUtils.ts        # Utility functions and constants
└── HOSPITAL_DASHBOARD_DESIGN.md          # Design documentation
```

## Components Overview

### 1. **ReferringHospitalDashboard.tsx**
The main dashboard component displaying:
- Metrics cards (5-column grid)
- Partner clinics section
- Recent referrals with filtering
- Quick action buttons

**Key Features**:
- Real-time filtering (search, status, clinic)
- Responsive grid layouts
- Color-coded status badges
- Glow effects on hover
- Mock data for testing

**Props**: None (uses mock data currently)

**Example Usage**:
```tsx
import ReferringHospitalDashboard from '@/components/ReferringHospitalDashboard';

export default function DashboardPage() {
  return <ReferringHospitalDashboard />;
}
```

### 2. **HospitalDashboardLayout.tsx**
Provides sidebar navigation and layout structure.

**Features**:
- Responsive sidebar (mobile, tablet, desktop)
- Active route highlighting
- Logo and branding
- Logout button
- Hamburger menu on mobile

**Props**:
```tsx
interface HospitalDashboardLayoutProps {
  children: React.ReactNode;
}
```

**Navigation Items**:
- Dashboard
- Referrals
- Partners
- Analytics

## Custom Hooks

### `useDashboardMetrics(hospitalId: string)`
Fetches dashboard metrics from the API.

```tsx
const { metrics, loading, error } = useDashboardMetrics('hospital_123');

if (loading) return <div>Loading...</div>;
if (error) return <div>Error: {error.message}</div>;

return (
  <>
    <div>{metrics?.totalReferrals}</div>
    <div>{metrics?.completed}</div>
  </>
);
```

### `useReferrals(hospitalId: string, filters?: FilterOptions)`
Fetches referrals with optional filtering.

```tsx
const { referrals, loading, error } = useReferrals('hospital_123', {
  status: 'scheduled',
  search: 'John',
});
```

### `useClinicPartners(hospitalId: string)`
Fetches connected clinic partners.

```tsx
const { partners, loading, error } = useClinicPartners('hospital_123');
```

### `useAnalytics(hospitalId: string, dateRange?: DateRange)`
Fetches analytics data for the dashboard.

```tsx
const { analytics, loading, error } = useAnalytics('hospital_123', {
  from: '2026-03-01',
  to: '2026-03-31',
});
```

### `useCreateReferral()`
Creates a new referral.

```tsx
const { createReferral, loading, error } = useCreateReferral();

const handleSubmit = async (data) => {
  try {
    await createReferral('hospital_123', data);
    // Success handling
  } catch (err) {
    // Error handling
  }
};
```

### `useUpdateReferral()`
Updates an existing referral.

```tsx
const { updateReferral, loading, error } = useUpdateReferral();

await updateReferral('hospital_123', 'ref_001', {
  status: 'scheduled',
});
```

### `useAddPartner()`
Adds a new partner clinic.

```tsx
const { addPartner, loading, error } = useAddPartner();

await addPartner('hospital_123', {
  name: 'New Clinic',
  specialty: 'IV Therapy',
  address: '123 Medical Ave',
  phone: '555-1234',
});
```

## Utility Functions

All utility functions are available from `@/lib/hospitalDashboardUtils`:

```tsx
import {
  getStatusLabel,
  getStatusColor,
  formatDate,
  calculateAge,
  isValidEmail,
  formatPhoneNumber,
  exportReferralsToCSV,
  parseReferralCSV,
  // ... and more
} from '@/lib/hospitalDashboardUtils';
```

## Backend Integration Checklist

### Required API Endpoints

- [ ] `GET /api/hospitals/{hospitalId}/dashboard/metrics`
- [ ] `GET /api/hospitals/{hospitalId}/referrals`
- [ ] `POST /api/hospitals/{hospitalId}/referrals`
- [ ] `PUT /api/hospitals/{hospitalId}/referrals/{referralId}`
- [ ] `GET /api/hospitals/{hospitalId}/partners`
- [ ] `POST /api/hospitals/{hospitalId}/partners`
- [ ] `GET /api/hospitals/{hospitalId}/analytics`

### Required Response Formats

#### Metrics Endpoint
```json
{
  "totalReferrals": 47,
  "pendingVerification": 8,
  "pendingPA": 5,
  "scheduled": 12,
  "completed": 22
}
```

#### Referrals Endpoint
```json
{
  "referrals": [
    {
      "id": "ref_001",
      "patientName": "John Doe",
      "patientDOB": "1985-03-15",
      "clinicName": "Clinic Name",
      "treatmentType": "IV Therapy",
      "status": "scheduled",
      "referralDate": "2026-03-20",
      "urgency": "routine",
      "diagnosis": "Chronic fatigue"
    }
  ]
}
```

#### Partners Endpoint
```json
{
  "partners": [
    {
      "id": "clinic_001",
      "name": "Bright Clinic",
      "specialty": "IV Therapy",
      "address": "123 Medical Blvd",
      "phone": "312-555-0000",
      "referralCount": 18,
      "status": "active"
    }
  ]
}
```

## Customization Guide

### Change Color Scheme
Edit `ReferringHospitalDashboard.tsx` and update the Tailwind classes:

```tsx
// Current: Teal/Cyan theme
bg-accent/20 border-accent/30 text-accent

// Alternative: Blue theme
bg-blue-500/20 border-blue-500/30 text-blue-300
```

### Add New Dashboard Metrics
1. Update the TYPE in `ReferralMetrics` interface
2. Add new metric card to the metrics grid
3. Include in the API fetch

```tsx
interface ReferralMetrics {
  totalReferrals: number;
  pendingVerification: number;
  pendingPA: number;
  scheduled: number;
  completed: number;
  newThisWeek: number; // ← Add new metric
}
```

### Add New Partner Clinics
Update the `MOCK_CLINIC_PARTNERS` array:

```tsx
const MOCK_CLINIC_PARTNERS: ClinicPartner[] = [
  {
    id: '4',
    name: 'Your New Clinic',
    specialty: 'Specialty Here',
    address: 'Address',
    phone: 'Phone',
    referralCount: 0,
    status: 'pending',
  },
];
```

### Update Status Colors
Edit `STATUS_COLORS` in `hospitalDashboardUtils.ts`:

```tsx
export const STATUS_COLORS: Record<string, string> = {
  new: 'your-new-color-classes',
  // ...
};
```

## Testing

### Manual Testing
1. Navigate to `/hospital-dashboard`
2. Verify all cards render correctly
3. Test filtering functionality
4. Check responsive design on different screens
5. Test navigation between pages

### Example Test Cases
```tsx
describe('ReferringHospitalDashboard', () => {
  it('renders all metric cards', () => {
    render(<ReferringHospitalDashboard />);
    expect(screen.getByText('Total Referrals')).toBeInTheDocument();
  });

  it('filters referrals by status', () => {
    // Test filtering logic
  });

  it('navigates to partner clinics', () => {
    // Test navigation
  });
});
```

## Performance Optimization

### Current Optimizations
- Mock data prevents unnecessary API calls during development
- Component memoization ready (use `React.memo()` when needed)
- Pagination placeholder in referrals list

### Future Optimizations
- Implement pagination for large referral lists
- Debounce search input
- Lazy load analytics charts
- Virtual scrolling for clinic partners list

## Accessibility

### WCAG 2.1 Compliance
- Semantic HTML with proper headings
- ARIA labels on interactive elements
- Color contrast ratios > 4.5:1
- Keyboard navigation support
- Focus indicators on interactive elements

### Keyboard Navigation
- `Tab`: Navigate between elements
- `Enter/Space`: Activate buttons
- `Arrow Keys`: Navigate dropdowns
- `Escape`: Close sidebar on mobile

## Troubleshooting

### Issues & Solutions

**Dashboard not displaying metrics**
- Check if `MOCK_METRICS` is properly defined
- Verify API endpoint is called with correct `hospitalId`
- Check browser console for errors

**Sidebar not responding**
- Verify `HospitalDashboardLayout` is imported correctly
- Check if `usePathname()` is being called in a client component
- Ensure layout.tsx wraps all dashboard pages

**Styling not appearing**
- Verify Tailwind CSS is configured correctly
- Check if color classes are defined in tailwind.config.js
- Clear Next.js cache and rebuild

**Filters not working**
- Check if filter state is properly updated
- Verify `filteredReferrals` logic includes all filters
- Test with console.logging filter values

## Future Enhancements

Priority order for feature development:

1. **Phase 1 (Critical)**
   - [ ] Real-time referral status updates
   - [ ] Email notifications
   - [ ] Download PDF reports

2. **Phase 2 (High)**
   - [ ] Advanced analytics charts
   - [ ] Bulk referral upload
   - [ ] Two-factor authentication

3. **Phase 3 (Medium)**
   - [ ] Mobile app
   - [ ] API integrations (EHR systems)
   - [ ] Custom workflows

4. **Phase 4 (Nice-to-Have)**
   - [ ] Multi-language support
   - [ ] Dark/light theme toggle
   - [ ] AI-powered predictions

## Deployment

### Prerequisites
- Node.js 18+
- npm or yarn
- Environment variables configured

### Build & Deploy
```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Docker deployment
docker build -t hospital-dashboard .
docker run -p 3000:3000 hospital-dashboard
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://api.scriptish.com
NEXT_PUBLIC_APP_NAME=Scriptish Hospital
NEXT_AUTH_ENABLED=true
```

## Support & Documentation

- **Design Docs**: See `HOSPITAL_DASHBOARD_DESIGN.md`
- **API Routes**: See `/backend/API_DOCS.md`
- **Prisma Schema**: See `/frontend/prd/PRISMA_SCHEMA.md`

---

**Last Updated**: March 28, 2026
**Version**: 1.0.0
**Status**: ✅ Frontend Complete, ⏳ Awaiting Backend Integration
