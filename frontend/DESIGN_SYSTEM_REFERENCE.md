# Hospital Dashboard - Design System Reference

## Color Palette

### Primary Colors
| Color | Hex | Tailwind | Usage |
|-------|-----|----------|-------|
| Primary Background | `#0F172A` | `bg-background` | Main background |
| Primary Accent | `#33D3BF` | `text-accent` | Primary CTA, highlights |
| Secondary Background | `#1E293B` | `bg-primary/10` | Card backgrounds |
| Border | `#334155` | `border-border/30` | Subtle borders |

### Status Colors
| Status | Background | Border | Text | Usage |
|--------|-----------|--------|------|-------|
| New | `bg-blue-400/10` | `border-blue-400/30` | `text-blue-300` | New referrals |
| Verifying | `bg-yellow-400/10` | `border-yellow-400/30` | `text-yellow-300` | Insurance verification |
| PA Pending | `bg-orange-400/10` | `border-orange-400/30` | `text-orange-300` | Authorization pending |
| Scheduled | `bg-cyan-400/10` | `border-cyan-400/30` | `text-cyan-300` | Appointment scheduled |
| In Treatment | `bg-purple-400/10` | `border-purple-400/30` | `text-purple-300` | Active treatment |
| Completed | `bg-green-400/10` | `border-green-400/30` | `text-green-300` | Finished |

### Partner Clinic Status
| Status | Classes |
|--------|---------|
| Active | `bg-green-400/20 text-green-300 border border-green-400/30` |
| Pending | `bg-yellow-400/20 text-yellow-300 border border-yellow-400/30` |
| Inactive | `bg-gray-400/20 text-gray-300 border border-gray-400/30` |

### Utility Colors
| Purpose | Color | Tailwind |
|---------|-------|----------|
| Success | `#22C55E` | `text-green-400` |
| Warning | `#EAB308` | `text-yellow-400` |
| Error | `#EF4444` | `text-red-400` |
| Info | `#3B82F6` | `text-blue-400` |
| Muted | `#94A3B8` | `text-foreground/60` |

## Typography

### Headings
```tsx
// Page Title
<h1 className="text-3xl sm:text-4xl font-bold text-accent">
  Referral Dashboard
</h1>

// Section Title
<h2 className="text-lg font-bold text-white">
  Recent Referrals
</h2>

// Card Title
<h3 className="font-semibold text-foreground truncate">
  Patient Name
</h3>
```

### Body Text
```tsx
// Primary text
<p className="text-foreground">Main content</p>

// Secondary text
<p className="text-foreground/70">Secondary info</p>

// Muted text
<p className="text-foreground/50">Tertiary info</p>

// Very muted text
<p className="text-foreground/40">Disabled or minimal</p>
```

### Sizes
- **Display**: `text-3xl / text-4xl`
- **Heading**: `text-lg / text-2xl`
- **Body**: `text-base / text-sm`
- **Small**: `text-xs / text-sm`

## Spacing System

### Padding
```tsx
// Container padding
<div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

// Card padding
<div className="p-6">

// Internal spacing
<div className="p-4">
```

### Gaps
```tsx
// Large gap (32px)
<div className="gap-8">

// Medium gap (24px)
<div className="gap-6">

// Standard gap (16px)
<div className="gap-4">

// Small gap (12px)
<div className="gap-3">

// Minimal gap (8px)
<div className="gap-2">
```

### Margins
```tsx
// Large margin-bottom
<div className="mb-8">

// Medium margin-bottom
<div className="mb-6">

// Standard margin-bottom
<div className="mb-4">

// Small margin-bottom
<div className="mb-3">
```

## Component Patterns

### Card Component
```tsx
<div className="group relative p-6 rounded-2xl border border-border/30 bg-primary/10 hover:border-accent/50 hover:bg-primary/20 transition-all">
  {/* Optional glow effect */}
  <div
    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity"
    style={{
      background: 'radial-gradient(circle at top right, rgba(51, 211, 191, 0.1), transparent)',
    }}
  />
  
  {/* Content */}
  <div className="relative z-10">
    {/* Your content here */}
  </div>
</div>
```

### Button Variations

#### Primary (CTA)
```tsx
<Button className="bg-accent hover:bg-accent/90 text-primary font-semibold gap-2">
  <Plus className="w-4 h-4" />
  New Referral
</Button>
```

#### Secondary (Outline)
```tsx
<Button 
  variant="outline"
  className="border-accent/30 hover:border-accent text-accent hover:bg-accent/10"
>
  View All Partners
</Button>
```

#### Tertiary (Ghost)
```tsx
<button className="p-2 hover:bg-primary/20 rounded-lg transition-colors">
  <Icon className="w-5 h-5" />
</button>
```

### Badge with Icon

```tsx
<div className="w-12 h-12 rounded-xl flex items-center justify-center bg-accent/20 border border-accent/30">
  <ActivityIcon className="w-6 h-6 text-accent" />
</div>
```

### Status Badge

```tsx
<span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
  {getStatusLabel(status)}
</span>
```

### Metric Card
```tsx
<div className="group relative p-6 rounded-2xl border border-border/30 bg-primary/10 hover:border-accent/50 transition-all">
  <div className="relative z-10">
    <div className="flex items-center justify-between mb-4">
      <div className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/30 flex items-center justify-center">
        <ActivityIcon className="w-6 h-6 text-accent" />
      </div>
      <TrendingUp className="w-5 h-5 text-green-400" />
    </div>
    <p className="text-foreground/60 text-sm mb-1">Label</p>
    <p className="text-2xl font-bold text-accent">47</p>
  </div>
</div>
```

