package springsample.dev.ipldashboard.repository;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import springsample.dev.ipldashboard.model.Match;

public interface MatchRepository extends CrudRepository<Match, Long>{
    @Query("select m from Match m where m.team1 = :teamName or m.team2 = :teamName order by m.date desc")
    List<Match> findByTeamName(String teamName, Pageable pageable);

    default List<Match> findLastMatchesByTeam(String teamName, int size) {
        var pageable = PageRequest.of(0, 4);
        return findByTeamName(teamName, pageable);
    }
}
