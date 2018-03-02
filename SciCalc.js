/*keeping values safe to allow bracket expressions be evaluated*/
safe = []
/*index of the last added saved value*/
safeindex =null
/*list of current operators not yet evaluated in order of appearance*/
oplist =[]
/**the index of the last added operator */
opindex=null
/**first num */
fnum=null
/**second num */
snum =null
/**stores the answer from a given fxn */
ans = 0
/**checks if we can totally replace the value in the display box */
canreplace = false
/**for knowing we have done a calculation and to reset looks */
evaldone = false
/**for showing evaluation expression in second display */
evalutaionexpr = ""
/**for counting the number of open brackets we have*/
bracketOpenCount=0
/**for letting the equalto fxn know a bracket evalution has been done to not mess up adis display*/
bracketbool = false
/**for checking if we are using comma based fxns*/
commafxn =false
/**testing to see if we are in Hyp Mode*/
hypmode = false
/**for controling the  number of decimalpoints in a number*/
dpbool =true

function num(val) {
    if(document.getElementById("dis").value=="" && val=="0"){
        document.getElementById("dis").value=="";
    }else{
        if(evaldone){
            document.getElementById("adis").value=""
            evaldone=false
        }
        if(canreplace){
            document.getElementById("dis").value=val;
            canreplace=false;
        }else{
            document.getElementById("dis").value+=val;
        }
    }
}

function operator(val){
    if(!commafxn){
            if(fnum==null){
                fnum = document.getElementById("dis").value;
                evalutaionexpr += fnum+val;
                canreplace = true;
                document.getElementById("adis").value=evalutaionexpr;
            }else if(snum==null){
                snum = document.getElementById("dis").value;
                if(snum.startsWith("-")){
                    evalutaionexpr+=  "("+snum+")"+val;
                }else{
                    evalutaionexpr+=snum+val;
                }   
            document.getElementById("adis").value=evalutaionexpr;
            ans=evaluate();
            document.getElementById("dis").value=ans
            snum=null;
            canreplace=true;
            fnum = ans;
            document.getElementById("adis").value=evalutaionexpr;
        
            }
            opindex = oplist.push(val);
            evaldone=false;
            dpbool=true;
    }
}

function evaluate(){
    if(opindex==null){
        return Number(snum)
    }else{
        op = oplist[opindex-1]
    oplist.pop()
    opindex = opindex-1
    if(opindex==0){
        opindex=null
    }
    if(op=="+"){
        return Number(fnum)+Number(snum)
    }else if(op=="-"){
        return Number(fnum)-Number(snum)
    }else if(op=="*"){
        return Number(fnum)*Number(snum)
    }else if(op=="/"){
        return Number(fnum)/Number(snum)
    }
    }
}

function equalto(){
    if(!commafxn){
            snum = document.getElementById("dis").value
            ans = evaluate()
            document.getElementById("dis").value = ans
            if(!bracketbool){
                evalutaionexpr+=snum
            }
            document.getElementById("adis").value=evalutaionexpr;
            fnum=null
            snum=null
            oplist=[]
            safe=[]
            safeindex=null
            opindex=null
            ans=0
            canreplace = true
            evalutaionexpr=""
            evaldone=true
            bracketbool=false
            }

}

function bracketOpen(){
   if(!commafxn){
        if(fnum!=null){
            safeindex=safe.push(Number(fnum))
            }
        document.getElementById("dis").value=""
        evalutaionexpr+="("
        document.getElementById("adis").value=evalutaionexpr
        bracketOpenCount+=1;
        fnum = null;
        snum = null;
        }
}
function bracketClose(){
  if(!commafxn){
        if(bracketOpenCount>0){
            bracketOpenCount-=1
            snum =document.getElementById("dis").value
            evalutaionexpr+=snum
            evalutaionexpr+=")"
            document.getElementById("adis").value=evalutaionexpr
            ans = evaluate()
            document.getElementById("dis").value=ans
            if(safeindex!=null){
                fnum = safe[safeindex-1]
                safe.pop()
                safeindex-=1
                if(safeindex==0){safeindex=null}
            }
            bracketbool=true;
            evaldone=true;
        }
    }   
}
function comma(){
    if(document.getElementById("dis").value!=""){
        document.getElementById("dis").value+=","  
        commafxn=true;
        dpbool=true
    }
    
}
// function mean(){
//     input = document.getElementById("dis").value
//     if(!input.endsWith(",")&&input.includes(",")){
//         strarr = input.split(",")
//         ans = meanValue(strarr)
//         document.getElementById("dis").value=ans
//         canreplace=true
//         evaldone=true
//         commafxn=false
//     }else{
//         alert("cannot perfom the operation on this input")
//     }
// }

