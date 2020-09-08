import React from 'react'

class Sliding extends React.Component {
  constructor(props) {
    super(props);
    this.box = React.createRef();
    this.bgColor = React.createRef();
    this.txt = React.createRef();
    this.slide = React.createRef();
    this.successMoveDistance = 0
    this.downX = 0
    this.isSuccess = false
  }

  componentDidMount() {
    this.successMoveDistance = this.box.current.offsetWidth- this.slide.current.offsetWidth
    console.log(this.successMoveDistance)
  }
  mousedownHandler = (e) => {
    this.bgColor.current.style.transition = "";
    this.slide.current.style.transition = "";
    this.downX = e.clientX;
    console.log(this.downX)
    document.onmousemove = this.mousemoveHandler;
    document.onmouseup = this.mouseupHandler;
  }

  mousemoveHandler = (e) => {
    let moveX = e.clientX;
    let offsetX = this.getOffsetX(moveX - this.downX, 0, this.successMoveDistance);
    this.bgColor.current.style.width = offsetX + "px";
    this.slide.current.style.left = offsetX + "px";

    if(offsetX === this.successMoveDistance){
        this.success();
    }
    e.preventDefault();
  }

  getOffsetX = (offset,min,max) =>{
    if(offset < min){
        offset = min;
    }else if(offset > max){
        offset = max;
    }
    return offset;
  }
  mouseupHandler = (e) => {
    if(!this.isSuccess){
        this.bgColor.current.style.width = 0 + "px";
        this.slider.current.style.left = 0 + "px";
        this.bgColor.current.style.transition = "width 0.8s linear";
        this.slide.current.style.transition = "left 0.8s linear";
    }
    document.onmousemove = null;
    document.onmouseup = null;
  }
  success = () => {
    this.isSuccess = true;
    this.txt.current.innerHTML = "解锁成功";
    this.bgColor.current.style.backgroundColor ="#4fa67a";
    this.txt.current.style.color ="#fff";
    this.slide.current.className = "slider active";
    this.slide.current.onmousedown = null;
    document.onmousemove = null;
  }
  render () {
    return (
      <div id="wsc_box" ref={this.box}>
        <div className="wsc_bgColor" ref={this.bgColor}></div>
        <div className="wsc_txt" ref={this.txt}>滑动解锁</div>
        <div className="wsc_slider" onMouseDown={(e) => {this.mousedownHandler(e)}} ref={this.slide}></div>
      </div>  
    )
  }
}

export default Sliding