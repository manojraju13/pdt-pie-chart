import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";

function PdtSelect({disabled=false, filterName="", items=[], onclick=(returnObj:any)=>{}}) {
 
  const [selectedValue, setSelctedValue] = useState('');


  return <FormControl fullWidth disabled={disabled}>
      <InputLabel id="pdtFilterSelect-label">Select {filterName}</InputLabel>
      <Select
        labelId="pdtFilterSelect-label"
        id="pdtFilterSelect"
        name={filterName}
        label={filterName}
        onChange={(event)=>{
          const currentObj = event.target;
          onclick({value: currentObj.value, filterName: currentObj.name});
        }}
      >
        {items.map((item, index)=>{
           return <MenuItem key={`${filterName}-${index}-${item}`} value={item}>{item}</MenuItem>
        })}

      </Select>
    </FormControl>;
}

export default PdtSelect;
