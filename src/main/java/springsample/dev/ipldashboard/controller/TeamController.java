package springsample.dev.ipldashboard.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import springsample.dev.ipldashboard.model.Team;
import springsample.dev.ipldashboard.repository.MatchRepository;
import springsample.dev.ipldashboard.repository.TeamRepository;

@RestController
public class TeamController {

    private TeamRepository teamRepository;
    private MatchRepository matchRepository;

    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }


    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName) {
        //TODO 本来であればDB検索、結果の組み立てはサービスクラスで実装するのが妥当と思う
        var team = teamRepository.findByTeamName(teamName);
        if (team == null) return null;

        var matchs = matchRepository.findLastMatchesByTeam(teamName, 4);
        team.setMatchs(matchs);
        return team;
    }

    // パス決定において、完全一致の方が優先されている
    @GetMapping("/team/count")
    public long getTeamCount() {
        return teamRepository.count();
    }
}
