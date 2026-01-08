import { apiClient, type ApiResponse } from "../ApiClient";

/**
 * Contract Types
 */
export interface Contract {
  id?: string;
  campaignId: string;
  athleteId: string;
  brandId: string;
  status: "draft" | "sent_to_athlete" | "countered" | "approved" | "rejected" | "signed" | "void";

  // Parties
  brandName?: string;
  brandAddress?: string;
  athleteName?: string;
  athleteAddress?: string;

  // Dates
  effectiveDate?: string;
  expirationDate?: string;

  // Terms
  exclusivity?: boolean;
  exclusivityDetails?: string;

  // Deliverables
  deliverables?: Deliverable[];

  // Payment
  totalCompensation?: number;
  paymentSchedule?: PaymentScheduleItem[];
  paymentMethod?: "bank_transfer" | "check" | "paypal" | "other" | "dapup_wallet";
  paymentType?: "one-time" | "recurring";
  recurringFrequency?: "weekly" | "monthly";

  // Usage Rights
  usageRights?: string;
  usageDuration?: string;

  // Legal
  moralityClause?: string;
  terminationClause?: string;

  // Document
  templateUsed?: boolean;
  pdfUrl?: string;

  // Rejection
  rejectionReason?: string;
  rejectionCategory?: string;

  // Audit
  createdAt?: string;
  updatedAt?: string;
  sentToAthleteAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  signedAt?: string;
  auditTrail?: AuditEntry[];
}

export interface Deliverable {
  id: string;
  type: "instagram_post" | "tiktok_video" | "youtube_video" | "twitter_post" | "other";
  description: string;
  dueDate?: string;
  quantity?: number;
  requirements?: string;
  completed?: boolean;
  proofUrl?: string;
  submittedAt?: string;
  approvedAt?: string;
  rejectedAt?: string;
  status?: "pending" | "submitted" | "approved" | "rejected";
}

export interface PaymentScheduleItem {
  id: string;
  amount: number;
  dueDate?: string;
  description?: string;
  status?: "pending" | "paid" | "overdue";
}

export interface AuditEntry {
  timestamp: string;
  action: string;
  userId: string;
  userName?: string;
  changes?: Record<string, unknown>;
}

export interface CreateContractData {
  campaignId: string;
  athleteId: string;
  brandName?: string;
  brandAddress?: string;
  athleteName?: string;
  athleteAddress?: string;
  effectiveDate?: string;
  expirationDate?: string;
  exclusivity?: boolean;
  exclusivityDetails?: string;
  deliverables?: Deliverable[];
  totalCompensation?: number;
  paymentSchedule?: PaymentScheduleItem[];
  paymentMethod?: "bank_transfer" | "check" | "paypal" | "other" | "dapup_wallet";
  paymentType?: "one-time" | "recurring";
  recurringFrequency?: "weekly" | "monthly";
  usageRights?: string;
  usageDuration?: string;
  moralityClause?: string;
  terminationClause?: string;
  templateUsed?: boolean;
  pdfUrl?: string;
}

export interface UpdateContractData {
  brandName?: string;
  brandAddress?: string;
  athleteName?: string;
  athleteAddress?: string;
  effectiveDate?: string;
  expirationDate?: string;
  exclusivity?: boolean;
  exclusivityDetails?: string;
  deliverables?: Deliverable[];
  totalCompensation?: number;
  paymentSchedule?: PaymentScheduleItem[];
  paymentMethod?: "bank_transfer" | "check" | "paypal" | "other" | "dapup_wallet";
  paymentType?: "one-time" | "recurring";
  recurringFrequency?: "weekly" | "monthly";
  usageRights?: string;
  usageDuration?: string;
  moralityClause?: string;
  terminationClause?: string;
  pdfUrl?: string;
  status?: "draft" | "sent_to_athlete" | "countered" | "approved" | "rejected" | "signed" | "void";
  rejectionReason?: string;
  rejectionCategory?: string;
}

/**
 * Contracts API Endpoints
 */
export const contractsApi = {
  /**
   * Get current contract for a campaign application
   */
  getContract: async (
    campaignId: string,
    athleteId: string
  ): Promise<ApiResponse<Contract>> => {
    return apiClient.get<Contract>(
      `/api/campaigns/${campaignId}/applications/${athleteId}/contract`
    );
  },

  /**
   * Create draft contract
   */
  createContract: async (
    data: CreateContractData
  ): Promise<ApiResponse<Contract>> => {
    const { campaignId, athleteId, ...contractData } = data;
    return apiClient.post<Contract>(
      `/api/campaigns/${campaignId}/applications/${athleteId}/contract`,
      contractData
    );
  },

  /**
   * Update contract
   */
  updateContract: async (
    campaignId: string,
    athleteId: string,
    data: UpdateContractData
  ): Promise<ApiResponse<Contract>> => {
    return apiClient.put<Contract>(
      `/api/campaigns/${campaignId}/applications/${athleteId}/contract`,
      data
    );
  },

  /**
   * Send contract to athlete for review/signing
   */
  sendContract: async (
    campaignId: string,
    athleteId: string
  ): Promise<ApiResponse<Contract>> => {
    return apiClient.post<Contract>(
      `/api/campaigns/${campaignId}/applications/${athleteId}/contract/send`,
      {}
    );
  },
};