### Input Field
```tsx
<Input
  placeholder="Search..."
  className="bg-background/50 border-border/30 text-foreground placeholder:text-foreground/40"
/>
```

### Select Dropdown
```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger className="bg-background/50 border-border/30 text-foreground">
    <SelectValue placeholder="Filter by status" />
  </SelectTrigger>
  <SelectContent className="bg-gray-900 border-border/30">
    <SelectItem value="">All</SelectItem>
    <SelectItem value="option">Option</SelectItem>
  </SelectContent>
</Select>
```

## Grid Layouts

### Metrics Grid (5 Columns)
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
  {/* 5 metric cards */}
</div>

// Responsive breakdown:
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 5 columns
```

### Main Content Grid (2 Columns)
```tsx
<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Left: 1/3 width (Partners) */}
  <div className="lg:col-span-1">...</div>
  
  {/* Right: 2/3 width (Referrals) */}
  <div className="lg:col-span-2">...</div>
</div>

// Responsive breakdown:
// Mobile: Full width (1 column)
// Desktop: 3-column grid (1 + 2 split)
```

### Quick Actions Grid (3 Columns)
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {/* 3 action cards */}
</div>

// Responsive breakdown:
// Mobile: 1 column
// Desktop: 3 columns
```

## Hover & Interaction Effects

### Glow Effect
```tsx
<div
  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-30 transition-opacity"
  style={{
    background: 'radial-gradient(circle at top right, rgba(51, 211, 191, 0.1), transparent)',
  }}
/>
```

### Background Shift
```tsx
className="hover:bg-primary/20 transition-all"
```

### Border Color Change
```tsx
className="border-border/30 hover:border-accent/50"
```

### Text Color Change
```tsx
className="text-foreground/70 hover:text-accent"
```

### Transform Scale
```tsx
className="group-hover:translate-x-1 transition-transform"
```

## Animation Classes

### Transitions
- `transition-all`: All properties
- `transition-colors`: Only color changes
- `transition-opacity`: Only opacity
- `transition-transform`: Only transforms

### Duration
- `duration-300`: 300ms (default)
- `duration-500`: 500ms (slower)
- `duration-200`: 200ms (faster)

### Example
```tsx
className="transition-all duration-300 hover:bg-primary/20 hover:border-accent"
```

## Dark Mode & Backgrounds

### Opacity Variants
```tsx
// 10% opacity (very light)
bg-primary/10
border-border/10

// 20% opacity (light)
bg-primary/20
border-border/20

// 30% opacity (medium-light)
bg-primary/30
border-border/30

// 50% opacity (half transparent)
bg-primary/50
```

### Layering Pattern
```tsx
// Layer 1: Base background
<div className="bg-background">
  
  {/* Layer 2: Section background */}
  <div className="bg-primary/5">
    
    {/* Layer 3: Card background */}
    <div className="bg-primary/10">
      
      {/* Layer 4: Element background */}
      <div className="bg-background/50">
        Content
      </div>
    </div>
  </div>
</div>
```

## Responsive Breakpoints

| Breakpoint | Size | Prefix |
|-----------|------|--------|
| Mobile | < 768px | (none) |
| Tablet | 768px - 1024px | `md:` |
| Desktop | > 1024px | `lg:` |

### Example
```tsx
// Mobile: 1 column
// Tablet: 2 columns
// Desktop: 5 columns
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5"
```

## Icon Guidelines

### Sizing
- Header icons: `w-8 h-8`
- Card icons: `w-6 h-6`
- Inline icons: `w-4 h-4`
- Large icons: `w-7 h-7`

### Color
```tsx
// Primary accent
<Icon className="text-accent" />

// Status-specific
<Icon className="text-green-400" />

// Muted
<Icon className="text-foreground/40" />
```

### Icon Sets
- Metrics: Activity, Clock, AlertCircle, CheckCircle, TrendingUp
- Navigation: Building2, Users, BarChart3, Settings, LogOut
- Actions: Plus, Eye, MoreVertical, Filter, Search
- Status: AlertCircle, Clock, CheckCircle

## Accessibility

### Color Contrast Ratios
- All text: > 4.5:1
- Interactive elements: > 3:1
- Large text: > 3:1

### Focus States
```tsx
// Keyboard navigation focus
className="focus:outline-none focus:ring-2 focus:ring-accent"
```

### ARIA Labels
```tsx
<button aria-label="Create new referral">
  <Plus className="w-4 h-4" />
</button>
```

## Code Style Guide

### Import Organization
```tsx
// 1. External libraries
import { useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';

// 2. UI components
import { Button } from '@/components/ui/button';

// 3. Custom components
import { ReferringHospitalDashboard } from '@/components/';

// 4. Utilities & hooks
import { getStatusColor } from '@/lib/hospitalDashboardUtils';
```

### Naming Conventions
- **Components**: PascalCase (`ReferringHospitalDashboard.tsx`)
- **Functions**: camelCase (`getStatusColor()`)
- **Constants**: UPPER_SNAKE_CASE (`STATUS_COLORS`)
- **Interfaces**: PascalCase, starts with `I` optional (`Referral`)

---

**Last Updated**: March 28, 2026
**Version**: 1.0.0
