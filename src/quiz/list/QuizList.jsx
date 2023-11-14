import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryButtonGroup from "../solve/component/CategoryButtonGroup";

export default function QuizList() {
  const [list, setList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategorySet, setSelectedCategorySet] = useState(new Set());
  const listCall = () => {
    const data = {
      params: { category: Array.from(selectedCategorySet) },
    };
    axios
      .get("/api/quiz/list", data)
      .then((response) => setList(response.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    axios
      .get(`/api/quiz/category`)
      .then((response) => {
        setCategoryList(response.data.category);
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    listCall();
  }, [selectedCategorySet]);
  return (
    <div>
      <Box textAlign={"right"} padding={"20px"}>
        <Link to={"/regist"}>
          <Button variant="contained">등록</Button>
        </Link>
      </Box>
      <Box>
        <CategoryButtonGroup
          selectedCategorySet={selectedCategorySet}
          setSelectedCategorySet={setSelectedCategorySet}
          categoryList={categoryList}
        />
      </Box>
      <Box padding={"15px"}>
        <Typography>건수 : {list.length}</Typography>
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>id</TableCell>
            <TableCell>문제</TableCell>
            <TableCell>과목</TableCell>
            <TableCell>회차</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((item, idx) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  <Link
                    to={"/detail"}
                    state={{ id: item.id }}
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {item.quiz}
                  </Link>
                </TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>
                  {item.year}년 {item.round}회
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
