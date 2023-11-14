import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function MultiRegist() {
  const [categoryList, setCategoryList] = useState([]);
  const [testRoundList, setTestRoundList] = useState([]);

  useEffect(() => {
    axios.get(`/api/quiz/category`).then((response) => {
      setCategoryList(response.data.category);
      setTestRoundList(response.data.test_round);
    });
  }, []);

  return (
    <>
      <Box display={"flex"} padding={'15px'}>
        <FormControl sx={{width : '15%' ,marginRight : '15px'}}>
          <InputLabel id="category">과목</InputLabel>
          <Select
            labelId="category"
            fullWidth
            //   value={category}
            //   onChange={handleCategory}
            label="과목"
          >
            {categoryList.map((item, idx) => {
              return <MenuItem value={item.id}>{item.category}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl sx={{width : '15%'}}>
          <InputLabel id="test_round">회차</InputLabel>
          <Select
            labelId="test_round"
            fullWidth
            //   value={testRound}
            //   onChange={handleTestRound}
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
      </Box>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>quiz</TableCell>
            <TableCell>content</TableCell>
            <TableCell>option1</TableCell>
            <TableCell>option2</TableCell>
            <TableCell>option3</TableCell>
            <TableCell>option4</TableCell>
            <TableCell>answer</TableCell>
            <TableCell>explanation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <QuizRegistRow />
        </TableBody>
      </Table>
      <Button fullWidth variant="contained">
        form 추가
      </Button>
    </>
  );
}

function QuizRegistRow() {
  return (
    <TableRow>
      <TableCell>
        <TextareaAutosize multiline type="number" fullWidth />
      </TableCell>
      <TableCell>
        <TextareaAutosize fullWidth />
      </TableCell>
      <TableCell>
        <TextField fullWidth />
      </TableCell>
      <TableCell>
        <TextField fullWidth />
      </TableCell>
      <TableCell>
        <TextField fullWidth />
      </TableCell>
      <TableCell>
        <TextField fullWidth />
      </TableCell>
      <TableCell>
        <TextField fullWidth />
      </TableCell>
      <TableCell>
        <Select fullWidth defaultValue={1}>
          <MenuItem defaultChecked value={1}>
            1
          </MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
        </Select>
      </TableCell>
      <TableCell>
        <TextField fullWidth />
      </TableCell>
    </TableRow>
  );
}
