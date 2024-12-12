package Rali.SportsCenter.repos.Venue;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VenueRepo extends JpaRepository<VenueDataModel, Long> {
    List<VenueDataModel> findByActivityActivityId(Long activityId);  // Use activity ID for filtering
}
