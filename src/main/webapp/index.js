var flag=0;




    $(function () {
function infoinicial(){
  $.get("/infoinicial",
                              function (data) { 

// Interpolate the scales!
var headerTr$ = $('<tr/>');
var columnSet = [];
var listheaders=["0","1","2","3","4","5","6"]
for (var i = 0 ; i < listheaders.length ; i++) {
        var rowHash = listheaders[i];
            columnSet.push(rowHash);
                headerTr$.append($('<th/>').html(rowHash));
    }

var columns=columnSet;

    for (var i = 0 ; i < data["infoinicial"].length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = data["infoinicial"][i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#resumendatos").append(row$);
    }
 var tableresults = document.getElementById("resumendatos").getElementsByTagName("tr");
 for (var i = 1 ; i < tableresults.length ; i++) {
}
}, "json");
}




 function sunburststates(){

  $.get("/states",
                              function (data) { 
var dataSunburst={"name":"flare"};
var estados = []
for (var i = 0 ; i < data.estados.length ; i++){
  var element =new Object();
   element["name"] = data.estados[i][0];
   element["size"] = data.estados[i][1];
   estados.push(element)
}
dataSunburst["children"] = estados
var width = 700,
    height = 500,
    radius = Math.min(width, height)*3 / 7;

var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

var y = d3.scale.linear()
        .range([0, radius]);
var color=d3.scale.category20c();
           
var svg = d3.select("#graph2").append("svg")
 .attr("width", "100%").attr("height", "100%")
          .append("g")
          .attr("transform", "translate(" + (width / 2 )+ "," + (height / 2 + 10) + ")");

var partition = d3.layout.partition()
                .value(function(d) { return d.size; });

var arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

  root = JSON.parse( JSON.stringify(dataSunburst));
          var g = svg.selectAll("g")
                 .data(partition.nodes(root))
                 .enter().append("g")
                 .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring;
          var path = g.append("path")
                    .attr("d", arc)
                    .style("fill", function(d) { return color(d.name); })


 g.each(function(d){
    
    var thisnode= d3.select(this);

    var dify=thisnode[0][0].childNodes[0].__data__.dy//Vertical space to write the text
    var difx=thisnode[0][0].childNodes[0].__data__.dx//Horizontal space to write

          
          if(difx>0.01){//See if the space to the text is too small to display it

       thisnode.append("title")
      .text(function(d) { return d.name+": "+d.size });

             var text = thisnode.append("text")
                    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; })
                    // .attr("x", function(d) { return y(d.y); })
                      .attr("fill", "white")
                      .style("font-family", "Century Gothic,CenturyGothic,AppleGothic,sans-serif")  
                      .style("font-size", dify*28+"px")
                     // .style("text-shadow","-1px 0 #FCBF49, 0 1px #FCBF49, 1px 0 #FCBF49, 0 -1px #FCBF49")
                     .attr("dx", "-20") // margin
                     .attr("dy", ".35em") // vertical-align
                     .text(function(d) { return d.name; });
                }


  });
d3.select(self.frameElement).style("height", height + "px");
d3.select(self.frameElement).style("width", width + "px");
// Interpolate the scales!
var headerTr$ = $('<tr/>');
var columnSet = [];
var listheaders=["name","size"]
for (var i = 0 ; i < listheaders.length ; i++) {
        var rowHash = listheaders[i];
            columnSet.push(rowHash);
                headerTr$.append($('<th/>').html(rowHash));
    }

var columns=columnSet;

    for (var i = 0 ; i < root.children.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = root.children[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#results").append(row$);
    }
 var tableresults = document.getElementById("results").getElementsByTagName("tr");
 for (var i = 1 ; i < tableresults.length ; i++) {
 tableresults[i].style.backgroundColor = color(tableresults[i].cells[0].innerHTML)
 tableresults[i].style.color = "white"
}
function computeTextRotation(d) {//Rotate the text
        var ang = (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
        return (ang > 90) ? 180 + ang : ang;
  }
}, "json");

 }
 function sunburstpriority(){

  $.get("/priority",
                              function (data) { 
var dataSunburst={"name":"flare"};
var prioridades = []
for (var i = 0 ; i < data.prioridades.length ; i++){
  var element =new Object();
   element["name"] = data.prioridades[i][0];
   element["size"] = data.prioridades[i][1];
   prioridades.push(element)
}
dataSunburst["children"] = prioridades

var width = 700,
    height = 300,
    radius = Math.min(width, height)*3 / 7;

var x = d3.scale.linear()
        .range([0, 2 * Math.PI]);

var y = d3.scale.linear()
        .range([0, radius]);
  var color = d3.scale.ordinal()
  .range(["#87C540","#FCBF49","#FC9E70","#FCB514","#87C540","#CD0000","#F97242","#FCBF49","#FFD87F","#F2CE68","#F9E55B","#FFD69B","#F4E287"]); 
           
var svg = d3.select("#graph3").append("svg")
 .attr("width", "100%").attr("height", "100%")
          .append("g")
          .attr("transform", "translate(" + (width / 2 )+ "," + (height / 2 + 10) + ")");

var partition = d3.layout.partition()
                .value(function(d) { return d.size; });

var arc = d3.svg.arc()
        .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
        .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
        .innerRadius(function(d) { return Math.max(0, y(d.y)); })
        .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

  root = JSON.parse( JSON.stringify(dataSunburst));
          var g = svg.selectAll("g")
                 .data(partition.nodes(root))
                 .enter().append("g")
                 .attr("display", function(d) { return d.depth ? null : "none"; }) // hide inner ring;
          var path = g.append("path")
                    .attr("d", arc)
                    .style("fill", function(d) { return color(d.name); })


 g.each(function(d){
    
    var thisnode= d3.select(this);

    var dify=thisnode[0][0].childNodes[0].__data__.dy//Vertical space to write the text
    var difx=thisnode[0][0].childNodes[0].__data__.dx//Horizontal space to write

          
          if(difx>0.01){//See if the space to the text is too small to display it
 thisnode.append("title")
      .text(function(d) { return d.name+": "+d.size });


             var text = thisnode.append("text")
                    .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")rotate(" + computeTextRotation(d) + ")"; })
                    // .attr("x", function(d) { return y(d.y); })
                      .attr("fill", "white")
                      .style("font-family", "Century Gothic,CenturyGothic,AppleGothic,sans-serif")  
                      .style("font-size", dify*28+"px")
                     // .style("text-shadow","-1px 0 #FCBF49, 0 1px #FCBF49, 1px 0 #FCBF49, 0 -1px #FCBF49")
                     .attr("dx", "-20") // margin
                     .attr("dy", ".35em") // vertical-align
                     .text(function(d) { return d.name; });
                }


  });
d3.select(self.frameElement).style("height", height + "px");
d3.select(self.frameElement).style("width", width + "px");
// Interpolate the scales!
var headerTr$ = $('<tr/>');
var columnSet = [];
var listheaders=["name","size"]
for (var i = 0 ; i < listheaders.length ; i++) {
        var rowHash = listheaders[i];
            columnSet.push(rowHash);
                headerTr$.append($('<th/>').html(rowHash));
    }

var columns=columnSet;

    for (var i = 0 ; i < root.children.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = root.children[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#priorities").append(row$);
    }
 var tableresults = document.getElementById("priorities").getElementsByTagName("tr");
 for (var i = 1 ; i < tableresults.length ; i++) {
 tableresults[i].style.backgroundColor = color(tableresults[i].cells[0].innerHTML)
 tableresults[i].style.color = "white"
}
function computeTextRotation(d) {//Rotate the text
        var ang = (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;
        return (ang > 90) ? 180 + ang : ang;
  }
}, "json");

 }
  function bubbleschangetype(){

  $.get("/changetype",
                              function (data) { 
var dataSunburst={"name":"flare"};
var cambios = []
for (var i = 0 ; i < data.cambios.length ; i++){
  var element =new Object();
   element["name"] = data.cambios[i][0];
   element["size"] = data.cambios[i][1];
   cambios.push(element)
}
dataSunburst["children"] = cambios
var color = d3.scale.ordinal()
  .range(["#87C540","#FCBF49","#2B99FF","#CD0000","#F97242","#FCBF49","#FFD87F","#F2CE68","#F9E55B","#FFD69B","#F4E287"]);
var diameter = 400,
    format = d3.format(",d");

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#graph4").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

  root = JSON.parse( JSON.stringify(dataSunburst));
  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .attr('fill', function(d) { return color(d.className);});

   node.each(function(d){
 var thisnode= d3.select(this);
      
      thisnode.append("text")     
       .attr("fill", "white")
      .style("font-family", "Century Gothic,CenturyGothic,AppleGothic,sans-serif") 
       .style("font-size", d.r-d.r*6/8+"px")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); });


});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size, family: node.family});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");
// Interpolate the scales!
var headerTr$ = $('<tr/>');
var columnSet = [];
var listheaders=["name","size"]
for (var i = 0 ; i < listheaders.length ; i++) {
        var rowHash = listheaders[i];
            columnSet.push(rowHash);
                headerTr$.append($('<th/>').html(rowHash));
    }

var columns=columnSet;

    for (var i = 0 ; i < root.children.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = root.children[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#changes").append(row$);
    }
 var tableresults = document.getElementById("changes").getElementsByTagName("tr");
 for (var i = 1 ; i < tableresults.length ; i++) {
 tableresults[i].style.backgroundColor = color(tableresults[i].cells[0].innerHTML)
 tableresults[i].style.color = "white"
}

}, "json");

 }
   function bubblescompany(){

  $.get("/company",
                              function (data) { 
var dataSunburst={"name":"flare"};
var empresas = []
for (var i = 0 ; i < data.empresas.length ; i++){
  var element =new Object();
   element["name"] = data.empresas[i][0];
   element["size"] = data.empresas[i][1];
   empresas.push(element)
}
dataSunburst["children"] = empresas
var color = d3.scale.ordinal()
  .range(["#87C540","#FCBF49","#2B99FF","#CD0000","#F97242","#FCBF49","#FFD87F","#F2CE68","#F9E55B","#FFD69B","#F4E287"]);
var diameter = 400,
    format = d3.format(",d");

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#graph5").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

  root = JSON.parse( JSON.stringify(dataSunburst));
  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .attr('fill', function(d) { return color(d.className);});

   node.each(function(d){
 var thisnode= d3.select(this);
      
      thisnode.append("text")     
       .attr("fill", "white")
      .style("font-family", "Century Gothic,CenturyGothic,AppleGothic,sans-serif") 
       .style("font-size", d.r-d.r*6/8+"px")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); });


});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size, family: node.family});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");
// Interpolate the scales!
var headerTr$ = $('<tr/>');
var columnSet = [];
var listheaders=["name","size"]
for (var i = 0 ; i < listheaders.length ; i++) {
        var rowHash = listheaders[i];
            columnSet.push(rowHash);
                headerTr$.append($('<th/>').html(rowHash));
    }

