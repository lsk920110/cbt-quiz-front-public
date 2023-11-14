import { ExpandMoreOutlined } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  ButtonBase,
  Divider,
  List,
  ListItemButton,
  Paper,
  Skeleton,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import service from "../../utils/requestAxios";
import CategoryButtonGroup from "./component/CategoryButtonGroup";
import { useLocation, useNavigate } from "react-router-dom";

export default function QuizSolve() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [selectedCategorySet, setSelectedCategorySet] = useState(location.state.category === 'all' ? new Set() : new Set([location.state.category]));
  //   solve grade
  const [state, setState] = useState("solve");
  const [selectedOption, setSelectedOption] = useState(0);
  const [correct, setCorrect] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [id, setId] = useState(0);
  const [quiz_no, setQuiz_no] = useState(0);
  const [quiz, setQuiz] = useState("");
  const [content, setContent] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answer, setAnswer] = useState("");
  const [imgPath, setImgPath] = useState("");
  const [explanation, setExplanation] = useState("");
  const [category, setCategory] = useState("");
  const [testRound, setTestRound] = useState("");
  const [year, setYear] = useState(0);
  const [round, setRound] = useState(0);
  const [quizInfo, setQuizInfo] = useState({
    id: 0,
    quiz_no: "",
    quiz: "",
    content: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    answer: "",
    imgPath: "",
    explanation: "",
    category: "",
    test_round: "",
    year: 0,
    round: 0,
  });
  const handleOption = (option) => {
    setSelectedOption(option);
  };

  const answerExtract = (answer) => {
    const num = ["①", "②", "③", "④"];

    switch (answer) {
      case 1:
        return num[0] + " " + option1;
      case 2:
        return num[1] + " " + option2;
      case 3:
        return num[2] + " " + option3;
      case 4:
        return num[3] + " " + option4;

      default:
        break;
    }
  };

  const quizCall = () => {
    // console.log(location.)
    console.log(selectedCategorySet);
    setLoading(true);
    axios
      .get(
        `/api/quiz/random`,
        {
          params: { category: Array.from(selectedCategorySet) },
        },
        {
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      )
      .then((res) => {
        // console.log(res.data);

        if (res.data.count === 0) {
          alert("문제가 없습니다");
          // window.location.reload();
          // navigate('/solve',{state : {category : 'all'}})
          navigate(-1)
          

        } else {
          const quizInfo = res.data;
          setLoading(false);
          setQuiz(quizInfo.quiz);
          setContent(quizInfo.content);
          setCategory(quizInfo.category);
          setOption1(quizInfo.option1);
          setOption2(quizInfo.option2);
          setOption3(quizInfo.option3);
          setOption4(quizInfo.option4);
          setExplanation(quizInfo.explanation);
          setAnswer(quizInfo.answer);
          setId(quizInfo.id);
          setImgPath(quizInfo.imgPath);
          setQuiz_no(quizInfo.quiz_no);
          setYear(quizInfo.year);
          setRound(quizInfo.round);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (state === "solve") {
      quizCall();
    } else {
      setCorrect(parseInt(answer) === parseInt(selectedOption));
    }
  }, [state]);

  useEffect(() => {
    console.log(location)
    // setCategoryList(new state(location.state.category === null ? [] : [location.state.category]))
    axios.get("/api/quiz/category").then((res) => {
      setCategoryList(res.data.category);
    });
    // service.get('/api/quiz/category')
    // .then(response=>console.log(response))
  }, []);

  //번호누르는거
  const typeNumber = (e) => {
    if (state !== "solve") return;
    if (e.key === "1" || e.key === "2" || e.key === "3" || e.key === "4") {
      handleOption(parseInt(e.key));
      // alert(quizInfo.answer + "  " + e.key);
      setCorrect(parseInt(quizInfo.answer) === parseInt(selectedOption));
      setState("grade");
    }
  };

  //채점하기
  const gradeQuiz = (e) => {
    if (state !== "solve") return;
    // if (selectedOption === 0) handleClickOpen()
    if (e.shiftKey && e.key === "Enter") {
      setState("grade");
      setCorrect(quizInfo.answer === selectedOption);
    }
  };

  //다음문제
  const nextQuiz = (e) => {
    if (e.key === "Enter" && state === "grade") {
      setCorrect(false);
      setState("solve");
      setSelectedOption(0);
    }
  };
  useEffect(() => {
    window.addEventListener("keyup", typeNumber);
    // window.addEventListener("keyup", gradeQuiz);
    window.addEventListener("keyup", nextQuiz);

    return () => {
      window.removeEventListener("keyup", typeNumber);
      // window.removeEventListener("keyup", gradeQuiz);
      window.removeEventListener("keyup", nextQuiz);
    };
  }, [state, selectedOption, correct, typeNumber, nextQuiz]);

  return (
    <>
      <CategoryButtonGroup
        selectedCategorySet={selectedCategorySet}
        setSelectedCategorySet={setSelectedCategorySet}
        categoryList={categoryList}
      />
      <Box sx={{ padding: "5px" }}>
        {loading ? (
          <Skeleton
            variant="text"
            width={"50%"}
            sx={{ margin: "15px" }}
            height={"30px"}
          />
        ) : (
          <>
            <Box marginX={"15px"} display={"flex"}>
              <Typography marginRight={"5px"}>
              {
                year !== 0 ? 
                `${year}년 ${round}회` : '일반문제'
              }
              </Typography>
              <Typography>{category}</Typography>
            </Box>
            <Box display={"flex"} marginX={"15px"} marginY={"5px"}>
              <Typography
                color={"cornflowerblue"}
                fontWeight={"bold"}
                fontSize={"1.2rem"}
                marginRight={"15px"}
              >
                {quiz_no}.
              </Typography>
              <Typography
                color={"#333"}
                fontWeight={"normal"}
                fontSize={"1.2rem"}
              >
                {quiz}
              </Typography>
            </Box>

            {content === "" || content === null ? null : (
              <Box margin={"15px"} padding={"15px"} border={"1px solid black"}>
                <Typography whiteSpace={"pre-wrap"}>{content}</Typography>
              </Box>
            )}
          </>
        )}
        <List>
          <OptionGroup
            selectedOption={selectedOption}
            setSelectedOption={setSelectedOption}
            option1={option1}
            option2={option2}
            option3={option3}
            option4={option4}
            loading={loading}
            setState={setState}
          />
        </List>

        <Box padding={"10px"}>
          {state === "solve" ? null : (
            <>
              <Paper sx={{ padding: "12px" }}>
                <Typography
                  color={correct ? "blue" : "red"}
                  marginRight={"15px"}
                  fontSize={"20px"}
                >
                  {correct ? "정답입니다" : "오답입니다"} <br></br>
                </Typography>
                {correct ? null : (
                  <Typography
                    marginRight={"15px"}
                    fontSize={"18px"}
                    color={"#555555"}
                  >
                    정답 : {answerExtract(answer)}
                  </Typography>
                )}
                <Divider />
                <Typography marginTop={"15px"} marginBottom={"30px"}>
                  {explanation}
                </Typography>
                {state === "grade" ? (
                  <Button
                    sx={{ height: "40px", textTransform: "capitalize" }}
                    fullWidth
                    // variant={state === "solve" ? "contained" : "outlined"}
                    variant="contained"
                    onClick={() => {
                      if (state === "solve") {
                        if (selectedOption === 0) {
                          // handleClickOpen();
                        } else {
                          setCorrect(quizInfo.answer === selectedOption);
                          setState("grade");
                        }
                      }
                      if (state === "grade") {
                        setCorrect(false);
                        setState("solve");
                        setSelectedOption(0);
                      }
                    }}
                  >
                    {state === "solve"
                      ? "채점하기(Shift + Enter)"
                      : "다음문제 enter"}
                  </Button>
                ) : null}
              </Paper>
            </>
          )}
        </Box>
        {/* <Box paddingX={"15px"} paddingY={"5px"}>
          <Explanation explanation={explanation} state={state} />
        </Box> */}
      </Box>
    </>
  );
}

function OptionGroup({
  selectedOption,
  setSelectedOption,
  option1,
  option2,
  option3,
  option4,
  loading,
  setState,
}) {
  const outlined = ["①", "②", "③", "④"];

  return (
    <>
      {[1, 2, 3, 4].map((item, idx) => {
        return (
          <>
            <ListItemButton
              sx={{
                color: `${selectedOption === item ? "white" : "black"}`,
              }}
              onClick={() => {
                setSelectedOption(item);
                setState("grade");
              }}
            >
              {loading ? (
                <Skeleton
                  variant="text"
                  width={"50%"}
                  sx={{ margin: "10px" }}
                  height={"30px"}
                />
              ) : (
                <Box display={"flex"}>
                  <Typography
                    marginRight={"15px"}
                    fontSize={"18px"}
                    color={
                      selectedOption === item ? "rgb(25,118,210)" : "#555555"
                    }
                  >
                    {outlined[idx]}
                  </Typography>
                  <Typography
                    // component={"span"}
                    textAlign={"left"}
                    fontSize={"18px"}
                    // color={"#555555"}
                    color={
                      selectedOption === item ? "rgb(25,118,210)" : "#555555"
                    }
                  >
                    {item === 1 ? option1 : null}
                    {item === 2 ? option2 : null}
                    {item === 3 ? option3 : null}
                    {item === 4 ? option4 : null}
                  </Typography>
                </Box>
              )}
            </ListItemButton>
          </>
        );
      })}
    </>
  );
}
