export interface Team {
    teamId?: number;   // Optional because it will be auto-generated
    name: string;      // Team name
    visibility: string; // Visibility status (true or false)
  }