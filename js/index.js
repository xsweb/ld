    var wrap=document.querySelector(".wrap");
    // 数据初始化
    var select1,select2,select3,select4,select5,select6,data,xhr;
    select1={
        ele:wrap.children[0],
        num:0,
        text:[],
    };
    select2={
        ele:wrap.children[1],
        num:0,
        text:[],
    };
    select3={
        ele:wrap.children[2],
        num:0,
        text:[],
    };
    select4={
        ele:wrap.children[3],
        num:0,
        text:[],
    };
    select5={
        ele:wrap.children[4],
        num:0,
        text:[],
    };
    select6={
        ele:wrap.children[5],
        num:0,
        text:[],
    };
    //页面加载完成，请求数据，把省份一一添加到select中
    xhr=new XMLHttpRequest();
    xhr.open("get","./json/index.json");
    xhr.send(null);
    xhr.onreadystatechange=function(){
        if(xhr.status===200&&xhr.readyState===4){
            select1.text=data=JSON.parse(xhr.responseText);
            var len,i,newOption;
            len=data.length;
            for(i=0;i<len;i++){
                newOption=document.createElement("option");
                newOption.innerText=data[i].provinceName;
                select1.ele.appendChild(newOption)
            }
        }
    };
    //元素事件绑定
    select1.ele.addEventListener("change",function(){
        change.call(this,5,select1,select2,'cities','cityName');
    });
    select2.ele.addEventListener("change",function(){
        change.call(this,4,select2,select3,'county','countyname');
    });
    select3.ele.addEventListener("change",function(){
        change.call(this,3,select3,select4,'xiang','xiangname');
    });
    select4.ele.addEventListener("change",function(){
        change.call(this,2,select4,select5,'cun','cunname');
    });
    select5.ele.addEventListener("change",function(){
        change.call(this,1,select5,select6,'mp','mpname');
    });
    var textArr=["请选择门牌号","请选择村","请选择乡镇","请选择县","请选择城市"];
    var eleArr=[select6.ele,select5.ele,select4.ele,select3.ele,select2.ele];
    //select提示内容更新
    function updateText(n){
        for(var i=0;i<n;i++){
            eleArr[i].innerHTML='<option>'+textArr[i]+'</option>';
        }
    }
    //文本改变事件
    function change(len,obj,obj1,str,str1){
        updateText(len);
        var childrens=this.children;
        obj.num=getNum(childrens);
        obj1.text=(obj.text[obj.num])[str];
        addOption(obj1.ele,obj1.text,str1)
    }
    //获取选中的index
    function getNum(eles){
        var num=0;
        for(var i=1;i<eles.length;i++){
            if(eles[i].selected){
                num=i-1;
                break;
            }
        }
        return num;
    }
//    在select中添加对应项
    function addOption(ele,arr,str){
        for(var i=0;i<arr.length;i++){
            var newOption=document.createElement("option");
            newOption.innerHTML=arr[i][str];
            ele.appendChild(newOption);
        }
    }
