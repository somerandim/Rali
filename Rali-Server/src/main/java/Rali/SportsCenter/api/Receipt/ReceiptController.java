package Rali.SportsCenter.api.Receipt;



import Rali.SportsCenter.repos.Receipt.ReceiptDataModel;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/receipt")
public class ReceiptController {
    private final ReceiptService receiptService;

    public ReceiptController(ReceiptService receiptService) {
        this.receiptService = receiptService;
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
    public ResponseEntity<ReceiptDataModel> addReceipt(@RequestBody ReceiptDataModel receipt) {
        ReceiptDataModel newReceipt = receiptService.addReceipt(receipt);
        return new ResponseEntity<>(newReceipt, HttpStatus.CREATED);
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
