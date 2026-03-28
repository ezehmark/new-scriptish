# 🏥 Referring Hospital Dashboard

A comprehensive, modern dashboard interface for hospital administrators and physicians to manage patient referrals to partner infusion clinics.

## 🎯 Overview

The Referring Hospital Dashboard is a responsive, feature-rich interface built with Next.js, React, and TypeScript. It follows the same design system as the clinic dashboard, featuring a dark clinical aesthetic with teal accents and comprehensive referral management capabilities.

### ✨ Key Features

- **📊 Dashboard Overview** - Real-time metrics and quick actions
- **📋 Referral Management** - Create, track, and manage referrals
- **🏢 Partner Clinics** - Manage connections with infusion clinics
- **📈 Analytics** - Performance insights and reporting
- **📱 Responsive Design** - Mobile, tablet, and desktop optimized
- **🎨 Modern UI** - Dark theme with teal accents
- **⚡ Real-time Updates** - Live status tracking (ready for WebSocket integration)
- **🔍 Advanced Filtering** - Search and filter referrals by status, clinic, urgency

## 🗂️ Project Structure

```
hospital-dashboard/
├── app/hospital-dashboard/              # Next.js routes
│   ├── layout.tsx                       # Shared layout with sidebar
│   ├── page.tsx                         # Main dashboard
│   ├── referrals/page.tsx              # Referrals management
│   ├── partners/page.tsx               # Partners management
│   └── analytics/page.tsx              # Analytics & insights
├── components/
│   ├── ReferringHospitalDashboard.tsx  # Main dashboard component
│   └── HospitalDashboardLayout.tsx     # Sidebar layout
├── hooks/
│   └── useHospitalDashboard.ts         # Custom React hooks
├── lib/
│   └── hospitalDashboardUtils.ts       # Utility functions
├── HOSPITAL_DASHBOARD_DESIGN.md        # Design documentation
├── HOSPITAL_DASHBOARD_IMPLEMENTATION.md # Implementation guide
├── DESIGN_SYSTEM_REFERENCE.md          # Style guide
└── README.md                            # This file
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Next.js 14+
- React 18+

### Installation

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Open browser
open http://localhost:3000/hospital-dashboard
```

## 📧 Pages & Routes

| Route | Purpose | Status |
|-------|---------|--------|
| `/hospital-dashboard` | Main dashboard | ✅ Complete |
| `/hospital-dashboard/referrals` | Manage referrals | 🔄 Placeholder |
| `/hospital-dashboard/partners` | Manage clinics | 🔄 Placeholder |
| `/hospital-dashboard/analytics` | View analytics | 🔄 Placeholder |

## 💻 Component Development

### Main Dashboard Component

```tsx
import ReferringHospitalDashboard from '@/components/ReferringHospitalDashboard';

export default function Page() {
  return <ReferringHospitalDashboard />;
}
```

### Layout with Navigation

```tsx
import HospitalDashboardLayout from '@/components/HospitalDashboardLayout';

export default function Layout({ children }) {
  return (
    <HospitalDashboardLayout>
      {children}
    </HospitalDashboardLayout>
  );
}
```

## 🎨 Design System

### Colors
- **Primary Background**: Dark slate (`#0F172A`)
- **Primary Accent**: Teal (`#33D3BF`)
- **Status Colors**: Blue (New), Yellow (Verifying), Orange (PA), Cyan (Scheduled), Purple (Treatment), Green (Completed)

### Typography
- **Headings**: Bold, 2xl-4xl
- **Body**: Medium weight
- **Accents**: Semi-bold text-accent

### Spacing
- Large gap: `gap-8`
- Medium gap: `gap-6`
- Standard gap: `gap-4`
- Small gap: `gap-2`

### Components
- Rounded cards: `rounded-2xl`
- Hover effects: Glow with radial gradient
- Transitions: Smooth `transition-all duration-300`
- Responsive: Mobile-first design

See [DESIGN_SYSTEM_REFERENCE.md](./DESIGN_SYSTEM_REFERENCE.md) for complete design specifications.

## 🔌 Data & Integration

