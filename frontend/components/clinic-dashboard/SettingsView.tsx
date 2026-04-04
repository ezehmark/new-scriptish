'use client';

import { Settings, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useClinicDashboardView } from '../ClinicDashboardLayout';

interface SettingsViewProps {
  onBack?: () => void;
  clinic:object
}



export default function SettingsView({ onBack }: SettingsViewProps) {
  const{clinic}=useClinicDashboardView()
  return (
    <>
      {/* Header */}
      <div className="border-b border-border/30 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
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
              <h1 className="text-3xl font-bold text-accent">Settings</h1>
              <p className="text-foreground/75">Manage clinic settings and preferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Clinic Information */}
          <div className="bg-primary/10 border border-border/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Clinic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Clinic Name</label>
                <input 
                  type="text" 
                  defaultValue={clinic.name} 
                  className="w-full px-4 py-2 bg-background/50 border border-border/30 rounded-lg text-foreground placeholder:text-foreground/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Email</label>
                <input 
                  type="email" 
                  readOnly
                  defaultValue={clinic.workEmail}
                  className="w-full px-4 py-2 bg-background/50 border border-border/30 rounded-lg text-foreground placeholder:text-foreground/40"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground/80 mb-2">Phone</label>
                <input 
                  type="tel" 
                  defaultValue="(312) 555-0000" 
                  className="w-full px-4 py-2 bg-background/50 border border-border/30 rounded-lg text-foreground placeholder:text-foreground/40"
                />
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-primary/10 border border-border/30 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4">Operating Hours</h2>
            <div className="space-y-4">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day) => (
                <div key={day} className="flex items-center gap-4">
                  <label className="w-24 text-sm font-medium text-foreground/80">{day}</label>
                  <div className="flex gap-2 flex-1">
                    <input 
                      type="time" 
                      defaultValue="09:00"
                      className="px-4 py-2 bg-background/50 border border-border/30 rounded-lg text-foreground"
                    />
                    <span className="text-foreground/50">to</span>
                    <input 
                      type="time" 
                      defaultValue="17:00"
                      className="px-4 py-2 bg-background/50 border border-border/30 rounded-lg text-foreground"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Button variant="outline" className="border-accent/30 text-accent hover:bg-accent/10">
              Cancel
            </Button>
            <Button className="bg-accent hover:bg-accent/90 text-background font-semibold">
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
