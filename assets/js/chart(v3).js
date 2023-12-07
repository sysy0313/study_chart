/* 차트 기본 설정 */
//font
Chart.defaults.font.family =  "'나눔고딕', 'Arial', sans-serif";

//responsive
Chart.defaults.responsive = true;

// bar style
// Chart.defaults.datasets.bar.categoryPercentage = 1;

// line style
Chart.defaults.datasets.line.borderWidth = 1;
Chart.defaults.datasets.line.tension = 0;
Chart.defaults.datasets.line.fill = false;

// tooltip
Chart.defaults.plugins.tooltip.mode = 'index';
Chart.defaults.plugins.tooltip.intersect = false;
Chart.defaults.plugins.tooltip.backgroundColor = 'rgba(255, 255, 255, 0.5)';
Chart.defaults.plugins.tooltip.borderColor = 'rgba(0, 0, 0, 0.1)';
Chart.defaults.plugins.tooltip.borderWidth = '1';
Chart.defaults.plugins.tooltip.titleColor = '#616d82';
Chart.defaults.plugins.tooltip.bodyColor = '#616d82';
Chart.defaults.plugins.tooltip.bodySize = 12;

function generateLegend(chart) {
    var innerHtml = '<ul class="legend">';
  
    for (var i = 0; i < chart.data.datasets.length; i++) {
        var type = chart.config.type;
        if(type == 'bar') {// 바 차트
            innerHtml += `<li class="li" onClick="legendClick(event, ${i}, this)">
                    <i style="background-color:${chart.data.datasets[i].backgroundColor}"></i>
                    <span>
                    ${chart.data.datasets[i].label}    
                    </span>
                </li>`;
        } else if(type == 'line') {// 라인 차트
            innerHtml += `<li class="li" onClick="legendClick(event, ${i}, this)">
                    <i style="background-color:${chart.data.datasets[i].borderColor}"></i>
                    <span>
                    ${chart.data.datasets[i].label}    
                    </span>
                </li>`;
        }
    }
    innerHtml += '</ul>';
  
    return innerHtml;
  }

  function legendClick(e, index, target){
    var _t = $(target).closest(".chart_wrap").find("canvas").attr("data-array"); //canvas에 data-array를 꼭 작성해줘야 함!!
    var chart = Chart.instances[_t];

    //console.log(_t)
    //console.log(chart)
    var meta = chart.getDatasetMeta(index);
    meta.hidden = !meta.hidden; //토글상태로 만들어주는 역할

    if(meta.hidden){ 
        //console.log('숨김')
        $(target).addClass('hidden')// target 은 li
    }else{
       // console.log('안숨김')
        $(target).removeClass('hidden')
    }

    chart.update();
    
    return


} 


  
