/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
        var times=1,count=0; 
        var names = ["Planned","Unplanned"];
        var lTypeNmaes = ["Expense","Sponsorship","Client Payment","Coparate Payment"];
/*
 *  To remove row in table
 * @param {type} table
 * @param {type} rowCount1
 * @returns {undefined}
 */
function flushTable(table,rowCount1){
          if(rowCount1>1){
              for (var i = rowCount1-1;i >0; i--) {
                table.deleteRow(i);
            }
          } 
}
/*
 *  To remove row in table and clear fields
 * @param {type} table
 * @param {type} rowCount1
 * @returns {undefined}
 */
function flushErrorTable(table){
    var table = document.getElementById(table);  
    var rowCount1 = table.rows.length;
    document.getElementById("promoid2").value = '';
    document.getElementById("dynamicInputBE2").style.display = 'none';
    document.getElementById("dynamicInputBE3").style.display = 'none';
    document.getElementById("dynamicInputBE4").style.display = 'none';
     
          if(rowCount1>1){
              for (var i = rowCount1-1;i >0; i--) {
                table.deleteRow(i);
            }
          } 
}
 /*
  *  Fill table with retrieve data from the database (server)
  *  also show promo id ,cost, profit etc...
  * @param {type} tableID
  * @param {type} field
  * @param {type} proAmo
  * @param {type} totalPromotionRevenue
  * @param {type} search
  * @returns {undefined}
  */      
 function addReadRow(tableID,field,proAmo,totalPromotionRevenue,search) {
            
                
        var pIdsh = document.getElementById("promoid2");
        pIdsh.value= field[0].budgetEstimationPK.promotionId;
        var table = document.getElementById(tableID);        
        var rowCount1 = table.rows.length;
        if(rowCount1 >1) flushTable(table,rowCount1);
        
            for(var j=0;j<field.length;j++){  
                var table = document.getElementById(tableID);
                var rowCount = table.rows.length;                
                var row = table.insertRow(rowCount);
                var colCount = table.rows[0].cells.length;
               
                for(var i=0; i<colCount; i++) {
                    if(i===3){
                        var cell2 = row.insertCell(i);
                        var element2 = document.createElement("select");
                        element2.type = "text2";
                        element2.disabled = true;
                        element2.new = false;   
                        for(var k=0;k<names.length;k++){
                            var option = document.createElement( 'option' );
                            option.value = option.text = names[k];
                            element2.add( option );
                       }
                      
                    }else if(i===1){
                        var cell2 = row.insertCell(i);
                        var element2 = document.createElement("select");
                        element2.type = "text2";
                        element2.name="txtbox"+times+i;
                        element2.disabled = true;
                        element2.new = false;
                        for(var k=0;k<lTypeNmaes.length;k++){
                            var option = document.createElement( 'option' );
                            option.value = option.text = lTypeNmaes[k];
                            element2.add( option );
                       }
                      
                    }else{
                        var cell2 = row.insertCell(i);
                        var element2 = document.createElement("input");
                        element2.type = "text2";
                        element2.name="txtbox"+times+i;                        
                        element2.new = false;
                        element2.disabled = true;
                        element2.style.border = "transparent";
                    }
                  
                        switch (i){
                            case 0:                                
                                element2.name="txtbox"+times+i;
                                element2.id="lineNo"+rowCount;
                                element2.value = field[j].budgetEstimationPK.lineNo;
                                element2.oldValue = field[j].budgetEstimationPK.lineNo;
                                break;
                            case 1:
                                element2.name="txtbox"+times+i;
                                element2.id="lineType"+rowCount;
                                element2.oldValue = field[j].lineType;
                                element2.value = field[j].lineType;
                                break;
                            case 2:
                                element2.name="description";
                                element2.id="description"+rowCount;
                               // element2.algn= 'right';
                                element2.oldValue = field[j].description;
                                element2.value = field[j].description;
                                break;
                            case 3: 
                                element2.name = "txtbox" + times + i;
                                element2.id = "planned" + rowCount;
                                element2.oldValue = field[j].planned;
                                element2.value = field[j].planned;
                                element2.stateg = field[j].promotion.stateg;
                                break;
                            case 4:
                                element2.name="amount";
                                element2.id="amount"+rowCount;
                                var amountData = field[j].amount;
                                if(undefined != amountData){
                                    element2.value = amountData.toFixed(2);
                                    element2.oldValue = amountData.toFixed(2);
                                }
                                    
                                else {
                                    element2.oldValue = 'null';
                                    element2.value = 'null';
                                }
                                 break;                     
                            
                        }
                       // element2.disabled = true;
                        cell2.appendChild(element2);
                }      
                times++;
                var cell1 = row.insertCell(i);
                var element1 = document.createElement("input");
                element1.type = "image";
                element1.name="btnremo";
                element1.id="delbtn"+rowCount;
                element1.count = rowCount;
                element1.src = "img/CloseIcon.png";
                element1.onclick = function() { deleteDataFromTable(this,tableID,search);};
                cell1.appendChild(element1);
            }
            
           
        document.getElementById("dynamicInputBE2").innerHTML = ' Total Promotion Cost:';
         document.getElementById("dynamicInputBE2").style.display = 'block';  
        var newdiv = document.createElement('input');  
          newdiv.type="textbox2";
          newdiv.name = "totalPC";
          newdiv.disabled = true;
          newdiv.id = "totalPC";
          newdiv.value = proAmo.toFixed(2);
          document.getElementById("dynamicInputBE2").appendChild(newdiv);
          
        document.getElementById("dynamicInputBE3").innerHTML = 'Total Promotion Revenue:';
        document.getElementById("dynamicInputBE3").style.display = 'block';  
        var newdiv = document.createElement('input');  
          newdiv.type="textbox2";
          newdiv.name = "totalPR";
          newdiv.disabled = true;
          newdiv.id = "totalPR";
          newdiv.value = totalPromotionRevenue.toFixed(2);
          document.getElementById("dynamicInputBE3").appendChild(newdiv);
        document.getElementById("dynamicInputBE4").innerHTML = 'Total Promotion Profit:';
        document.getElementById("dynamicInputBE4").style.display = 'block';  
        var newdiv = document.createElement('input');  
          newdiv.type="textbox2";
          newdiv.name = "totalPP";
          newdiv.disabled = true;
          newdiv.id = "totalPP";
          newdiv.value = (totalPromotionRevenue-proAmo).toFixed(2);
          document.getElementById("dynamicInputBE4").appendChild(newdiv);
          
      
            
            
            }
    
