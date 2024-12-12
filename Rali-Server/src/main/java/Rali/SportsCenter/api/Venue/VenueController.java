package Rali.SportsCenter.api.Venue;


import Rali.SportsCenter.repos.Venue.VenueDataModel;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/venue")
public class VenueController {
    private final VenueService venueService;

    public VenueController(VenueService venueService) {
        this.venueService = venueService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<VenueDataModel>> getAllVenues() {
        List<VenueDataModel> venues = venueService.findAllVenues();
        return new ResponseEntity<>(venues, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<VenueDataModel> getVenueById(@PathVariable("id") Long id) {
        VenueDataModel venue = venueService.findVenueById(id);
        return new ResponseEntity<>(venue, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<VenueDataModel> addVenue(@RequestBody VenueDataModel venue) {
        VenueDataModel newVenue = venueService.addVenue(venue);
        return new ResponseEntity<>(newVenue, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<VenueDataModel> updateVenue(@RequestBody VenueDataModel venue) {
        VenueDataModel updatedVenue = venueService.updateVenue(venue);
        return new ResponseEntity<>(updatedVenue, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteVenue(@PathVariable("id") Long id) {
        venueService.deleteVenue(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/by-activity/{activityId}")
    public ResponseEntity<List<VenueDataModel>> getVenuesByActivityId(@PathVariable("activityId") Long activityId) {
        List<VenueDataModel> venues = venueService.findVenuesByActivityId(activityId);
        return new ResponseEntity<>(venues, HttpStatus.OK);
    }

}
