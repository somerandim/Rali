package Rali.SportsCenter.api.Team;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import Rali.SportsCenter.repos.Team.TeamDataModel;
import Rali.SportsCenter.repos.Team.TeamRepo;
import java.util.List;

@Service
@Transactional
public class TeamService {
    private final TeamRepo teamRepo;

    @Autowired
    public TeamService(TeamRepo teamRepo) {
        this.teamRepo = teamRepo;
    }

    public TeamDataModel addTeam(TeamDataModel team) {
        return teamRepo.save(team);
    }

    public List<TeamDataModel> findAllTeams() {
        return teamRepo.findAll();
    }

    public TeamDataModel updateTeam(TeamDataModel team) {
        return teamRepo.save(team);
    }

    public TeamDataModel findTeamById(Long id) {
        return teamRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Team by id " + id + " was not found"));
    }

    public void deleteTeam(Long id) {
        teamRepo.deleteById(id);
    }
}
