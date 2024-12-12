package Rali.SportsCenter.repos.Product;



import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ProductRepo extends JpaRepository<ProductDataModel, Long> {


    @Query("SELECT p.productId FROM ProductDataModel p WHERE p.name = :name")
    Optional<Long> findProductIdByName(@Param("name") String name);

}
