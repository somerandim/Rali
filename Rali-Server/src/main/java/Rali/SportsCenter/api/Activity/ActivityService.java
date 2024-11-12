package Rali.SportsCenter.api.Activity;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import Rali.SportsCenter.repos.Activity.ActivityDataModel;
import Rali.SportsCenter.repos.Activity.ActivityRepo;
import java.util.List;

@Service
@Transactional
public class ActivityService {
    private final ActivityRepo activityRepo;

    @Autowired
    public ActivityService(ActivityRepo activityRepo) {
        this.activityRepo = activityRepo;
    }

    public ActivityDataModel addActivity(ActivityDataModel activity) {
        return activityRepo.save(activity);
    }

    public List<ActivityDataModel> findAllActivities() {
        return activityRepo.findAll();
    }

    public ActivityDataModel updateActivity(ActivityDataModel activity) {
        return activityRepo.save(activity);
    }

    public ActivityDataModel findActivityById(Long id) {
        return activityRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Activity by id " + id + " was not found"));
    }

    public void deleteActivity(Long id) {
        activityRepo.deleteById(id);
    }
}

