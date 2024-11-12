package Rali.SportsCenter.api.Booking;




import Rali.SportsCenter.repos.Booking.BookingDataModel;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/booking")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
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
}