//delete row one by one clk button
function deleteDataFromTable(rowvaldel,tableId,search) {
    var delData = [],ok=0,j=0;
    
    try {
        var dlt = rowvaldel.parentNode.parentNode.rowIndex;
        var table = document.getElementById(tableId);
        var result = confirm("Want to delete?");
        if (result) {
            var arraDel = readTableData(tableId, dlt);
             var sendURL = window.location.protocol + "//" + window.location.host; 
        
            $.ajax({
                type: 'DELETE',
                url: sendURL+'/NethPMSServer/webresources/budgetEstimation/delRow' + '/keyid;' + $.param({"lineNo": arraDel[1]}) + ";" + $.param({"promotionId": arraDel[0]}),
                contentType: 'application/json; charset=utf-8',
                success: function (xhr, data, textStatus, jqXHR) {
                     alert('Budget Estimation Record Deleted successfully..' );
                    getID(search, tableId);
                },
                error: function (xhr, data, jqXHR, textStatus, thrownError, response) {
                    var message = JSON.parse(xhr.responseText);                        
                    alert("Error Occurred: " + message.message);
                }
            });
        }

    } catch (e) {
        alert(e);
    }
    // var delRowDataBG = JSON.stringify({"promotionId":arraDel[0],"lineNo":arraDel[1]}); 

    /*   var str = {"Data":arraDel};
     var dat = JSON.stringify(str);
     $.post("budgetEstimation.jsp",
     {
     dleBEData: dat
     });
     /*  setTimeout(function(){// wait for 5 secs(2)
     window.location = window.location; //location.reload(); // then reload the page.(3)
     }, 500);
     /*/
} 
            
/*
 * Read only Kth Table values 
 * @param {type} tableID
 * @param {type} K
 * @returns {Array}
 */
function readTableData(tableID,K){
    var marks = [];
    var i;     
    var table = document.getElementById(tableID);
    var column_count = table.rows[0].cells.length;
    if(column_count>0){       
        marks[0] = document.getElementById('promoid2').value;
        marks[1] = table.rows[K].cells[0].firstChild.value; //                   
    }
return marks;
}

/*
 *  To modify -> enable disable cells to enter new values 
 * @param {type} tableID
 * @returns {undefined}
 */