function singlefunction(val){
   if(!commafxn){
        input = Number(document.getElementById("dis").value)
        switch(val){
        case "x^2":
            document.getElementById("dis").value = Math.pow(input,2).toFixed(4)
            break;
        case "x^3":
            document.getElementById("dis").value = Math.pow(input,3).toFixed(4)
            break;
        case "root":
            document.getElementById("dis").value = Math.sqrt(input).toFixed(5)
            break;
        case "10^x":
            document.getElementById("dis").value = Math.pow(10,input).toFixed(4)
            break;
        case "log":
            document.getElementById("dis").value = Math.log10(input).toFixed(4)
            break;
        case "1/x":
            document.getElementById("dis").value= (1/input)
            break;
        case "e^x":
            document.getElementById("dis").value= Math.pow(Math.E,input).toFixed(4)
            break;
        case "ln":
            document.getElementById("dis").value = Math.log(input).toFixed(4)
            break;
        case "log2":
            document.getElementById("dis").value = Math.log2(input).toFixed(4)
        case "abs":
            document.getElementById("dis").value = Math.abs(input)
            break;
        case "cbrt":
            document.getElementById("dis").value =Math.cbrt(input).toFixed(4)
            break;
        case "!":
           let facans = factorialValue(input);
            if(ans>0){
                document.getElementById("dis").value = facans
            }else{
                alert("cannot find factorial of this input")
            }
            break;
        case "int":
            document.getElementById("dis").value =Math.round(input)
            break;
    }
        canreplace=true
        evaldone=true
   }
}

//trignometric
function trigfxn(val){
    if(!commafxn){
            var value = document.getElementById("dis").value;
            if(hypmode){
        if(val=="sine"){
            document.getElementById("dis").value = Math.sinh(value);
        }
        else if(val == "cosine"){
            document.getElementById("dis").value = Math.cosh(value);   
        }
        else if(val=="tangent"){
            document.getElementById("dis").value = Math.tanh(value);            
        }
        else if(val=="Asine"){
            document.getElementById("dis").value = Math.asinh(value);
        }
        else if(val=="Acosine"){
            document.getElementById("dis").value = Math.acosh(value);
        }
        else if(val=="Atangent"){
            document.getElementById("dis").value = Math.atanh(value);
        }
    }
            else{
        if(val=="sine"){
            document.getElementById("dis").value = Math.sin(toradians(value)).toFixed(4);
        }
        else if(val == "cosine"){
            document.getElementById("dis").value = Math.cos(toradians(value)).toFixed(4);
        }
        else if(val=="tangent"){
            document.getElementById("dis").value = Math.tan(toradians(value)).toFixed(4);
        }
        else if(val=="Asine"){
            let ansine =Math.asin(value)*(180/Math.PI)
            document.getElementById("dis").value =ansine.toFixed(4)  ;
        }
        else if(val=="Acosine"){
            let anscos = Math.acos(value)*(180/Math.PI);
            document.getElementById("dis").value = anscos.toFixed(4);
        }
        else if(val=="Atangent"){
            let anstan = Math.atan(value)*(180/Math.PI);
            document.getElementById("dis").value = anstan.toFixed(4);
        }
        }   
            canreplace=true
            evaldone=true
        }
}
function binaryfxn(val){
   let input = document.getElementById("dis").value;
    if(!input.endsWith(",")&&input.includes(",")&&input.length==3){
        let inputarr = input.split(",")
        switch(val){
            case "x^y":
                let x = inputarr[0]
                let y = inputarr[1]
                ans = Math.pow(Number(x),Number(y))
                document.getElementById("dis").value = ans
                break;
            case "alogn":
                let n = inputarr[0]
                let a = inputarr[1]
                let anslog = Math.log10(Number(n))/Math.log10(Number(a))
                document.getElementById("dis").value = anslog
                break;
            case "mod":
                let m1 = inputarr[0]
                let n1 = inputarr[1]
                let ansmod = Number(m1)%Number(n1)
                document.getElementById("dis").value = ansmod
                break;
            case "nPr":
                let n2 = inputarr[0]
                let r1 = inputarr[1]
                let ans_perm = permutationValue(n2,r1)
                if(ans_perm!=-1){
                    document.getElementById("dis").value = ans_perm
                }else{
                    alert("Bad Input")
                }
                break;
            case "nCr":
                let n3 = inputarr[0]
                let r2 = inputarr[1]
                let ans_comb = combinationValue(n3,r2)
                if(ans_comb!=-1){
                    document.getElementById("dis").value = ans_comb
                }else{
                    alert("Bad Input")
                }
                break;
        }
        commafxn=false
        canreplace=true
        evaldone=true
    }else{
        alert("Bad Input")
    }
}

