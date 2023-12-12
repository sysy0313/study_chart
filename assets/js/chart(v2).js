/* 차트 기본 설정 */
//반응형 rem사이즈
// const rem = () => {
//     const windowWidth = window.innerWidth;
//     // const baseFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
  
//     if (windowWidth <= 700) {
//         return console.log('dkdkdk');
//     } else {
//         return console.log('s');
//     }
//   };
//  console.log(rem())
// window.addEventListener('resize', rem);

// //반응형 rem사이즈
// const rem2 = () => {
//     const windowWidth = window.innerWidth;
//     const baseFontSize = 10;
  
//     if (windowWidth <= 700) {
//         return m * baseFontSize;
//     } else {
//         return pc * baseFontSize;
//     }
//   };
//  console.log(rem2(2,10))
// window.addEventListener('resize', rem2);

// window.addEventListener('DOMContentLoaded', rem);

// function barRadius(chart) {
    
//     const radiusPlus = 7;
//     Chart.elements.Rectangle.prototype.draw = function() {
//         const ctx = this._chart.ctx;
//         const vm = this._view;
//         let left, right, top, bottom, signX, signY, borderSkipped;
//         let borderWidth = vm.borderWidth;
    
//         if (!vm.horizontal) {
//             left = vm.x - vm.width / 2;
//             right = vm.x + vm.width / 2;
//             top = vm.y;
//             bottom = vm.base;
//             signX = 1;
//             signY = bottom > top ? 1 : -1;
//             borderSkipped = vm.borderSkipped || 'bottom';
//         } else {
//             left = vm.base;
//             right = vm.x;
//             top = vm.y - vm.height / 2;
//             bottom = vm.y + vm.height / 2;
//             signX = right > left ? 1 : -1;
//             signY = 1;
//             borderSkipped = vm.borderSkipped || 'left';
//         }
    
//         if (borderWidth) {
//             const barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
//             borderWidth = borderWidth > barSize ? barSize : borderWidth;
//             const halfStroke = borderWidth / 2;
//             const borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
//             const borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
//             const borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
//             const borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
    
//             if (borderLeft !== borderRight) {
//                 top = borderTop;
//                 bottom = borderBottom;
//             }
//             if (borderTop !== borderBottom) {
//                 left = borderLeft;
//                 right = borderRight;
//             }
//         }
    
//         const barWidth = Math.abs(left - right);
//         const roundness = this._chart.config.options.barRoundness || 0.5;
//         const radius = barWidth * roundness * 0.5;
    
//         const prevTop = top;
//         top = prevTop + radius;
//         const barRadius = top - prevTop;
    
//         ctx.beginPath();
//         ctx.fillStyle = vm.backgroundColor;
//         ctx.strokeStyle = vm.borderColor;
//         ctx.lineWidth = borderWidth;
    
//         // draw the chart
//         const x = left,
//             y = top - barRadius + 1,
//             width = barWidth,
//             height = bottom - prevTop,
//             barRadiusWithPlus = barRadius + radiusPlus;
    
//         ctx.moveTo(x + barRadiusWithPlus, y);
//         ctx.lineTo(x + width - barRadiusWithPlus, y);
//         ctx.quadraticCurveTo(x + width, y, x + width, y + barRadiusWithPlus);
//         ctx.lineTo(x + width, y + height);
//         ctx.lineTo(x, y + height);
//         ctx.lineTo(x, y + barRadiusWithPlus);
//         ctx.quadraticCurveTo(x, y, x + barRadiusWithPlus, y);
//         ctx.closePath();
    
//         ctx.fill();
//         if (borderWidth) {
//             ctx.stroke();
//         }
    
//         top = prevTop;
//     };
//   }
//   if(Chart.instances[2]) {
    
//     const radiusPlus = 7;
//     Chart.elements.Rectangle.prototype.draw = function() {
//         const ctx = this._chart.ctx;
//         const vm = this._view;
//         let left, right, top, bottom, signX, signY, borderSkipped;
//         let borderWidth = vm.borderWidth;
    
