package Rali.SportsCenter.api.Booking;




import Rali.SportsCenter.repos.Booking.BookingDataModel;
import jakarta.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/booking")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/bookings/by-team/{teamId}")
    public ResponseEntity<List<Long>> getBookingIdsByTeamId(@PathVariable Long teamId) {
        try {
            List<Long> bookingIds = bookingService.getBookingIdsByTeamId(teamId);
            return new ResponseEntity<>(bookingIds, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    

    @PostMapping("/{bookingId}/add-users")
    public ResponseEntity<String> addUsersToTeam(@PathVariable Long bookingId) {
        try {
            bookingService.addUsersToTeamFromBooking(bookingId);
            return new ResponseEntity<>(     HttpStatus.OK);

        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>("Error: " + e.getMessage(), HttpStatus.NOT_FOUND);

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>("Invalid request: " + e.getMessage(), HttpStatus.BAD_REQUEST);

        } catch (Exception e) {
            return new ResponseEntity<>("Server error.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<BookingDataModel>> getAllBookings() {
        List<BookingDataModel> bookings = bookingService.findAllBookings();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<BookingDataModel> getBookingById(@PathVariable("id") Long id) {
        BookingDataModel booking = bookingService.findBookingById(id);
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<BookingDataModel> addBooking(@RequestBody BookingDataModel booking) {
        BookingDataModel newBooking = bookingService.addBooking(booking);
        return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<BookingDataModel> updateBooking(@RequestBody BookingDataModel booking) {
        BookingDataModel updatedBooking = bookingService.updateBooking(booking);
        return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBooking(@PathVariable("id") Long id) {
        bookingService.deleteBooking(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

      @PostMapping("/set-receipts")
    public ResponseEntity<BookingDataModel> setBookingReceipts(@RequestBody BookingDataModel booking) {
        try {
            bookingService.postBookingReceiptTable(booking);
            return new ResponseEntity<>(booking, HttpStatus.OK);

        } catch (EntityNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);

        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @GetMapping("/by-activity/{activityId}")
    public ResponseEntity<List<Map<String, Object>>> getBookingsByActivityId(@PathVariable Long activityId) {
        List<Map<String, Object>> bookings = bookingService.findBookingsByActivity(activityId);
    
        // Inspect the response structure for debugging
        System.out.println("Bookings Response: " + bookings);
    
        return new ResponseEntity<>(bookings, HttpStatus.OK); // Return the response as JSON
    }

}
