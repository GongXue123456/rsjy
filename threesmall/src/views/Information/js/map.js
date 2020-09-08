
export default {
  aa: {
    tooltip: {
      show: true,
      trigger: 'item',
      extraCssText:'background:rgba(26,223,187,0.3);padding:10px',
      formatter:function(params, ticket, callback){
         return `
          <div class="tl p20">
          <div class="f18 mb5">${params.data.company_name}</div>
          <div class="f12">主体类型：${params.data.companytype_name}</div>
          <div class="f12">经营者：${params.data.operator}</div>
          <div class="f12">电话：${params.data.mobilephone}</div>
          <div class="f12">审核状态：${params.data.filing_name}</div>
          </div> `
        }
    },
    visualMap: {
      type: 'piecewise',
      textStyle: {color: '#fff'},
      pieces: [
        {min: 1, max: 1.9, label: '待审核', color: '#35B8F7'},
        {min: 3, max: 3.9, label: '已归档', color: '#1ADFBB'},
         {min: 4, max: 4.9, label: '已驳回', color: '#F47448'},
      ],
      left:"1%",
      top:"13%",
      color: ['#35B8F7','#1ADFBB','#F47448']
      },
            geo:{
                                show: true,
                                 roam: true,
                                 map: '四川',
                                 aspectScale: 1,
                                 zoom:1.3,
                                selectedMode: false,
                                 markLine:{
                                     lineStyle:{
                                         color:'#e3e3e3'
                                     }
                                 },
                                label:{
                                     normal: {
                                         show: false,
                                         color:'#e3e3e3'
                                    },
                                    emphasis:{
                                         show: true,
                                        color:'#e3e3e3'
                                     }
                                 },
                                itemStyle: {
                                    normal: {
                                        borderColor: '#439B96',
                                        areaColor:'#203243'
                                     },
                                     emphasis:{
                                        areaColor:'#203243',
                                     }
                                 }
                             },
  
    series: [
        {
            name: '',
            type: "scatter",
            type: 'effectScatter',
             coordinateSystem: 'geo',
              symbolSize: 10,
            mapType: '四川',
            zoom:1.3,
            roam: true,
            label: {
              normal: {
                  show: false,
              },
              emphasis: {//对应的鼠标悬浮效果
                show: false,
                textStyle:{color:"#FFFFFF"}
            }
          },
            itemStyle:{
                normal:{label:{show:false},
                areaColor:"#203243",
                shadowColor: '#fff',},
                emphasis:{label:{show:false}, 
                borderColor: '#439B96',
                areaColor:"#203243",}
            },
            data:[{name: '海门', value: 9}],
        }
    ]
  },
  bb: {
    tooltip: {
      show: true,
      trigger: 'item',
      extraCssText:'background:rgba(26,223,187,0.3);padding:10px',
      formatter:function(params, ticket, callback){
         return `
          <div class="tl p20">
          <div class="f18 mb5">${params.data.company_name}</div>
          <div class="f12">主体类型：${params.data.companytype_name}</div>
          <div class="f12">经营者：${params.data.operator}</div>
          <div class="f12">电话：${params.data.mobilephone}</div>
          <div class="f12">审核状态：${params.data.filing_name}</div>
          </div> `
        }
    },
    visualMap: {
      type: 'piecewise',
      textStyle: {color: '#fff'},
      pieces: [
        {min: 1, max: 1.9, label: '正常', color: '#1ADFBB'},
        {min: 3, max: 3.9, label: '异常', color: '#F47448'},
      ],
      left:"1%",
      top:"5%",
      color: ['#1ADFBB','#F47448']
      },
            geo:{
                                show: true,
                                 roam: true,
                                 map: '四川',
                                 aspectScale: 1,
                                 zoom:1.1,
                                selectedMode: false,
                                 markLine:{
                                     lineStyle:{
                                         color:'#e3e3e3'
                                     }
                                 },
                                label:{
                                     normal: {
                                         show: false,
                                         color:'#e3e3e3'
                                    },
                                    emphasis:{
                                         show: true,
                                        color:'#e3e3e3'
                                     }
                                 },
                                itemStyle: {
                                    normal: {
                                        borderColor: '#439B96',
                                        areaColor:'#203243'
                                     },
                                     emphasis:{
                                        areaColor:'#203243',
                                     }
                                 }
                             },
  
    series: [
        {
            name: '',
            type: "scatter",
            type: 'effectScatter',
             coordinateSystem: 'geo',
              symbolSize: 10,
            mapType: '四川',
            zoom:1.2,
            roam: true,
            label: {
              normal: {
                  show: false,
              },
              emphasis: {//对应的鼠标悬浮效果
                show: false,
                textStyle:{color:"#FFFFFF"}
            }
          },
            itemStyle:{
                normal:{label:{show:false},
                areaColor:"#203243",
                shadowColor: '#fff',},
                emphasis:{label:{show:false}, 
                borderColor: '#439B96',
                areaColor:"#203243",}
            },
            data:[],
        }
    ]
  },
  drawMain(drawing_elem,val1,val2, percent, forecolor, bgcolor) {
    /*
    @drawing_elem: 绘制对象
    @percent：绘制圆环百分比, 范围[0, 100]
    @forecolor: 绘制圆环的前景色，颜色代码
    @bgcolor: 绘制圆环的背景色，颜色代码
    */
    var context = drawing_elem.getContext("2d");
    var center_x = drawing_elem.width / 2;
    var center_y = drawing_elem.height / 2;
    var rad = Math.PI*2/100; 
    var speed = 0;
    
    // 绘制背景圆圈
    function backgroundCircle(){
    context.save();
    context.beginPath();
    context.lineWidth = 10; //设置线宽
    var radius = center_x - context.lineWidth;
    context.lineCap = "round";
    context.strokeStyle = bgcolor;
    context.arc(center_x, center_y, radius, 0, Math.PI*2, false);
    context.stroke();
    context.closePath();
    context.restore();
    }
    
    //绘制运动圆环
    function foregroundCircle(n){
    context.save();
    context.strokeStyle = forecolor;
    context.lineWidth = 10;
    context.lineCap = "round";
    var radius = center_x - context.lineWidth;
    context.beginPath();
    context.arc(center_x, center_y, radius , -Math.PI/2, -Math.PI/2 +n*rad, false); //用于绘制圆弧context.arc(x坐标，y坐标，半径，起始角度，终止角度，顺时针/逆时针)
    context.stroke();
    context.closePath();
    context.restore();
    }
    
    //绘制文字
    function text(){
    context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
    context.fillStyle = forecolor;
    var font_size = 30;
    context.font = font_size + "px Helvetica";
    var text_width = context.measureText(val2).width;
    context.fillText(val2, center_x-text_width/2, center_y+10 + font_size/2);
    context.restore();
    }
     //绘制文字1
     function text1(){
      context.save(); //save和restore可以保证样式属性只运用于该段canvas元素
      context.fillStyle = '#fff';
      var font_size = 14;
      context.font = font_size + "px Helvetica";
      var text_width = context.measureText(val1).width;
      context.fillText(val1, center_x-text_width/2, center_y-font_size);
      context.restore();
      }
    //执行动画
    (function drawFrame(){
    window.requestAnimationFrame(drawFrame);
    context.clearRect(0, 0, drawing_elem.width, drawing_elem.height);
    backgroundCircle();
    text();
    text1();
    foregroundCircle(speed);
    if(speed >= percent) return;
    speed += 1;
    }());
    },
};