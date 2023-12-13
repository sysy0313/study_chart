// color
const red = '#ff5370';
const blue = '#89ddff';
const yellow = '#ffcb6b';
const green = '#8ff87e';
const purple = '#c792ea';
const mint = '#c1ffea';
const gray = '#555';
const white = '#efefef'

const tooltip_smile = new Image(16,16);
tooltip_smile.src = '../assets/images/smile.png'

const tooltip_sun = new Image();
tooltip_sun.src = '../assets/images/weather/sun.png';
const tooltip_fog = new Image();
tooltip_fog.src = '../assets/images/weather/fog.png';
const tooltip_rain = new Image();
tooltip_rain.src = '../assets/images/weather/rain.png';
const tooltip_snow = new Image();
tooltip_snow.src = '../assets/images/weather/snow.png';

//lineChart1
const lineChart1Config = {
    type:'line',
    data:{
        labels:['12.04/맑음', '12.05/흐림', '12.06/비', '12.07/눈', '12.08/맑음'],
        datasets:[
            {
                labels:['12.04/맑음', '12.05/흐림', '12.06/비', '12.07/눈', '12.08/맑음'],
                data:[8,4,7,6,2],
                borderColor:green,
                borderWidth:2,
                pointRadius:4,
                pointBackgroundColor:green,
            }
        ]
    },
    options:{
        responsive:true,
        maintainAspectRatio:false,
        plugins:{
            legend:false,
            tooltip:{
                enabled:true,
                interaction:true,
                mode:'index',
                backgroundColor:'rgba(0,0,0,0.7)',
                titleColor:white,
                titleAlign:'center',
                bodyColor:white,
                //footerAlign:'center',
                footerFont:{
                    weight:'normal'
                },
                borderColor:green,
                borderWidth:2,
                usePointStyle:true,
                callbacks:{
                    label:function(context){
                        const value = context.dataset.data[context.dataIndex]
                        const total = context.dataset.data.reduce((sum, value) => sum + value, 0)
                        return ` 방문자수: ${value}`
                        
                    },
                    /* labelColor:function(context){
                        return{
                            borderRadius:5,
                            backgroundColor:context.dataset.borderColor,
                        }
                    }, */

                    /* footer: (context) => {
                        const lineArray = ['line1', 'line2', 'line3']
                        const value = context[0].dataset.data[context[0].dataIndex] //footer 에서는 context 에 index를 붙여야함
                        console.log(value)
                        return lineArray
                    } */
                    footer:function(context){
                        const lineArray = ['line1번', 'line2번', 'line3번']
                        const value = context[0].dataset.data[context[0].dataIndex]
                        const total = context[0].dataset.data.reduce((sum, value) => sum + value, 0);
                        const percentage = Math.round(value / total * 100)
                        const fArray = ['전체 :' + total, `(${percentage}%)`]
                        //return `전체: ${total} / (${percentage}%)`
                        return fArray
                    },
                    title:function(context){
                        const label = context[0].dataset.labels[context[0].dataIndex]
                        
                        let w_sun = document.createElement('img')
                        w_sun.src = "../assets/images/weather/sun.png"
                        w_sun.style.width = '16px'
                        w_sun.style.height = '16px'

                        const tooltipContent = document.createElement('div');
                        tooltipContent.appendChild(document.createTextNode(label));
                        tooltipContent.appendChild(w_sun)
                        return label   
                    },
                    labelPointStyle:(context) =>{
                        const weatherState = context.dataset.labels[context.dataIndex].split('/')[1]
                        const stateImg = new Image();
                        if(weatherState === '맑음'){
                            stateImg.src = '../assets/images/weather/sun.png'
                        }else if(weatherState === '흐림'){
                            stateImg.src = '../assets/images/weather/fog.png'
                        }else if(weatherState === '비'){
                            stateImg.src = '../assets/images/weather/rain.png'
                        }else if(weatherState === '눈'){
                            stateImg.src = '../assets/images/weather/snow.png'
                        }
                    return{
                    pointStyle:stateImg
                    }
                        
                    }
                }
            }
        },
        layout:{
            padding:{
                top:20, bottom:0, left:-5, right:20,
            }
        },
        scales:{
            x:{
                grid:{
                    display:false,
                    drawOnChartArea:false,
                    border:false,
                },
                ticks:{
                    font:{
                        size:12,
                        weight:'bold'
                    },
                    color:white,
                    padding:10
                }
            },
            y:{
                grid:{
                    drawBorder:false,
                    color:gray,
                    lineWidth:1 //grid 굵기
                },
                ticks:{
                    stepSize:2,
                    color:white,
                    padding:15
                },
                suggestedMin:0,
                suggestedMax:10,
            }
        }
    }
}

let lineChart1 = document.querySelector('#lineChart1');
if(lineChart1){
    const ctx = lineChart1.getContext('2d');
    lineChart1 = new Chart(ctx, lineChart1Config)
}