function modifyRow(tableID) {
    var table = document.getElementById(tableID);
    var column_count = table.rows[0].cells.length;
    var rowLength = table.rows.length; 
    for (var i = 1; i < rowLength; i++) {
        var elemtlt = document.getElementById("lineType" + i);
        elemtlt.style.border = "2px solid #1fc5a4";
        elemtlt.disabled = false;
        var elemtds = document.getElementById("description" + i);
        elemtds.style.border = "2px solid #1fc5a4";
        elemtds.disabled = false;
        var elemtpl = document.getElementById("planned" + i); //allow to change planned
        elemtpl.style.border = "2px solid #1fc5a4";
        elemtpl.disabled = false;
        var elemtam = document.getElementById("amount" + i);
        elemtam.style.border = "2px solid #1fc5a4";
        elemtam.disabled = false;
    }
        
} 
 
/*
 * Read whole table..get all cell value to array
 * @param {type} tableID
 * @returns {Array}
 */        
function readWHoleData(tableID){
    var markst = [];
    
    var table = document.getElementById(tableID);
    var column_count = table.rows[0].cells.length;
    var rowLength = table.rows.length;   //gets rows of table
   
    if(rowLength>0){   
        for(var i=1;i<rowLength;i++){
             markst[i-1] = [];
             markst[i-1][0]  = document.getElementById('promoid2').value;
            for(var index = 0; index < column_count;index++){
               // marks[index-1] = table.rows[K].cells[index].value; //
                 markst[i-1][index+1] =table.rows[i].cells[index].firstChild.value; //
            } 
        }
    }  
return markst;
}

/*
 * Add new row to table at the end...
 * @param {type} tableID
 * @returns {undefined}
 */
 function addRow(tableID) {
     var table = document.getElementById(tableID);
    var rowCount = table.rows.length;
    
   var pidSh = document.getElementById("promoid2");
    if(rowCount <=1){  
        pidSh.disabled = false;
    }
     var row = table.insertRow(rowCount);
    var colCount = table.rows[0].cells.length;

    for(var i=0; i<colCount; i++) {
        if(i===3){
            var cell2 = row.insertCell(i);
            var element2 = document.createElement("select");
            element2.type = "text2";
            element2.name="txtbox"+times+i;
            element2.Id="txtbox"+times+i;
            element2.new = true;             
            for(var j=0;j<names.length;j++){
                var option = document.createElement( 'option' );
                option.value = option.text = names[j];
                element2.add( option );
            }
            cell2.appendChild(element2);
        }else if(i===1){
            var cell2 = row.insertCell(i);
            var element2 = document.createElement("select");
            element2.type = "text2";
            element2.name="txtbox"+times+i;
            element2.Id="txtbox"+times+i;
            element2.new = true;     
            for(var k=0;k<lTypeNmaes.length;k++){
                var option = document.createElement( 'option' );
                option.value = option.text = lTypeNmaes[k];
                element2.add( option );
            }    
             cell2.appendChild(element2);
        }else{
            var cell2 = row.insertCell(i);
            var element2 = document.createElement("input");
            element2.type = "text2";
            element2.name="txtbox"+times+i;
            element2.Id="txtbox"+times+i;
            element2.value = "";
            element2.new = true;
            cell2.appendChild(element2);
        }
    }      
    var cell1 = row.insertCell(i);
    var element1 = document.createElement("input");
    element1.type = "image";
    element1.name="btnremo";
    element1.id="delbtn"+rowCount;
    element1.count = rowCount;
    element1.src = "img/CloseIcon.png";
    element1.addEventListener('click', function() {
        deleteTableRow(tableID,this);
    }, false);
    cell1.appendChild(element1);
    times++;
  
 }


/*
 * 
 * @param {type} tableID
 * @returns {undefined}
 * read whole table to save..get row data in table
 * check newly added row if there read only them otherwise read whole
 */
