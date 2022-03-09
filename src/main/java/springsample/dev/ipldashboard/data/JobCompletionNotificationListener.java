package springsample.dev.ipldashboard.data;

import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.math.BigInteger;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import springsample.dev.ipldashboard.model.Team;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

  private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

  private final JdbcTemplate jdbcTemplate;
  private final EntityManager entityManager;

  // container-managed EntityManagerを利用。
  // @PersistenceContextでも同様。
  // コンテナがトランザクションの開始、コミット、ロールバックを担当する。
  // コンテナ（JakartaEEやSpring）はここで単純なEntityManagerの代わりに特別なプロキシを注入する。
  // 例えばSpringは、SharedEntityManagerCreator型のプロキシを注入する。
  // 注入されたEntityManagerを使用するたびに、このプロキシは既存のEntityManagerを再利用するか、
  // 新しいEntityManagerを作成する。
  // いずれにせよ、コンテナは、各 EntityManager が 1 つのスレッドに限定されることを保証する。
  @Autowired
  public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate, EntityManager entityManager) {
    this.jdbcTemplate = jdbcTemplate;
    this.entityManager = entityManager;
  }

  @Override
  @Transactional
  public void afterJob(JobExecution jobExecution) {
    if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
      log.info("!!! JOB FINISHED! Time to verify the results");

      jdbcTemplate
        .query(
          "SELECT count(*) date FROM match",
          (rs, row) -> "match: " + rs.getString(1) + " items loaded."
        )
        .forEach(str -> log.info(str));

      createTeamData();
    }
  }

  private void createTeamData() {
    Map<String, Team> teamData = new HashMap<String, Team>();

    // team1の試合数を取得
    entityManager
      .createQuery("select m.team1, count(*) from Match m group by m.team1", Object[].class) // JPQL
      .getResultList()
      .stream()
      .map(e -> new Team((String) e[0], (long) e[1]))
      .forEach(team -> teamData.put(team.getTeamName(), team));

    // team2の試合数を加算
    var q2 = entityManager
      .createNativeQuery("select m.team2, count(*) from Match m group by m.team2"); // SQL
    
     // 行オブジェクト=String, BigIntegerのObject配列
     // 型のマッピングはSQLの型と紐づけていると思われる
     // 型の扱いはJPQLを使った方が圧倒的にやりやすい。
     // 一方複雑なクエリはNativeSQLの方がやりやすい。
    List<Object[]> result2 = q2.getResultList(); 

    result2
      .stream()
      .forEach(e -> {
          //TODO team2が初出の可能性は無いのか
          Team team = teamData.get((String) e[0]);
          team.setTotalMatches(team.getTotalMatches() + ((BigInteger) e[1]).longValue());
      });

    // teamの勝利数を取得
    entityManager
      .createQuery("select m.matchWinner, count(*) from Match m group by m.matchWinner", Object[].class)
      .getResultList()
      .stream()
      .forEach(e -> {
          Team team = teamData.get((String) e[0]);
          // team名が NA以外の場合
          if (team != null) team.setTotalWins((long) e[1]);
      });

      // teamデータをDBに保存
      teamData.values().forEach(team -> entityManager.persist(team));

      // named queryを利用（内容はSQL）
      // クエリの定義はエンティティクラスに@NamedQuery、または@NamedNativeQueryに定義
      // クエリの定義と使用箇所が離れると、select結果が分かりにくい
      var matchCount = (BigInteger) entityManager
        .createNamedQuery("countMatch")  // createNamedQuery("countMatch", BigInteger.class) だとエラー。「result type is not compatible」となる
        .getSingleResult();

      // 結合SQLのサンプル
      var result3 = (List<Object[]>) entityManager
        .createNamedQuery("joinSample")
        .getResultList();

      log.info("!!! Create Team FINISHED!");
      log.info("team: " + matchCount.longValue() + " items loaded.");
  }
}