//---------------------------------------------------------------------------------------------------
//lineChart2
const i_sun = "<img src='../assets/images/weather/sun.png' style='margin-left:5px'>"
const i_fog = "<img src='../assets/images/weather/fog.png' style='margin-left:5px'>"
const i_snow = "<img src='../assets/images/weather/snow.png'style='margin-left:5px'>"
const i_rain = "<img src='../assets/images/weather/rain.png' style='margin-left:5px'>"

const lineChart2Config = {
    type:'line',
    data:{
        labels:['12.04/맑음', '12.05/흐림', '12.06/비', '12.07/눈', '12.08/맑음'],
        datasets:[
            {
                labels:['12.04/맑음', '12.05/흐림', '12.06/비', '12.07/눈', '12.08/맑음'],
                data:[5,7,2,2,8],
                borderColor:green,
                pointBackgroundColor:green,
                borderWidth:2,
                pointRadius:4,
            }
        ]
    },
    options:{
        maintainAspectRatio:false,
        responsive:true,
        plugins:{
            legend:false,
            //customTooltip:customTooltipPlugin1,
            tooltip:{
                enabled:false,
                
                external: function(context) {
                    // Tooltip Element
                    var tooltipEl = document.getElementById('chartjs-tooltip');
                    
                    const lineChart2Div = document.querySelector('#lineChart2').parentNode;

                    

                    // Create element on first render
                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.id = 'chartjs-tooltip';
                        tooltipEl.innerHTML = '<table></table>';
                        lineChart2Div.appendChild(tooltipEl);
                    }

                    // Hide if no tooltip
                    var tooltipModel = context.tooltip;
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }

                    // Set caret Position
                    tooltipEl.classList.remove('above', 'below', 'no-transform');
                    if (tooltipModel.yAlign) {
                        tooltipEl.classList.add(tooltipModel.yAlign);
                    } else {
                        tooltipEl.classList.add('no-transform');
                    }

                    function getBody(bodyItem) {
                        return bodyItem.lines;
                    }

                    // Set Text
                    if (tooltipModel.body) {
                        var titleLines = tooltipModel.title || [];
                        var bodyLines = tooltipModel.body.map(getBody);


                        var innerHtml = '<thead>';

                        /* titleLines.forEach(function(title) {
                            innerHtml += '<tr><th>' + title  + '</th></tr>';
                        }); */


                        // label(title) 에 따라 이미지 변경
                        titleLines.forEach(function(title){
                            const weather = title.split('/')[1]
                            if(weather === '맑음'){
                                innerHtml += '<tr><th style="display:flex">' + title + i_sun + '</th></tr>';
                            }else if(weather === '흐림'){
                                innerHtml += '<tr><th style="display:flex">' + title + i_fog + '</th></tr>';
                            }else if(weather === '비'){
                                innerHtml += '<tr><th style="display:flex">' + title + i_rain + '</th></tr>';
                            }else if(weather === '눈'){
                                innerHtml += '<tr><th style="display:flex">' + title + i_snow + '</th></tr>';
                            }else{
                                innerHtml += '<tr><th style="display:flex">' + title + '</th></tr>';
                            }
                        })

                        innerHtml += '</thead><tbody>';


                        bodyLines.forEach(function(body, i) {
                            var colors = tooltipModel.labelColors[i];
                            var style = 'background:' + colors.backgroundColor;
                            style += '; border-color:' + colors.borderColor;
                            style += '; border-width: 2px';
                            var span = '<span style="' + style + '"></span>';

                            innerHtml += '<tr><td>' + "방문자수:" + span + body + ' 명' + '</td></tr>';

                            innerHtml += '<tr><td>' + "전체 수:" + sum + ' 명' + '</td></tr>';

                            innerHtml += '<tr><td style="text-align:center">' + '(' + Math.round(body / sum * 100) + '%' + ')'+ '</td></tr>';
                        });

                        
                        innerHtml += '</tbody>';

                        var tableRoot = tooltipEl.querySelector('table');
                        tableRoot.innerHTML = innerHtml;
                    }

                    var position = context.chart.canvas.getBoundingClientRect();
                    var bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

                    // Display, position, and set styles for font
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                    tooltipEl.style.font = bodyFont.string;
                    tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                    tooltipEl.style.pointerEvents = 'none';
                    tooltipEl.style.transition = 'top 0.3s ease-out, left 0.3s ease-out, opacity 0.3s ease-out'
                    tooltipEl.style.backgroundColor = 'rgba(0,0,0,0.7)';
                    tooltipEl.style.padding = '5px';
                    tooltipEl.style.minWidth = '100px';
                    tooltipEl.style.borderRadius = '5px'
                    tooltipEl.style.transform = 'translate(-50%, 17px)' // transform으로 tooltip 위치 조절
                }
                
            }
        },
        scales:{
            x:{
                grid:{
                    drawBorder:false,
                },
                ticks:{
                    color:white,
                    font:{
                        size:12,
                        weight:'bold'
                    },
                    padding:10
                }
            },
            y:{
                grid:{
                    drawBorder:false,
                    color:gray, //그리드색상
                    lineWidth:1 //굵기
                },
                ticks:{
                    stepSize:2,
                    padding:15,
                    color:white,
                    font:{
                        size:12,
                    }
                },
                suggestedMin:0,
                suggestedMax:10
            }
        },
        layout:{
            padding:{top:20, bottom:0, left:-5, right:20}
        }
    }
}

