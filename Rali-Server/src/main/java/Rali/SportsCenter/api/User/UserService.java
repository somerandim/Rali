package Rali.SportsCenter.api.User;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import Rali.SportsCenter.repos.User.UserDataModel;
import Rali.SportsCenter.repos.User.UserRepo;
import java.util.List;

@Service
@Transactional
public class UserService {
    private final UserRepo userRepo;

    @Autowired
    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public UserDataModel addUser(UserDataModel user) {
        return userRepo.save(user);
    }

    public List<UserDataModel> findAllUsers() {
        return userRepo.findAll();
    }

    public UserDataModel updateUser(UserDataModel user) {
        return userRepo.save(user);
    }

    public UserDataModel findUserById(Long id) {
        return userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User by id " + id + " was not found"));
    }

    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }

    public UserDataModel findByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
    
}
