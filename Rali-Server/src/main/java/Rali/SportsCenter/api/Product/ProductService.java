package Rali.SportsCenter.api.Product;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import Rali.SportsCenter.repos.Product.ProductDataModel;
import Rali.SportsCenter.repos.Product.ProductRepo;
import java.util.List;

@Service
@Transactional
public class ProductService {
    private final ProductRepo productRepo;

    @Autowired
    public ProductService(ProductRepo productRepo) {
        this.productRepo = productRepo;
    }

    public ProductDataModel addProduct(ProductDataModel product) {
        return productRepo.save(product);
    }

    public List<ProductDataModel> findAllProducts() {
        return productRepo.findAll();
    }

    public ProductDataModel updateProduct(ProductDataModel product) {
        return productRepo.save(product);
    }

    public ProductDataModel findProductById(Long id) {
        return productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product by id " + id + " was not found"));
    }

    public void deleteProduct(Long id) {
        productRepo.deleteById(id);
    }
}