let lineChart2 = document.querySelector('#lineChart2');
if(lineChart2){
    const ctx = lineChart2.getContext('2d');
    lineChart2 = new Chart(ctx, lineChart2Config)
}

const lineChart2Label = lineChart2.config.data.labels
//console.log(lineChart2Label)


// 차트의 전체 데이터 합 구하기
const lineChart2Data = lineChart2.config.data.datasets[0].data
//console.log(lineChart2Data)
let sum = 0;

for(let i = 0; i<lineChart2Data.length; i++){
    sum += lineChart2Data[i]
}
//console.log(sum)

Chart.register({
    id:'lineChart2Custom',
    afterDraw:function(chart){
        if(chart.canvas.id === 'lineChart2'){
            chart.data.datasets.forEach(function(dataset, i){
                var ctx = chart.ctx;
                var meta = chart.getDatasetMeta(i);

                if(!meta.hidden){
                    meta.data.forEach(function(element, index){
                        if(!element.hidden){

                            var positionX = element.getCenterPoint().x;
                            var positionY = element.tooltipPosition().y;

                            ctx.font = '700 12px 나눔고딕';
                            ctx.fillStyle = white,
                            ctx.textAlign = 'center';

                            ctx.fillText(dataset.data[index], positionX, positionY-15)
                        }
                    })
                }
            })
        }
    }
})

//-----------------------------------------------------------------------------
//lineChart3
//setup
const lineChart3Labels = ['12.01/맑음','12.02/흐림','12.03/눈','12.04/흐림','12.05/맑음','12.06/흐림','12.07/비','12.08/비','12.09/눈','12.10/맑음','12.11/흐림','12.12/맑음','12.13/흐림','12.14/흐림','12.15/흐림','12.16/맑음','12.17/맑음','12.18/맑음','12.19/비','12.20/흐림','12.21/맑음','12.22/맑음','12.23/맑음','12.24/맑음','12.25/눈','12.26/맑음','12.27/눈','12.28/눈','12.29/맑음','12.30/맑음','12.31/맑음']

//console.log(lineChart3Labels.length, '총 라벨수')//31
let averageData = [];

// 차트를 slice해주기 위해 배열 먼저 생성 후 차트에 적용
const lineChart3Data1 = [15,20,47,14,31,45,50,44,30,20,25,27,14,45,12,50,44,15,14,14,36,42,25,25,22,47,25,11,19,41,33]
const lineChart3Data2 = [22,26,44,47,25,26,15,22,33,50,41,44,22,25,36,6,40,25,50,44,15,25,14,25,33,36,37,25,22,20,14]
const lineChart3Data3 = [25,6,17,40,20,36,22,14,7,25,6,36,28,29,36,50,47,40,50,25,22,33,36,45,16,17,28,31,46,18,28]

//animaition setup
let delayed; //undefined


