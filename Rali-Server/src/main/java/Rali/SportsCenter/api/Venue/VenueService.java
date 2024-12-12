package Rali.SportsCenter.api.Venue;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import Rali.SportsCenter.repos.Venue.VenueDataModel;
import Rali.SportsCenter.repos.Venue.VenueRepo;
import java.util.List;

@Service
@Transactional
public class VenueService {
    private final VenueRepo venueRepo;

    @Autowired
    public VenueService(VenueRepo venueRepo) {
        this.venueRepo = venueRepo;
    }

    public VenueDataModel addVenue(VenueDataModel venue) {
        return venueRepo.save(venue);
    }

    public List<VenueDataModel> findAllVenues() {
        return venueRepo.findAll();
    }

    public VenueDataModel updateVenue(VenueDataModel venue) {
        return venueRepo.save(venue);
    }

    public VenueDataModel findVenueById(Long id) {
        return venueRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Venue by id " + id + " was not found"));
    }

    public void deleteVenue(Long id) {
        venueRepo.deleteById(id);
    }

    public List<VenueDataModel> findVenuesByActivityId(Long activityId) {
        return venueRepo.findByActivityActivityId(activityId);
    }
}