function readDataToSave(tableID,search){
    var table = document.getElementById(tableID);
    var column_count = table.rows[0].cells.length;
    var rowLength = table.rows.length;   //gets rows of table
    var arraysave = [];
    var validateAdd= -1;
    var validateAdd2= -1;
    
    for( var k=1;k<rowLength;k++){
        if(table.rows[k].cells[0].firstChild.new)
            validateAdd=1;  
        if(!table.rows[k].cells[0].firstChild.new)
            validateAdd2=1;
    }
   
    if(validateAdd === 1){   // alert("in readtosave");
     if(validAndNext(tableID)){                
        if(column_count>0){       
                for(var index =1,i=0; index < rowLength;index++){
                    if(table.rows[index].cells[1].firstChild.new){
                        arraysave[i]=[];
                        arraysave[i][0] = document.getElementById('promoid2').value;
                        for(var j=0;j<column_count;j++){
                           if(j===4){
                               var val =  table.rows[index].cells[j].firstChild.value;
                               if(val.length<=0){
                                   arraysave[i][j+1] = "0";
                               }else{
                                   arraysave[i][j+1] = val;
                               }                               
                           }else{
                               arraysave[i][j+1] = table.rows[index].cells[j].firstChild.value;
                           }
                        }
                        i++;
                    }
                } 
                if(arraysave.length >0){
                    saveallRow(arraysave,tableID,search);
                }
            }  
        }
    }
    if(validateAdd2 === 1 && validateAdd != 1){
        if(validModifyData(tableID)){
            var modDataTable = readModifyData(tableID);
            if(modDataTable.length >0){
               saveModifyDataRow(modDataTable,search,tableID);
            }
        }
    }
}

/*
 * Send modify data to server and get confirmation from the server
 * @param {type} tableData
 * @param {type} search
 * @param {type} tableID
 * @returns {undefined}
 */
function saveModifyDataRow(tableData,search,tableID) {
    var fgo = 0,fgo1=0;
    var alts = 0;
    
    try {
        if(tableData != null && tableData.length >0){        
            
           for(var i=0;i<tableData.length;i++){
                var tsent = formToJSONBudget(tableData[i]);
                 var sendURL = window.location.protocol + "//" + window.location.host; 
        
                $.when(  $.ajax({
                    type: 'PUT',
                    url: sendURL + '/NethPMSServer/webresources/budgetEstimation/ModRows',
                    contentType: 'application/json; charset=utf-8',
                    data: tsent,
                    success: function(data, textStatus, jqXHR){
                        alts++;                         
                        if(alts === tableData.length)
                             alert('Budget Estimation Modify successfully' );
                    },
                    error: function(xhr,data, jqXHR, textStatus, thrownError, response){
                        fgo++;
                        if(xhr.status != 500) {
                            fgo1++;
                            var message = JSON.parse(xhr.responseText);                           
                            if(fgo1 === 1)                           
                            alert("Error Occurred: " + message.message);
                        }                       
                        
                        if(xhr.status === 500){    
                            if(fgo === 1){
                                alert("Error Occurred: You have entered existing promotion Id and LineNo ..");
                            }
                        }
                    }
                }))
                .then( function refreshAfter(){
                    var chk = document.getElementById(search).value;
                    if(chk.length > 0){
                        getID(search,tableID);
                    }else{
                        var table = document.getElementById(tableID);        
                        var rowCount1 = table.rows.length;
                        flushTable(table,rowCount1);
                        var pIdsh = document.getElementById("promoid2");
                        pIdsh.value= "";
                        document.getElementById("dynamicInputBE2").style.display = 'none';
                        document.getElementById("dynamicInputBE3").style.display = 'none';
                        document.getElementById("dynamicInputBE4").style.display = 'none';
                    }
                });
            }
        }        
	}catch(e) {
            alert(e);
        }
}

/*
 *  save data sent from here to server ..show error get from server..and refresh content
 * @param {type} table_id
 * @returns {Number}
 */
function saveallRow(tableData,tableID,search) {
    var fgo = 0,fgo1=0;
    var alts = 0,rowCount=0;
    
    try {
        if(tableData != null ){              
            for(var i=0;i<tableData.length;i++){
                var tsent = formToJSONBudget(tableData[i]);
                 var sendURL = window.location.protocol + "//" + window.location.host; 
        
               $.when(  $.ajax({
                    type: 'POST',
                    url: sendURL+'/NethPMSServer/webresources/budgetEstimation/EnterRec',
                    contentType: 'application/json; charset=utf-8',
                    data: tsent,
                    success: function(data, textStatus, jqXHR){
                        alts++;                         
                        if(alts === tableData.length)
                             alert('Budget Estimation created successfully' );
                    },
                    error: function(xhr,data, jqXHR, textStatus, thrownError, response){
                        fgo++;
                        if(xhr.status != 500) {
                            fgo1++;
                            var message = JSON.parse(xhr.responseText);                           
                            if(fgo1 === 1)                           
                            alert("Error Occurred: " + message.message);
                        }                       
                        
                        if(xhr.status === 500){    
                            if(fgo === 1){            
                                alert(xhr.responseText);
                                alert("Error Occurred: You have entered existing promotion Id and LineNo ..");
                            }
//                            var table = document.getElementById(tableID);
//                            var data = table.rows[i].cells[0].firstChild;   
//                            //var pid= document.getElementById('promoid2').style.background = "#ff1a00";
//                            data.style.background = "#ff1a00";  
                        }
                    }
                }))
                .then( function refreshAfter(){
                    var chk = document.getElementById(search).value;
                    if(chk.length > 0){
                        getID(search,tableID);
                    }else{
                        var table = document.getElementById(tableID);        
                        var rowCount1 = table.rows.length;
                        flushTable(table,rowCount1);
                        var pIdsh = document.getElementById("promoid2");
                        pIdsh.value= "";
                        document.getElementById("dynamicInputBE2").style.display = 'none';
                        document.getElementById("dynamicInputBE3").style.display = 'none';
                        document.getElementById("dynamicInputBE4").style.display = 'none';
                    }
                });
            }
//             setTimeout(function(){// wait for 5 secs(2)
//                    //location.reload(); // then reload the page.(3)
//                }, 2000);
            
        }        
	}catch(e) {
            alert(e);
        }
}