const lineChart3Config = {
    type:'line',
    data:{
        labels:lineChart3Labels,
        datasets:[
            {
                label:'평균',
                data:averageData,
                borderColor:green,
            },
            {
                label:'서울',
                data:lineChart3Data1,
                borderColor:red,
            },
            {
                label:'인천',
                data:lineChart3Data2,
                borderColor:blue,
            },
            {
                label:'부산',
                data:lineChart3Data3,
                borderColor:yellow
            }
        ]
    },
    options:{
        maintainAspectRatio:false,
        responsive:true,
        hover:{
            mode:'x',
            intersect:false, // 마우스가 point에 교차하지 않아도 hover,
            
        },
        plugins:{
            legend:{
                display:false
            },
            tooltip:{
                mode:'index',
                
                enabled:false,
                
                external:function(context){
                   // Tooltip Element
                    var tooltipEl = document.getElementById('chartjs-tooltip2');
                    
                    const lineChart3Div = document.querySelector('#lineChart3').parentNode;

                    

                   // Create element on first render
                    if (!tooltipEl) {
                        tooltipEl = document.createElement('div');
                        tooltipEl.id = 'chartjs-tooltip2';
                        tooltipEl.innerHTML = '<table></table>';
                        lineChart3Div.appendChild(tooltipEl);
                    }

                   // Hide if no tooltip
                    var tooltipModel = context.tooltip;
                    if (tooltipModel.opacity === 0) {
                        tooltipEl.style.opacity = 0;
                        return;
                    }

                   // Set caret Position
                    tooltipEl.classList.remove('above', 'below', 'no-transform');
                    if (tooltipModel.yAlign) {
                        tooltipEl.classList.add(tooltipModel.yAlign);
                    } else {
                        tooltipEl.classList.add('no-transform');
                    }

                    function getBody(bodyItem) {
                        return bodyItem.lines;
                    }

                   // Set Text
                    if (tooltipModel.body) {
                        var titleLines = tooltipModel.title || [];
                        var bodyLines = tooltipModel.body.map(getBody);


                        var innerHtml = '<thead>';

                        /* titleLines.forEach(function(title) {
                            innerHtml += '<tr><th>' + title  + '</th></tr>';
                       }); */


                       // label(title) 에 따라 이미지 변경
                        titleLines.forEach(function(title){
                            const weather = title.split('/')[1]
                            if(weather === '맑음'){
                                innerHtml += '<tr><th style="display:flex">' + title + i_sun + '</th></tr>';
                            }else if(weather === '흐림'){
                                innerHtml += '<tr><th style="display:flex">' + title + i_fog + '</th></tr>';
                            }else if(weather === '비'){
                                innerHtml += '<tr><th style="display:flex">' + title + i_rain + '</th></tr>';
                            }else if(weather === '눈'){
                                innerHtml += '<tr><th style="display:flex">' + title + i_snow + '</th></tr>';
                            }else{
                                innerHtml += '<tr><th style="display:flex">' + title + '</th></tr>';
                            }
                            

                        })
                        

                        innerHtml += '</thead><tbody>';


                        bodyLines.forEach(function(body, i) {
                            var colors = tooltipModel.labelColors[i];
                            var style = 'background:' + colors.backgroundColor;
                            style += '; border-color:' + colors.borderColor;
                            style += '; display:inline-block' ;
                            style += '; width:10px' ;
                            style += '; height:10px' ;
                            style += '; border-radius:50%' ;
                            style += '; margin-right:5px' ;
                            style += '; border-width: 2px';
                            var span = '<span style="' + style + '"></span>';

                            innerHtml += '<tr><td style="display:flex; align-items:center">' + span + body + ' 명' + '</td></tr>';
                        });

                        
                        innerHtml += '</tbody>';

                        var tableRoot = tooltipEl.querySelector('table');
                        tableRoot.innerHTML = innerHtml;
                    }

                    var position = context.chart.canvas.getBoundingClientRect();
                    var bodyFont = Chart.helpers.toFont(tooltipModel.options.bodyFont);

                   // Display, position, and set styles for font
                    tooltipEl.style.opacity = 1;
                    tooltipEl.style.position = 'absolute';
                    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                    tooltipEl.style.font = bodyFont.string;
                  /* tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px'; */
                    tooltipEl.style.pointerEvents = 'none';
                    tooltipEl.style.transition = 'top 0.3s ease-out, left 0.3s ease-out, opacity 0.3s ease-out'
                    tooltipEl.style.backgroundColor = 'rgba(0,0,0,0.7)';
                    tooltipEl.style.padding = '5px';
                    tooltipEl.style.minWidth = '100px';
                    tooltipEl.style.borderRadius = '5px'
                    tooltipEl.style.zIndex = '10'
                    tooltipEl.style.transform = 'translate(-50%, 20px)' // transform으로 tooltip 위치 조절
                }
            }
        },
        scales:{
            x:{
                grid:{
                    drawOnChartArea:false,
                    border:false,
                },
                ticks:{
                    color:white,
                    callback:function(value, index){
                        value = lineChart3Config.data.labels[index];
                        const newValue = value.split('/')[0] 
                        return newValue;
                    },
                    padding:10,
                    font:{
                        size:12
                    },
                    align:'inner'
                }
            },
            y:{
                grid:{
                    drawBorder:false,
                    color:gray,
                    lineWidth:1,
                },
                ticks:{
                    stepSize:10,
                    color:white,
                    padding:15,
                }
            }
        },
        layout:{
            padding:{
                top:40, bottom:0, left:10, right:10
            }
        },
        /* animation:{
            x:{duration:0},
            y:{duration:0}
        }, */
        lagendCallbacks:function(chart){
            return generateLegend(chart);
        }
    }
}

lineChart3Config.data.datasets.forEach(function(dataset){
    dataset.pointRadius = 2;
    dataset.borderWidth = 1;
    dataset.pointBackgroundColor = dataset.borderColor;

    //dataset.hoverPointRadius = 5
})
    
