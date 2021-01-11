// https://observablehq.com/@tempandreaarmani/companies-stocks-per-sector/2@2048
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["news@1.csv","https://static.observableusercontent.com/files/4adb15c063b9ebe80ed30d096434263a9c80a87d7e671a34d96c10674babb78d5569db52ca9564efaa107defc1c40e60a8cd4361bff70fcd6bf153b69c202790"],["comp@3.csv","https://static.observableusercontent.com/files/4e11ff78ce1d27b8fedf8986dc7f30394af2c22b84355e53e28ddf067f3cb65728ddb3ffafc1c34de4b786c1aa21d5bf0487b19baa5a78226927a7fe43b49176"],["personal@1.json","https://tempandreaarmani.static.observableusercontent.com/files/55bd5574bc37d4591d67510fc1527f306a0adbe2354d330231532aecbef6deeecef05fa6455dde1cb0e951c3e689f1df1beed3558d2a0b74758fbbdec39b6e73?Expires=1610366400000&Key-Pair-Id=APKAJCHFJLLLU4Y2WVSQ&Signature=M-qFmaSnwGuxOnxSf5WcRWT2P7mlzxwX5drfOHfOzcQ21JCbeSsNaM4f-YlNjhVwErv2ybYbKbaVQ7XFE3d8qvKHTPMTvEW0He0YOCrCNFNGvGo3ZvQE3z1gvk7rlaeDNl3TJ8nOZrQl5-2U0dmj13IfCGWM6Jks4gbkEl4rAPLoZcKsc3L38SxaAuUbgXZDkPnF~iXRWGOdy4EwY6QjpqCCJiRyVA3DzzmkNe1vSHFCxFEk6QLpotzBJi~3ib7jRYK~cPWrzhpwY0Eg~RLM5WqI9wpizTKeJdJjFeAq5o5T3UBZ1Eutl3naxVTOQh-Z930CwJv0gJbfr5JeSGOfxQ__"],["personal.json","https://tempandreaarmani.static.observableusercontent.com/files/44fb1b34acc7f2920a29cc8bea9686567a6ae8c8f256ee3607a468df72a446a570657d82de395c9cd79034dff0bc2f8aed04eea32aa1bb0559ad2e94943292fd?Expires=1610366400000&Key-Pair-Id=APKAJCHFJLLLU4Y2WVSQ&Signature=Bf0Bm5iTKg4cXYtRnAeOzW85C3pbwWvix8Jh2hovPXV850DSfVxNpsczJjjx-WSi~-cSOlt6RKP47OrOgA6qotjEug9BMX4TGwXPAx7EgQ~fRwa3FFf9zTVfdMOZUGoB7l6kZZ7E9LADFKy80SrXxi9JjB1p8QT22R5I4p~XzA9ZQ2GrlJoL3yoXksIEyZPq5oYrVY7TLv3VH0A6z81chGIWHvmSTEsHYbxfDlu8evA2rrXYs-uqkmC9lx~NxWWzEb2F5b3VeJgPR8l2bRKz7WfdD~arl6RQDx-VzW6xjTz53gBVwsBKDl0w1~q87MBf6GGY6MaOMeoINNMQmLJ4XA__"],["personal@2.json","https://static.observableusercontent.com/files/90458f0e1b91bc8653d8562102c5b7dd2393c502c4c3e7ef1fc80cec8da3d7135d708746ae8155eb0e54e990036e91147d89abdedc317b35eabae5035ba0c147"],["comp.csv","https://static.observableusercontent.com/files/0fe1d60e4807a154c0364d087fa86a4ed3adfbd58e6c194cee8f758a94391f9199c706b046a8f323094ad7c62c19b73a29c4c688236acc4c84b4fbd125d223fb"],["news.csv","https://static.observableusercontent.com/files/ada923b9a7658f31b5d177b19990c338c0eccae530018f4470bc9e589dc464296c48ab68ef5bfb7bd309bceb26d8ca80b38c836dee59a96d42f277976a1355cd"]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Companies Stocks per Sector 