function negate(){
    if(commafxn){
        let inputval = document.getElementById("dis").value
        let lastnum = inputval.substr(inputval.lastIndexOf(",")+1)
        let replace = (-1*Number(lastnum)).toString()
        inputval=inputval.replace(lastnum,replace)
        document.getElementById("dis").value=inputval
    }else{
        let val = document.getElementById("dis").value
        val = (-1*Number(val)).toString()
        document.getElementById("dis").value=val
    }
}

function dp(){
    if(dpbool){
        document.getElementById("dis").value+="."
    }
    dpbool=false;
}

function clearexp(){
    evalutaionexpr=""
    document.getElementById("adis").value=evalutaionexpr;
            fnum=null
            snum=null
            oplist=[]
            safe=[]
            safeindex=null
            opindex=null
            ans=0
            canreplace = true
            evalutaionexpr=""
            evaldone=true
            bracketbool=false
}

function clearall(){
            document.getElementById("dis").value="";
            evalutaionexpr=""
            document.getElementById("adis").value=evalutaionexpr;
            fnum=null
            snum=null
            oplist=[]
            safe=[]
            safeindex=null
            opindex=null
            ans=0
            canreplace = true
            evalutaionexpr=""
            evaldone=true
            bracketbool=false
    
}
function bkspc(){
    document.getElementById("dis").value = backspace(document.getElementById("dis").value);
}

function helpmenutoggle(){
    if(document.getElementById("helpmenu").style.display=="none"){
        document.getElementById("helpmenu").style.display="block";
document.getElementById("adis").style.borderTopColor="rgba(142,189,255,0.9)";
        document.getElementById("adis").style.borderTopStyle="solid";
        document.getElementById("adis").style.borderTopWidth="thin";
    }else{
        document.getElementById("helpmenu").style.display="none";
 //document.getElementById("adis").style.borderTopColor="";
        document.getElementById("adis").style.borderTopStyle="none";
        //document.getElementById("adis").style.borderTopWidth="thin";
    }
}

function PIval(){
    if(commafxn){
        document.getElementById("dis").value+=Math.PI;
    }else{
        document.getElementById("dis").value=Math.PI;
    }
}

/**helper functions*/

/**Calculates the mean from an input array of number strings*/
function meanValue(arr){
    num = arr.length
    sum = 0
    for(i=0;i<num;i++){
        sum+=Number(arr[i])
    }
    ans = sum/num
    return ans
}
/**Calculates the factorial of the input value*/
function factorialValue(n){
    if(n<0){
        return -1
    }
    if(n==0){
        return 1
    }
    if(n==1){
        return 1
    }
    return n*factorialValue(n-1)
}
/**Calculates the Combination nCr*/
function combinationValue(n,r){
    N = Number(n);
    R = Number(r)
    if(N>0&&R>0&&N>R){
        ans = factorialValue(N)/(factorialValue(N-R)*factorialValue(R))
    }else{return -1}
    return ans
}
/**Calculates the Permutation nPr*/
function permutationValue(n,r){
    N = Number(n);
    R = Number(r)
    if(N>0&&R>0&&N>R){
        ans = factorialValue(N)/(factorialValue(N-R))
    }else{
        return -1
    }
    return ans
}
/**Convert to to radians if on degree mode else noting*/
function toradians(val){
    return (val*(Math.PI)/180);   
}
/**set Mode to Hyp mode*/
function hypmodetoggle(){
    if(hypmode){
        hypmode=false;
        document.getElementById("sine").innerHTML="sin";
        document.getElementById("cosine").innerHTML="cos";
        document.getElementById("tangent").innerHTML="tan";
        var asine=document.getElementById("Asine").innerHTML.replace("sinh","sin");
        document.getElementById("Asine").innerHTML=asine;
        var acosine=document.getElementById("Acosine").innerHTML.replace("cosh","cos");
    document.getElementById("Acosine").innerHTML=acosine;
        var atan=document.getElementById("Atangent").innerHTML.replace("tanh","tan");
        document.getElementById("Atangent").innerHTML=atan;
        document.getElementById("hypmode").style.color="white";
    }else{
        hypmode = true;
        document.getElementById("sine").innerHTML="sinh";
        document.getElementById("cosine").innerHTML="cosh";
        document.getElementById("tangent").innerHTML="tanh";
        var asine=document.getElementById("Asine").innerHTML.replace("sin","sinh");
        document.getElementById("Asine").innerHTML=asine;
        var acosine=document.getElementById("Acosine").innerHTML.replace("cos","cosh");
    document.getElementById("Acosine").innerHTML=acosine;
        var atan=document.getElementById("Atangent").innerHTML.replace("tan","tanh");
        document.getElementById("Atangent").innerHTML=atan;
document.getElementById("hypmode").style.color="orange";
    }
}
/**to remove the last character from a string and return the new string*/
function backspace(val){
    if(val.length>=2){
        val = val.substring(0,val.length-1);
     return val;
    }else{
        val =""
        return val;
    }
}