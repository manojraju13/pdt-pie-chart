import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { useState } from "react";

function PdtSelectMultiple({disabled=false, filterName="", items=[], onclick=(returnObj:any)=>{}}) {
 
  const [selectedItem, setSelectedItem] = useState([]);

  const handleChange = (event: { target: { value: any; }; }) => {
    const {
      target: { value },
    } = event;
    setSelectedItem(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return <FormControl fullWidth disabled={disabled}>
      <InputLabel id="pdtFilterSelectMultiple-label">Select {filterName}</InputLabel>
      <Select
        labelId="pdtFilterSelectMultiple-label"
        id="pdtFilterSelect"
        name={filterName}
        label={filterName}
        multiple
        onChange={(event)=>{
          const currentObj = event.target;
          onclick({value: currentObj.value, filterName: currentObj.name});
        }}
        value={selectedItem}        
        input={<OutlinedInput label="Tag" />}
        renderValue={(selected) => selected.join(', ')}
      >
        {items.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={selectedItem.includes(item)} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}

      </Select>
    </FormControl>;
}

export default PdtSelectMultiple;
