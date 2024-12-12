package Rali.SportsCenter.repos.Team;


import jakarta.persistence.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import Rali.SportsCenter.repos.Booking.BookingDataModel;
import Rali.SportsCenter.repos.User.UserDataModel;

@Entity
@Table(name = "Team")
public class TeamDataModel {

   
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long teamId;
    
    private String visibility; // public/private

    @ManyToMany
    @JoinTable(
        name = "User-Team",
        joinColumns = @JoinColumn(name = "teamId"),
        inverseJoinColumns = @JoinColumn(name = "userId")
    )
    @JsonIgnore
    private Set<UserDataModel> users;

    @OneToMany(mappedBy = "team")
   @JsonIgnore
    private Set<BookingDataModel> bookings;


    // No-argument constructor
    public TeamDataModel() {}

    // Parameterized constructor
    public TeamDataModel(String visibility) {
        this.visibility = visibility;
    }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public String getVisibility() {
        return visibility;
    }

    public void setVisibility(String visibility) {
        this.visibility = visibility;
    }

    public Set<UserDataModel> getUsers() {
        return users;
    }

    public void setUsers(Set<UserDataModel> users) {
        this.users = users;
    }

 

}

