import "./App.scss";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { TeamPage } from "./pages/TeamPage";
import { MatchPage } from "./pages/MatchPage";
import { HomePage } from "./pages/HomePage";

function App() {
  //TODO Routeをネストすると期待するルーティングが行わなれなかった
  //BrowserRouterの場合、リロードするとサーバーにレスポンスが飛ぶため、うまく動作
  //上記の対応として、HashRouterを用いる。
  //BrowerRouterを利用する場合、サーバー側にリダイレクト設定する必要あり
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teams" element={<HomePage />} />
          <Route path="/teams/:teamName" element={<TeamPage />} />
          <Route
            path="/teams/:teamName/matches/:year"
            element={<MatchPage />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
