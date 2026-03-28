# Referring Hospital Dashboard - Design & Implementation

## Overview

The Referring Hospital Dashboard is a comprehensive interface designed for hospital administrators and physicians to manage patient referrals to partner infusion clinics. The design follows the thematic system established in the `TenantTypeSelection` component with a modern, dark clinical aesthetic.

## Design System

### Color Palette
- **Primary Background**: `#0F172A` (Dark slate)
- **Primary Accent**: Teal/Cyan (`#33D3BF`)
- **Secondary Colors**:
  - Success: Green (`#22C55E`)
  - Warning: Orange (`#EA580C`)
  - Pending: Yellow (`#EAB308`)
  - Urgent: Red (`#EF4444`)
  - Info: Blue (`#3B82F6`)
  - Purple: Violet (`#A855F7`)

### Typography
- **Headings**: Bold, large scale (2xl-4xl)
- **Regular Text**: Semi-bold or medium weight
- **Body Text**: Foreground/60 for secondary information
- **Font Family**: System default (Geist)

### Components
- **Cards**: Rounded corners (rounded-2xl), subtle borders with opacity, hover effects
- **Icons**: Lucide React with 24-32px size
- **Buttons**: Rounded with accent colors, smooth transitions
- **Gradients**: Radial gradients for glow effects on hover
- **Spacing**: Generous padding and gaps (4-8 units standard)

## Dashboard Pages

### 1. **Main Dashboard** (`/hospital-dashboard`)
**Purpose**: Overview and quick actions

**Sections**:
- **Header**: Logo, title, and "New Referral" CTA
- **Metrics Grid**: 5-column grid (5 on desktop, responsive on mobile):
  - Total Referrals
  - Verifying Insurance
  - PA Pending
  - Scheduled
  - Completed
  
- **Two-Column Content Area**:
  - **Left (1/3)**: Partner Clinics card
    - List of active clinic partnerships
    - Status badges (active, pending, inactive)
    - Referral count per clinic
    - "View All Partners" button
  
  - **Right (2/3)**: Recent Referrals card
    - Search functionality
    - Status filter dropdown
    - Clinic filter dropdown
    - Referral list with:
      - Patient name and DOB
      - Clinic name
      - Treatment type
      - Status badge (color-coded)
      - Urgency indicator (red alert for urgent/stat)
      - Referral date

- **Quick Actions Grid**: 3 clickable cards
  - New Referral
  - View Analytics
  - Manage Partners

### 2. **Referrals Management** (`/hospital-dashboard/referrals`)
**Purpose**: Detailed referral management interface

**Features** (to be implemented):
- Create new referrals with form validation
- Edit existing referrals
- Bulk upload via CSV
- Advanced filtering and search
- Referral status tracking
- Communication history with clinics
- Document uploads
- Real-time notifications

### 3. **Partners Management** (`/hospital-dashboard/partners`)
**Purpose**: Manage clinic partnerships

**Features** (to be implemented):
- View all connected clinics
- Add new partner clinics
- Edit partnership settings
- Manage data sharing permissions
- View partnership performance metrics
- Integration status
- Contact management per clinic

### 4. **Analytics** (`/hospital-dashboard/analytics`)
**Purpose**: Performance insights and reporting

**Features** (to be implemented):
- Referral trend charts
- Clinic performance comparison
- Acceptance rate analytics
- Average turnaround time (TAT)
- Treatment type breakdown
- Date range filtering
- CSV export functionality
- Dashboard customization

## Key Features

### Status Management
```
new → verifying → pa_pending → scheduled → in_treatment → completed
```

Color-coded badges for each status with corresponding background opacity.

### Urgency Levels
- **Routine**: Clock icon, standard processing
- **Urgent**: Red alert icon, expedited processing
- **STAT**: Red alert icon, immediate attention

### Responsive Design
- **Mobile**: Single column, hamburger menu sidebar
- **Tablet**: Optimized grid layouts, 2-3 columns
- **Desktop**: Full 3+ column layouts with sidebar

