import type { Timestamp } from "firebase/firestore";

export type GenderPref = "any" | "male" | "female";
export type CampaignPhase = "circulation" | "under_contract" | "active" | "executed";

export interface CampaignDeliverable {
  id?: string;
  platform: string;  // e.g., "Instagram", "TikTok", "In-Person"
  description: string;
}

export interface Campaign {
  id?: string;
  createdBy: string;
  brandName?: string; // Name of the brand that created the campaign
  editors: string[];
  name: string;
  sport?: string;
  platform?: string;
  genderPreference?: GenderPref;
  monetaryAmount?: number;
  budget?: number; // Overall campaign budget
  activityType?: string;
  description?: string;
  imageUrl?: string;
  nilQuestion1?: string;
  nilQuestion2?: string;
  status: "draft" | "active" | "paused" | "completed" | "withdrawn";
  startDate?: Timestamp | Date;
  endDate?: Timestamp | Date;
  // Campaign phase tracking
  requiredApplicants?: number; // Athlete quota - number of athletes needed for campaign
  maxApplicants?: number; // Maximum allowed applicants (if set)
  phase?: CampaignPhase;
  acceptedCount?: number;
  // Listing duration tracking
  listingDuration?: number; // Duration value (e.g., 4)
  listingDurationUnit?: "weeks" | "months"; // Duration unit
  // View tracking
  totalViews?: number;
  // Payment structure
  paymentType?: "one-time" | "recurring";
  recurringFrequency?: "weekly" | "monthly";
  deliverables?: CampaignDeliverable[];
  // Target preference
  targetPreference?: "Local" | "Region" | "National";
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface AppDeliverable {
  id: "desc" | "q1" | "q2";
  label: string;
  checked: boolean;
  url?: string;
}
