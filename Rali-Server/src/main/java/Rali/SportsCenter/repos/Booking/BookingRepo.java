package Rali.SportsCenter.repos.Booking;



import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface BookingRepo extends JpaRepository<BookingDataModel, Long> {

    @Query("SELECT b FROM BookingDataModel b WHERE b.venue.activity.activityId = :activityId")
    List<BookingDataModel> findBookingsByActivityId(@Param("activityId") Long activityId);

    @Query("SELECT b.bookingId FROM BookingDataModel b WHERE b.team.teamId = :teamId")
    List<Long> findBookingIdsByTeamId(@Param("teamId") Long teamId);
}