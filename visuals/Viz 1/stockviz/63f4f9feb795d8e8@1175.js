// https://observablehq.com/@bhuiyanmh/stockviz@1175
export default function define(runtime, observer) {
  const main = runtime.module();
  const fileAttachments = new Map([["Confinement_measures_transformed.csv","https://static.observableusercontent.com/files/1bc10e725fd55899e45159a1b09a8d554fdb521df525eddfa2a81163a263d7c4a14067ff2d5a5eda419316e6936876cd7f550f9c4cca3cdf96296870bb83342a"],["Confinement_index_transformed@2.csv","https://static.observableusercontent.com/files/2c9878410349f04afb0f88430ad9815fcf8dc9691171b80b56a3af930d57fdf87e0f7c432f257991ccb92ebdff4b4f3f1684c6baa17c3ae972acef8729b99dd9"],["Compounded_index_transformed@1.csv","https://static.observableusercontent.com/files/2c57856f58fce1f5758ac852f8d94f065e4b7c8bf9b480e725ca75a44c003c087ed139e6ed1c04eebf0305b77e9f3fec1d95e76baeb1edef889e9eea92f30126"]]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], function(md){return(
md`# Stockviz`
)});
  main.variable(observer("vegalite")).define("vegalite", ["require"], function(require){return(
require("@observablehq/vega-lite@0.3")
)});
  main.variable(observer("d3")).define("d3", ["require"], function(require){return(
require("d3@6")
)});
  main.variable(observer("data_overall")).define("data_overall", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("Compounded_index_transformed@1.csv").text(), d3.autoType)
)});
  main.variable(observer("data_confinement_index")).define("data_confinement_index", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("Confinement_index_transformed@2.csv").text(), d3.autoType)
)});
  main.variable(observer("data_confinement_measures")).define("data_confinement_measures", ["d3","FileAttachment"], async function(d3,FileAttachment){return(
d3.csvParse(await FileAttachment("Confinement_measures_transformed.csv").text(), d3.autoType)
)});
  main.variable(observer("overall_index")).define("overall_index", ["vegalite","data_confinement_index","data_overall"], function(vegalite,data_confinement_index,data_overall){return(
vegalite({
  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "title": {
    "text": "Stock markets have negatively reacted and recovered",
    "subtitle":["Stock market indices saw a quick drop in the early days of confinement. However, they started to", " recover shortly and continued increasing even though there were changes in the strictness of", " confinement rules as shown by the variation of colors in the Confinement Index (CI)."], 
    "fontSize": 30,
    "subtitleFontSize":20,
    "subtitlePadding":10,
    "dy":-15,
    "subtitleColor":"grey",
    "encode": {
      "title": {
        "enter": {
          "fill": {"value": "#636363"},
        },
      },
      "subtitle": {
        "update": {
          "fontStyle": {"value": "italic"},
        },
      }
    }
  },
  "vconcat":[
    {
      "width": 800,
      "height": 100,
      "data": {"values": data_confinement_index},
      "mark": "rect",
      "encoding": {
        "x": {
          "timeUnit": "yearmonthdate",
          "field": "Date",
          "type": "ordinal",
          "title": null,
          "axis":null,
        },
        "color": {
          "aggregate": "avg",
          "field": "CI",
          "type": "quantitative",
          "title": "CI"
        },
        "y": {
          "field": "Index",
          "type": "nominal",
          "title": null
        }
      }
    },    
    {
      "data": {"values": data_overall},
      "width": 800,
      "height": 300,
      "encoding": {
        "x": {
          "field": "Date", 
          "type": "temporal",
          "axis": {
            "format": "%b %y",
            "labelAngle": 0,
            "title": null,
          }
        }
      },
      "layer": [
        {
          "encoding": {
            "color": {"field": "Index", "type": "nominal"},
            "y": {"field": "Avg", "type": "quantitative"}
          },
          "layer": [
            {"mark": "line"},
            {"transform": [{"filter": {"selection": "hover"}}], "mark": "point"}
          ]
        },
        {
          "transform": [{"pivot": "Index", "value": "Avg", "groupby": ["Date"]}],
          "mark": "rule",
          "encoding": {
            "opacity": {
              "condition": {"value": 0.3, "selection": "hover"},
              "value": 0
            },
            "tooltip": [
              {"field": "Date", "type": "temporal"},
              {"field": "S&P 500", "type": "quantitative"},
              {"field": "STOXX 50 EU", "type": "quantitative"},
              {"field": "Hang Seng", "type": "quantitative"}
            ]
          },
          "selection": {
            "hover": {
              "type": "single",
              "fields": ["Date"],
              "nearest": true,
              "on": "mouseover",
              "empty": "none",
              "clear": "mouseout"
            }
          }
        }
      ]
    }
  ]
})
)});
  main.variable(observer("overall_selection_confinemen_details")).define("overall_selection_confinemen_details", ["vegalite","data_overall","data_confinement_measures"], function(vegalite,data_overall,data_confinement_measures){return(
vegalite({

  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
  "data": {"values": data_overall},
  "transform": [
    {"filter": {"selection": "Stock"}}
  ],
  "title": {
    "text": "The market stability improved with time",
    "subtitle":["More mixing of colors and long candlesticks represent the instability of markets. With time market", "stability improved and they became less susceptible to the change in confinement measures.", "Select the particular index and date range from the bottom of the chart for more focused analysis."], 
    "fontSize": 30,
    "subtitleFontSize":20,
    "subtitlePadding":10,
    "dy":-15,
    "subtitleColor":"grey",
    "encode": {
      "title": {
        "enter": {
          "fill": {"value": "#636363"},
        },
      },
      "subtitle": {
        "update": {
          "fontStyle": {"value": "italic"},
        },
      }
    }
  },
  "vconcat": [
    {
      "width": 800,
      "height": 350,

      "encoding": {
        "x": {
          "field": "Date",
          "type": "temporal",
          "scale": {"domain": {"selection": "brush"}},
          "axis": {
            "format": "%d %b %y",
            "labelAngle": 0,
            "title": null
          }
        },
        "y": {
          "type": "quantitative",
          "scale": {"zero": false},
          "axis": {"title": "Index value"}
        },
        "color": {
          "condition": {
            "test": "datum.Open < datum.Close",
            "value": "#06982d"
          },
          "value": "#ae1325"
        }
      },
      "layer": [
        {
          "selection": {
            "Stock": {
              "type": "single",
              "fields": ["Index"],
              "bind": {"input": "select", "options": [null, "S&P 500", "STOXX 50 EU", "Hang Seng"]}
            }
          },
          "mark": "rule",
          "encoding": {
            "y": {"field": "Low"},
            "y2": {"field": "High"}
          }
        },
        {
          "mark": "bar",
          "encoding": {
            "y": {"field": "Open"},
            "y2": {"field": "Close"},
            "tooltip": [
              {"field": "Date", "type": "temporal"},
              {"field": "Index", "type": "nominal"},
              {"field": "Low", "type": "quantitative"},
              {"field": "High", "type": "quantitative"},
              {"field": "Open", "type": "quantitative"},
              {"field": "Close", "type": "quantitative"},
            ]
          }
        },
        {
          "data": {"values": data_confinement_measures},
          "transform": [
            {"filter": {"selection": "Stock"}}
          ],
          "mark":"rule",
          "encoding": {
            "x":{
              "field": "Date",
              "type": "temporal",
              "scale": {"domain": {"selection": "brush"}},    
            },
            "color": {"value": "orange"},
            "opacity": { "value": 0.6},
            "size": {"value": 2.5},
            "tooltip": [
              {"field": "Date", "type": "temporal"},
              {"field": "Index", "type": "nominal"},
              {"field": "Measure", "title": "Covid Measure by Country"},
            ]
          },
        },
      ]
    },
    {
      "width": 800,
      "height": 100,
      "mark": "area",
      "selection": {"brush": {"type": "interval", "encodings": ["x"]}},
      "encoding": {
        "x": {
          "field": "Date",
          "type": "temporal", 
          "axis": {
            "format": "%b %y",
            "title": "Select an area by dragging to zoom in"
          }
        },
        "y": {
          "field": "Avg",
          "type": "quantitative",
          "axis": {"tickCount": 3, "grid": false}
        },
      }
    }
  ]
})
)});
  return main;
}
