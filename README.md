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
    * Java開発体験でいうと、Eclipse（STS）の方が良いと感じた。Visual Studio Codeの方が圧倒的に軽く、この点は非常に満足できる。一方で入力補間やフォルダーの見せ方など、Java開発機能についてはEclipseの方が良かった。
* バックエンド
  * DB操作はJPAで実施
    * CRUDリポジトリを利用した、CRUD機能の自動生成。開発体験は良いと感じたものの、実際の業務アプリでは複雑なクエリを扱うことが多くなるので、使いどころが難しいかも。
  * Spring Batchによるバッチデータ投入
  * モデルとエンティティを分けずに、共通利用。
    * 分けるよりも楽。今回は非常にシンプルな機能だったので、特段分けなくても問題ないと思った。
* フロントエンド
  * コンポーネント分割はかなりシンプル。PageとComponentのみで、粒度が大き目か。複雑なレイアウトのアプリケーションではないため、このレベルでもOKという感じ。
  * 各JSに1対1でSCSSを対応させる設計。冗長かもしれないが、個人的には分かりやすい作りと感じた。
