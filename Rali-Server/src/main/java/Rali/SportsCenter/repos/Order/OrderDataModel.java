package Rali.SportsCenter.repos.Order;

import jakarta.persistence.*;
import java.util.Set;

import Rali.SportsCenter.repos.Booking.BookingDataModel;
import Rali.SportsCenter.repos.Product.ProductDataModel;
import Rali.SportsCenter.repos.User.UserDataModel;


@Entity
@Table(name = "Orders")
public class OrderDataModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderId;

    private String paymentMethod;
    private String address;
    private String date;
    private Long total;

    @ManyToOne
    @JoinColumn(name = "userId")
    private UserDataModel user;

    @ManyToMany(mappedBy = "orders")
    private Set<ProductDataModel> products;

    @ManyToMany(mappedBy = "orders")
    private Set<BookingDataModel> Bookings;

    // No-argument constructor
    public OrderDataModel() {
    }

    public OrderDataModel(Long orderId, String paymentMethod, String address, String date, Long total,
            UserDataModel user, Set<ProductDataModel> products, Set<BookingDataModel> bookings) {
        this.orderId = orderId;
        this.paymentMethod = paymentMethod;
        this.address = address;
        this.date = date;
        this.total = total;
        this.user = user;
        this.products = products;
        Bookings = bookings;
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
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
