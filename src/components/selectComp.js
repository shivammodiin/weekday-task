import {
  Select,
  Chip,
  InputLabel,
  OutlinedInput,
  MenuItem,
  Box,
} from "@mui/material";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";

export default function SelectComponent({
  filterData,
  multiSelect,
  payAmount,
  type,
  name,
}) {
  const [selectFilterValue, setSelectFilterValue] = useState([]);
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectFilterValue(value);
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const renderSelectedOptions = (selected) => {
    if (!!multiSelect) {
      return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selected.map((value) => (
            <Chip key={value} label={value} />
          ))}
        </Box>
      );
    }

    return `${selected}${payAmount ? "K USD" : ""}`;
  };

  const renderOptions = useMemo(() => {
    if (!!multiSelect) {
      return filterData?.map((value) => (
        <MenuItem key={value} value={value}>
          {capitalizeFirstLetter(value)}
        </MenuItem>
      ));
    }

    return filterData?.map((name) => (
      <MenuItem key={name} value={name}>
        {`${name}${payAmount ? "K USD" : ""}`}
      </MenuItem>
    ));
  }, [filterData, payAmount, multiSelect]);

  return (
    <div>
      <InputLabel id="demo-multiple-chip-label">{type}</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple={!!multiSelect}
        value={selectFilterValue}
        onChange={handleChange}
        input={<OutlinedInput id="select-multiple-chip" />}
        renderValue={(selected) => renderSelectedOptions(selected)}
        style={{ width: "100%" }}
        MenuProps={{
          PaperProps: {
            style: {
              maxHeight: 300,
              width: 250,
            },
          },
        }}
        placeholder="Select"
      >
        {renderOptions}
      </Select>
    </div>
  );
}
