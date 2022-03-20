# spring-ipl-dashboard-demo

## SpringとReactを用いたDashboardアプリケーション

学習元動画:[IPL Dashboard - New Full Stack Development Series - Java Brains](https://www.youtube.com/watch?v=aL1oP4GJR7M&list=PLqq-6Pq4lTTa8V613TZhGq4o8hSgkMGQ0&index=1)

### 技術スタック
* バックエンド（APIサーバー）
  * Java
  * Spring Boot
  * hsqlデータベース
* フロントエンド
  * React
  * SCSS
* クラウド
  * AWS
    * Elastic Beanstalk
  
### 学習メモ
* リポジトリ構成
  * バックエンドとフロントエンドを同一リポジトリに配置
  * Visual Studio Codeにて、Java、Reactの両方の開発
    * 1つのIDEでフロント／バックの両方を開発できるため、開発体験は非常に良い
    * Java開発体験でいうと、Eclipse（STS）の方が良いと感じた。Visual Studio Codeの方が圧倒的に軽く、この点は非常に満足できる。一方で入力補間やフォルダーの見せ方など、Java開発機能全般についてはEclipseの方が使いやすいと思う。
* バックエンド
  * DB操作はJPAで実施
    * CRUDリポジトリを利用した、CRUD機能の自動生成。開発体験は良いと感じたものの、実際の業務アプリでは複雑なクエリを扱うことが多くなるので、使いどころが難しいと感じた。SQLに慣れ親しんでいる場合、MyBatisを選択肢に上げると思う。
  * Spring Batchによるバッチデータ投入
  * モデルとエンティティを分けずに、共通利用。
    * 分けた場合よりもコードの冗長感は無い。今回は非常にシンプルな機能ゆえに、特段分けなくても問題ないと思った。
* フロントエンド
  * コンポーネント分割はかなりシンプル。PageとComponentのみで、粒度が大き目か。複雑なレイアウトのアプリケーションではないため、このレベルでもOKという感じ。
  * 各JSに1対1でSCSSを対応させる設計。冗長かもしれないが、個人的には分かりやすい作りと感じた。
* Elastic Beanstalk
  * buildしたjarファイルを指定するのみ。インメモリDB利用ということもあって、非常に容易にデプロイできた。
  * Elastic Beanstalkで作成した環境では、nginxがリバースプロキシとして稼働しており、 クエストをAPサーバのポート5000番に転送している。
よって組み込みのWebサーバーを利用する場合、待ち受けポート番号を5000番にする必要がある。
  参照：[Java SE プラットフォームの使用](https://spring.pleiades.io/spring-boot/docs/current/reference/html/deployment.html#deployment.cloud.aws.beanstalk.java-se-platform)
  ```
  server.port=5000
  ```