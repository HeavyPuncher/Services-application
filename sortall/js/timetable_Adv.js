         var table = document.getElementById('table');
         var time, date;

            var Days = ["Monday", "Tuesday", "Wednesday","Thursday ","Friday","Saturday","Sunday"];
            var Employees = {forename:"joe",surname:"gunnarsson",id:12313231235}
            
            var Employees_Shifts=[{id:12313231235,av_id:123132311233,start:new Date("2019","01","12","12","00"),end:new Date("2019","01","12","15","00"),day:"Monday"}]
            
            var employees_shift_store=[{id:12313231235,av_id:123132311233,start:new Date("2019","01","12","12","00"),end:new Date("2019","01","12","15","00"),day:"Monday"}]
            
            var smallest=false,largest=false,row=false;
            var brokenChain=false;
            var start,end;
            var ShiftToRemove;


        
        $("#save").on("click", function(){

            $.ajax({
                
                    url:"http://localhost:8000/sortall/json/",
                type: 'post',
                dataType: 'json',
                contentType: 'application/json',
                data: JSON.stringify(Employees_Shifts),
                success: function (data) {
                    $('body').html(data.msg);
                }
                
            });
            
        });

  
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
                
                    this.style.background="#0b2545";
         
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
               $('#AddShift').css('display', 'inline'); 
                  console.log("shift starts at "+intToDateTime(smallest-1) +" and ends at " +intToDateTime(largest));
                start=intToDateTime(smallest-1);
                end=intToDateTime(largest);
           

             };
            
           }
         }  
          function DrawShifts(){
           for(var i=0;i<Employees_Shifts.length;i++){
                     var employee=getEmployee(Employees_Shifts[i].id); 
                     var dayAsint=daytoint(Employees_Shifts[i].day);
                     console.log(i);
                     var StartofShift=Employees_Shifts[i].start.getHours();
                     var EndofShift=Employees_Shifts[i].end.getHours();
   
                     table.rows[dayAsint].cells[StartofShift+1].innerHTML= table.rows[dayAsint].cells[StartofShift+1].innerHTML+"<div id='Av' data-id='"+Employees_Shifts[i].av_id+"'></div>";
                     for(var j=2;j<=EndofShift-StartofShift;j++){
                          table.rows[dayAsint].cells[StartofShift+j].innerHTML=table.rows[dayAsint].cells[StartofShift+j].innerHTML+"<div id='Av' data-id='"+Employees_Shifts[i].av_id+"'></div>"
                     }
           
           }
     
}

function getEmployee(id){
            return Employees
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
               table.rows[row].cells[j].style.background="#0b2545"
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





   

$("body").on("click","#Add",function() {     
             $('#AddShift').css('display', 'none'); 
     largest=false;
    smallest=false;
    row=false;
    Employees_Shifts.push({id:Employees.id,av_id:newId(),start:start,end:end,day:date})
    ResetShifts();
    DrawShifts();
    ResetGrid();
    start=false;
    end=false;
 
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
            $('#RemoveShift').css('display', 'inline'); 
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
$("body").on("click","#cancelShift",function() {
    largest=false;
    smallest=false;
    row=false;
   ResetGrid();
    $('#AddShift').css('display', 'none'); 
})


function RemoveShift(id){
    var index = AllShifts.map(function(x){return x.shift_id;}).indexOf(id);
    console.log(index)
  if (index > -1) {
  AllShifts.splice(index, 1);
}
        console.log(AllShifts)
}
$("body").on("click","#reset",function() {
    largest=false;
    smallest=false;
    row=false;
    for(var i=0;i<=Employees_Shifts.length;i++){
       Employees_Shifts.pop();
    }
    ResetShifts()
    DrawShifts()
})

