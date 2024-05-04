import { Autocomplete, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { filterSelectedData } from "../../redux/actions";

export default function SelectComponent({
  filterData,
  multiSelect,
  type,
  name,
}) {
  const dispatch = useDispatch();
  const handleChange = (changedValue) => {
    const value = multiSelect
      ? changedValue?.map((v) => v.value)
      : changedValue?.value;
    dispatch(filterSelectedData({ name, value }));
  };

  return (
    <div>
      <Autocomplete
        className="inputFilter"
        size="medium"
        multiple={!!multiSelect}
        options={filterData}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder={`Select ${type}`}
            style={{
              padding: "0rem",
            }}
          />
        )}
        onChange={(_, value) => {
          handleChange(value);
        }}
      />
    </div>
  );
}
