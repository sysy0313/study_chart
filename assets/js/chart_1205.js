// color
const red = '#ff5370';
const blue = '#89ddff';
const yellow = '#ffcb6b';
const green = '#8ff87e';
const purple = '#c792ea';
const mint = '#c1ffea';
const gray = '#555';
const white = '#efefef'

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
                callbacks:{
                    label:function(context){
                        const value = context.dataset.data[context.dataIndex]
                        const total = context.dataset.data.reduce((sum, value) => sum + value, 0)
                        return ` 방문자수: ${value}`
                        
                    },
                    labelColor:function(context){
                        return{
                            borderRadius:5,
                            backgroundColor:context.dataset.borderColor,
                        }
                    },
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
                    tooltipEl.style.left = /* position.left */ + window.pageXOffset + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = /* position.top */ + window.pageYOffset + tooltipModel.caretY + 'px';
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
const lineChart3Labels = ['12.01/맑음','12.02/흐림','12.03/눈','12.04/흐림','12.05/맑음','12.06/흐림','12.07/비','12.08/비','12.09/눈','12.10/맑음','12.11/흐림','12.12/맑음','12.13/흐림','12.14/흐림','12.15/흐림','12.16/맑음','12.17/맑음','12.18/맑음','12.19/비','12.20/흐림','12.21/맑음','12.22/맑음','12.23/맑음','12.24/맑음','12.25/눈','12.26/맑음','12.27/눈','12.28/눈','12.29/맑음','12.30/맑음','12.31/맑음']

console.log(lineChart3Labels.length, '총 라벨수')//31
let averageData = [];
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
                data:[15,20,47,14,31,45,50,44,30,20,25,27,14,45,12,50,44,15,14,14,36,42,25,25,22,47,25,11,19,41,33],
                borderColor:red,
            },
            {
                label:'인천',
                data:[22,26,44,47,25,26,15,22,33,50,41,44,22,25,36,6,40,25,50,44,15,25,14,25,33,36,37,25,22,20,14],
                borderColor:blue,
            },
            {
                label:'부산',
                data:[25,6,17,40,20,36,22,14,7,25,6,36,28,29,36,50,47,40,50,25,22,33,36,45,16,17,28,31,46,18,28],
                borderColor:yellow
            }
        ]
    },
    options:{
        maintainAspectRatio:false,
        responsive:true,
        hover:{
            mode:'x',
            intersect:false, // 마우스가 point에 교차하지 않아도 hover
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
                   tooltipEl.style.left = /* position.left */ + window.pageXOffset + tooltipModel.caretX + 'px';
                   tooltipEl.style.top = /* position.top  */+ window.pageYOffset + tooltipModel.caretY + 'px';
                   tooltipEl.style.font = bodyFont.string;
                   /* tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px'; */
                   tooltipEl.style.pointerEvents = 'none';
                   tooltipEl.style.transition = 'top 0.3s ease-out, left 0.3s ease-out, opacity 0.3s ease-out'
                   tooltipEl.style.backgroundColor = 'rgba(0,0,0,0.7)';
                   tooltipEl.style.padding = '5px';
                   tooltipEl.style.minWidth = '100px';
                   tooltipEl.style.borderRadius = '5px'
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
                    } 
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
                top:40
            }
        },
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

console.log(lineChart3.config.data.datasets[1].data.length, '서울')
console.log(lineChart3.config.data.datasets[2].data.length, '인천')
console.log(lineChart3.config.data.datasets[3].data.length, '부산')


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
    console.log(averageData);
}

lineChart3Avg()

lineChart3.update() //처음부터 차트에 반영이 되어 보이게 됨!

console.log(lineChart3.config.data.datasets[0].data)



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