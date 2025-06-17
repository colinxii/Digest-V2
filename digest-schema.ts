//Expected payload for the Advisor Digest email

export interface AdvisorDigestPayload {
    recipient: {
        name: string;
        title: string;
    };
    matured_mortgages: MortgageItem[];
    renewing_mortgages: MortgageItem[];
    appointments: AppointmentItem[];
    appointmentData: AppointmentHeatmapData[];
}

export interface MortgageItem {
    date: string;  // ISO 8601 date format
    amount: number;
    members: string;
    last_update: string;  // ISO 8601 date format
    crm_link: string;
}

export interface AppointmentItem {
    date: string;  // ISO 8601 date format
    members: string;
    crm_link: string;
    coconut_link: string;
    service: string;
    last_update: string;  // ISO 8601 date format
}

export interface AppointmentHeatmapData {
    Day: number;
    Month: number;
    Year: number;
    Count: number;
}