//         if (!vm.horizontal) {
//             left = vm.x - vm.width / 2;
//             right = vm.x + vm.width / 2;
//             top = vm.y;
//             bottom = vm.base;
//             signX = 1;
//             signY = bottom > top ? 1 : -1;
//             borderSkipped = vm.borderSkipped || 'bottom';
//         } else {
//             left = vm.base;
//             right = vm.x;
//             top = vm.y - vm.height / 2;
//             bottom = vm.y + vm.height / 2;
//             signX = right > left ? 1 : -1;
//             signY = 1;
//             borderSkipped = vm.borderSkipped || 'left';
//         }
    
//         if (borderWidth) {
//             const barSize = Math.min(Math.abs(left - right), Math.abs(top - bottom));
//             borderWidth = borderWidth > barSize ? barSize : borderWidth;
//             const halfStroke = borderWidth / 2;
//             const borderLeft = left + (borderSkipped !== 'left' ? halfStroke * signX : 0);
//             const borderRight = right + (borderSkipped !== 'right' ? -halfStroke * signX : 0);
//             const borderTop = top + (borderSkipped !== 'top' ? halfStroke * signY : 0);
//             const borderBottom = bottom + (borderSkipped !== 'bottom' ? -halfStroke * signY : 0);
    
//             if (borderLeft !== borderRight) {
//                 top = borderTop;
//                 bottom = borderBottom;
//             }
//             if (borderTop !== borderBottom) {
//                 left = borderLeft;
//                 right = borderRight;
//             }
//         }
    
//         const barWidth = Math.abs(left - right);
//         const roundness = this._chart.config.options.barRoundness || 0.5;
//         const radius = barWidth * roundness * 0.5;
    
//         const prevTop = top;
//         top = prevTop + radius;
//         const barRadius = top - prevTop;
    
//         ctx.beginPath();
//         ctx.fillStyle = vm.backgroundColor;
//         ctx.strokeStyle = vm.borderColor;
//         ctx.lineWidth = borderWidth;
    
//         // draw the chart
//         const x = left,
//             y = top - barRadius + 1,
//             width = barWidth,
//             height = bottom - prevTop,
//             barRadiusWithPlus = barRadius + radiusPlus;
    
//         ctx.moveTo(x + barRadiusWithPlus, y);
//         ctx.lineTo(x + width - barRadiusWithPlus, y);
//         ctx.quadraticCurveTo(x + width, y, x + width, y + barRadiusWithPlus);
//         ctx.lineTo(x + width, y + height);
//         ctx.lineTo(x, y + height);
//         ctx.lineTo(x, y + barRadiusWithPlus);
//         ctx.quadraticCurveTo(x, y, x + barRadiusWithPlus, y);
//         ctx.closePath();
    
//         ctx.fill();
//         if (borderWidth) {
//             ctx.stroke();
//         }
    
//         top = prevTop;
//     };
//   }

//font
Chart.defaults.global.defaultFontColor = "#ff0000";
Chart.defaults.global.defaultFontFamily = "'NanumBarunGothic', 'Arial', sans-serif";

/* bar style */
Chart.defaults.global.datasets.bar.categoryPercentage = 1;

/* line style */
Chart.defaults.global.elements.line.borderWidth = 1;
Chart.defaults.global.elements.line.tension = 0;
Chart.defaults.global.elements.line.fill = false;


// tooltip
Chart.defaults.global.tooltips.intersect = false;


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
    var _t = $(target).closest(".chart").find("canvas").attr("id");    
    var chart = Chart.instances[_t]; // Use the id obtained from the target
    var id = _t;
    console.log(chart)

    var meta = chart.getDatasetMeta(index);
    meta.hidden = !meta.hidden;

    if(meta.hidden){
        console.log('숨김')
        $(target).addClass('hidden')
    }else{
        console.log('안숨김')
        $(target).removeClass('hidden')
    }

    chart.update();
    
    return

}