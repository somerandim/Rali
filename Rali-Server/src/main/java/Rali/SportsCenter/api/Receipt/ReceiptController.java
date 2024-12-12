package Rali.SportsCenter.api.Receipt;



import Rali.SportsCenter.repos.Receipt.ReceiptDataModel;
import Rali.SportsCenter.repos.User.UserDataModel;
import Rali.SportsCenter.security.JwtUtil;
import Rali.SportsCenter.api.User.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/receipt")
public class ReceiptController {
    private final ReceiptService receiptService;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    public ReceiptController(ReceiptService receiptService, JwtUtil jwtUtil, UserService userService) {
        this.receiptService = receiptService;
            this.jwtUtil= jwtUtil;
            this.userService = userService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ReceiptDataModel>> getAllReceipts() {
        List<ReceiptDataModel> receipts = receiptService.findAllReceipts();
        return new ResponseEntity<>(receipts, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ReceiptDataModel> getReceiptById(@PathVariable("id") Long id) {
        ReceiptDataModel receipt = receiptService.findReceiptById(id);
        return new ResponseEntity<>(receipt, HttpStatus.OK);
    }

      @PostMapping("/add")
    public ResponseEntity<ReceiptDataModel> addReceipt(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody ReceiptDataModel receiptRequest) {

        // Check if the Authorization header is present and valid
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        // Extract the token from the Authorization header
        String token = authHeader.substring(7);

        // Validate the token and get the associated email
        String email;
        try {
            email = jwtUtil.validateToken(token); // Assumes `validateToken` returns the email
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        // Find the user associated with the email
        UserDataModel user = userService.findByEmail(email);
        if (user == null) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }

        // Create a new Receipt and populate it with provided data and the authenticated user
        ReceiptDataModel newReceipt = new ReceiptDataModel();
        newReceipt.setTotal(receiptRequest.getTotal());
        newReceipt.setAddress(receiptRequest.getAddress());
        newReceipt.setDate(receiptRequest.getDate());
        newReceipt.setPaymentMethod(receiptRequest.getPaymentMethod());
        newReceipt.setUser(user); // Associate receipt with the authenticated user

        // Save the receipt
        ReceiptDataModel savedReceipt = receiptService.addReceipt(newReceipt);

        return new ResponseEntity<>(savedReceipt, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<ReceiptDataModel> updateReceipt(@RequestBody ReceiptDataModel receipt) {
        ReceiptDataModel updatedReceipt = receiptService.updateReceipt(receipt);
        return new ResponseEntity<>(updatedReceipt, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteReceipt(@PathVariable("id") Long id) {
        receiptService.deleteReceipt(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
