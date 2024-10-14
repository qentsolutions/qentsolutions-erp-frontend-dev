import { create } from "zustand";

// Définir le type Lead
export interface Lead {
  id: string;
  orgId: string;
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  status: string;
  note: string;
  source: string;
  cost: number;
  createdAt: Date;
  updatedAt: Date;
}

interface LeadStore {
  leads: Lead[];
  leadCount: number;
  setLeads: (leads: Lead[]) => void;
  addLead: (lead: Lead) => void;
  removeLead: (leadId: string) => void;
  updateLead: (lead: Lead) => void;
}

interface LeadStore {
  leads: Lead[];
  leadCount: number;
  setLeads: (leads: Lead[]) => void;
  addLead: (lead: Lead) => void;
  removeLead: (leadId: string) => void;
  updateLead: (lead: Lead) => void;
  updateLeadStatus: (id: string, newStatus: string) => void;
}

export const useLeadStore = create<LeadStore>((set) => ({
  leads: [],
  leadCount: 0,
  setLeads: (leads) => set({ leads, leadCount: leads.length }),
  addLead: (lead) =>
    set((state) => ({
      leads: [...state.leads, lead],
      leadCount: state.leadCount + 1,
    })),
  removeLead: (leadId) =>
    set((state) => {
      const newLeads = state.leads.filter((lead) => lead.id !== leadId);
      return {
        leads: newLeads,
        leadCount: newLeads.length,
      };
    }),
  updateLead: (updatedLead) =>
    set((state) => {
      const newLeads = state.leads.map((lead) =>
        lead.id === updatedLead.id ? updatedLead : lead,
      );
      return {
        leads: newLeads,
        leadCount: newLeads.length,
      };
    }),
  updateLeadStatus: (id, newStatus) =>
    set((state) => {
      const updatedLeads = state.leads.map((lead) =>
        lead.id === id ? { ...lead, status: newStatus } : lead,
      );
      return { leads: updatedLeads, leadCount: updatedLeads.length };
    }),
}));
