package springsample.dev.ipldashboard.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import springsample.dev.ipldashboard.model.Match;

public interface MatchRepository extends CrudRepository<Match, Long>{
    @Query("select m from Match m where m.team1 = :teamName or m.team2 = :teamName order by m.date desc")
    List<Match> findByTeamName(String teamName, Pageable pageable);

    // @Paramアノテーションにて、JPQLのパラメータと引数のマップ指定可能。パラメータ名と引数名が同一の場合省略可能
    @Query("select m from Match m where (m.team1 = :teamName or m.team2 = :teamName) and date between :startDate and :endDate order by m.date desc")
    List<Match> findByTeamNameAndYear(
        @Param("teamName") String teamName, 
        @Param("startDate") LocalDate startDate, 
        @Param("endDate") LocalDate endDate
    );

    default List<Match> findLastMatchesByTeam(String teamName, int size) {
        var pageable = PageRequest.of(0, 4);
        return findByTeamName(teamName, pageable);
    }
}
