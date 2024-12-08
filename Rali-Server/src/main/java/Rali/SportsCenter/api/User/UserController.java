package Rali.SportsCenter.api.User;

import Rali.SportsCenter.repos.User.UserDataModel;
import Rali.SportsCenter.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")    
@CrossOrigin(origins = "http://localhost:4200")
public class UserController {

    private final UserService userService;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, JwtUtil jwtUtil) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    /**
     * Get all users
     */
    @GetMapping("/all")
    public ResponseEntity<List<UserDataModel>> getAllUsers() {
        List<UserDataModel> users = userService.findAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    /**
     * Find a user by ID
     */
    @GetMapping("/find/{id}")
    public ResponseEntity<UserDataModel> getUserById(@PathVariable("id") Long id) {
        UserDataModel user = userService.findUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    /**
     * Add a new user
     */
    @PostMapping("/add")
    public ResponseEntity<UserDataModel> addUser(@RequestBody UserDataModel user) {
        UserDataModel newUser = userService.addUser(user);
        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    /**
     * Update user information
     */
    @PutMapping("/update")
    public ResponseEntity<UserDataModel> updateUser(@RequestBody UserDataModel user) {
        UserDataModel updatedUser = userService.updateUser(user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    /**
     * Delete a user by ID
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable("id") Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    /**
     * Login Endpoint with JWT Token Generation
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody UserDataModel loginRequest) {
        // Find the user by email
        UserDataModel user = userService.findByEmail(loginRequest.getEmail());

        // Validate password
        if (user == null || !user.getPassword().equals(loginRequest.getPassword())) {
            return new ResponseEntity<>("Invalid email or password!", HttpStatus.UNAUTHORIZED);
        }

        // Generate JWT Token on successful login
        String token = jwtUtil.generateToken(user.getEmail());

        return new ResponseEntity<>(new AuthResponse(token), HttpStatus.OK);
    }
}

/**
 * Response Wrapper Class for JWT Token
 */
class AuthResponse {
    private String token;

    public AuthResponse(String token) {
        this.token = token;
    }

    public String getToken() {
        return token;
    }
}
