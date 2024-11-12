package Rali.SportsCenter.api.Category;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import Rali.SportsCenter.repos.Category.CategoryDataModel;
import Rali.SportsCenter.repos.Category.CategoryRepo;
import java.util.List;

@Service
@Transactional
public class CategoryService {
    private final CategoryRepo categoryRepo;

    @Autowired
    public CategoryService(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    public CategoryDataModel addCategory(CategoryDataModel category) {
        return categoryRepo.save(category);
    }

    public List<CategoryDataModel> findAllCategories() {
        return categoryRepo.findAll();
    }

    public CategoryDataModel updateCategory(CategoryDataModel category) {
        return categoryRepo.save(category);
    }

    public CategoryDataModel findCategoryById(Long id) {
        return categoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category by id " + id + " was not found"));
    }

    public void deleteCategory(Long id) {
        categoryRepo.deleteById(id);
    }
}
