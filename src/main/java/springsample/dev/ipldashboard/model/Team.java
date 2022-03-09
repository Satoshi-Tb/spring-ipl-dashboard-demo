package springsample.dev.ipldashboard.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedNativeQueries;
import javax.persistence.NamedNativeQuery;
import javax.persistence.Transient;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@NamedNativeQueries({
    @NamedNativeQuery(
        name="countMatch",
        query="select count(*) from team"
    ),
    @NamedNativeQuery(
        name="joinSample",
        query="select t.team_name, t.total_wins from Team t inner join Match m on t.team_name = m.team1"
    ),
})
public class Team {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String teamName;
    private long totalMatches;
    private long totalWins;

    @Transient // 永続化対象外とするフィードに指定
    private List<Match> matchs;

    public Team(String teamName, long totalMatches) {
        this.teamName = teamName;
        this.totalMatches = totalMatches;
    }

    @Override
    public String toString() {
        return "Team [teamName=" + teamName + ", totalMatches=" + totalMatches + ", totalWins=" + totalWins + "]";
    }
    public Team() {
        
    }

}
