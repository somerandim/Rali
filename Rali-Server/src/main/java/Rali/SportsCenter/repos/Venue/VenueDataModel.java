package Rali.SportsCenter.repos.Venue;



import jakarta.persistence.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import Rali.SportsCenter.repos.Activity.ActivityDataModel;
import Rali.SportsCenter.repos.Booking.BookingDataModel;

@Entity
@Table(name = "Venue")
public class VenueDataModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long venueId;
    
    private String name;
    private Boolean availability;
    private Double price;
    

    @OneToMany(mappedBy = "venue")
    @JsonIgnore
    private Set<BookingDataModel> bookings;

      @ManyToOne
    @JoinColumn(name = "activity_id") // Ensures correct foreign key column name
    private ActivityDataModel activity;


    // No-argument constructor
    public VenueDataModel() {}

    // Parameterized constructor
    public VenueDataModel(String name, Boolean availability, Double price) {
        this.name = name;
        this.availability = availability;
        this.price = price;
    }

    

    public Long getVenueId() {
        return venueId;
    }

    public void setVenueId(Long venueId) {
        this.venueId = venueId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getAvailability() {
        return availability;
    }

    public void setAvailability(Boolean availability) {
        this.availability = availability;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Set<BookingDataModel> getBookings() {
        return bookings;
    }

    public void setBookings(Set<BookingDataModel> bookings) {
        this.bookings = bookings;
    }

    
    public ActivityDataModel getActivity() {
        return activity;
    }

    public void setActivity(ActivityDataModel activity) {
        this.activity = activity;
    }

    // Getters and Setters
}