/*
 * 
 * @param {type} table_id
 * @returns {Number}
 * Validate modarated fileds are filled or not
 */
function validModifyData(table_id){        
    var table = document.getElementById( table_id );
       var inputs = table.getElementsByTagName('input'); 
       
        var count=0,stateErr=0,ok=true,ok2=true;     
        var valid = true,vType=0;
        for(var j=0;j<(inputs.length/4);j++){
           
               var data = inputs[j*4+1].value;   
               
               if(!inputs[1].new){
                    var dataPlan = table.rows[j+1].cells[3].firstChild;
                    //here check when promotion state is not planned,, planned cannot change                        
                    if(dataPlan.stateg != "Planned"){ 
                        if(dataPlan.value === "Planned"){
                            if(ok){
                                alert("planned should be 'Uuplanned' when promotion is not planned..");
                                ok=false;
                            }
                            count=-1;
                            dataPlan.style.background = "#ff1a00";
                        }else
                            dataPlan.style.background = "white";
                    }else{
                        if(dataPlan.value === "Unplanned"){ // here change unplanned -> planned when prom in planned 
                              if(ok2){
                                alert("planned should 'Planned' when promotion is planned..");
                                ok2=false;
                                }
                            count=-1;
                            dataPlan.style.background = "#ff1a00";
                        }else
                            dataPlan.style.background = "white";
                    }
                   
                    if(data.length<=0){
                        valid = false;               
                    }     

                     if(!valid){ count=-1;
                         stateErr=1;
                         inputs[j*4+1].style.background = "#ff1a00";
                     }else{
                         inputs[j*4+1].style.background = "white";
                     }     
                    
                    var data = inputs[j*4+2].value; 
                    var doData = parseFloat(data, 10);
                    if (data.length !=0  && data !=  doData.toFixed(2)){
                        vType++;
                        inputs[j*4+2].style.background = "#ff1a00";
                        alert("Amount  should be BigDecimal like 123.12 or 123 - " + data);
                    }else{
                          inputs[j*4+2].style.background = "white";
                    }                         
                   valid = true;      
                 }
        }
    
    if(stateErr === 1) alert("You Should Fill fields");
    if(count === (0) && vType === 0){
        return 1;
    }else{
         return 0;
    }           
}

/*
 * 
 * @param {type} table_id
 * @returns {Number}
 * validate table data eneter
 * chech modarated fields are filled or not
 * if not show them in red color
 */
 function validAndNext(table_id){        
      var table = document.getElementById( table_id );
       var rowLength = table.rows.length; 
        var count=0,i=1,stateErr=0,checkval=0;     
        var valid = true,vType=0;
        
        var pid= document.getElementById('promoid2');
      
        if(pid.value.length <=0){
            stateErr=1;
            count=-1;
            pid.style.background = "#ff1a00";
        }else{
           pid.style.background = "white"; 
        }
        
        for(var j=0;j<rowLength;j++){
         if(table.rows[j].cells[0].firstChild.new)  {
            for(var i=0;i<5;i++){
                var data = table.rows[j].cells[i].firstChild;   
               
                if(data.value.length<=0){
                        valid = false;               
                }     

                if(!valid){ count=-1;
                    stateErr=1;
                    data.style.background = "#ff1a00";
                }else{
                    data.style.background = "white";
                }     

                     switch(i){
                         case 0:
                             if (data.value.length != 0  && data.value != parseInt(data.value, 10) || data.value < 0 ){
                             alert(data.value)   
                             vType++;
                                 data.style.background = "#ff1a00";
                                 alert("Line No  should be plus integer - " + data.value);
                             }
                             break;
                         case 4:
                                var dataval = table.rows[j].cells[4].firstChild;    
                                if (dataval.value.length != 0  && dataval.value != parseFloat(dataval.value, 10)){
                                    vType++;
                                    dataval.style.background = "#ff1a00";
                                    alert("Amount  should be BigDecimal like 123.12 or 123 - " + dataval.value);
                                }
                             break;
                     }          
                   valid = true;  
                   checkval++;   
            }
        }
    }
    if(stateErr===1) alert("You Should Fill fields");
    if(count===(0) && vType ===0){
        return 1;
    }else{
         return 0;
    }
           
}

