import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function PdtChart({title = "", showDataLabel = false, barToolTipName = "", barData =[]}) { 
  let options = {
    chart: {
        type: 'column'
    },
    title: {
        align: 'left',
        text: title
    },
    accessibility: {
        announceNewData: {
            enabled: true
        }
    },
    xAxis: {
        type: 'category'
    },
    yAxis: {
        title: {
            text: ''
        }

    },
    legend: {
        enabled: false
    },
    plotOptions: {
        series: {
            borderWidth: 0,
            dataLabels: {
                enabled: showDataLabel,
                format: '{point.y:.1f}%'
            }
        }
    },
    series: [
        {
            name: barToolTipName,
            colorByPoint: false,
            data: barData
        }
    ]
    
};
  return <><HighchartsReact highcharts={Highcharts} options={options} /></>;
}

export default PdtChart;
