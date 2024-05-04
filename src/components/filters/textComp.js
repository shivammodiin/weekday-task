import { TextField, InputLabel } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { debounce } from "../../utils/debounce";
import { filterSelectedData } from "../../redux/actions";

const TextFieldComponent = ({ name, type }) => {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (value) => {
    dispatch(filterSelectedData({ name, value }));
  };

  const debouncedSearch = debounce(handleSearch, 200);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    debouncedSearch(value);
  };
  return (
    <div>
      <InputLabel id="demo-multiple-chip-label">{type}</InputLabel>
      <TextField
        className="inputFilter"
        id="outlined-search"
        value={searchValue}
        placeholder={`Search by ${type}`}
        onChange={handleChange}
        type="search"
      />
    </div>
  );
};

export default TextFieldComponent;
