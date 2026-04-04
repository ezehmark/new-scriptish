import { Badge } from '@/components/ui/badge';

interface PatientCardProps {
  firstName: string;
  lastName:string;
  prescribedTreatment: string;
  referringPhysician: string;
  primaryDiagnosis:string;
 clinicalNotes: 'verified' | 'pending' | 'failed';
  //paStatus: 'approved' | 'pending' | 'denied';
 // intakeStatus: 'complete' | 'pending';
  // consentStatus: 'signed' | 'pending';
  createdAt:Date;
  // nextAction: string;
  // assignedStaff: string;
  appointmentDate?: string;
  onClick?: () => void;
}

const statusColors = {
  verified: 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300',
  pending: 'bg-yellow-100 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-300',
  failed: 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300',
  approved: 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300',
  denied: 'bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-300',
  complete: 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300',
  signed: 'bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-300',
};

export default function PatientCard({
  firstName,
  lastName,
  prescribedTreatment,
  referringPhysician,
  primaryDiagnosis,
  clinicalNotes,
  createdAt,
  appointmentDate,
  onClick,
}: PatientCardProps) {
  return (
    <div
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`bg-card border border-border/20 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow ${onClick ? 'cursor-pointer' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{`${firstName} ${lastName}`}</h3>
          <p className="text-sm text-foreground/60 mt-1">{primaryDiagnosis}</p>
        </div>
        <Badge
          variant="outline"
          className={`text-xs ${statusColors[clinicalNotes]}`}
        >
          Last Referral
        </Badge>
      </div>

      {/* Treatment and Physician */}
      <div className="grid grid-cols-2 gap-4 mb-4 pb-4 border-b border-border/20">
        <div>
          <p className="text-xs text-foreground/50 uppercase tracking-wide">Treatment</p>
          <p className="text-sm font-medium text-foreground">{prescribedTreatment}</p>
        </div>
        <div>
          <p className="text-xs text-foreground/50 uppercase tracking-wide">Referring MD</p>
          <p className="text-sm font-medium text-foreground">{referringPhysician}</p>
        </div>
      </div>

      {/* Clinical Notes Status */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-foreground/70">Clinical Notes</span>
          <Badge
            variant="outline"
            className={`text-xs ${statusColors[clinicalNotes]}`}
          >
            {clinicalNotes.charAt(0).toUpperCase() + clinicalNotes.slice(1)}
          </Badge>
        </div>
      </div>

      {/* Created and Appointment Dates */}
      <div className="bg-brand/5 border border-brand/20 rounded-lg p-3 mt-4">
        <p className="text-xs text-foreground/60 uppercase tracking-wide mb-1">Dates</p>
        <p className="text-xs text-foreground mb-2">
          Created: {typeof createdAt === 'string' ? createdAt : new Date(createdAt).toLocaleDateString()}
        </p>
        {appointmentDate && (
          <p className="text-xs text-brand font-medium">📅 Appointment: {appointmentDate}</p>
        )}
      </div>
    </div>
  );
}
