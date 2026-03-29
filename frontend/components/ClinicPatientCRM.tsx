'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface Patient {
  name: string;
  treatmentType: string;
  referringPhysician: string;
  insuranceStatus: string;
  paStatus: string;
  intakeStatus: string;
  consentStatus: string;
  nextAction: string;
  assignedStaff: string;
  appointmentDate?: string;
}

interface Props {
  patient: Patient | null;
  onClose: () => void;
}

export default function ClinicPatientCRM({ patient, onClose }: Props) {
  const [editing, setEditing] = useState(false);

  if (!patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-4 md:p-8">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <Card className="relative z-10 max-w-3xl w-full p-6 md:py-8 md:px-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold">{patient.name}</h2>
            <p className="text-sm text-foreground/60">{patient.treatmentType} • Assigned: {patient.assignedStaff}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={() => setEditing(!editing)}>{editing ? 'Cancel' : 'Edit'}</Button>
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-foreground/70">Referring Physician</h3>
            <p className="mt-1 text-sm text-foreground">{patient.referringPhysician}</p>

            <h3 className="text-sm font-medium text-foreground/70 mt-4">Next Action</h3>
            <p className="mt-1 text-sm text-foreground">{patient.nextAction}</p>
          </div>

          <div>
            <h3 className="text-sm font-medium text-foreground/70">Insurance / PA</h3>
            <p className="mt-1 text-sm text-foreground">Insurance: {patient.insuranceStatus} • PA: {patient.paStatus}</p>

            <h3 className="text-sm font-medium text-foreground/70 mt-4">Appointment</h3>
            <p className="mt-1 text-sm text-foreground">{patient.appointmentDate || 'TBD'}</p>
          </div>
        </div>

        <div className="mt-6">
          {editing ? (
            <div className="space-y-3">
              <input className="w-full p-2 border rounded" placeholder="Update next action" />
              <div className="flex gap-2">
                <Button onClick={() => setEditing(false)}>Save</Button>
                <Button variant="ghost" onClick={() => setEditing(false)}>Cancel</Button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Button onClick={() => alert('Open scheduling modal')}>Schedule</Button>
              <Button variant="outline" onClick={() => alert('Open PA workflow')}>Manage PA</Button>
              <Button variant="outline" onClick={() => alert('Open insurance verification')}>Verify Insurance</Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