### Mock Data
The dashboard uses mock data for development:
- **Metrics**: Total, Pending Verification, PA Pending, Scheduled, Completed
- **Referrals**: 4 sample referrals with various statuses
- **Clinics**: 3 partner clinics with different statuses

### Custom Hooks

```tsx
// Fetch dashboard metrics
const { metrics, loading, error } = useDashboardMetrics(hospitalId);

// Fetch referrals with filters
const { referrals, loading, error } = useReferrals(hospitalId, {
  status: 'scheduled',
  search: 'John'
});

// Fetch partner clinics
const { partners, loading, error } = useClinicPartners(hospitalId);

// Fetch analytics
const { analytics, loading, error } = useAnalytics(hospitalId);

// Create new referral
const { createReferral, loading } = useCreateReferral();
await createReferral(hospitalId, referralData);

// Update referral
const { updateReferral, loading } = useUpdateReferral();
await updateReferral(hospitalId, referralId, updates);

// Add partner clinic
const { addPartner, loading } = useAddPartner();
await addPartner(hospitalId, clinicData);
```

## 🛠️ Utilities & Helpers

### Status Management
```tsx
import {
  getStatusLabel,        // 'pa_pending' → 'PA Pending'
  getStatusColor,        // Returns Tailwind classes
  getUrgencyLabel,       // 'stat' → 'STAT'
  REFERRAL_STATUSES,     // Constant definitions
  STATUS_COLORS,         // Color mapping
} from '@/lib/hospitalDashboardUtils';
```

### Date & Formatting
```tsx
import {
  formatDate,            // Format date string
  formatDateTime,        // Format with time
  formatPhoneNumber,     // Format XXX-XXX-XXXX
  calculateAge,          // Calculate from DOB
} from '@/lib/hospitalDashboardUtils';
```

### CSV & Export
```tsx
import {
  exportReferralsToCSV,  // Download referrals as CSV
  parseReferralCSV,      // Parse uploaded CSV
} from '@/lib/hospitalDashboardUtils';
```

### Validation
```tsx
import {
  isValidEmail,
  isValidPhone,
} from '@/lib/hospitalDashboardUtils';
```

## 📊 Data Types

### Referral
```typescript
interface Referral {
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
```

### Clinic Partner
```typescript
interface ClinicPartner {
  id: string;
  name: string;
  specialty: string;
  address: string;
  phone: string;
  referralCount: number;
  status: 'active' | 'pending' | 'inactive';
}
```

### Dashboard Metrics
```typescript
interface ReferralMetrics {
  totalReferrals: number;
  pendingVerification: number;
  pendingPA: number;
  scheduled: number;
  completed: number;
}
```

## 📡 Backend Integration

### Required Endpoints
- `GET /api/hospitals/{hospitalId}/dashboard/metrics`
- `GET /api/hospitals/{hospitalId}/referrals`
- `POST /api/hospitals/{hospitalId}/referrals`
- `PUT /api/hospitals/{hospitalId}/referrals/{referralId}`
- `GET /api/hospitals/{hospitalId}/partners`
- `POST /api/hospitals/{hospitalId}/partners`
- `GET /api/hospitals/{hospitalId}/analytics`

