
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
};