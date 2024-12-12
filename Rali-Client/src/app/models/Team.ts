export interface Team {
    teamId?: number;   // Optional because it will be auto-generated
    name: string;      // Team name
    visibility: boolean; // Visibility status (true or false)
  }