let lineChart3 = document.querySelector('#lineChart3')
if(lineChart3){
    const ctx = lineChart3.getContext('2d');
    lineChart3 = new Chart(ctx, lineChart3Config);
    document.querySelector('#lineChart3Legend').innerHTML = generateLegend(lineChart3)
}

//console.log(lineChart3.config.data.datasets[1].data.length, '서울')
//console.log(lineChart3.config.data.datasets[2].data.length, '인천')
//console.log(lineChart3.config.data.datasets[3].data.length, '부산')


//배열의 평균 구하기
function lineChart3Avg(){
    const dataLength = lineChart3.config.data.datasets.length - 1;
    const data1 = lineChart3.config.data.datasets[1].data;
    const data2 = lineChart3.config.data.datasets[2].data;
    const data3 = lineChart3.config.data.datasets[3].data;

    //console.log(dataLength, data1, data2, data3)

    //console.log(data1[1])

    for(let i=0; i<lineChart3Labels.length; i++){
        const dataSum = data1[i] + data2[i] + data3[i];
        const average = Math.round(dataSum/dataLength);
        averageData.push(average)
    }
    //console.log(averageData);
}

lineChart3Avg()

lineChart3.update() //처음부터 차트에 반영이 되어 보이게 됨!

//console.log(lineChart3.config.data.datasets[0].data)



// custom_range_inp
function customRangeChg(){
    var rangeInp = document.querySelectorAll('.range');
    if(rangeInp.length){
        rangeInp.forEach(function(ele){
            ele.addEventListener('input', rangeStyle)

            function rangeStyle(el){
                el = !el.target ? el : el.target;
                var {max, value} = el;

                var track = el.closest('.range_custom').querySelector('.range_track');
                track.querySelector('.fill').style.width = value + '%';
                track.querySelector('.thumb').style.left = value + '%';
            }
            rangeStyle(ele);
        })
    }
}

customRangeChg()


const lineChart3Range = document.querySelector('#lineChart3Range')
function lineChart3RangeChg(e){

    //좁은 범위-> 넓은 범위
    const max = lineChart3Labels.length;
    //console.log(max)
    let val = lineChart3Range.value*1;
    //console.log(val , '적용전 val')
    val = Math.floor((max - 5) * (val / 100)) + 5;
    //console.log(val, '적용후 val')

    const startIndex = Math.max(0, max - val);
    const endIndex = max;

    //console.log(startIndex,'startIndex', endIndex,'endIndex')

    
    
    //console.log(lineChart3Labels);

    lineChart3.config.data.labels = lineChart3Labels.slice(startIndex, endIndex);
    
    //data를 따로 넣지 않아도 차트에 반영이 되지만 로딩하는 시간이 걸림
    
    lineChart3.config.data.datasets[0].data = averageData.slice(startIndex, endIndex)   
    lineChart3.config.data.datasets[1].data = lineChart3Data1.slice(startIndex, endIndex)
    lineChart3.config.data.datasets[2].data = lineChart3Data2.slice(startIndex, endIndex)
    lineChart3.config.data.datasets[3].data = lineChart3Data3.slice(startIndex, endIndex)

    lineChart3.options.scales.x.ticks.min = lineChart3.data.labels[0];
    lineChart3.options.scales.x.ticks.max = lineChart3.data.labels[lineChart3.data.labels.length]

    var animationDuration = parseInt(lineChart3Range.value);
    lineChart3.options.animation.duration = animationDuration;

    lineChart3.update()
}   

lineChart3RangeChg()

//console.log(lineChart3Range)

if(lineChart3Range){
    lineChart3Range.addEventListener('input', lineChart3RangeChg);
    lineChart3Range.addEventListener('input', customRangeChg)
    

    lineChart3Range.value = 0;
    lineChart3Range.dispatchEvent(new Event('input'))
}

//---------------------------------------------------------------------------------------
//barChart1
const barChart1Labels = ['12.01/맑음','12.02/흐림','12.03/눈','12.04/흐림','12.05/맑음','12.06/흐림','12.07/비','12.08/비','12.09/눈','12.10/맑음','12.11/흐림','12.12/맑음','12.13/흐림','12.14/흐림','12.15/흐림','12.16/맑음','12.17/맑음','12.18/맑음','12.19/비','12.20/흐림','12.21/맑음','12.22/맑음','12.23/맑음','12.24/맑음','12.25/눈','12.26/맑음','12.27/눈','12.28/눈','12.29/맑음','12.30/맑음','12.31/맑음']
const barChart1Data1 = [25,40,15,20,30,25,40,15,20,30,25,40,15,20,30,25,40,15,20,30,25,40,15,20,30,25,40,15,20,30,25]
const barChart1Data2 = [10,20,30,40,20,10,20,30,40,20,10,20,30,40,20,10,20,30,40,20,10,20,30,40,20,10,20,30,40,20,10]
const barChart1Data3 = [30,25,35,15,35,30,25,35,15,35,30,25,35,15,35,30,25,35,15,35,30,25,35,15,35,30,25,35,15,35,30]