/*
 * 
 * @param {type} tableId
 * @param {type} rowNo
 * @returns {undefined}
 * delete only table row not from db
 */
function deleteTableRow(tableId , rowNo) {
    try {
        var table = document.getElementById(tableId);
       var delrow22 = rowNo.parentNode.parentNode.rowIndex;     
       var result = confirm("Want to delete?");
       if(result){
            table.deleteRow(delrow22);
       }
    }catch(e) {
        alert(e);
    }
}

/*
 * search using get method 
 * get data from server and sent to js fns 
 * and display data in table
 */
function getID(search,tableId){
    var vals = document.getElementById(search).value;
    var totalPromotionCost = 0;
    var totalPromotionRevenue = 0;
    
        if(vals != null && vals.length >0){
             var sendURL = window.location.protocol + "//" + window.location.host; 
        
            $.ajax({
                    type: 'get',
                    url: sendURL + '/NethPMSServer/webresources/budgetEstimation/promoId/'+vals,
                    contentType: 'application/json; charset=utf-8',
                    success: function(data, textStatus, jqXHR){
                       var dsf = data["delegate"];
                       // alert("Data: " +dsf + "\nStatus: " + status);
                        if (dsf != null && dsf.length > 0) {
                            for (var i = 0; i < dsf.length; i++) {
                                if (dsf[i].lineType === 'Expense') {
                                    if (dsf[i].amount != null)
                                        totalPromotionCost += dsf[i].amount;
                                } else {
                                    if (dsf[i].amount != null)
                                        totalPromotionRevenue += dsf[i].amount;
                                }
                            }
                        }
                        if (dsf.length > 0) {
                            addReadRow(tableId, dsf, totalPromotionCost, totalPromotionRevenue,search);
                             clickSearch();
                        }
                    },
                    error: function(xhr,data, jqXHR, textStatus, thrownError, response){
                      
                        alert(JSON.parse(xhr.responseText).message);
                        document.getElementById(search).value='';                          
                        flushErrorTable(tableId);
                    }
                });
            }else{
                alert("Please Enter PromotionID to Search..");
            }
} 

/*
 * create entity  budget estimation here
 */
function formToJSONBudget(array) {
	return JSON.stringify({
                "lineType": array[2],
		"description": array[3],
		"planned": array[4],		
		"amount": array[5],
             "budgetEstimationPK":{"promotionId":array[0],"lineNo":array[1]}		
		});
}


/*
 * Read whole table..get all cell value to array
 * @param {type} tableID
 * @returns {Array}
 */        
function readModifyData(tableID){
    var markst = [];
    
    var table = document.getElementById(tableID);
    var column_count = table.rows[0].cells.length;
    var rowLength = table.rows.length;   //gets rows of table
    var modRow = [],tempCo=0,j=0,k=0;
    
    if(rowLength>0){   
        for(var i=1;i<rowLength;i++){
             markst[k] = [];
             markst[k][0]  = document.getElementById('promoid2').value;
            for(var index = 0; index < column_count;index++){
               // marks[index-1] = table.rows[K].cells[index].value; //
                 markst[k][index+1] =table.rows[i].cells[index].firstChild.value; //
                if(table.rows[i].cells[index].firstChild.value != table.rows[i].cells[index].firstChild.oldValue){
                    tempCo = i;                   
                } 
            } 
            if(tempCo != 0){
                modRow[j++] = tempCo;
                k++;
                tempCo=0;                
            }else if(i === (rowLength - 1) ){         
                  markst.splice(k,1);       
            }
        }      
    }
return markst;
}
