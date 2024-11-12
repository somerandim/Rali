package Rali.SportsCenter.api.Activity;


import Rali.SportsCenter.repos.Activity.ActivityDataModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activity")
public class ActivityController {
    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping("/all")
    public ResponseEntity<List<ActivityDataModel>> getAllActivities() {
        List<ActivityDataModel> activities = activityService.findAllActivities();
        return new ResponseEntity<>(activities, HttpStatus.OK);
    }

    @GetMapping("/find/{id}")
    public ResponseEntity<ActivityDataModel> getActivityById(@PathVariable("id") Long id) {
        ActivityDataModel activity = activityService.findActivityById(id);
        return new ResponseEntity<>(activity, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<ActivityDataModel> addActivity(@RequestBody ActivityDataModel activity) {
        ActivityDataModel newActivity = activityService.addActivity(activity);
        return new ResponseEntity<>(newActivity, HttpStatus.CREATED);
    }

    @PutMapping("/update")
    public ResponseEntity<ActivityDataModel> updateActivity(@RequestBody ActivityDataModel activity) {
        ActivityDataModel updatedActivity = activityService.updateActivity(activity);
        return new ResponseEntity<>(updatedActivity, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteActivity(@PathVariable("id") Long id) {
        activityService.deleteActivity(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
