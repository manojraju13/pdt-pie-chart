function combineFilters(selectedObj, curentFilter) {

    if(typeof selectedObj[curentFilter.filterName] == "undefined") {
        selectedObj[curentFilter.filterName] = "";
    }
    selectedObj[curentFilter.filterName] = curentFilter.value;

    return selectedObj;
}


function getCategoryChartData(curObj) {
    return curObj.map((item) => {
        item["y"]=100;

        return item;
    });
}

function getProductChartData(curObj) {
    return curObj.map((item) => {
        return {name: item.title, y: item.price};
    });
}

function getCategoryFilter(filterObj, key){
    return filterObj.map((item) => {
        return item[key];
    });
}

export default combineFilters
export {getCategoryChartData, getCategoryFilter, getProductChartData}