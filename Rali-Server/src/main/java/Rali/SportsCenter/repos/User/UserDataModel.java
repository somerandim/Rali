package Rali.SportsCenter.repos.User;

import jakarta.persistence.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;

import Rali.SportsCenter.repos.Receipt.ReceiptDataModel;
import Rali.SportsCenter.repos.Team.TeamDataModel;


@Entity
@Table(name = "User")
public class UserDataModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;
    
    @Column(unique = true)
    private String email;
    private String password;
    private String username;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    
    @OneToMany(mappedBy = "user")
    @JsonIgnore
    private Set<ReceiptDataModel> orders;
    
    @ManyToMany(mappedBy = "users")
    @JsonIgnore
    private Set<TeamDataModel> teams;

    public UserDataModel(){}

    public UserDataModel(String email, String password, String username, String firstName, String lastName, String phoneNumber) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phoneNumber = phoneNumber;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public Set<ReceiptDataModel> getOrders() {
        return orders;
    }

    public void setOrders(Set<ReceiptDataModel> orders) {
        this.orders = orders;
    }

    public Set<TeamDataModel> getTeams() {
        return teams;
    }

    public void setTeams(Set<TeamDataModel> teams) {
        this.teams = teams;
    }

    

    // Getters and Setters
}

