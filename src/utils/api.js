import axios from "axios";
const PDT_API_PATH = "https://dummyjson.com/products";
//https://dummyjson.com/products/categories
//https://dummyjson.com/products/category/Beauty


async function getProductData() {
    const response = await fetch(PDT_API_PATH + "?limit=100");

    if(response && response.ok) {
        return response.json();
    }
    else {
        console.error("API Error ", response);
    }
};


function getProductFilters(pdtData, filterData) {
    let tempKey = {};
    let filters = {
        category: [],
        products: [],
    };
    let isFilterAvailable = isFiltersAavailable(filterData);
    
    for(let i = 0; i < pdtData.products.length; i++) {
        if(typeof tempKey[pdtData.products[i].category] == "undefined") {
            tempKey[pdtData.products[i].category] = "";
            filters.category.push(pdtData.products[i].category);
        }

        if(isFilterAvailable) {
            if(getFilteredProduct(filterData, pdtData.products[i])) {
                filters.products.push(pdtData.products[i].title);
            }
        }
        else {
            filters.products.push(pdtData.products[i].title);
        }
    }
    return filters;
}

function isFiltersAavailable(filterData) {
    let isFilter = false;

    for (const key in filterData) {
        isFilter = true;        
    }

    return isFilter;
}

function getFilteredProduct(filterData, currentItem) {
    let keyCount = 0;
    let satisfyCount = 0;

    for (const key in filterData) {        
        if(filterData[key] == currentItem[key]) {
            satisfyCount++;
        }
        keyCount++;
    }

    return keyCount == satisfyCount ? true : false;
}


export default getProductData;
export {getProductFilters};