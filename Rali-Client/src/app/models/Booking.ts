import { Team } from "./Team";
import { Venue } from "./Venue";


export interface Booking {
  bookingId: number;         // ID of the booking
  date: string;              // Date of the booking (in ISO format)
  startTime: string;         // Start time of the booking
  endTime: string;           // End time of the booking
  venue: Venue;              // The venue associated with the booking
  team: Team   // Optional team ID (if applicable)
}
