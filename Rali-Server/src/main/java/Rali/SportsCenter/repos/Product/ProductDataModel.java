package Rali.SportsCenter.repos.Product;

import jakarta.persistence.*;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonAlias;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import Rali.SportsCenter.repos.Category.CategoryDataModel;
import Rali.SportsCenter.repos.Receipt.ReceiptDataModel;

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
    @JoinTable(name = "Product-Receipt", joinColumns = @JoinColumn(name = "productId"), inverseJoinColumns = @JoinColumn(name = "ReceiptId"))
    private Set<ReceiptDataModel> Receipts;

    @ManyToMany
    @JoinTable(name = "Product-Category", joinColumns = @JoinColumn(name = "productId"), inverseJoinColumns = @JoinColumn(name = "categoryId"))
   
    private Set<CategoryDataModel> categorys;

    // No-argument constructor
    public ProductDataModel() {
    }

    public ProductDataModel(Long productId, Integer quantity, String image, Double price, String name,
            String description, Set<ReceiptDataModel> Receipts, Set<CategoryDataModel> categorys) {
        this.productId = productId;
        this.quantity = quantity;
        this.image = image;
        this.price = price;
        this.name = name;
        this.description = description;
        this.Receipts = Receipts;
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

    public Set<ReceiptDataModel> getReceipts() {
        return Receipts;
    }

    public void setReceipts(Set<ReceiptDataModel> receipts) {
        Receipts = receipts;
    }

    public Set<CategoryDataModel> getCategories() {
        return categorys;
    }

    public void setCategories(Set<CategoryDataModel> categorys) {
        this.categorys = categorys;
    }

   

    // Getters and Setters
}
