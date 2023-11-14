import { Box, Button, Paper } from "@mui/material";
import React from "react";

const buttonSx = {
  borderRadius: "10px",
  margin: "5px",
  paddingX: "15px",
  paddingY: "3px",
  fontSize : '12px',
};

export default function CategoryButtonGroup({
  selectedCategorySet,
  setSelectedCategorySet,
  categoryList,
}) {
  return (
    <Box
      sx={{
        paddingY: "5px",
        paddingX: "10px",
        overflow: "auto",
        whiteSpace: "nowrap",
      }}
    >
      <Button
        variant={selectedCategorySet.size === 0 ? "contained" : "outlined"}
        sx={buttonSx}
        onClick={() => {
          setSelectedCategorySet(new Set());
        }}
      >
        전체
      </Button>
      {categoryList.map((item, idx) => {
        return (
          <Button
            onKeyDown={(e) => {
              if (e.which === 13) {
                e.preventDefault();
              }
            }}
            onKeyUp={(e) => {
              if (e.which == 13) {
                e.preventDefault();
              }
            }}
            onClick={() => {
              if (selectedCategorySet.delete(item.id)) {
                setSelectedCategorySet(new Set([...selectedCategorySet]));
              } else {
                setSelectedCategorySet(
                  new Set([...selectedCategorySet, item.id])
                );
              }
            }}
            variant={
              selectedCategorySet.has(item.id) ? "contained" : "outlined"
            }
            sx={buttonSx}
          >
            {item.category}
          </Button>
        );
      })}
    </Box>
  );
}
