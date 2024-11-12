package Rali.SportsCenter.api.Receipt;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import Rali.SportsCenter.repos.Receipt.ReceiptDataModel;
import Rali.SportsCenter.repos.Receipt.ReceiptRepo;
import java.util.List;

@Service
@Transactional
public class ReceiptService {
    private final ReceiptRepo receiptRepo;

    @Autowired
    public ReceiptService(ReceiptRepo receiptRepo) {
        this.receiptRepo = receiptRepo;
    }

    public ReceiptDataModel addReceipt(ReceiptDataModel receipt) {
        return receiptRepo.save(receipt);
    }

    public List<ReceiptDataModel> findAllReceipts() {
        return receiptRepo.findAll();
    }

    public ReceiptDataModel updateReceipt(ReceiptDataModel receipt) {
        return receiptRepo.save(receipt);
    }

    public ReceiptDataModel findReceiptById(Long id) {
        return receiptRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Receipt by id " + id + " was not found"));
    }

    public void deleteReceipt(Long id) {
        receiptRepo.deleteById(id);
    }
}

