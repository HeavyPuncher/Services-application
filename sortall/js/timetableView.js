         var table = document.getElementById('table');
         var Days = ["Monday", "Tuesday", "Wednesday","Thursday ","Friday","Saturday","Sunday"];
         var Employees_Shifts=[{id:12313231235,av_id:123132311233,start:new Date("2019","01","12","12","00"),end:new Date("2019","01","12","15","00"),day:"Monday"},{id:12313231235,av_id:123132311233,start:new Date("2019","01","12","00","00"),end:new Date("2019","01","12","15","00"),day:"Tuseday"},{id:12313231235,av_id:123132311233,start:new Date("2019","01","12","12","00"),end:new Date("2019","01","12","15","00"),day:"Sunday"}]

          //loops through an array with all the names of the day of the week and creates a new row for each one
          for (var a = 0; a < Days.length; ++a)
          Adddays(Days[a],table,a+1);
         //for loop gets all the button and check if they have been clicked
  DrawShifts()
     
          function DrawShifts(){
           for(var i=0;i<Employees_Shifts.length;i++){
                     
                     var dayAsint=daytoint(Employees_Shifts[i].day);
                
                     var StartofShift=Employees_Shifts[i].start.getHours();
                     var EndofShift=Employees_Shifts[i].end.getHours();
   
                    table.rows[dayAsint].cells[StartofShift+1]
                     for(var j=1;j<=EndofShift-StartofShift;j++){
                          table.rows[dayAsint].cells[StartofShift+j].style.background="#0b2545";
                     }
           
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
 





