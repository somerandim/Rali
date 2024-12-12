package Rali.SportsCenter.repos.Category;


import jakarta.persistence.*;
import Rali.SportsCenter.repos.Product.*;
import java.util.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Category")
public class CategoryDataModel {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;
    
    private String name;

    @ManyToMany(mappedBy = "categorys")
    @JsonIgnore
    private Set<ProductDataModel> products;

    // No-argument constructor
    public CategoryDataModel() {}

    // Parameterized constructor
    public CategoryDataModel(String name) {
        this.name = name;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<ProductDataModel> getProducts() {
        return products;
    }

    public void setProducts(Set<ProductDataModel> products) {
        this.products = products;
    }

    // Getters and Setters
}