Click to zoom in or out.`
)});
  main.variable(observer("chart")).define("chart", ["pack","data","d3","width","height","hightlight_news","color_sectors","viewof company","viewof companyname"], function(pack,data,d3,width,height,hightlight_news,color_sectors,$0,$1)
{
  
const root = pack(data);
  let focus = root;
  let view;

  const svg = d3.create("svg").attr("id",'vis')
      .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
      .style("display", "block")
      .style("margin", "0 -14px")
      .style("background", "#003344")
      .style("cursor", "pointer")
      .on("click", (event) => zoom(event, root));

  const node = svg.append("g") // append the group of descendants 
    .selectAll("circle")
    .data(root.descendants().slice(1)) // remove the root
    .join("circle") // Add the circles to the plot
    .attr("stroke", d => d.children ? "none" : hightlight_news(d.data.has_news))
    .attr("stroke-width", 3)
    .attr("fill", d => d.children ? color_sectors(d.data.name) : "white") // color the depth
      .on("mouseover", function() { d3.select(this).attr("stroke", "#000"); }) // Add the contour on mouseover
      .on("mouseout", function() { d3.select(this).attr("stroke", d => d.children ? "none" :                                                                       hightlight_news(d.data.has_news)); }) // revert the contour on mouseout
      .on("click", function(event, d) { // on click function
        focus !== d && (zoom(event, d), event.stopPropagation())
        $0.value = d.data.name;
        $0.dispatchEvent(new CustomEvent("input")); 
        $1.value = d.data.name;
        $1.dispatchEvent(new CustomEvent("input")); 
      });
  
  
    const label1 = svg.append("g")
      .style("font", "12px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .selectAll("text")
      .data(root.descendants())
      .join("text")
      .style("fill-opacity", d => d.parent === root ? 1 : 0)
      .style("display", d => d.parent === root ? "inline" : "none")
      .text(function(d) { 
                          var name = d.data.name.replace(",Inc.","").replace("Inc.","").replace(", S.A.","").replace("Corporation","").replace(", Ltd.","").replace("Ltd.","").replace(",","")
                          if(name.split(" ").length < 3)  return name
                          else{
                            var l = name.split(" ");
                            var str = "";
                            var i;
                            for(i = 0; i < l.length; i++){
                              str += l[i]+"\n";
                              if(i == 1) break
                            }
                            return str;
                          }
                            
                             }
      );
  
    const labelleaves = svg.append("g")
      .style("font", "20px sans-serif")
      .attr("pointer-events", "none")
      .attr("text-anchor", "middle")
    .selectAll("text")
    .data(root.leaves())
    .join("text")
      .style("fill-opacity", d => d.parent === root ? 1 : 0)
      .style("display", d => d.parent === root ? "inline" : "none")
      .text(d => d.data.name + " (see the linechart below)");
  
  zoomTo([root.x, root.y, root.r * 2]);

  function zoomTo(v) {
    const k = width / v[2];

    view = v;

    label1.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
    
    labelleaves.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("transform", d => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`);
    node.attr("r", d => d.r * k);
  }

  function zoom(event, d) {
    const focus0 = focus;
    if (focus0 == d){
      focus = d.parent;
    }
    else{
      if (focus0 == d.parent){
        focus = d;
      }
      else{
        focus = d.parent;
      }
    }
    const transition = svg.transition()
        .duration(event.altKey ? 7500 : 750)
        .tween("zoom", d => {
          const i = d3.interpolateZoom(view, [focus.x, focus.y, focus.r * 2]);
          return t => zoomTo(i(t));
        });

    label1
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d.parent === focus ? 1 : 0)
        .on("start", function(d) { 
          if (d.ancestors().some(x => x === focus)) this.style.display = "inline"; })
    
  labelleaves
      .filter(function(d) { return d.parent === focus || this.style.display === "inline"; })
      .transition(transition)
        .style("fill-opacity", d => d === focus ? 1 : 0)
        .on("start", function(d) { if (d.ancestors().some(x => x === focus)) this.style.display = "inline"; });  
  
  }
        
  // Add legend for the bubble sizes
        