### Interactive Elements
- Hover effects on cards with gradient glow
- Smooth transitions and animations
- Loading states for async operations
- Error messaging with alert icons
- Confirmation dialogs for critical actions

## Component Structure

```
frontend/
├── app/
│   └── hospital-dashboard/
│       ├── layout.tsx              # Shared layout with sidebar
│       ├── page.tsx                # Main dashboard
│       ├── referrals/
│       │   └── page.tsx
│       ├── partners/
│       │   └── page.tsx
│       └── analytics/
│           └── page.tsx
└── components/
    ├── ReferringHospitalDashboard.tsx  # Main dashboard component
    └── HospitalDashboardLayout.tsx     # Sidebar layout
```

## Data Models

### Referral
```typescript
{
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
{
  id: string;
  name: string;
  specialty: string;
  address: string;
  phone: string;
  referralCount: number;
  status: 'active' | 'pending' | 'inactive';
}
```

### Referral Metrics
```typescript
{
  totalReferrals: number;
  pendingVerification: number;
  pendingPA: number;
  scheduled: number;
  completed: number;
}
```

## Integration Points

### Backend API Endpoints Required
- `GET /hospitals/{hospitalId}/referrals` - List referrals
- `POST /hospitals/{hospitalId}/referrals` - Create referral
- `PUT /hospitals/{hospitalId}/referrals/{referralId}` - Update referral
- `GET /hospitals/{hospitalId}/partners` - List clinics
- `POST /hospitals/{hospitalId}/partners` - Add clinic
- `GET /hospitals/{hospitalId}/dashboard/metrics` - Get dashboard metrics
- `GET /hospitals/{hospitalId}/analytics` - Get analytics data

### Authentication
- Must be authenticated as hospital admin/staff
- Role-based access control (RBAC)
- Session management with JWT tokens

## Styling Notes

### Tailwind Classes Used
- Color scale: `bg-primary/10`, `border-accent/30`, `text-foreground/60`
- Spacing: `p-6`, `gap-4`, `mb-8`, `px-4 sm:px-6 lg:px-8`
- Responsive: `grid-cols-1 md:grid-cols-2 lg:grid-cols-5`
- Effects: `hover:bg-primary/20`, `transition-all`, `rounded-2xl`
- Opacity: `/10`, `/20`, `/30`, `/50`, `/60`, `/70`

### Accessibility
- Clear contrast ratios
- Semantic HTML (headings, buttons, forms)
- ARIA labels where needed
- Keyboard navigation support

## Future Enhancements

1. **Real-time Updates**: WebSocket integration for live status updates
2. **Advanced Analytics**: Charts, graphs, and data visualization
3. **Email Notifications**: Automated alerts for status changes
4. **Two-factor Authentication**: Enhanced security for hospital accounts
5. **API Integration**: Direct clinic system integrations (e.g., EHR systems)
6. **Custom Workflows**: Configurable approval workflows
7. **Audit Logging**: Complete activity tracking
8. **Multi-language Support**: Internationalization (i18n)
9. **Dark/Light Mode**: Theme toggle
10. **Mobile App**: Native mobile application

## Development Guidelines

### Component Development
- Always import from `@/components/ui/` for consistency
- Use Lucide React for all icons
- Follow the color coding for status/urgency
- Maintain responsive design at all breakpoints

### State Management
- Use React hooks (useState, useCallback)
- Consider Context API for global state
- Implement proper error handling and loading states

### Testing
- Unit tests for component logic
- Integration tests for API calls
- E2E tests for critical workflows

### Performance
- Implement pagination for large lists
- Use debouncing for search/filter operations
- Optimize re-renders with React.memo where needed
- Lazy load heavy components

## Deployment

The dashboard is deployed as part of the main Next.js application:
```bash
npm run build
npm run start
```

Ensure all environment variables are set correctly for API endpoints.

---

**Last Updated**: March 28, 2026
**Version**: 1.0.0
