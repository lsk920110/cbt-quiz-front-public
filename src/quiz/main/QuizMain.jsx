import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const buttonStyle = {
  margin: "10px",
  paddingX: "10px",
  paddingY: "20px",
  fontSize: "20px",
};

export default function QuizMain() {
  const [list, setList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategorySet, setSelectedCategorySet] = useState(new Set());
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`/api/quiz/category`)
      .then((response) => {
        setCategoryList(response.data.category);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <Container maxWidth={"xs"} sx={{ marginTop: "100px" }}>
      <Box
      // marginX={"800px"} marginTop={"100px"}
      >
        <Button
          onClick={() => {
            navigate("/solve", { state: { category: "all" } });
          }}
          variant="contained"
          fullWidth
          sx={buttonStyle}
        >
          전체
        </Button>
        {categoryList.map((item, idx) => {
          return (
            // <Link to={"/solve"} state={{category : item.id}}>
            <Button
              variant="contained"
              fullWidth
              sx={buttonStyle}
              onClick={() => {
                navigate("/solve", { state: { category: item.id } });
              }}
            >
              {item.category}
            </Button>
            // </Link>
          );
        })}

        {/* <Button
          variant="outlined"
          fullWidth
          sx={{
            margin: "10px",
            paddingX: "10px",
            paddingY: "20px",
            fontSize: "20px",
          }}
        >
          문제풀기
        </Button> */}
      </Box>
    </Container>
  );
}