let averageData2 = []

//console.log(barChart1Data1.length, barChart1Data2.length, barChart1Data3.length)

const barChart1Config = {
    type:'bar',
    data:{
        labels:barChart1Labels,
        datasets:[
            {
                label:'평균',
                data:averageData2,
                type:'line',
                borderColor:green,
                borderWidth:2,
                backgroundColor:green,
                pointRadius:0
                
            },
            {   
                label:'서울',
                data:barChart1Data1,
                backgroundColor:red,
            },
            {   
                label:'인천',
                data:barChart1Data2,
                backgroundColor:blue,
            },
            {
                label:'부산',
                data:barChart1Data3,
                backgroundColor:yellow
            }
        ]
    },
    options:{
        maintainAspectRatio:false,
        responsive:true,
        legendCallbacks:function(chart){
            return generateLegend(chart)
        },
        plugins:{
            legend:false,
        },
        layout:{
            padding:{
                top:40, bottom:0, left:10, right:10,
            }
        }
    }
}

let barChart1 = document.querySelector('#barChart1')
if(barChart1){
    const ctx = barChart1.getContext('2d')
    barChart1 = new Chart(ctx, barChart1Config)
    document.querySelector('#barChart1Legend').innerHTML = generateLegend(barChart1)
}

//배열의 평균 구하기
function barChart1Avg(){
    const dataLength = barChart1.config.data.datasets.length - 1;
    const data1 = barChart1.config.data.datasets[1].data;
    const data2 = barChart1.config.data.datasets[2].data;
    const data3 = barChart1.config.data.datasets[3].data;

    for(let i=0; i<barChart1Labels.length; i++){
        const dataSum = data1[i] + data2[i] + data3[i];
        const average = Math.round(dataSum/dataLength);
        averageData2.push(average)

        //onsole.log(averageData2[i] ,i +'번')
    }
}

barChart1Avg()
barChart1.update() //평균값이 처음부터 차트에 적용

const barChart1Range = document.querySelector('#barChart1Range')
function barChart1RangeChg(e){
    //넓은 범위 -> 좁은 범위
    const max = barChart1Labels.length;
    let val = barChart1Range.value*1;
    val = Math.floor((max - 5) * ((100 - val) / 100)) + 5; //정방향일 때와 달라진 부분!


    const startIndex = Math.max(0, max - val);
    const endIndex = max;
    
    barChart1.config.data.labels = barChart1Labels.slice(startIndex, endIndex)
    barChart1.config.data.datasets[0].data = averageData2.slice(startIndex, endIndex)
    barChart1.config.data.datasets[1].data = barChart1Data1.slice(startIndex, endIndex)
    barChart1.config.data.datasets[2].data = barChart1Data2.slice(startIndex, endIndex)
    barChart1.config.data.datasets[3].data = barChart1Data3.slice(startIndex, endIndex)


    //console.log(startIndex, endIndex)
    //console.log(val)

    barChart1.update()
}

if(barChart1Range){
    barChart1Range.addEventListener('input', barChart1RangeChg);

    barChart1Range.value = barChart1Labels.length
    barChart1Range.value = 100
    barChart1Range.dispatchEvent(new Event('input'))

}

//------------------------------------------------------------------------------------
// barChart2
Chart.register(ChartjsPluginStacked100.default);

const barChart2Labels = ['12.01/맑음','12.02/흐림','12.03/눈','12.04/흐림','12.05/맑음','12.06/흐림','12.07/비','12.08/비','12.09/눈','12.10/맑음','12.11/흐림','12.12/맑음','12.13/흐림','12.14/흐림','12.15/흐림','12.16/맑음','12.17/맑음','12.18/맑음','12.19/비','12.20/흐림','12.21/맑음','12.22/맑음','12.23/맑음','12.24/맑음','12.25/눈','12.26/맑음','12.27/눈','12.28/눈','12.29/맑음','12.30/맑음','12.31/맑음']
const barChart2Data1 = [25,40,15,20,30,25,40,15,20,30,25,40,15,20,30,25,40,15,20,30,25,40,15,20,30,25,40,15,20,30,25]
const barChart2Data2 = [10,20,30,40,20,10,20,30,40,20,10,20,30,40,20,10,20,30,40,20,10,20,30,40,20,10,20,30,40,20,10]

const data1Ratio = []
const data2Ratio = []
const barChart2Sum = []

for(let i = 0; i<barChart2Labels.length; i++){
    barChart2Sum[i] = barChart2Data1[i] + barChart2Data2[i]
    
    data1Ratio[i] = barChart2Data1[i] /  barChart2Sum[i] * 100
    data2Ratio[i] = barChart2Data2[i] /  barChart2Sum[i] * 100

}
//console.log(data1Ratio[0], data2Ratio[0])

