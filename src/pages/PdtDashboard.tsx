import React, { useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import { Box, CircularProgress, Grid, Grid2, Skeleton } from '@mui/material';
import PdtFilter from '../components/PdtFilter';
import PdtChart from '../components/PdtChart';
import getProductData, { getProductFilters } from '../utils/api';
import Category from '../components/interfaces/Category';
import axios from 'axios';
import { getCategoryChartData, getCategoryFilter, getProductChartData } from '../components/utils';
import Products from '../components/interfaces/Products';

//import './App.css';
const PDT_API = "https://dummyjson.com/products";
interface ApiResponse {
  data: Category[]
  status: number
  message?: string
}

async function getProductCategories() {
  try {
    const {data}  = await axios.get("https://dummyjson.com/products/categories");
    return data;
  } catch (error: any) {
    return {
      data: [],
      message: error?.message,
      status: error?.response?.status
    }
  }
}

interface Filters {
  category: [],
  products: [],
  filterName: string, 
  items:[], 
  onclick: any
}

function PdtDashboard() {
  let [loadChart, setLoadChart] = useState(false);
  let [catData, setCatData] = useState<Category[]>([]);
  let [pdtData, setPdtData] = useState<Products|any>();
  let [chartData, setChartData] = useState([]);
  let [filters, setFilters] = useState({
      category: [],
      products: [],
  });
  let [chart, setChart] = useState({
    title: "List of Categories",
    showDataLabel: false,
    barToolTipName: "Category"
  });
  

  let onFilterSelection = (currentFilter:any) => {
    if(currentFilter.filterName == "category") {
      console.log("Dashboard, onFilterSelection ", currentFilter);
      fetchAprProducts(currentFilter.value);
    }
  };

  const fetchAPI = async () => {
    await axios.get<Category[]>("https://dummyjson.com/products/categories")
    .then((response) => {
        setCatData(response.data);
        setChartData(getCategoryChartData(response.data));

        setFilters({
          ...filters,
          category : getCategoryFilter(response.data, "name"),
          products: []
        })          
    });
  };

  const fetchAprProducts = async (categoryName:string) => {
    await axios.get<Products>("https://dummyjson.com/products/category/"+categoryName)
    .then((response) => {
        setPdtData(response.data);
        setFilters({
          ...filters,
          products : getCategoryFilter(response.data.products, "title")
        })          
    });  
  };

  let triggerChartLoading = ()=> {
    setTimeout(()=>{
      setLoadChart(true);
    }, 3000)
  }

  let onRunReport = (currentFilter:any) => {
    setLoadChart(false);
    triggerChartLoading();
    console.log("Dashboard onRunReport , ", currentFilter);

    if(currentFilter.product == "") {
      fetchAprProducts(currentFilter.category);

    }
    else {
      setChart({
        ...chart,
        title: "List of Products",
        showDataLabel: true,
        barToolTipName: "Product"
      })
      setChartData(getProductChartData(pdtData?.products));
    }
 
  }; 

  let onfilterReset = (currentFilter:any) => { 
    triggerChartLoading();
    setCatData([]);
    setPdtData({});
    setFilters({
      category: [],
      products: []
    })
    setChart({
      title: "List of Categories",
      showDataLabel: false,
      barToolTipName: "Category"
    })
    fetchAPI();
  };

  useEffect(() => {
    triggerChartLoading();
    fetchAPI();
  }, []);

  return (     
    <>
      <Grid2 container spacing={2} columns={16}>
        <Grid2 size={4}>
          <Box  className="filterContainer" sx={{
              my: 4,
              gap: 4,
              p: 2,
              border: '2px solid grey',
            }}>
            <PdtFilter  {...filters} onclick={onRunReport} onFilterReset={onfilterReset} onFilterSelection={onFilterSelection} />
          </Box>
        </Grid2>
        <Grid2 size={12}>
          <Box className="filterContainer" sx={{
              my: 4,
              gap: 4,
              p: 2,
            }}>
              {loadChart ? 
            <PdtChart {...chart} barData={chartData}/>
            : <Box sx={{ display: 'flex', justifyContent: "center", margin: "auto" }}>
              <CircularProgress />
            </Box>}
          </Box>
        </Grid2>
      </Grid2>
    </>
  );
}

export default PdtDashboard;
