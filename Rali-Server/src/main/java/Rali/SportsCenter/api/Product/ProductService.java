package Rali.SportsCenter.api.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import Rali.SportsCenter.repos.Product.ProductDataModel;
import Rali.SportsCenter.repos.Product.ProductRepo;
import Rali.SportsCenter.repos.Receipt.ReceiptDataModel;
import Rali.SportsCenter.repos.Receipt.ReceiptRepo;
import jakarta.persistence.EntityNotFoundException;
import Rali.SportsCenter.repos.Category.CategoryDataModel;
import Rali.SportsCenter.repos.Category.CategoryRepo;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductService {

    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;
    private final ReceiptRepo receiptRepo;

    @Autowired
    public ProductService(ProductRepo productRepo, CategoryRepo categoryRepo, ReceiptRepo receiptRepo) {
        this.productRepo = productRepo;
        this.categoryRepo = categoryRepo;
        this.receiptRepo = receiptRepo;
    }

    /**
     * Create a Product with Categories
     */
    public ProductDataModel addProduct(ProductDataModel product) {
    // Ensure categories exist and convert List to Set
    Set<CategoryDataModel> categories = categoryRepo.findAllById(
        product.getCategories().stream()
            .map(CategoryDataModel::getCategoryId)
            .toList()
    ).stream().collect(Collectors.toSet());

   

    // Set associations back to the product
    product.setCategories(categories);
   

    // Save product with associated categories and receipts
    return productRepo.save(product);
}



public Long getProductIdByName(String name) {
    return productRepo.findProductIdByName(name)
            .orElse(null); // Use Optional to handle null values gracefully
}


public void setProductReceiptTable(ProductDataModel product) {
    if (product == null || product.getProductId() == null) {
        throw new IllegalArgumentException("Product or Product ID must not be null.");
    }

    // Find the product from the database
    Optional<ProductDataModel> existingProductOpt = productRepo.findById(product.getProductId());

    if (existingProductOpt.isPresent()) {
        ProductDataModel existingProduct = existingProductOpt.get();

        // Ensure receipts are provided
        if (product.getReceipts() != null && !product.getReceipts().isEmpty()) {
            Set<ReceiptDataModel> currentReceipts = existingProduct.getReceipts();

            // Fetch and merge the new receipts from the database
            Set<ReceiptDataModel> newReceipts = receiptRepo.findAllById(
                product.getReceipts().stream()
                    .map(ReceiptDataModel::getReceiptId)
                    .toList()
            ).stream().collect(Collectors.toSet());

            // Add only new receipts to the existing ones
            currentReceipts.addAll(newReceipts);

            // Save updated associations
            productRepo.save(existingProduct);
        } else {
            throw new IllegalArgumentException("Receipts must not be null or empty.");
        }
    } else {
        throw new EntityNotFoundException("Product not found.");
    }
}

    public List<ProductDataModel> findAllProducts() {
        return productRepo.findAll();
    }

    /**
     * Update a Product
     */
    public ProductDataModel updateProduct(ProductDataModel product) {
        // Ensure the product exists before updating
        ProductDataModel existingProduct = productRepo.findById(product.getProductId())
            .orElseThrow(() -> new RuntimeException("Product with id " + product.getProductId() + " was not found"));

        // Update properties
        existingProduct.setName(product.getName());

        // Update categories (convert List to Set)
        Set<CategoryDataModel> updatedCategories = categoryRepo.findAllById(
            product.getCategories().stream().map(CategoryDataModel::getCategoryId).toList()
        ).stream().collect(Collectors.toSet());

        existingProduct.setCategories(updatedCategories);
        return productRepo.save(existingProduct);
    }

    /**
     * Find Product by ID
     */
    public ProductDataModel findProductById(Long id) {
        return productRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Product by id " + id + " was not found"));
    }

    /**
     * Delete Product
     */
    public void deleteProduct(Long id) {
        ProductDataModel product = productRepo.findById(id)
            .orElseThrow(() -> new RuntimeException("Product by id " + id + " was not found"));
        productRepo.delete(product);
    }
}
