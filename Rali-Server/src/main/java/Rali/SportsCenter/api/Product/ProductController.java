package Rali.SportsCenter.api.Product;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import Rali.SportsCenter.repos.Product.ProductDataModel;
import Rali.SportsCenter.api.Product.ProductService;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    /**
     * Add a new Product
     */
    @PostMapping("/add")
    public ResponseEntity<ProductDataModel> createProduct(@RequestBody ProductDataModel product) {
        ProductDataModel createdProduct = productService.addProduct(product);
        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    /**
     * Get all Products
     */
    @GetMapping("/all")
    public ResponseEntity<List<ProductDataModel>> getAllProducts() {
        List<ProductDataModel> products = productService.findAllProducts();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    /**
     * Get a Product by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProductDataModel> getProductById(@PathVariable("id") Long id) {
        ProductDataModel product = productService.findProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @GetMapping("/get-id-by-name/{name}")
public ResponseEntity<Long> getProductIdByName(@PathVariable String name) {
    Long productId = productService.getProductIdByName(name);

    if (productId != null) {
        return new ResponseEntity<>(productId, HttpStatus.OK);
    } else {
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}



    @PostMapping("/set-receipts")
    public ResponseEntity<String> setProductReceipts(@RequestBody ProductDataModel product) {
        try {
            // Check if receipts are provided
            if (product.getReceipts() == null || product.getReceipts().isEmpty()) {
                return new ResponseEntity<>("No receipts provided. Nothing to save.", HttpStatus.BAD_REQUEST);
            }
    
            // Save only the Product-Receipt association
            productService.setProductReceiptTable(product);
    
            return new ResponseEntity<>("Receipts successfully linked to the product.", HttpStatus.CREATED);
    
        } catch (Exception e) {
            return new ResponseEntity<>("Failed to link receipts to the product.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

    /**
     * Update a Product
     */
    @PutMapping("/update")
    public ResponseEntity<ProductDataModel> updateProduct(@RequestBody ProductDataModel product) {
        ProductDataModel updatedProduct = productService.updateProduct(product);
        return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
    }

    /**
     * Delete a Product by ID
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") Long id) {
        productService.deleteProduct(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
