import { Route, Routes } from "react-router-dom";
import QuizSolve from "./quiz/solve/QuizSolve";
import QuizRegist from "./quiz/regist/QuizRegist";
import QuizList from "./quiz/list/QuizList";
import QuizDetail from "./quiz/detail/QuizDetail";
import MultiRegist from "./quiz/regist/MultiRegist";
import QuizMain from "./quiz/main/QuizMain";


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<QuizMain />} />
        <Route path="/solve" element={<QuizSolve />} />
        <Route path="/regist" element={<QuizRegist />} />
        <Route path="/list" element={<QuizList />} />
        <Route path="/detail" element={<QuizDetail />} />
        <Route path="/regist/multiple" element={<MultiRegist/>}/>
      </Routes>
    </div>
  );
}

export default App;
