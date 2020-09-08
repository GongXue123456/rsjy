// 分页
export const onpage = (current) => {
  let pager_offset = 0
  let pager_openset = 10
  pager_offset = (current-1) * pager_openset
  return pager_offset
}

// 系统编码
export const findSystemCode = (code_prefix = "777") => {
  var prefix = code_prefix;
  var timestamp = (new Date()).valueOf();
  prefix += timestamp;
  var len = subtr(19, prefix.length);
  return prefix + RndNum(len) + RndNum(6);
}

function RndNum(n) {
  var rnd = "";
  for (var i = 0; i < n; i++) {
    rnd += Math.floor(Math.random() * 10);
  }
  return rnd;
}
function subtr(arg1,arg2){
	var r1,r2,m,n;
	try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
	try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
	m=Math.pow(10,Math.max(r1,r2));
	n=(r1>=r2)?r1:r2;
	return ((arg1*m-arg2*m)/m).toFixed(n);
}
// 存贮
export const local = {
  get: (value) => {
    let v = localStorage.getItem(value)
    return v? JSON.parse(v) : null
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value))
  },
  clear: () => {
    localStorage.clear()
  }
}

export const getToken = () => {
  let token = local.get('token')
  if (token) {
    return token
  } else {
    local.clear()
    window.location.href="#/login"
  }
}