See [HOSPITAL_DASHBOARD_IMPLEMENTATION.md](./HOSPITAL_DASHBOARD_IMPLEMENTATION.md#backend-integration-checklist) for detailed specifications.

## 🎛️ Customization

### Change Color Theme
Edit `ReferringHospitalDashboard.tsx`:
```tsx
// Change from teal to blue
bg-accent/20 → bg-blue-500/20
text-accent → text-blue-300
```

### Add New Metrics
1. Update `ReferralMetrics` interface
2. Add metric card to grid
3. Include in API fetch

### Update Status Definitions
Edit `hospitalDashboardUtils.ts`:
```tsx
export const STATUS_COLORS = {
  custom_status: 'your-tailwind-classes',
};
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Dashboard renders all metrics
- [ ] Filters work (search, status, clinic)
- [ ] Responsive on mobile/tablet/desktop
- [ ] Sidebar navigation highlights active route
- [ ] Hover effects appear correctly
- [ ] Modal/dropdowns function properly

### Example Test
```typescript
import { render, screen } from '@testing-library/react';
import ReferringHospitalDashboard from '@/components/ReferringHospitalDashboard';

describe('ReferringHospitalDashboard', () => {
  it('renders all metric cards', () => {
    render(<ReferringHospitalDashboard />);
    expect(screen.getByText('Total Referrals')).toBeInTheDocument();
    expect(screen.getByText('Verifying Insurance')).toBeInTheDocument();
  });
});
```

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px (1 column layouts)
- **Tablet**: 768px - 1024px (2 column layouts)
- **Desktop**: > 1024px (3+ column layouts)

### Mobile Features
- Hamburger sidebar menu
- Touch-friendly button sizes
- Single-column card layouts
- Optimized for thumbs

## ♿ Accessibility

### WCAG 2.1 Compliance
- Semantic HTML
- Proper color contrast (> 4.5:1)
- Keyboard navigation support
- ARIA labels on interactive elements
- Focus indicators visible

### Keyboard Navigation
- `Tab`: Navigate elements
- `Enter/Space`: Activate buttons
- `Arrow Keys`: Navigate menus
- `Escape`: Close dropdowns

## 🔐 Security

- Environment variables for API URLs
- JWT token storage in localStorage (ready for upgrade to httpOnly cookies)
- CORS headers configured
- Input validation on forms
- Rate limiting ready

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm run start
```

### Docker Deployment
```bash
docker build -t hospital-dashboard .
docker run -p 3000:3000 hospital-dashboard
```

### Environment Variables
```env
NEXT_PUBLIC_API_URL=https://api.scriptish.com
NEXT_PUBLIC_APP_NAME=Scriptish Hospital
```

## 📚 Documentation

- [HOSPITAL_DASHBOARD_DESIGN.md](./HOSPITAL_DASHBOARD_DESIGN.md) - Design & architecture
- [HOSPITAL_DASHBOARD_IMPLEMENTATION.md](./HOSPITAL_DASHBOARD_IMPLEMENTATION.md) - Implementation guide
- [DESIGN_SYSTEM_REFERENCE.md](./DESIGN_SYSTEM_REFERENCE.md) - Style guide & components
- [API_DOCS.md](../backend/API_DOCS.md) - Backend API specifications

## 🐛 Troubleshooting

### Dashboard not loading
- Check if API URL is configured correctly
- Verify hospital ID is passed to hooks
- Check browser console for errors

### Styling issues
- Clear Next.js cache: `rm -rf .next`
- Rebuild Tailwind: `npm run build`
- Check tailwind.config.js

### Sidebar not working
- Verify `usePathname()` is in client component
- Check if layout.tsx wraps all routes
- Inspect React DevTools

## 📋 Roadmap

### Current Release (v1.0.0)
✅ Main dashboard with mock data
✅ Responsive design
✅ Navigation framework
✅ Utility functions
⏳ Backend integration

### Upcoming Features
- Real-time updates via WebSocket
- Advanced analytics charts
- Bulk referral upload
- Email notifications
- Export to PDF/Excel
- Two-factor authentication
- Mobile app
- API integrations

## 👥 Contributors

- **Design**: Following TenantTypeSelection component design system
- **Components**: React + TypeScript
- **Styling**: Tailwind CSS + custom gradients
- **Icons**: Lucide React

## 📄 License

Part of the Scriptish platform. All rights reserved.

## 🤝 Support

For issues or questions:
1. Check [HOSPITAL_DASHBOARD_IMPLEMENTATION.md](./HOSPITAL_DASHBOARD_IMPLEMENTATION.md#troubleshooting)
2. Review [DESIGN_SYSTEM_REFERENCE.md](./DESIGN_SYSTEM_REFERENCE.md)
3. Open an issue with detailed description

---

**Last Updated**: March 28, 2026  
**Version**: 1.0.0  
**Status**: ✅ Frontend Ready | ⏳ Backend Integration Pending