// The scale used for bubble size
var size = d3.scaleSqrt()
    .domain([1, 100])  // What's in the data, let's say it is percentage
    .range([1, 100])  // Size in pixel

var valuesToShow = [10, 50, 100]
var xCircle = 400
var xLabel = 400
var yCircle = -350
var yLabel = -330

svg.selectAll("legend")
    .data(valuesToShow)
    .enter()
    .append("circle")
    .attr("cx", xCircle)
    .attr("cy", function(d){ return yCircle-size(d)/2 } )
    .attr("r", function(d){ return size(d)/2 })
    .style("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-width", 2)
    .text("Current stock value");
        
svg.append("text")
    .attr("id", "on")
    .style("font", "12px sans-serif")
    .attr("text-anchor", "middle")
    .attr("dx",xLabel)
    .attr("dy",yLabel)
    .attr("fill", "white")
    .text("Current stock value");
    
return svg.node();
}
);
  main.variable(observer("chart1")).define("chart1", ["d3","DOM","width","height1","xAxis1","yAxis1","stock_to_show","line","news_points","x1","y1","get_y_position","min_data_line","max_data_line","bisect","callout","formatValue","formatDate","companyname"], function(d3,DOM,width,height1,xAxis1,yAxis1,stock_to_show,line,news_points,x1,y1,get_y_position,min_data_line,max_data_line,bisect,callout,formatValue,formatDate,companyname)
{
  const svg = d3.select(DOM.svg(width, height1))
      .style("-webkit-tap-highlight-color", "transparent")
      .style("overflow", "visible");

  svg.append("g")
      .call(xAxis1);

  svg.append("g")
      .call(yAxis1);
  
  svg.append("path")
      .datum(stock_to_show)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .attr("d", line);

  const tooltip = svg.append("g");
  
  //add the news (points)
  const p =  svg.append("g")
      .attr("id", "v_lines");
 
      p.attr("stroke", "#000")
      .attr("stroke-opacity", 0.5)
      .selectAll("circle")
      .data(news_points)
      .join("line")
      .attr("x1", d => x1(d.date))
      .attr("y1", d => y1(get_y_position(min_data_line)))
      .attr("x2", d => x1(d.date))
      .attr("y2", d => y1(max_data_line))
      .attr("r", 2.5);
  
  //add on/off button
  const bb =  svg.append("circle")
      .attr("id", "button");
  
      bb.attr("stroke", "#000")
      .attr("stroke-opacity", 0.5)
      .attr("cx", 100)
      .attr("cy", 50)
      .attr('r', 31)
      .attr("fill", "green")
      .text("fdsfds")
      .on("click", function() {
              if(d3.select(this).style("fill") == "green"){
                d3.select("g#v_lines").selectAll("line").style("visibility" , "hidden");
                d3.select(this).style("fill", "red");
                d3.select("text#on").text("News: OFF");
              }
              else{
                d3.select("g#v_lines").selectAll("line").style("visibility" , "visible");
                d3.select(this).style("fill", "green");
                d3.select("text#on").text("News: ON");
              }
      })
      .on("mouseover", function() {
            d3.select(this).style("cursor", "pointer");
      });
  
  svg.append("text")
      .attr("id", "on")
      .style("font", "12px sans-serif")
      //.attr("pointer-events", "none")
      .attr("text-anchor", "middle")
      .attr("dx",100)
      .attr("dy",50)
      .attr("fill", "white")
      .text("News: ON");

  svg.on("touchmove mousemove", function(event) {
    const {date, value} = bisect(d3.pointer(event, this)[0]);

    tooltip
        .attr("transform", `translate(${x1(date)},${y1(value)})`)
        .call(callout, `Stock price: ${formatValue(value)}
Date: ${formatDate(date)}`);
  });

   svg.on("touchend mouseleave", () => tooltip.call(callout, null));
  
  // annotation layer to keep labels on top of data
  svg.append("g").attr("id", "annotation");
  
  svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", 10)
        .attr("text-anchor", "middle")  
        .style("font-size", "40px") 
        .style("text-decoration", "underline")  
        .text(companyname);

  return svg.node();
}
);
  main.variable(observer()).define(["md"], function(md){return(
md`

### Highlight

`
)});
  main.variable(observer("vertical_lines")).define("vertical_lines", ["d3","chart1"], function(d3,chart1){return(
d3.select(chart1).select("g#v_lines").selectAll("line")
  .style("stroke-width", 4)
  .style("stroke", "silver")
  .style("stroke-dasharray", ("10,2"))
)});
  main.variable(observer("annotations")).define("annotations", ["d3","chart1"], function(d3,chart1){return(
d3.select(chart1).select("g#annotation")
)});
  main.variable(observer("hover")).define("hover", ["d3","chart1","html","vertical_lines","bisect","y1","get_y_position","min_data_line","callout","formatDate","returnCaption","returnLink","annotations"], function(d3,chart1,html,vertical_lines,bisect,y1,get_y_position,min_data_line,callout,formatDate,returnCaption,returnLink,annotations)
{
  const svg = d3.select(chart1);
  
  // used to test out interactivity in this cell
  const status = html`<code>hover: none</code>`;
  
  const tooltip = svg.append("g");

  vertical_lines.on("mouseover.hover", function(event) {
      const {date, value} = bisect(d3.pointer(event, this)[0]);
      //let me = d3.select(this);
      //let div = d3.select("body").append("div");
    
      //highlight
      d3.select(this).raise() // bring to front
        .style("stroke", "red")
        .style("stroke-width", 4);
      
      d3.select(this).style("cursor", "pointer")
    
      //tooltip.attr("transform", `translate(${x1(date)},${y1(get_y_position(min_data_line))})`)
    tooltip.attr("transform", `translate(${500},${y1(get_y_position(min_data_line))})`)
        .call(callout, `Click the line to hide 
Date: ${formatDate(date)}
Twitter title: ${returnCaption(date)}
${returnLink(date)}`);
    
       // show what we interacted with
       d3.select(status).text("highlight: " + "gfd");
    });

  vertical_lines.on("mousemove.hover", function(d) {
      let div = d3.select("div#details");
    
      // get height of tooltip
      let bbox = div.node().getBoundingClientRect();
    
      div.style("left", d3.event.clientX + "px")
      div.style("top",  (d3.event.clientY - bbox.height) + "px");
    

    });
  
  vertical_lines.on("click.hover", function(d) {
      d3.select(this).style("stroke", null);
      annotations.select("text#label").remove();
      d3.select(status).text("hover: none");
      d3.selectAll("div#details").remove();
      tooltip.call(callout, null)
      d3.select(status).text("hover: none");
    });
  
  return status;
}
);
  main.variable(observer("data")).define("data", ["FileAttachment"], function(FileAttachment){return(
FileAttachment("personal@2.json").json()
)});
  main.variable(observer("pack")).define("pack", ["d3","width","height"], function(d3,width,height){return(
data => d3.pack()
    .size([width, height])
    .padding(3)
  (d3.hierarchy(data)
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value))
)});
  main.variable(observer("width")).define("width", function(){return(
932
)});
  main.variable(observer("height")).define("height", ["width"], function(width){return(
width
)});
  main.variable(observer("format")).define("format", ["d3"], function(d3){return(
d3.format(",d")
)});
  main.variable(observer("modal")).define("modal", ["d3"], function(d3){return(
d3.p
)});
  main.variable(observer("color")).define("color", ["d3"], function(d3){return(
d3.scaleLinear()
    .domain([0, 5])
    .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
    .interpolate(d3.interpolateHcl)
)});
  main.variable(observer("color_sectors_old")).define("color_sectors_old", function(){return(
function() {
  switch(arguments[0]) {
  case "Healthcare":
    return "#d53e4f";
    break;
  case "Industrials":
    return "#99d594"
    break;
  case "Basic Materials":
    return "#e6f598"
    break;
  case "Energy":
    return "#66c2a5"
    break;
  case "Financial Services":
    return "#ffe680"
    break;
  case "Utilities":
    return "#7FA1BB"
    break;
  case "Consumer Cyclical":
    return "#9966ff"
    break;
  case "Consumer Defensive":
    return "#ddccff"
    break;
  case "Technology":
    return "#f46d43"
    break;
  case "Communication Services":
    return "#fc8d59"
    break;
  case "Real Estate":
    return "#5e4fa2"
    break;
  default:
    return "blue"
  }
}
)});
  main.variable(observer("color_sectors")).define("color_sectors", function(){return(
function() {
  switch(arguments[0]) {
  case "Healthcare":
    return "#FEAAFF";
    break;
  case "Industrials":
    return "#FF9090"
    break;
  case "Basic Materials":
    return "#ABE694"
    break;
  case "Energy":
    return "#B8BBFF"
    break;
  case "Financial Services":
    return "#D6ADFF"
    break;
  case "Utilities":
    return "#FFAF74"
    break;
  case "Consumer Cyclical":
    return "#FFA7A7"
    break;
  case "Consumer Defensive":
    return "#A2E7CD"
    break;
  case "Technology":
    return "#D7D7D7"
    break;
  case "Communication Services":
    return "#ADB7FF"
    break;
  case "Real Estate":
    return "#FFD288"
    break;
  default:
    return "blue"
  }
}
)});
  main.variable(observer("hightlight_news")).define("hightlight_news", function(){return(
function() {
  if(arguments[0] == 1)
      return "#228B22"
  else
      return "none"
}
)});
  main.variable(observer("get_y_position")).define("get_y_position", function(){return(
function() {
  if(arguments[0] > 80 && arguments[0] < 200)
      return 50
  else if(arguments[0] > 200)
      return arguments[0]/2
  else if (arguments[0] - 10 > 0)
      return arguments[0] - 10
  else
      return arguments[0]
}
)});
  main.variable(observer("viewof company")).define("viewof company", ["html"], function(html){return(
html`<input>`
)});
  main.variable(observer("company")).define("company", ["Generators", "viewof company"], (G, _) => G.input(_));
  main.variable(observer("data_line")).define("data_line", ["raw_data_line","company"], function(raw_data_line,company){return(
raw_data_line.filter(function(d){ return d.name == company })
)});
  main.variable(observer("stock_to_show")).define("stock_to_show", ["data_line","start_date","end_date"], function(data_line,start_date,end_date){return(
data_line.filter(function(d){ return d.date.toISOString() >= start_date && d.date.toISOString() <= end_date})
)});
  main.variable(observer("max_data_line")).define("max_data_line", ["d3","stock_to_show"], function(d3,stock_to_show){return(
d3.max(stock_to_show, function(d) { return +d.value;} )
)});
  main.variable(observer("min_data_line")).define("min_data_line", ["d3","stock_to_show"], function(d3,stock_to_show){return(
d3.min(stock_to_show, function(d) { return +d.value;} )
)});
  main.variable(observer("raw_data_line")).define("raw_data_line", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
(d3.tsvParse(await FileAttachment("comp.csv").text(), d3.autoType)).map(({date, stock, company}) => ({date: date, value: stock, name: company}))
)});
  main.variable(observer("news_points")).define("news_points", ["news_raw_data","company","start_date","end_date"], function(news_raw_data,company,start_date,end_date){return(
news_raw_data.filter(function(d){ return d.name == company && d.date.toISOString() >= start_date && d.date.toISOString() <= end_date})
)});
  main.variable(observer("news_raw_data")).define("news_raw_data", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
(d3.tsvParse(await FileAttachment("news.csv").text(), d3.autoType)).map(({text, date, link, Company}) => ({text:text, date: date, link: link, name: Company}))
)});
  main.variable(observer("callout")).define("callout", function(){return(
(g, value) => {
  if (!value) return g.style("display", "none");

  g
      .style("display", null)
      .style("pointer-events", "none")
      .style("font", "15px sans-serif");

  const path = g.selectAll("path")
    .data([null])
    .join("path")
      .attr("fill", "white")
      .attr("stroke", "black");

  const text = g.selectAll("text")
    .data([null])
    .join("text")
    .call(text => text
      .selectAll("tspan")
      .data((value + "").split(/\n/))
      .join("tspan")
        .attr("x", 0)
        .attr("y", (d, i) => `${i * 1.1}em`)
        .style("font-weight", (_, i) => i ? null : "bold")
        .text(d => d));

  const {x, y, width: w, height: h} = text.node().getBBox();

  text.attr("transform", `translate(${-w / 2},${15 - y})`);
  path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
  

}
)});
  main.variable(observer("x1")).define("x1", ["d3","stock_to_show","margin","width"], function(d3,stock_to_show,margin,width){return(
d3.scaleUtc()
    .domain(d3.extent(stock_to_show, d => d.date))
    .range([margin.left, width - margin.right])
)});
  main.variable(observer("y1")).define("y1", ["d3","stock_to_show","height1","margin"], function(d3,stock_to_show,height1,margin){return(
d3.scaleLinear()
    .domain([0, d3.max(stock_to_show, d => d.value)]).nice()
    .range([height1 - margin.bottom, margin.top])
)});
  main.variable(observer("xAxis1")).define("xAxis1", ["height1","margin","d3","x1","width"], function(height1,margin,d3,x1,width){return(
g => g
    .attr("transform", `translate(0,${height1 - margin.bottom})`)
    .call(d3.axisBottom(x1).ticks(width / 80).tickSizeOuter(0))
)});
  main.variable(observer("yAxis1")).define("yAxis1", ["margin","d3","y1","stock_to_show"], function(margin,d3,y1,stock_to_show){return(
g => g
    .attr("transform", `translate(${margin.left},0)`)
    .call(d3.axisLeft(y1))
    .call(g => g.select(".domain").remove())
    .call(g => g.select(".tick:last-of-type text").clone()
        .attr("x", 3)
        .attr("text-anchor", "start")
        .attr("font-weight", "bold")
        .text(stock_to_show.y))
)});
  main.variable(observer("line")).define("line", ["d3","x1","y1"], function(d3,x1,y1){return(
d3.line()
    .curve(d3.curveStep)
    .defined(d => !isNaN(d.value))
    .x(d => x1(d.date))
    .y(d => y1(d.value))
)});
  main.variable(observer("formatValue")).define("formatValue", function(){return(
function formatValue(value) {
  return value.toLocaleString("en", {
    style: "currency",
    currency: "USD"
  });
}
)});
  main.variable(observer("formatDate")).define("formatDate", function(){return(
function formatDate(date) {
  return date.toLocaleString("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  });
}
)});
  main.variable(observer("returnCaption")).define("returnCaption", ["news_points"], function(news_points){return(
function returnCaption(date) {
  var original_date = new Date(date).toISOString().toString().substring(0,10); 
  var n_words = 0;
  var last_char = 0;
  var final_caption = ''
  for(var i = 0; i<news_points.length;i++){
    var np_original_date = new Date(news_points[i].date).toISOString().toString().substring(0,10);
    if (np_original_date == original_date){
      var str = news_points[i].text;
      for(var j = 0; j < str.length; j++){
        if(str[j] == ' '){
          n_words = n_words + 1;
          if(n_words == 4){
            final_caption = final_caption + str.substring(last_char,j) + '\n';
            n_words = 0;
            last_char = j;
          }
        }
      }
      return final_caption + str.substring(last_char,str.length);
    }
  }
  return str;
}
)});
  main.variable(observer()).define(["news_points"], function(news_points){return(
news_points
)});
  main.variable(observer("returnLink")).define("returnLink", ["news_points","viewof original_link"], function(news_points,$0){return(
function returnLink(date) {
  var original_date = new Date(date).toISOString().toString().substring(0,10);
  var str = '' 
  for(var i = 0; i<news_points.length;i++){
    var np_original_date = new Date(news_points[i].date).toISOString().toString().substring(0,10);
    if (np_original_date == original_date){
      $0.value = news_points[i].link;
      $0.dispatchEvent(new CustomEvent("input")); 
      return '';
    }
  }
  return str;
}
)});
  main.variable(observer("returnTest")).define("returnTest", ["news_points"], function(news_points){return(
function returnTest(date) {
  var original_date = new Date(date).toISOString().toString().substring(0,10);
  var str = '' 
  for(var i = 0; i<news_points.length;i++){
    var np_original_date = new Date(news_points[i].date).toISOString().toString().substring(0,10);
    if (np_original_date == original_date){
      var begin = "<a href='"
      var link = news_points[i].link;
      var end = ">link to article</a>"
      return begin + link + end; 
    }
  }
  return str;
}
)});
  main.variable(observer()).define(["returnCaption"], function(returnCaption){return(
returnCaption('2020-09-03')
)});
  main.variable(observer("bisect")).define("bisect", ["d3","x1","stock_to_show"], function(d3,x1,stock_to_show)
{
  const bisect = d3.bisector(d => d.date).left;
  return mx => {
    const date = x1.invert(mx);
    const index = bisect(stock_to_show, date, 1);
    const a = stock_to_show[index - 1];
    const b = stock_to_show[index];
    const c = stock_to_show[0];
    return b && (date - a.date > b.date - date) ? b : a;
  };
}
);
  main.variable(observer("margin")).define("margin", function(){return(
{top: 20, right: 30, bottom: 30, left: 40}
)});
  main.variable(observer("height1")).define("height1", function(){return(
600
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  main.variable(observer("date")).define("date", ["input"], function(input){return(
function date(config = {}) {
  const { min, max, value, title, description, disabled, display } =
    typeof config === "string" ? { value: config } : config;
  return input({
    type: "date",
    title,
    description,
    display,
    attributes: { min, max, disabled, value }
  });
}
)});
  main.variable(observer("start_date")).define("start_date", ["start"], function(start){return(
new Date(start).toISOString()
)});
  main.variable(observer("end_date")).define("end_date", ["end"], function(end){return(
new Date(end).toISOString()
)});
  main.variable(observer("viewof start")).define("viewof start", ["date"], function(date){return(
date({
  title: "2019-2020", 
  min: "2019-09-02",
  max: "2020-12-31",
  value: "2019-09-02",
  description: "Only dates within 02/09/2019 and 31/12/2020 are allowed"
})
)});
  main.variable(observer("start")).define("start", ["Generators", "viewof start"], (G, _) => G.input(_));
  main.variable(observer("viewof end")).define("viewof end", ["date"], function(date){return(
date({
  title: "2019-2020", 
  min: "2019-09-02",
  max: "2020-12-31",
  value: "2020-12-31",
  description: "Only dates within 02/09/2019 and 31/12/2020 are allowed"
})
)});
  main.variable(observer("end")).define("end", ["Generators", "viewof end"], (G, _) => G.input(_));
  main.variable(observer("input")).define("input", ["html","d3format"], function(html,d3format){return(
function input(config) {
  let {
    form,
    type = "text",
    attributes = {},
    action,
    getValue,
    title,
    description,
    format,
    display,
    submit,
    options
  } = config;
  const wrapper = html`<div></div>`;
  if (!form)
    form = html`<form>
	<input name=input type=${type} />
  </form>`;
  Object.keys(attributes).forEach(key => {
    const val = attributes[key];
    if (val != null) form.input.setAttribute(key, val);
  });
  if (submit)
    form.append(
      html`<input name=submit type=submit style="margin: 0 0.75em" value="${
        typeof submit == "string" ? submit : "Submit"
      }" />`
    );
  form.append(
    html`<output name=output style="font: 14px Menlo, Consolas, monospace; margin-left: 0.5em;"></output>`
  );
  if (title)
    form.prepend(
      html`<div style="font: 700 0.9rem sans-serif; margin-bottom: 3px;">${title}</div>`
    );
  if (description)
    form.append(
      html`<div style="font-size: 0.85rem; font-style: italic; margin-top: 3px;">${description}</div>`
    );
  if (format)
    format = typeof format === "function" ? format : d3format.format(format);
  if (action) {
    action(form);
  } else {
    const verb = submit
      ? "onsubmit"
      : type == "button"
      ? "onclick"
      : type == "checkbox" || type == "radio"
      ? "onchange"
      : "oninput";
    form[verb] = e => {
      e && e.preventDefault();
      const value = getValue ? getValue(form.input) : form.input.value;
      if (form.output) {
        const out = display ? display(value) : format ? format(value) : value;
        if (out instanceof window.Element) {
          while (form.output.hasChildNodes()) {
            form.output.removeChild(form.output.lastChild);
          }
          form.output.append(out);
        } else {
          form.output.value = out;
        }
      }
      form.value = value;
      if (verb !== "oninput")
        form.dispatchEvent(new CustomEvent("input", { bubbles: true }));
    };
    if (verb !== "oninput")
      wrapper.oninput = e => e && e.stopPropagation() && e.preventDefault();
    if (verb !== "onsubmit") form.onsubmit = e => e && e.preventDefault();
    form[verb]();
  }
  while (form.childNodes.length) {
    wrapper.appendChild(form.childNodes[0]);
  }
  form.append(wrapper);
  return form;
}
)});
  main.variable(observer("d3format")).define("d3format", ["require"], function(require){return(
require("d3-format@1")
)});
  main.variable(observer("viewof link")).define("viewof link", ["LinkToArticle"], function(LinkToArticle){return(
LinkToArticle()
)});
  main.variable(observer("link")).define("link", ["Generators", "viewof link"], (G, _) => G.input(_));
  main.variable(observer("viewof original_link")).define("viewof original_link", ["html"], function(html){return(
html`<input>`
)});
  main.variable(observer("original_link")).define("original_link", ["Generators", "viewof original_link"], (G, _) => G.input(_));
  main.variable(observer("LinkToArticle")).define("LinkToArticle", ["original_link","html"], function(original_link,html){return(
function LinkToArticle(){
  var new_str =  '<a href = "' + original_link + '" target="_blank">' + original_link + '</a>';
  return html`${(new_str)}`;
}
)});
  main.variable(observer("viewof companyname")).define("viewof companyname", ["html"], function(html){return(
html`<input>`
)});
  main.variable(observer("companyname")).define("companyname", ["Generators", "viewof companyname"], (G, _) => G.input(_));
  main.variable(observer("viewof cname")).define("viewof cname", ["PrintCompanyName"], function(PrintCompanyName){return(
PrintCompanyName()
)});
  main.variable(observer("cname")).define("cname", ["Generators", "viewof cname"], (G, _) => G.input(_));
  main.variable(observer("PrintCompanyName")).define("PrintCompanyName", ["companyname","html"], function(companyname,html){return(
function PrintCompanyName(){
  var new_str = '<h1>' + companyname + '</h1>';
  return html`${(new_str)}`; 
}
)});
  return main;
}
