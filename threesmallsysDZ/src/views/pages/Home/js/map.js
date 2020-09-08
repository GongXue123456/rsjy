var data = [
    {name: '攀枝花', value: 9},
];

var geoCoordMap = {
   '攀枝花':[101.718637,26.582347],

};

function convertData(data) {
  var res = [];
  for (var i = 0; i < data.length; i++) {
      var geoCoord = geoCoordMap[data[i].name];
      if (geoCoord) {
          res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
          });
      }
  }
  return res;
}

function randomValue() {
   return Math.round(Math.random()*1000);
}
export default {
  tooltip : {
    show:false,
      trigger: 'item'
  },
  legend: {
      orient: 'vertical',
      x:'left',
      data:['iphoneX']
  },
  dataRange: {
      min: '',
      show: false,
      max: '',
      x: 'left',
      y: 'bottom',
      text:['max','min'],           
      calculable : true,
      inRange: {
        color: ['#25C18F'] 
      }
  },
  toolbox: {
      show: false,
      orient : 'vertical',
      x: 'right',
      y: 'center',
      feature : {
          mark : {show: true},
          dataView : {show: true, readOnly: false},
          restore : {show: true},
          saveAsImage : {show: true}
      }
  },
  roamController: {
      show: true,
      x: 'right',
      mapTypeControl: {
          'china': true
      }
  },
  geo: [{
		map: '四川',
		roam: true,//roam与上一个geo配置相同
    zoom:'',
    roam: true,
        label: {
            normal: {
                show: false,
            }
        },
		itemStyle:{//底层地图样式
			normal:{
                            //此处border设置你想要显示的地图外边框样式，可设置border颜色，阴影等
          label:{show:false},
			    borderColor:'#25C18F',
          borderWidth:1,
           color:'#000',
          areaColor:"#EBF9F7"
			},
		},
	},
   ],

  series : [
      {
          name: '',
          type: 'effectScatter',
           coordinateSystem: 'geo',
            symbolSize: 10,
          mapType: '四川',
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
              areaColor:"#25C18F",
              shadowColor: '#fff',},
              emphasis:{label:{show:false}, 
              borderColor: '#25C18F',
              areaColor:"#25C18F",}
          },
          data: [{name: '海门', value: [104.06131, 30.628309,1]}],
      }
  ]
};