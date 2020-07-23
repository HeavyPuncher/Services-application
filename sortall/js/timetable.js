         var table = document.getElementById('table');
         var time,date;
         var Days = ["Monday", "Tuesday", "Wednesday","Thursday ","Friday","Saturday","Sunday"];
               var Employees = [{forename:"joe",surname:"gunnarsson",id:12313231235},{forename:"John",surname:"Smith",id:12323231235},{forename:"max",surname:"Smith",id:22323231235},{forename:"jake",surname:"Smith",id:2256323231235},{forename:"yay",surname:"Smith",id:22323221131235},{forename:"lol",surname:"Smith",id:2233223231235}];
         var Employees_Shifts=[{id:12313231235,start:new Date("2019","01","12","12","00"),end:new Date("2019","01","12","15","00"),day:"Monday"},{id:12323231235,start:new Date("2019","01","12","12","00"),end:new Date("2019","01","12","15","00"),day:"Monday"},{id:22323231235,start:new Date("2019","01","12","09","00"),end:new Date("2019","01","12","15","00"),day:"Saturday"},{id:22323231235,start:new Date("2019","01","12","01","00"),end:new Date("2019","01","12","16","00"),day:"Sunday"},
            {id:2233223231235,start:new Date("2019","01","12","01","00"),end:new Date("2019","01","12","16","00"),day:"Sunday"},{id:22323221131235,start:new Date("2019","01","12","01","00"),end:new Date("2019","01","12","16","00"),day:"Sunday"},
                              {id:2256323231235,start:new Date("2019","01","12","01","00"),end:new Date("2019","01","12","16","00"),day:"Sunday"}]
         var AllShifts=[{id:12313231235,shift_id:12321423343233,start:new Date("2019","01","12","09","00"),end:new Date("2019","01","12","16","00"),day:"Saturday"},{id:12313231235,shift_id:123542423343233,start:new Date("2019","01","12","09","00"),end:new Date("2019","01","12","17","00"),day:"Monday"},{id:22323231235,shift_id:123132432423343233,start:new Date("2019","01","12","09","00"),end:new Date("2019","01","12","16","00"),day:"Monday"}];
         var smallest=false,largest=false,row=false;
         var brokenChain=false;
         var start,end;
         var ShiftToRemove;
  
          //loops through an array with all the names of the day of the week and creates a new row for each one
          for (a = 0; a < Days.length; ++a)
          Adddays(Days[a],table,a+1);
         //for loop gets all the button and check if they have been clicked
  DrawShifts()
         for(var i = 1; i < table.rows.length; i++){
           for(var j = 1; j < table.rows[i].cells.length; j++){
            table.rows[i].cells[j].onclick = function()
             {
                    if(smallest==false && largest==false){
                        smallest=this.cellIndex;
                        largest=this.cellIndex; 
                        row=this.parentElement.rowIndex;
                    }
                   
              //if statemnets to check if a fill is need to join  black if user clicks to far a way
                 if(row==this.parentElement.rowIndex){ 
                       if(largest>this.cellIndex && smallest<this.cellIndex){

                           largest=this.cellIndex;
                           ChainForwards(largest,row);
                         
                       }             
                       else if(smallest-1>this.cellIndex){
               
                            fill(this.cellIndex,smallest,row);
                           smallest=this.cellIndex;
                        }else if(largest+1<this.cellIndex){
                     
                                fill(largest,this.cellIndex,row);
                           largest=this.cellIndex;
                        }
                            else{
                                if(smallest<this.cellIndex){
                                    largest=this.cellIndex;
                                }else{
                                    smallest=this.cellIndex
                                }
                            }      
                   }else{ResetGrid();
                        largest=this.cellIndex;
                        smallest=this.cellIndex;
                        row=this.parentElement.rowIndex}
                
                    this.style.background="#14b78b";
                    document.getElementById('EmployeeNameBox').style.display = "block";
                 switch(this.parentElement.rowIndex) {
                       case 1:
                           date="Monday";
                           break;
                        case 2:
                           date="Tuseday";
                           break;
                        case 3:
                           date="Wednesday";
                           break;
                        case 4:
                           date="Thrusday";
                           break;
                        case 5:
                           date="Friday";
                           break;
                        case 6:
                           date="Saturday"
                           break;
                       case 7:
                           date="Sunday";
                           break;
                           }
                  time= this.cellIndex;
             
                  console.log("shift starts at "+intToDateTime(smallest-1) +" and ends at " +intToDateTime(largest));
                start=intToDateTime(smallest-1);
                end=intToDateTime(largest);
                x();

             };
            
           }
         }
          function DrawShifts(){
           for(var i=0;i<AllShifts.length;i++){
                       var employee=getEmployee(AllShifts[i].id); 
                     var dayAsint=daytoint(AllShifts[i].day);
                     console.log(i);
                     var StartofShift=AllShifts[i].start.getHours();
                     var EndofShift=AllShifts[i].end.getHours();
                     for(var x=1;x<StartofShift+1   ;x++){
                        table.rows[dayAsint].cells[x].innerHTML= table.rows[dayAsint].cells[x].innerHTML+"<div id=boxShift></div>"
                    }
                    for(var l=EndofShift+1;l<25   ;l++){
                        table.rows[dayAsint].cells[l].innerHTML= table.rows[dayAsint].cells[l].innerHTML+"<div id=boxShift></div>"
                    }
                     table.rows[dayAsint].cells[StartofShift+1].innerHTML= table.rows[dayAsint].cells[StartofShift+1].innerHTML+"<div id='box' data-id='"+AllShifts[i].shift_id+"'>"+employee.forename+"</div>";
                     for(var j=2;j<=EndofShift-StartofShift;j++){
                      
                     table.rows[dayAsint].cells[StartofShift+j].innerHTML=table.rows[dayAsint].cells[StartofShift+j].innerHTML+"<div id='box' data-id='"+AllShifts[i].shift_id+"'></div>"
                     }
           
           }
     
}

