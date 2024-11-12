package Rali.SportsCenter.repos.Product;



import jakarta.persistence.*;
import java.util.Set;

import Rali.SportsCenter.repos.Category.CategoryDataModel;
import Rali.SportsCenter.repos.Order.OrderDataModel;

@Entity
@Table(name = "Product")
public class ProductDataModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;
    
    private Integer quantity;
    private String image;
    private Double price;
    private String name;
    private String description;

    @ManyToMany
    @JoinTable(name = "Product-Order",
    joinColumns = @JoinColumn(name = "productId"),
    inverseJoinColumns = @JoinColumn (name = "orderId")
    )
    private Set<OrderDataModel> orders;

    @ManyToMany
    @JoinTable(name = "Product-Category",
    joinColumns = @JoinColumn(name = "productId"),
    inverseJoinColumns = @JoinColumn (name = "categoryId")
    )
    private Set <CategoryDataModel> categorys;

    // No-argument constructor
    public ProductDataModel() {}






    






    public ProductDataModel(Long productId, Integer quantity, String image, Double price, String name,
            String description, Set<OrderDataModel> orders, Set<CategoryDataModel> categorys) {
        this.productId = productId;
        this.quantity = quantity;
        this.image = image;
        this.price = price;
        this.name = name;
        this.description = description;
        this.orders = orders;
        this.categorys = categorys;
    }













    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
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

   



    public Set<OrderDataModel> getOrder() {
        return orders;
    }



    public void setOrder(Set<OrderDataModel> order) {
        this.orders = order;
    }






    public Set<OrderDataModel> getOrders() {
        return orders;
    }






    public void setOrders(Set<OrderDataModel> orders) {
        this.orders = orders;
    }













    public Set<CategoryDataModel> getCategorys() {
        return categorys;
    }













    public void setCategorys(Set<CategoryDataModel> categorys) {
        this.categorys = categorys;
    }







    // Getters and Setters
}
