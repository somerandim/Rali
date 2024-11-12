package Rali.SportsCenter.api.Booking;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import Rali.SportsCenter.repos.Booking.BookingDataModel;
import Rali.SportsCenter.repos.Booking.BookingRepo;
import java.util.List;

@Service
@Transactional
public class BookingService {
    private final BookingRepo bookingRepo;

    @Autowired
    public BookingService(BookingRepo bookingRepo) {
        this.bookingRepo = bookingRepo;
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
}