function getEmployee(id){
    for(var i=0;i<Employees.length;i++){
        if(Employees[i].id==id)
            return Employees[i]
    }
}

         function Adddays(name,table,row){
        //creates table rows
         var row=table.insertRow(row);
         var cell=row.insertCell(0);
         cell.innerHTML = name        
         for(var x=1;x<25;x++) {
          cell=row.insertCell(1);
          cell.innerHTML = "";
         }
         };
          function ResetGrid(){
              //reset the black on the grid
           for(var i = 1; i < table.rows.length; i++){
           for(var j = 1; j < table.rows[i].cells.length; j++){
               table.rows[i].cells[j].style.background="white"
           }
           }
          }
          function ChainForwards(Start,row){
              //changes the grid colors to white
           for(var j = Start; j < table.rows[row].cells.length; j++){
               table.rows[row].cells[j].style.background="white"
           }
           
          }
              function fill(Start,finish,row){
                  //changes start to row colour on grid to black
           for(var j = Start; j < finish; j++){
               table.rows[row].cells[j].style.background="#2fddae"
           }
           
          }
          function intToDateTime(HoursInInt){
              //changes HoursInInt(int) to a date and time
              var hours;
              if(HoursInInt<10){
                  hours="0"+HoursInInt+""
                
              }else{
                  hours=HoursInInt+"";
     
              }
              var time=new Date("2019","01","12",hours,"00")
             return time;   
          }
 function daytoint(string){
            switch(string) {
                       case "Monday":
                            return 1
                        case "Tuseday":
                             return 2
                        case "Wednesday":
                            return 3
                        case "Thrusday":
                         return 4
                        case "Friday":
                             return 5
                        case "Saturday":
                         return 6
                       case "Sunday":
                           return 7
                           }
 }





         function x()  {
            $("#EmployeeName div").remove();
             var count=0;
         for (var i = 0; i < Employees.length; i++) {
             console.log(Employees[i].id)
         var list = document.getElementById("EmployeeName");
         var EmployeeButtons = document.createElement('div');
         for(var j=0;j<Employees_Shifts.length;j++){
         if(Employees[i].id==Employees_Shifts[j].id&& Employees_Shifts[j].start.getHours()<=start.getHours()&&Employees_Shifts[j].end.getHours()>=end.getHours()&&Employees_Shifts[j].day==date){
            if(CheckIfShift(Employees[i].id)){
                count++
         EmployeeButtons.appendChild(document.createTextNode(Employees[i].forename+" "+Employees[i].surname+ " "+Employees[i].id));
         list.appendChild(EmployeeButtons);}}
         }}
         if(count==0){
            EmployeeButtons.appendChild(document.createTextNode("No employees avaliable in this time period"));
         list.appendChild(EmployeeButtons);
         }
         
         
         }
          function CheckIfShift(id){  
              for(var i=0;i<AllShifts.length;i++){
                  if(id==AllShifts[i].id&&AllShifts[i].day==date&&((AllShifts[i].start.getHours()>=start.getHours()&&AllShifts[i].end.getHours()<=end.getHours())||(AllShifts[i].start.getHours()<=start.getHours()&&AllShifts[i].end.getHours()>=end.getHours())||(start.getHours()>=AllShifts[i].start.getHours()&&start.getHours()<=AllShifts[i].end.getHours())||(end.getHours()>=AllShifts[i].start.getHours()&&end.getHours()<=AllShifts[i].end.getHours()))){
                   console.log(id)
                      return false;
                  }
              }
              return true;
          }
$("body").on("click","#EmployeeName div",function() {
              //On a header click in the employenamebox div,gets the employee name and adds  its it with a start time of shift and end time of shift to the array AllShift. 
         var EmployeeSelectedForShift=$(this).closest( "div" ).html();
       console.log(EmployeeSelectedForShift)
             $('#EmployeeNameBox').css('display', 'none'); 
          if(EmployeeSelectedForShift!="No employees avaliable in this time period"){
      AllShifts.push({id:parseInt(GetWord(EmployeeSelectedForShift,3)),start:start,end:end,day:date,shift_id:newId()})}
    smallest=false,
    largest=false
    row=false;
    ResetShifts();
    DrawShifts();
          ResetGrid();
 
})
    function GetWord(string, n){
    var words = string.split(" ");
    return words[n-1];
}
          function ResetShifts(){
                for(var i = 1; i < table.rows.length; i++){
           for(var j = 1; j < table.rows[i].cells.length; j++){
               table.rows[i].cells[j].innerHTML="";
           }
           }
           
           }
function newId(){
    var x=["0","1","2","3","4","5","6","7","8","9"]
    var id="";
    for(var i=0;i<11;i++){
        id=id+x[Math.floor(Math.random() * 10)]
    }   
   return parseInt(id);
}
$("body").on("click","#box",function() {
            $('#RemoveShift').css('display', 'block'); 
            ShiftToRemove= $(this).attr("data-id");
  console.log(ShiftToRemove)
})
$("body").on("click","#remove",function() {
 RemoveShift(parseInt(ShiftToRemove));
      $('#RemoveShift').css('display', 'none'); 
    ResetShifts()
    DrawShifts()
})
$("body").on("click","#cancel",function() {
      $('#RemoveShift').css('display', 'none'); 
})


function RemoveShift(id){
    var index = AllShifts.map(function(x){return x.shift_id;}).indexOf(id);
    console.log(index)
  if (index > -1) {
  AllShifts.splice(index, 1);
}
        console.log(AllShifts)
}

