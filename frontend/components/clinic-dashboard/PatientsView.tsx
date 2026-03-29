'use client';

import { useState } from 'react';
import { Users, ArrowLeft, Plus, ZoomIn, Expand, LucideExpand, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PatientDetailModal from '@/components/PatientDetailModal';

interface PatientsViewProps {
  onBack?: () => void;
}

const mockPatients = [
  {
    id: '1',
    name: 'Jennifer L.',
    treatmentType: 'IV Therapy',
    referringPhysician: 'Dr. Sarah Chen, MD',
    status: 'scheduled',
  },
  {
    id: '2',
    name: 'Marcus T.',
    treatmentType: 'Ketamine Therapy',
    referringPhysician: 'Dr. David Martinez, MD',
    status: 'in-treatment',
  },
  {
    id: '3',
    name: 'Robert H.',
    treatmentType: 'Biologic Infusion',
    referringPhysician: 'Dr. Angela White, MD',
    status: 'pa-pending',
  },
];

export default function PatientsView({ onBack }: PatientsViewProps) {
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null);

  return (
    <>
      {/* Header */}
      <div className="border-b border-border/30 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-3">
              {onBack && (
                <button
                  onClick={onBack}
                  className="p-2 hover:bg-primary/20 rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5 text-accent" />
                </button>
              )}
              <div>
                <h1 className="text-3xl font-bold text-accent">Patients</h1>
                <p className="text-foreground/75">Manage and track all patients</p>
              </div>
            </div>
            <Button className="bg-accent hover:bg-accent/90 text-primary font-semibold gap-2 w-full sm:w-auto">
              <Plus className="w-4 h-4" />
              Intake Form
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 gap-6">
          {/* Patients List */}
          <div className="bg-primary/10 border border-border/30 rounded-2xl overflow-hidden">
            <div className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Users className="w-5 h-5 text-primary" />
                <h2 className="text-lg font-bold text-primary">Patient List</h2>
              </div>

              <div className="space-y-3">
                {mockPatients.map((patient) => (
                  <div key={patient.id} className="bg-primary/20 border border-border/20 rounded-lg p-2 cursor-pointer px-4 hover:bg-primary/30 relative  transition-colors"
                   onClick={() => setSelectedPatient(patient)}>
                    <Maximize className='absolute h-4 w-4 text-accent/80 right-4 top-4'/>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex-1">
                        <p className="text-foreground font-semibold">{patient.name}</p>
                        <p className="text-foreground/75 text-sm mt-1">{patient.treatmentType}</p>
                        <p className="text-foreground/60 text-sm">{patient.referringPhysician}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full mr-8 text-xs font-semibold bg-accent/20 text-accent border border-accent/30 whitespace-nowrap">
                          {patient.status}
                        </span>
                
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <PatientDetailModal 
          patient={selectedPatient} 
          onClose={() => setSelectedPatient(null)} 
        />
      )}
    </>
  );
}