var columns=columnSet;

    for (var i = 0 ; i < root.children.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = root.children[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#companies").append(row$);
    }
 var tableresults = document.getElementById("companies").getElementsByTagName("tr");
 for (var i = 1 ; i < tableresults.length ; i++) {
 tableresults[i].style.backgroundColor = color(tableresults[i].cells[0].innerHTML)
 tableresults[i].style.color = "white"
}

}, "json");

 }
    function bubblesusers(){

  $.get("/users",
                              function (data) { 
var dataSunburst={"name":"flare"};
var users = []
for (var i = 0 ; i < data.users.length ; i++){
  var element =new Object();
   element["name"] = data.users[i][0];
   element["size"] = data.users[i][1];
   users.push(element)
}
dataSunburst["children"] = users
console.log(dataSunburst)
var color=d3.scale.category20c();
var diameter = 400,
    format = d3.format(",d");

var bubble = d3.layout.pack()
    .sort(null)
    .size([diameter, diameter])
    .padding(1.5);

var svg = d3.select("#graph5").append("svg")
    .attr("width", diameter)
    .attr("height", diameter)
    .attr("class", "bubble");

  root = JSON.parse( JSON.stringify(dataSunburst));
  var node = svg.selectAll(".node")
      .data(bubble.nodes(classes(root))
      .filter(function(d) { return !d.children; }))
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

  node.append("title")
      .text(function(d) { return d.className + ": " + format(d.value); });

  node.append("circle")
      .attr("r", function(d) { return d.r; })
      .attr('fill', function(d) { return color(d.className);});

   node.each(function(d){
 var thisnode= d3.select(this);
      
      thisnode.append("text")     
       .attr("fill", "white")
      .style("font-family", "Century Gothic,CenturyGothic,AppleGothic,sans-serif") 
       .style("font-size", d.r-d.r*6/8+"px")
      .style("text-anchor", "middle")
      .text(function(d) { return d.className.substring(0, d.r / 3); });


});

// Returns a flattened hierarchy containing all leaf nodes under the root.
function classes(root) {
  var classes = [];

  function recurse(name, node) {
    if (node.children) node.children.forEach(function(child) { recurse(node.name, child); });
    else classes.push({packageName: name, className: node.name, value: node.size, family: node.family});
  }

  recurse(null, root);
  return {children: classes};
}

d3.select(self.frameElement).style("height", diameter + "px");
// Interpolate the scales!
var headerTr$ = $('<tr/>');
var columnSet = [];
var listheaders=["name","size"]
for (var i = 0 ; i < listheaders.length ; i++) {
        var rowHash = listheaders[i];
            columnSet.push(rowHash);
                headerTr$.append($('<th/>').html(rowHash));
    }

var columns=columnSet;

    for (var i = 0 ; i < root.children.length ; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0 ; colIndex < columns.length ; colIndex++) {
            var cellValue = root.children[i][columns[colIndex]];

            if (cellValue == null) { cellValue = ""; }

            row$.append($('<td/>').html(cellValue));
        }
        $("#users").append(row$);
    }
 var tableresults = document.getElementById("users").getElementsByTagName("tr");
 for (var i = 1 ; i < tableresults.length ; i++) {
 tableresults[i].style.backgroundColor = color(tableresults[i].cells[0].innerHTML)
 tableresults[i].style.color = "white"
}

}, "json");

 }
      setTimeout(function(){ sunburststates();}, 300);
       setTimeout(function(){ sunburstpriority();}, 300);
       setTimeout(function(){ bubbleschangetype();}, 300);
       setTimeout(function(){ bubblescompany();}, 300);
       setTimeout(function(){ infoinicial();}, 300);
       setTimeout(function(){bubblesusers();}, 300);})      
