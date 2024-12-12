package Rali.SportsCenter.api.Booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import Rali.SportsCenter.repos.Booking.BookingDataModel;
import Rali.SportsCenter.repos.Booking.BookingRepo;
import Rali.SportsCenter.repos.Receipt.ReceiptDataModel;
import Rali.SportsCenter.repos.Receipt.ReceiptRepo;
import Rali.SportsCenter.repos.Team.TeamDataModel;
import Rali.SportsCenter.repos.Team.TeamRepo;
import jakarta.persistence.EntityNotFoundException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class BookingService {
    private final BookingRepo bookingRepo;
    private final ReceiptRepo receiptRepo;
    private final TeamRepo teamRepo;

    @Autowired
    public BookingService(BookingRepo bookingRepo, ReceiptRepo receiptRepo, TeamRepo teamRepo) {
        this.bookingRepo = bookingRepo;
        this.receiptRepo = receiptRepo;
        this.teamRepo = teamRepo;
    }


    public List<Long> getBookingIdsByTeamId(Long teamId) {
        return bookingRepo.findBookingIdsByTeamId(teamId);
    }




     @Transactional
    public void addUsersToTeamFromBooking(Long bookingId) {
        BookingDataModel booking = bookingRepo.findById(bookingId)
            .orElseThrow(() -> new EntityNotFoundException("Booking not found"));

        if (booking.getTeam() == null || booking.getTeam().getTeamId() == null) {
            throw new IllegalArgumentException("Booking must have a valid team.");
        }

        Set<ReceiptDataModel> receipts = booking.getReceipts();
        if (receipts == null || receipts.isEmpty()) {
            throw new IllegalArgumentException("No receipts associated with this booking.");
        }

        TeamDataModel team = booking.getTeam();

        for (ReceiptDataModel receipt : receipts) {
            if (receipt.getUser() != null && !team.getUsers().contains(receipt.getUser())) {
                team.getUsers().add(receipt.getUser());
            }
        }

        teamRepo.save(team);  // Save updated team to persist changes
    }



    /**
     * Set Receipts for Booking
     */
    public void postBookingReceiptTable(BookingDataModel booking) {
        if (booking == null || booking.getBookingId() == null) {
            throw new IllegalArgumentException("Booking or Booking ID must not be null.");
        }
    
        // Find the existing booking if present
        Optional<BookingDataModel> existingBookingOpt = bookingRepo.findById(booking.getBookingId());
    
        if (existingBookingOpt.isPresent()) {
            BookingDataModel existingBooking = existingBookingOpt.get();
    
            // Ensure receipts are provided
            if (booking.getReceipts() != null && !booking.getReceipts().isEmpty()) {
                Set<ReceiptDataModel> currentReceipts = existingBooking.getReceipts();
    
                // Fetch and merge the new receipts from the database
                Set<ReceiptDataModel> newReceipts = receiptRepo.findAllById(
                    booking.getReceipts().stream()
                        .map(ReceiptDataModel::getReceiptId)
                        .toList()
                ).stream().collect(Collectors.toSet());
    
                // Add only new receipts to the existing ones
                currentReceipts.addAll(newReceipts);
    
                // Save the updated association
                bookingRepo.save(existingBooking);
            } else {
                throw new IllegalArgumentException("Receipts must not be null or empty.");
            }
        } else {
            throw new EntityNotFoundException("Booking not found.");
        }
    }
    
    public BookingDataModel addBooking(BookingDataModel booking) {
        return bookingRepo.save(booking);
    }

    public List<BookingDataModel> findAllBookings() {
        return bookingRepo.findAll();
    }

    public BookingDataModel updateBooking(BookingDataModel booking) {
        return bookingRepo.save(booking);
    }

    public BookingDataModel findBookingById(Long id) {
        return bookingRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking by id " + id + " was not found"));
    }

    public void deleteBooking(Long id) {
        bookingRepo.deleteById(id);
    }


    // BookingService.java
public List<Map<String, Object>> findBookingsByActivity(Long activityId) {
    return bookingRepo.findBookingsByActivityId(activityId)
        .stream()
        .map(booking -> {
            Map<String, Object> bookingMap = new HashMap<>();
            bookingMap.put("bookingId", booking.getBookingId());
            bookingMap.put("date", booking.getDate());
            bookingMap.put("startTime", booking.getStartTime());
            bookingMap.put("endTime", booking.getEndTime());
            bookingMap.put("teamId", booking.getTeam() != null ? booking.getTeam().getTeamId() : null);
            bookingMap.put("teamVisibility", booking.getTeam() != null ? booking.getTeam().getVisibility() : null);
            bookingMap.put("venueId", booking.getVenue() != null ? booking.getVenue().getVenueId() : null);
            bookingMap.put("venueName", booking.getVenue() != null ? booking.getVenue().getName() : null);
            bookingMap.put("activityName", booking.getVenue() != null && booking.getVenue().getActivity() != null
                    ? booking.getVenue().getActivity().getName() : null);
            return bookingMap;
        })
        .collect(Collectors.toList());
}

}
