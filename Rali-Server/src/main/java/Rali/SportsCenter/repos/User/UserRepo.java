package Rali.SportsCenter.repos.User;
import java.util.*;


import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<UserDataModel, Long> {


    Optional<UserDataModel> findByEmail(String email);
}

