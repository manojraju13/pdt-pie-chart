import { useEffect, useState } from "react";
import Category from "./interfaces/Category";
import Products from "./interfaces/Product";
import PdtButton from "./PdtButton";
import PdtLink from "./PdtLink";
import PdtSelect from "./PdtSelect";
import combineFilters from "./utils";
import { Box } from "@mui/material";

interface Filters {
  category: [],
  products: [],
  filterName: string,
  items: [],
  onclick: any
}

function PdtFilter({category=[], products=[], onFilterReset=(returnObj:any)=>{}, onFilterSelection=(returnObj:any)=>{}, onclick=(returnObj:any)=>{}}) {
  let [pdtFilter, setPdtFilter] = useState(products.length > 0);
  let [reportBtn, setReportBtn] = useState(products.length == 0);
  
  let [filterValues, setFilerValues] = useState({
    category: "",
    product: ""
  });
 
  
  let onItemSelection = (data:any) => {    
    filterValues = combineFilters(filterValues, data);
    setFilerValues(filterValues);

    if(data.filterName == "category") {
      setPdtFilter(false);
      setReportBtn(false);
      onFilterSelection(data);
    }
  }

  let onBttonSelection = () => {
    setReportBtn(true);
    onclick(filterValues);
  };

  return <>
    <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        
      <h2>Filter</h2>
      <PdtLink text={"Clear"} onclick={onFilterReset}/>
    </Box>
    <PdtSelect filterName="category" items={category} onclick={onItemSelection} />    
    <PdtSelect disabled={pdtFilter} filterName="product" items={products} onclick={onItemSelection} />
    {/* <PdtSelectMultiple disabled={pdtFilter} filterName="product" items={products} onclick={onItemSelection} /> */}
    <PdtButton disabled={reportBtn} name="Run Report" onclick={onBttonSelection} />
</>;
}

export default PdtFilter;
