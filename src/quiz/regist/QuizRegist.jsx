import {
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactTabulator,  } from "react-tabulator";
import 'react-tabulator/lib/styles.css';

export default function QuizRegist() {
  const [quiz, setQuiz] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [explanation, setExplanation] = useState("");
  const [answer, setAnswer] = useState("1");
  const [categoryList, setCategoryList] = useState([]);
  const [testRoundList, setTestRoundList] = useState([]);
  const [testRound, setTestRound] = useState(0);
  const [category, setCategory] = useState(0);
  const [quizNo, setQuizNo] = useState(1);
  const [content, setContent] = useState("");
  const handleQuiz = (e) => setQuiz(e.target.value);
  const handleOption1 = (e) => setOption1(e.target.value);
  const handleOption2 = (e) => setOption2(e.target.value);
  const handleOption3 = (e) => setOption3(e.target.value);
  const handleOption4 = (e) => setOption4(e.target.value);
  const handleExplanation = (e) => setExplanation(e.target.value);
  const handleAnswer = (e) => setAnswer(e.target.value);
  const handleCategory = (e) => setCategory(e.target.value);
  const handleTestRound = (e) => setTestRound(e.target.value);
  const handleQuizNo = (e) => setQuizNo(e.target.value);
  const handleContent = (e) => setContent(e.target.value);

  const createQuiz = () => {
    const data = {
      category: category,
      quiz: quiz,
      content: content,
      quiz_no: quizNo,
      test_round: testRound,
      option1: option1,
      option2: option2,
      option3: option3,
      option4: option4,
      explanation: explanation,
      answer: answer,
    };
    console.log(data);
    axios
      .post("/api/quiz/create", data)
      .then((response) => {
        console.log(response);
        if (response.data.code === 500) {
          alert("등록실패");
        } else {
          alert("등록성공");
          setCategory(0);
          setTestRound(0);
          setQuizNo(0);
          setQuiz("");
          setContent("");
          setOption1("");
          setOption2("");
          setOption3("");
          setOption4("");
          setAnswer(0);
          setExplanation("");
        }
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get("/api/quiz/category")
      .then((response) => {
        console.log(response);
        setCategoryList(response.data.category);
        setTestRoundList(response.data.test_round);
        // setCategory(response.data.category[0].id)
        // setTestRound(response.data.test_round[0].id)
      })
      .catch((err) => console.error(err));
  }, []);

  const optionList = [
    { index: "1", value: option1, onChange: handleOption1 },
    { index: "2", value: option2, onChange: handleOption2 },
    { index: "3", value: option3, onChange: handleOption3 },
    { index: "4", value: option4, onChange: handleOption4 },
  ];

  const [columns, setColumns] = useState([
    { title: "Name", field: "name", width: 150 },
    { title: "Age", field: "age", hozAlign: "left", formatter: "progress" },
    { title: "Favourite Color", field: "col" },
    { title: "Date Of Birth", field: "dob", hozAlign: "center" },
    { title: "Rating", field: "rating", hozAlign: "center", formatter: "star" },
    {
      title: "Passed?",
      field: "passed",
      hozAlign: "center",
      formatter: "tickCross",
    },
  ]);
  const [gridData, setGridData] = useState([]);

  return (
    <div>
      {/* <p>문제,보기,답,해설</p> */}
      <Box textAlign={"right"} padding={"20px"}>
        <Link to="/list">
          <Button variant="contained">목록</Button>
        </Link>
      </Box>
      <List>
        <ListItem>
          <FormControl fullWidth>
            <InputLabel id="category">과목</InputLabel>
            <Select
              labelId="category"
              fullWidth
              value={category}
              onChange={handleCategory}
              label="과목"
            >
              {categoryList.map((item, idx) => {
                return <MenuItem value={item.id}>{item.category}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </ListItem>
        <ListItem>
          <FormControl fullWidth>
            <InputLabel id="test_round">회차</InputLabel>
            <Select
              labelId="test_round"
              fullWidth
              value={testRound}
              onChange={handleTestRound}
              label="회차"
            >
              {testRoundList.map((item, idx) => {
                return (
                  <MenuItem value={item.id}>
                    {item.year}년 {item.round}회
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </ListItem>

        <ListItem>
          <TextField
            type="number"
            fullWidth
            placeholder="번호"
            value={quizNo}
            onChange={handleQuizNo}
          />
        </ListItem>
        <ListItem>
          <TextField
            placeholder="문제"
            fullWidth
            onChange={handleQuiz}
            value={quiz}
          />
        </ListItem>
        <ListItem>
          <Box>
            <TextField />
            <TextField />
            <Button variant="outlined">표생성</Button>
          </Box>
        </ListItem>
        <ListItem>
          <ReactTabulator columns={columns}/>
        </ListItem>
        <ListItem>
          <TextField
            multiline
            rows={5}
            placeholder="내용"
            fullWidth
            onChange={handleContent}
            value={content}
          />
        </ListItem>

        {optionList.map((item, idx) => {
          return (
            <>
              <ListItem>
                {/* <Typography>{item.index}번</Typography> */}
                <Radio
                  checked={answer === item.index}
                  onChange={handleAnswer}
                  value={item.index}
                  name="answer"
                />
                <TextField
                  placeholder={`보기${item.index}`}
                  fullWidth
                  onChange={item.onChange}
                  value={item.value}
                />
              </ListItem>
            </>
          );
        })}
        <ListItem>
          <TextField
            placeholder="해설"
            fullWidth
            onChange={handleExplanation}
            value={explanation}
          />
        </ListItem>
        <ListItem>
          <Button variant="contained" onClick={createQuiz}>
            저장
          </Button>
        </ListItem>
      </List>
    </div>
  );
}