const barChart2Config = {
    type:'bar',
    data:{
        labels:barChart2Labels,
        datasets:[
            {   
                label:'서울',
                data:barChart2Data1,
                backgroundColor:red
            },
            {   
                label:'인천',
                data:barChart2Data2,
                backgroundColor:blue,
            }
        ]
    },
    options:{
        maintainAspectRatio:false,
        responsive:true,
        plugins:{
            legend:false,
            stacked100:{
                enable:true,
                replacetooltipLabel:false,
                precision:2 //소숫점
            }
        },
        scales:{
            x:{
                stacked:true
            },
            y:{
                stacked:true,
                max:100,
                beginAtZero:true,
            }
        },
        layout:{
            padding:{
                top:20, bottom:20, left:10, right:10
            }
        },
        legendCallbacks:function(chart){
            return generateLegend(chart)
        }
    }
}

let barChart2 = document.querySelector('#barChart2');
if(barChart2){
    const ctx = barChart2.getContext('2d');
    barChart2 = new Chart(ctx, barChart2Config)
    document.querySelector('#barChart2Legend').innerHTML = generateLegend(barChart2)
}

//----------------------------------------------------------------------------
//barChart3


tooltip_arr = [tooltip_sun, tooltip_fog]

const barChart3Data = {
    labels : ['12.01/맑음','12.02/흐림','12.03/눈','12.04/흐림','12.05/맑음','12.06/흐림','12.07/비','12.08/비','12.09/눈','12.10/맑음','12.11/흐림','12.12/맑음','12.13/흐림','12.14/흐림','12.15/흐림','12.16/맑음','12.17/맑음','12.18/맑음','12.19/비','12.20/흐림','12.21/맑음','12.22/맑음','12.23/맑음','12.24/맑음','12.25/눈','12.26/맑음','12.27/눈','12.28/눈','12.29/맑음','12.30/맑음','12.31/맑음'],
    datasets:[
        {
            label:'서울',
            data:[25,40,15,20,30,25,40,15,20,30,25,40,15,20,30,25,40,15,20,30,25,40,15,20,30,25,40,15,20,30,25],
            backgroundColor:red,
        },
        {
            label:'인천',
            data:[10,20,30,40,20,10,20,30,40,20,10,20,30,40,20,10,20,30,40,20,10,20,30,40,20,10,20,30,40,20,10],
            backgroundColor:blue,
        }
    ]
}

//데이터 총합 계산
const total =  barChart3Data.datasets.reduce((acc, dataset) => acc.map((val, i) => val + dataset.data[i]), Array(barChart3Data.labels.length).fill(0));

//비율계산
const barChart3Percentages = barChart3Data.datasets.map(dataset => dataset.data.map((value, i) => (value / total[i]) * 100))

//차트 옵션
const barChart3Options = {
    maintainAspectRatio:false,
    responsive:true,
    scales:{
        x:{
            stacked:true,
            ticks:{
                callback:function(value, index){
                    value = barChart3Data.labels[index];
                    const newValue = value.split('/')[0]
                    return newValue
                },
                padding:20
            }
        },
            
        y:{
            stacked:true,
            max:100,
            ticks:{
                stepSize:20
            }
        }
    },
    layout:{
        padding:{
            top:20, bottom:5, left:10, right:10
        }
    },
    legendCallbacks:function(chart){
        return generateLegend(chart)
    },
    plugins:{
        legend:false,
        tooltip:{
            usePointStyle:true,
            backgroundColor:'rgba(0,0,0,0.7)',
            titleColor:'#fff',
            bodyColor:'#fff',
            padding:{
                top:15, bottom:15, left:10, right:10
            },
            labelPointStyle:'circle',
            callbacks:{
                label:function(context){
                    const value = Math.round(context.dataset.data[context.dataIndex])
                    const originValue = barChart3Data.datasets[context.datasetIndex].data[context.dataIndex]; //datasets을 선택할 때는 datasetIndex, data를 선택할 때는 dataIndex
                    return ` ${value} % (${originValue} 명)`
                },
                labelPointStyle:(context) => {
                    return {
                        pointStyle:tooltip_arr[context.datasetIndex], // 배열로 img를 묶으면 dataset에 따라 다른 tooltipStyle사용 가능!
                        rotation:0
                    }
                },
                title:function(context){
                    const label = barChart3Data.labels[context[0].dataIndex]
                    //console.log(label)
                    const newLabel = label.split('/')[0]
                    
                    return newLabel
                }
            }
        }
    }
};

let barChart3 = document.querySelector('#barChart3');

const barChart3Config = {
    type:'bar',
    data:{
        labels:barChart3Data.labels,
        datasets:barChart3Data.datasets.map((dataset, i) => ({
            ...dataset,
            data:barChart3Percentages[i]
        }))
    },
    options:barChart3Options,
}

