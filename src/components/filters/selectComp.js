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
import { filterSelectedData } from "../../redux/actions";
import capitalizeFirstLetter from "../../utils/capitalizeFirstLetter";

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
    dispatch(filterSelectedData({ name, value }));
    setSelectFilterValue(value);
  };

  const handleDelete = (e) => {
    const clonedSelectedFilterValue = [...selectFilterValue];
    const index = clonedSelectedFilterValue.indexOf(e);
    if (index > -1) {
      clonedSelectedFilterValue.splice(index, 1);
    }
    const filterValue = [...clonedSelectedFilterValue];
    dispatch(filterSelectedData({ name, value: filterValue }));
    setSelectFilterValue(filterValue);
  };

  const renderSelectedOptions = (selected) => {
    if (!!multiSelect) {
      return (
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
          {selected.map((value) => (
            <Chip
              key={value}
              onMouseDown={(event) => {
                event.stopPropagation();
              }}
              label={capitalizeFirstLetter(value)}
              onDelete={() => handleDelete(value)}
            />
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
        className="inputFilter"
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
