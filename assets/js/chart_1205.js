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
                    tooltipEl.style.left = position.left + window.pageXOffset + tooltipModel.caretX + 'px';
                    tooltipEl.style.top = position.top + window.pageYOffset + tooltipModel.caretY + 'px';
                    tooltipEl.style.font = bodyFont.string;
                    tooltipEl.style.padding = tooltipModel.padding + 'px ' + tooltipModel.padding + 'px';
                    tooltipEl.style.pointerEvents = 'none';
                    tooltipEl.style.transition = 'top 0.3s ease-out, left 0.3s ease-out, opacity 0.3s ease-out'
                    tooltipEl.style.backgroundColor = 'rgba(0,0,0,0.7)';
                    tooltipEl.style.padding = '5px';
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
console.log(lineChart2Label)


// 차트의 전체 데이터 합 구하기
const lineChart2Data = lineChart2.config.data.datasets[0].data
console.log(lineChart2Data)
let sum = 0;

for(let i = 0; i<lineChart2Data.length; i++){
    sum += lineChart2Data[i]
}
console.log(sum)