if(barChart3){
    const ctx = barChart3.getContext('2d');
    barChart3 = new Chart(ctx, barChart3Config)
    document.querySelector('#barChart3Legend').innerHTML = generateLegend(barChart3)
}

//------------------------------------------------------------------------------------
//barChart4

const barChart4Labels = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];

let barChart4Data_sun = [20,15,20,22,20,21,16,20,16,21,19,14]
let barChart4Data_fog = [6,7,8,5,4,6,10,5,4,4,3,8]
let barChart4Data_rain = [2,3,2,3,7,3,5,6,10,6,4,7]
let barChart4Data_snow = [3,3,1,null,null,null,null,null,null,null,4,2]
console.log(barChart4Labels.length, 'barchart4Label', barChart4Data_sun.length,'sun', barChart4Data_fog.length,'fog', barChart4Data_rain.length, 'rain', barChart4Data_snow.length, 'snow')

weather_arr = [tooltip_sun, tooltip_fog, tooltip_rain, tooltip_snow]

/* for(let i =0; i<barChart4Labels.length; i++){
    const dataSum = barChart4Data_sun[i]+barChart4Data_fog[i]+barChart4Data_rain[i]+barChart4Data_snow[i]
    console.log(dataSum)
} */


const barChart4Config = {
    type:'bar',
    data:{
        labels:barChart4Labels,
        datasets:[
            {
                label:'맑음',
                data:barChart4Data_sun,
                backgroundColor:yellow
            },
            {
                label:'흐림',
                data:barChart4Data_fog,
                backgroundColor:purple,
            },
            {
                label:'비',
                data:barChart4Data_rain,
                backgroundColor:blue,
            },
            {
                label:'눈',
                data:barChart4Data_snow,
                backgroundColor:mint,
            }
        ]
    },
    options:{
        maintainAspectRatio:false,
        responsive:true,
        plugins:{
            legend:false,
            tooltip:{
                usePointStyle:true,
                backgroundColor:'rgba(0,0,0,0.7)',
                bodyColor:'#fff',
                titleColor:'#fff',
                bodySpacing:10,
                callbacks:{
                    labelPointStyle:(context) =>{
                        return{
                            pointStyle:weather_arr[context.datasetIndex]
                        }
                    }
                }
            }
        },
        layout:{
            padding:{
                top:20, bottom:10, left:10, right:10
            }
        },
        legendCallbacks:function(chart){
            return generateLegend(chart)
        }
    }
}

let barChart4 = document.querySelector('#barChart4')
if(barChart4){
    const ctx = barChart4.getContext('2d');
    barChart4 = new Chart(ctx,barChart4Config);
    document.querySelector('#barChart4Legend').innerHTML = generateLegend(barChart4)
}

Chart.register({
    id:'barChart4Custom',
    beforeDraw:function(chart){
        if(chart.canvas.id === 'barChart4'){
            chart.data.datasets.forEach(function(dataset, i){
                var ctx = chart.ctx;
                var meta = chart.getDatasetMeta(i);

                if(!meta.hidden){
                    meta.data.forEach(function(element, index){
                        if(!element.hidden){

                            var positionX = element.getCenterPoint().x;
                            var positionY = chart.chartArea.bottom;
                            var positionY1 = element.tooltipPosition().y
    
                            //차트에 이미지 넣기
                            var weatherImg = new Image();
                            //1.switch문
                            /* switch(dataset.label){
                                case '맑음' : weatherImg.src = '../assets/images/weather/sun.png'; break;
                                case '흐림' : weatherImg.src = '../assets/images/weather/fog.png'; break;
                                case '비' : weatherImg.src = '../assets/images/weather/rain.png'; break;
                                case '눈' : weatherImg.src = '../assets/images/weather/snow.png'; break;
                            } */

                            //2.if문
                            if(dataset.label === '맑음'){
                                weatherImg.src = '../assets/images/weather/sun.png'
                            }else if(dataset.label === '흐림'){
                                weatherImg.src = '../assets/images/weather/fog.png'
                            }else if(dataset.label === '비'){
                                weatherImg.src = '../assets/images/weather/rain.png'
                            }else if(dataset.label === '눈'){
                                weatherImg.src = '../assets/images/weather/snow.png'
                            }

                            //데이터가 없을 때 이미지 없애기
                            if(dataset.data[index] === null || dataset.data[index] === 0){weatherImg.src = '';}

                            
                            ctx.font = '700 12px 나눔고딕';
                            ctx.fillStyle = white,
                            ctx.textAlign = 'center';

                            //ctx.fillText(dataset.data[index], positionX, positionY1 - 8)
                            ctx.drawImage(weatherImg, positionX-6, positionY1-15, 12,12)

                        }
                    })
                }
            })
        }
    }
})
//---------------------------------------------------------------------------------------