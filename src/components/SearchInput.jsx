import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

function SearchInput({ units, setUnits, setQuery }) {
  const [city, setCity] = useState(``);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (city !== "") setQuery({ q: city });
  };
  return (
    <Paper
      onSubmit={handleSubmit}
      className="searcInputContainer"
      component="form"
      sx={{ p: "2px 4px" }}
    >
      <InputBase
        value={city}
        onChange={(e) => setCity(e.currentTarget.value)}
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search City"
      />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default SearchInput;
