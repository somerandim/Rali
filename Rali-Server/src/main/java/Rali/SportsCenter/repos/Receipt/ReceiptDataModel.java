package Rali.SportsCenter.repos.Receipt;

import jakarta.persistence.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import Rali.SportsCenter.repos.Booking.BookingDataModel;
import Rali.SportsCenter.repos.Product.ProductDataModel;
import Rali.SportsCenter.repos.User.UserDataModel;


@Entity
@Table(name = "Receipt")
public class ReceiptDataModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long ReceiptId;

    private String paymentMethod;
    private String address;
    private String date;
    private Long total;

    @ManyToOne
    @JoinColumn(name = "userId")
    @JsonIgnore
    private UserDataModel user;

    @ManyToMany(mappedBy = "Receipts")
    @JsonIgnore
    private Set<ProductDataModel> products;

    @ManyToMany(mappedBy = "Receipts")
    @JsonIgnore
    private Set<BookingDataModel> Bookings;

    // No-argument constructor
    public ReceiptDataModel() {
    }

    public ReceiptDataModel(Long ReceiptId, String paymentMethod, String address, String date, Long total,
            UserDataModel user, Set<ProductDataModel> products, Set<BookingDataModel> bookings) {
        this.ReceiptId = ReceiptId;
        this.paymentMethod = paymentMethod;
        this.address = address;
        this.date = date;
        this.total = total;
        this.user = user;
        this.products = products;
        Bookings = bookings;
    }

    public Long getReceiptId() {
        return ReceiptId;
    }

    public void setReceiptId(Long ReceiptId) {
        this.ReceiptId = ReceiptId;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public Long getTotal() {
        return total;
    }

    public void setTotal(Long total) {
        this.total = total;
    }

    public UserDataModel getUser() {
        return user;
    }

    public void setUser(UserDataModel user) {
        this.user = user;
    }

    public Set<ProductDataModel> getProducts() {
        return products;
    }

    public void setProducts(Set<ProductDataModel> products) {
        this.products = products;
    }

    public Set<BookingDataModel> getBookings() {
        return Bookings;
    }

    public void setBookings(Set<BookingDataModel> bookings) {
        Bookings = bookings;
    }

}
