package Rali.SportsCenter.api.User;

import Rali.SportsCenter.repos.User.UserDataModel;
import Rali.SportsCenter.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.ConcurrentHashMap;
import java.util.*;

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

    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return new ResponseEntity<>(Map.of("message", "Authorization header is missing!"), HttpStatus.UNAUTHORIZED);
        }
    
        String token = authHeader.substring(7); // Extract token
    
        // Invalidate token (e.g., add to blacklist)
        jwtUtil.invalidateToken(token);
    
        // Return a JSON response
        return new ResponseEntity<>(Map.of("message", "Logout successful. Token invalidated!"), HttpStatus.OK);
    }

    /**
     * Get all users
     */
    @GetMapping("/profile")
    public ResponseEntity<UserDataModel> getUserProfile(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }
    
        String token = authHeader.substring(7);  // Extract token
        String email = jwtUtil.validateToken(token);  // Extract email from JWT
    
        UserDataModel user = userService.findByEmail(email);  // Fetch user from DB
    
        return new ResponseEntity<>(user, HttpStatus.OK);  // Return user data
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
public ResponseEntity<UserDataModel> updateUser(
        @RequestHeader("Authorization") String authHeader,
        @RequestBody UserDataModel userUpdateRequest) {

    if (authHeader == null || !authHeader.startsWith("Bearer ")) {
        return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
    }

    String token = authHeader.substring(7);  // Extract the token

    // Validate the token and get the associated email
    String email = jwtUtil.validateToken(token);

    // Find the user associated with the email
    UserDataModel existingUser = userService.findByEmail(email);

    // Update only the non-null fields provided in the request
    if (userUpdateRequest.getFirstName() != null) {
        existingUser.setFirstName(userUpdateRequest.getFirstName());
    }
    if (userUpdateRequest.getLastName() != null) {
        existingUser.setLastName(userUpdateRequest.getLastName());
    }
    if (userUpdateRequest.getPhoneNumber() != null) {
        existingUser.setPhoneNumber(userUpdateRequest.getPhoneNumber());
    }
    if (userUpdateRequest.getPassword() != null) {
        existingUser.setPassword(userUpdateRequest.getPassword());
    }
    if (userUpdateRequest.getUsername() != null) {
        existingUser.setUsername(userUpdateRequest.getUsername());
    }

    // Save the updated user
    UserDataModel updatedUser = userService.updateUser(existingUser);

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