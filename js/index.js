    var wrap=document.querySelector(".wrap");
    // 数据初始化
    var select1,select2,select3,select4,select5,select6,data,xhr,textArr,eleArr,siteArr,sitNameArr,selectArr;
    function Select(ele,num,text){
        this.ele=ele;
        this.num=num;
        this.text=text;
    }
    select1=new Select(wrap.children[0],0,[]);
    select2=new Select(wrap.children[1],0,[]);
    select3=new Select(wrap.children[2],0,[]);
    select4=new Select(wrap.children[3],0,[]);
    select5=new Select(wrap.children[4],0,[]);
    select6=new Select(wrap.children[5],0,[]);
    textArr=["请选择门牌号","请选择村","请选择乡镇","请选择县","请选择城市"];
    eleArr=[select6.ele,select5.ele,select4.ele,select3.ele,select2.ele];
    //添加文本改变静态方法
    Select.change=function (len,obj,obj1,str,str1){
        updateText(len);
        var childrens=this.children;
        obj.num=Select.getNum(childrens);
        obj1.text=(obj.text[obj.num])[str]||[];
        Select.addOption(obj1.ele,obj1.text,str1)
    }
    //获取选中的index

    Select.getNum=function (eles){
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
    Select.addOption=function (ele,arr,str){
        for(var i=0;i<arr.length;i++){
            var newOption=document.createElement("option");
            newOption.innerHTML=arr[i][str];
            ele.appendChild(newOption);
        }
    }
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
    siteArr=['cities','county','xiang','cun','mp'];
    sitNameArr=['cityName','countyname','xiangname','cunname','mpname'];
    selectArr=[select1,select2,select3,select4,select5,select6];
    function addHandler(){
        var newArr=eleArr;
        var newArr=[];
        eleArr.forEach(function(e,i){
            newArr.push(e);
        })
        newArr.push(select1.ele)
        newArr.reverse();
        for(var i=0,j=newArr.length - 1;i<newArr.length-1;i++,j--){
            newArr[i].index=i;
            newArr[i].j=j;
            newArr[i].addEventListener("change",function(){
                Select.change.call(this,this.j,selectArr[this.index],selectArr[this.index+1],siteArr[this.index],sitNameArr[this.index]);
            })
        }
    }
    addHandler();
    //select提示内容更新
    function updateText(n){
        for(var i=0;i<n;i++){
            eleArr[i].innerHTML='<option>'+textArr[i]+'</option>';
        }
    }




