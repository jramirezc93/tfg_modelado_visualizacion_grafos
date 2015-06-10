var flag=0;


    $(function () {

//Atienden los clicks sobre las tablas
      $('#ids_rfc tbody').on( 'click', 'tr', function () {
        if($(this).context.classList[0]=="selected"){
          $(this).removeClass('selected');
         var value=undefined
        }else{
   $(this).addClass('selected').siblings().removeClass('selected');
   var value=$(this).find('td').html();}
   
});
  $('#companies tbody').on( 'click', 'tr', function () {
if($(this).context.classList[0]=="selected"){
          $(this).removeClass('selected');
         var value=undefined
        }else{
   $(this).addClass('selected').siblings().removeClass('selected');
   var value=$(this).find('td').html();}
   
});
      $('#states tbody').on( 'click', 'tr', function () {
if($(this).context.classList[0]=="selected"){
          $(this).removeClass('selected');
         var value=undefined
        }else{
   $(this).addClass('selected').siblings().removeClass('selected');
   var value=$(this).find('td').html();}
   
});
  $('#priorities tbody').on( 'click', 'tr', function () {
if($(this).context.classList[0]=="selected"){
          $(this).removeClass('selected');
         var value=undefined
        }else{
   $(this).addClass('selected').siblings().removeClass('selected');
   var value=$(this).find('td').html();}
   
});
    $('#users tbody').on( 'click', 'tr', function () {
if($(this).context.classList[0]=="selected"){
          $(this).removeClass('selected');
         var value=undefined
        }else{
   $(this).addClass('selected').siblings().removeClass('selected');
   var value=$(this).find('td').html();}
   
});
    $('#changes tbody').on( 'click', 'tr', function () {
if($(this).context.classList[0]=="selected"){
          $(this).removeClass('selected');
         var value=undefined
        }else{
   $(this).addClass('selected').siblings().removeClass('selected');
   var value=$(this).find('td').html();}
   
});
$('.ok').on('click', function(e){
   var id_rfc= $("#ids_rfc tr.selected td:first").html();
   var company= $("#companies tr.selected td:first").html();
  var state= $("#states tr.selected td:first").html();
   var priority= $("#priorities tr.selected td:first").html();
   var user= $("#users tr.selected td:first").html();
   var change=$("#changes tr.selected td:first").html();
    search(id_rfc,company,state,priority,user,change);
});



      function listrfc(){
  $.get("/rfcs",
                              function (data) { 

// Interpolate the scales!
var headerTr$ = $('<tr/>');
var columnSet = [];
var listheaders=["0"]
for (var i = 0 ; i < listheaders.length ; i++) {
        var rowHash = listheaders[i];
            columnSet.push(rowHash);
                headerTr$.append($('<th/>').html(rowHash));
    }

var columns=columnSet;

    for (var i = 0 ; i < data["rfcs"].length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = data["rfcs"][i];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#ids_rfc").append(row$);
    }
 var tableresults = document.getElementById("ids_rfc").getElementsByTagName("tr");

}, "json");
}

      function liststates(){
  $.get("/states",
                              function (data) { 

// Interpolate the scales!
var headerTr$ = $('<tr/>');
var columnSet = [];
var listheaders=["0"]
for (var i = 0 ; i < listheaders.length ; i++) {
        var rowHash = listheaders[i];
            columnSet.push(rowHash);
                headerTr$.append($('<th/>').html(rowHash));
    }

var columns=columnSet;

    for (var i = 0 ; i < data.estados.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = data.estados[i][0];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#states").append(row$);
    }
 var tableresults = document.getElementById("states").getElementsByTagName("tr");

}, "json");
}

      function listpriorities(){
  $.get("/priority",
                              function (data) { 
// Interpolate the scales!
var headerTr$ = $('<tr/>');
var columnSet = [];
var listheaders=["0"]
for (var i = 0 ; i < listheaders.length ; i++) {
        var rowHash = listheaders[i];
            columnSet.push(rowHash);
                headerTr$.append($('<th/>').html(rowHash));
    }

var columns=columnSet;

    for (var i = 0 ; i < data.prioridades.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = data.prioridades[i][0];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#priorities").append(row$);
    }
 var tableresults = document.getElementById("priorities").getElementsByTagName("tr");

}, "json");
}
 function listcompany(){
  $.get("/company",
                              function (data) { 

var headerTr$ = $('<tr/>');
var columnSet = [];
var listheaders=["0"]
for (var i = 0 ; i < listheaders.length ; i++) {
        var rowHash = listheaders[i];
            columnSet.push(rowHash);
                headerTr$.append($('<th/>').html(rowHash));
    }

var columns=columnSet;

    for (var i = 0 ; i < data.empresas.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = data.empresas[i][0];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#companies").append(row$);
    }
 var tableresults = document.getElementById("companies").getElementsByTagName("tr");


}, "json");

 }
  function listusers(){
  $.get("/users",
                              function (data) { 

var headerTr$ = $('<tr/>');
var columnSet = [];
var listheaders=["0"]
for (var i = 0 ; i < listheaders.length ; i++) {
        var rowHash = listheaders[i];
            columnSet.push(rowHash);
                headerTr$.append($('<th/>').html(rowHash));
    }

var columns=columnSet;

    for (var i = 0 ; i < data.users.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = data.users[i][0];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#users").append(row$);
    }
 var tableresults = document.getElementById("users").getElementsByTagName("tr");


}, "json");

  }
  function listchanges(){
  $.get("/changetype",
                              function (data) { 

var headerTr$ = $('<tr/>');
var columnSet = [];
var listheaders=["0"]
for (var i = 0 ; i < listheaders.length ; i++) {
        var rowHash = listheaders[i];
            columnSet.push(rowHash);
                headerTr$.append($('<th/>').html(rowHash));
    }

var columns=columnSet;

    for (var i = 0 ; i < data.cambios.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = data.cambios[i][0];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#changes").append(row$);
    }
 var tableresults = document.getElementById("changes").getElementsByTagName("tr");


}, "json");

 }

 function updateData(data,id_rfc,company,state,priority,user,change){
  var t = $("table#results tbody").empty();
  var t = $("table#detail tbody").empty();
  var t = $("table#time tbody").empty();
 
 d3.select("svg").remove()

var width = 800, height = 700;
var color = d3.scale.category20c();
    var force = d3.layout.force()
            .charge(-200).linkDistance(40).size([width, height]);
    
     var svg = d3.select("#graph").append("svg")
            .attr("width", "100%").attr("height", "100%")
            .attr("pointer-events", "all");

var graph = JSON.parse( JSON.stringify(data));
        
        force.nodes(graph.nodes).links(graph.links).start();

        var link = svg.selectAll(".link")
                .data(graph.links).enter()
                .append("line").attr("class", "link");

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
        var columnSet = [];
    var headerTr$ = $('<tr/>');
    var nodeslist=[graph.nodes[0]['title']]
    var t = $("table#results tbody").empty();
var listheaders=["Fecha_del_Movimiento","Tipo_de_Cambio","Estado_Origen","Estado_Final", "Prioridad"] 
var listheadersdetail=["Empresa","User","ID_del_RFC","Fecha_Creacion_RFC"] 
          var tableresults = document.getElementById("results").getElementsByTagName("tr");
          var tabledetail = document.getElementById("detail").getElementsByTagName("tr");
          var oldindex=0
          var origColor="#FFFFFF"

    for (var i = 0 ; i < listheaders.length ; i++) {
        var rowHash = listheaders[i];

                columnSet.push(rowHash);
                headerTr$.append($('<th/>').html(rowHash));

    }
    $("#results").append(headerTr$);

    var columns=columnSet;

    for (var i = 0 ; i < graph.nodes.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = graph.nodes[i]['title'][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#results").append(row$);
    }



       var gnodes = svg.selectAll('g.gnode')
  .data(graph.nodes)
  .enter()
  .append('g')
  .classed('gnode', true);
var time=[]
  for(var i=0;i<graph.nodes.length;i++){
    var time_mov=new Object();
    time_mov['Fecha_Mov_num']=graph.nodes[i]["title"]["Fecha_Mov_num"]
    time.push(time_mov);
  }

// Add one circle in each group
var lastmovetime
var node = gnodes.append("circle")
  .attr("class", function (d) { return "node "+d.label })
  .attr("r", function(d){
    

    var indexvalue=d['index']
    var nextvalue=indexvalue+1
    if(time[nextvalue]==undefined){
    return 10
  }else{

      if((time[nextvalue]['Fecha_Mov_num']-time[indexvalue]['Fecha_Mov_num'])<10){
        return 10
      }
     else if((time[nextvalue]['Fecha_Mov_num']-time[indexvalue]['Fecha_Mov_num'])>40){
      return 40
        }else{
         return (time[nextvalue]['Fecha_Mov_num']-time[indexvalue]['Fecha_Mov_num'])
        }
    
}

  })
  .attr("fill",function(d){return color(d.title.Estado_Final)})
  .call(force.drag);

// Append the labels to each group
var labels = gnodes.append("text")
  .attr("x", function(d){return d.x-d.x-15})
  .text(function(d) { return d.title.Estado_Final; });

        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });

        gnodes.attr("transform", function(d) { 
        return 'translate(' + [d.x, d.y] + ')'; 
    });
        });

         var valuetime=graph["nodes"][graph["nodes"].length-1]["title"]["Fecha_Mov_num"]-graph["nodes"][0]["title"]["Fecha_Cre_num"]
                      var dias =parseInt(valuetime)
                      var horas = parseInt((valuetime-dias)*24)
                      var minutos = parseInt((((valuetime-dias)*24)-horas)*60)
                      var stringtime= dias+" Días , "+horas+" horas y "+minutos+" minutos"
                      var t = $("table#time tbody").empty(); 
                            $("<tr><td>" + stringtime +"</td></tr>").appendTo(t)

        gnodes.selectAll("circle").on("click", function(d){
          tableresults[oldindex].style.backgroundColor = origColor; 
          var t = $("table#detail tbody").empty();
              var headerTrdetail$ = $('<tr/>');
                  var columnSetdetail = [];

        for (var i = 0 ; i < listheadersdetail.length ; i++) {
        var rowHashdetail = listheadersdetail[i];
                columnSetdetail.push(rowHashdetail);
                headerTrdetail$.append($('<th/>').html(rowHashdetail));

    }
    $("#detail").append(headerTrdetail$);
 var columnsdetail=columnSetdetail
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columnsdetail.length ; colIndex++) {
            var cellValue = d['title'][columnsdetail[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));

        }
        $("#detail").append(row$);
        tabledetail[2].style.backgroundColor = color(d.title.Estado_Final)
     oldindex=d.index+2 ;
     origColor=tableresults[d.index+2].style.backgroundColor ; 
        tableresults[d.index+2].style.backgroundColor = color(d.title.Estado_Final); 

                                    
    })

      flag=1

    

    
 }
        function search(id_rfc,company,state,priority,user,change) {
           var t = $("table#results tbody").empty();
  var t = $("table#detail tbody").empty();
  var t = $("table#time tbody").empty();
            d3.select("svg").remove()
            $.get("/graph?q=" + encodeURIComponent(id_rfc) +"&c=" +encodeURIComponent(company)+"&s=" +encodeURIComponent(state)+"&p=" +encodeURIComponent(priority)
            +"&u="+encodeURIComponent(user)+"&ch="+encodeURIComponent(change) ,
                              function (data) { 

          if(data['nodes'][0]['title'].Order==0){
  //Create one node that show the origin
 var element =new Object();
          element["label"] = "rfc";
          var nodeinicial=new Object();
          nodeinicial.Estado_Final=data['nodes'][0]['title'].Estado_Origen
          nodeinicial.Estado_Origen="-"
          nodeinicial.Fecha_Mov_num=data['nodes'][0]['title'].Fecha_Cre_num
          nodeinicial.Fecha_del_Movimiento=data['nodes'][0]['title'].Fecha_Creacion_RFC
          nodeinicial.Fecha_Cre_num=data['nodes'][0]['title'].Fecha_Cre_num
          nodeinicial.Fecha_Creacion_RFC=data['nodes'][0]['title'].Fecha_Creacion_RFC
          nodeinicial.Tipo_de_Cambio=data['nodes'][0]['title'].Tipo_de_Cambio
          nodeinicial.Prioridad=data['nodes'][0]['title'].Prioridad
          nodeinicial.Empresa=data['nodes'][0]['title'].Empresa
          nodeinicial.User=data['nodes'][0]['title'].User
          nodeinicial.ID_del_RFC=data['nodes'][0]['title'].ID_del_RFC
          element["title"] = nodeinicial;
          data['nodes'].unshift(element)
 var elementlinks =new Object();
          elementlinks["source"] = data.nodes.length-1;
          elementlinks["target"] = data.nodes.length-2;
          data['links'].push(elementlinks)}

    var width = 800, height = 700;
var color = d3.scale.category20c();
    var force = d3.layout.force()
            .charge(-200).linkDistance(40).size([width, height]);
    
     var svg = d3.select("#graph").append("svg")
            .attr("width", "100%").attr("height", "100%")
            .attr("pointer-events", "all");

    if(flag){
        svg.remove();
        console.log("flag");
     updateData(data, id_rfc,company,state,priority,user)
    }else{


  var graph = JSON.parse( JSON.stringify(data));
        force.nodes(graph.nodes).links(graph.links).start();

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records
    var columnSet = [];
    var headerTr$ = $('<tr/>');
    var nodeslist=[graph.nodes[0]['title']]
    var t = $("table#results tbody").empty();
var listheaders=["Fecha_del_Movimiento","Tipo_de_Cambio","Estado_Origen","Estado_Final", "Prioridad"] 
var listheadersdetail=["Empresa","User","ID_del_RFC","Fecha_Creacion_RFC"] 
         var tableresults = document.getElementById("results").getElementsByTagName("tr");
          var tabledetail = document.getElementById("detail").getElementsByTagName("tr");
          var oldindex=0
          var origColor="#FFFFFF"
    
    for (var i = 0 ; i < listheaders.length ; i++) {
        var rowHash = listheaders[i];

                columnSet.push(rowHash);
                headerTr$.append($('<th/>').html(rowHash));

    }
    $("#results").append(headerTr$);

    var columns=columnSet;

    for (var i = 0 ; i < graph.nodes.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = graph.nodes[i]['title'][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#results").append(row$);
    }




        var link = svg.selectAll(".link")
                .data(graph.links).enter()
                .append("line").attr("class", "link");

var gnodes = svg.selectAll('g.gnode')
  .data(graph.nodes)
  .enter()
  .append('g')
  .classed('gnode', true);

var time=[]
  for(var i=0;i<graph.nodes.length;i++){
    var time_mov=new Object();
    time_mov['Fecha_Mov_num']=graph.nodes[i]["title"]["Fecha_Mov_num"]
    time.push(time_mov);
  }

// Add one circle in each group
var lastmovetime
var node = gnodes.append("circle")
  .attr("class", function (d) { return "node "+d.label })
  .attr("r", function(d){
    

    var indexvalue=d['index']
    var nextvalue=indexvalue+1
    if(time[nextvalue]==undefined){
    return 10
  }else{

      if((time[nextvalue]['Fecha_Mov_num']-time[indexvalue]['Fecha_Mov_num'])<10){
        return 10
      }
     else if((time[nextvalue]['Fecha_Mov_num']-time[indexvalue]['Fecha_Mov_num'])>40){
      return 40
        }else{
         return (time[nextvalue]['Fecha_Mov_num']-time[indexvalue]['Fecha_Mov_num'])
        }
    
}

  })
  .attr("fill",function(d){return color(d.title.Estado_Final)})
  .call(force.drag);

// Append the labels to each group
var labels = gnodes.append("text")
  .attr("x", function(d){return d.x-d.x-15})
  .text(function(d) { return d.title.Estado_Final; });

        force.on("tick", function() {
            link.attr("x1", function(d) { return d.source.x; })
                    .attr("y1", function(d) { return d.source.y; })
                    .attr("x2", function(d) { return d.target.x; })
                    .attr("y2", function(d) { return d.target.y; });
        gnodes.attr("transform", function(d) { 
        return 'translate(' + [d.x, d.y] + ')'; 
    });
        });
  //Calculate time of the nodes
  var valuetime=graph["nodes"][graph["nodes"].length-1]["title"]["Fecha_Mov_num"]-graph["nodes"][0]["title"]["Fecha_Cre_num"]
                      var dias =parseInt(valuetime)
                      var horas = parseInt((valuetime-dias)*24)
                      var minutos = parseInt((((valuetime-dias)*24)-horas)*60)
                      var stringtime= dias+" Días , "+horas+" horas y "+minutos+" minutos"
                      var t = $("table#time tbody").empty(); 
                            $("<tr><td>" + stringtime +"</td></tr>").appendTo(t)

        gnodes.selectAll("circle").on("click", function(d){

     
      tableresults[oldindex].style.backgroundColor = origColor; 
          var t = $("table#detail tbody").empty();
              var headerTrdetail$ = $('<tr/>');
                  var columnSetdetail = [];

        for (var i = 0 ; i < listheadersdetail.length ; i++) {
        var rowHashdetail = listheadersdetail[i];
                columnSetdetail.push(rowHashdetail);
                headerTrdetail$.append($('<th/>').html(rowHashdetail));

    }
    $("#detail").append(headerTrdetail$);
 var columnsdetail=columnSetdetail
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columnsdetail.length ; colIndex++) {
            var cellValue = d['title'][columnsdetail[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
            
        }
        $("#detail").append(row$);
        tabledetail[2].style.backgroundColor = color(d.title.Estado_Final)
     oldindex=d.index+2 ;
     origColor=tableresults[d.index+2].style.backgroundColor ; 
    tableresults[d.index+2].style.backgroundColor = color(d.title.Estado_Final); 

    })

      flag=1
  }
    
                        
                    },


             "json");            
            return false;
        }
       setTimeout(function(){ listrfc();}, 300);
       setTimeout(function(){ listcompany();}, 300);
       setTimeout(function(){ listpriorities();}, 300);
       setTimeout(function(){ liststates();}, 300);
       setTimeout(function(){ listusers();}, 300);
       setTimeout(function(){ listchanges();}, 300);})
    
