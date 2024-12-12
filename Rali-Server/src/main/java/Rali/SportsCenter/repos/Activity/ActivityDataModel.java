package Rali.SportsCenter.repos.Activity;



import jakarta.persistence.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import Rali.SportsCenter.repos.Venue.VenueDataModel;

@Entity
@Table(name = "Activity")
public class ActivityDataModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long activityId;
    
    private String name;
    private String description;
    private Integer maxUsers;

    @OneToMany(mappedBy = "activity")
    @JsonIgnore
    private Set<VenueDataModel> venues;

    // No-argument constructor
    public ActivityDataModel() {}

    // Parameterized constructor
    public ActivityDataModel(String name, String description, Integer maxUsers) {
        this.name = name;
        this.description = description;
        this.maxUsers = maxUsers;
    }

    public Long getActivityId() {
        return activityId;
    }

    public void setActivityId(Long activityId) {
        this.activityId = activityId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getMaxUsers() {
        return maxUsers;
    }

    public void setMaxUsers(Integer maxUsers) {
        this.maxUsers = maxUsers;
    }

    public Set<VenueDataModel> getVenues() {
        return venues;
    }

    public void setVenues(Set<VenueDataModel> venues) {
        this.venues = venues;
    }

   
}
