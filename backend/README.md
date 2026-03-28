# Scriptish Backend API

Node.js/Express backend for the Scriptish platform.

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL
- pnpm (recommended) or npm

### Installation

1. Install dependencies:
```bash
pnpm install
```

2. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/scriptish_db"
JWT_SECRET="your-secret-key"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
FRONTEND_URL="http://localhost:3000"
```

4. Generate Prisma client:
```bash
pnpm run prisma:generate
```

5. Run database migrations:
```bash
pnpm run prisma:migrate
```

### Development

Start the development server:
```bash
pnpm run dev
```

The server will run on `http://localhost:3001`

### Running

```bash
pnpm start
```

## API Endpoints

### Authentication

- `POST /v1/auth/register/clinic` - Register a new clinic
- `POST /v1/auth/register/verify-email` - Verify email address
- `POST /v1/auth/register/sign-baa` - Sign BAA agreement
- `POST /v1/auth/login` - Login with credentials
- `POST /v1/auth/password/forgot` - Request password reset
- `POST /v1/auth/logout` - Logout (requires auth)

### Clinics

- `GET /v1/clinics/:clinicId` - Get clinic details
- `PUT /v1/clinics/:clinicId` - Update clinic info
- `GET /v1/clinics/:clinicId/staff` - List clinic staff
- `POST /v1/clinics/:clinicId/staff` - Add staff member

## Authentication

Most endpoints (except registration and login) require a Bearer token in the Authorization header:

```
Authorization: Bearer <access_token>
```

## Database Schema

The database uses Prisma ORM with PostgreSQL. See `prisma/schema.prisma` for the complete schema.

Key models:
- **User** - Staff and admin accounts
- **Clinic** - Clinic information and BAA status
- **Patient** - Patient records
- **Referral** - Patient referrals
- **Appointment** - Appointments

## Error Handling

All errors return JSON responses with appropriate HTTP status codes:

```json
{
  "error": "Error message",
  "statusCode": 400
}
```

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for signing access tokens
- `JWT_REFRESH_SECRET` - Secret key for signing refresh tokens
- `JWT_EXPIRATION` - Access token expiration (default: 3600 seconds)
- `REFRESH_TOKEN_EXPIRATION` - Refresh token expiration (default: 604800 seconds)
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `EMAIL_SERVICE` - Email provider (default: gmail)
- `SMTP_USER` - SMTP username
- `SMTP_PASSWORD` - SMTP password
- `FRONTEND_URL` - Frontend URL for email links

## Testing

To test authentication endpoints:

```bash
# Register a clinic
curl -X POST http://localhost:3001/v1/auth/register/clinic \
  -H "Content-Type: application/json" \
  -d '{
    "eligibilityGate": {"isUSAClinic": true, "clinicType": "KETAMINE"},
    "clinic": {
      "name": "Test Clinic",
      "npiNumber": "1234567890",
      "taxId": "12-3456789",
      "stateLicenseNumber": "IL-12345",
      "address": "123 Main St",
      "city": "Chicago",
      "state": "IL",
      "zipCode": "60601",
      "primaryPhone": "312-555-0000",
      "workEmail": "admin@test.com",
      "infusionChairCount": 5,
      "treatmentTypesOffered": ["KETAMINE"]
    },
    "admin": {
      "firstName": "John",
      "lastName": "Admin",
      "password": "SecurePassword123!"
    }
  }'

# Login
curl -X POST http://localhost:3001/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@test.com",
    "password": "SecurePassword123!"
  }'
```

## Prisma Studio

View and edit database data:
```bash
pnpm run prisma:studio
```

## License

ISC
