<template>
  <div class="hello">
    <h1>d3 demo</h1>
    <svg id='knowledgeGraphSvg' width="600" height="500"></svg>
  </div>
</template>

<script>
  import * as d3 from 'd3';

  export default {
    name: 'KnowledgeGraph',
    props: {
        graphData: {
            type:Object,
            required: true,
        }
    },
    mounted() {
      console.log("this.draw");
      this.draw();

    },
    methods: {

      draw() {
        let svg = d3.select('#knowledgeGraphSvg');
        let width = svg.attr("width");
        let height = svg.attr("height");

        // var names = ['Films', 'Characters', 'Planets', 'Starships', 'Vehicles', 'Species'];
        var colors = ['#b3d38c', '#b3d38c', '#b3d38c', '#b3d38c', '#b3d38c', '#b3d38c'];


        //背景颜色设置 补充CSS样式设置字体布局
        // for (var i=0; i < names.length; i++) {
        // 	$('#indicator').append("<div><span style='background-color:" + colors[i] + "'></span>" + names[i] + "</div>");
        // }


        //利用d3.forceSimulation()定义关系图 包括设置边link、排斥电荷charge、关系图中心点
        let simulation = d3.forceSimulation()
          .force("link", d3.forceLink().id(function (d) {
            return d.id;
          }))
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(width / 2, height / 2));

        simulation.force('charge')
          .strength(-10500) // 排斥力强度，正值相互吸引，负值相互排斥
        //存储关系图的数据
        let graph;
        //定义d3.json请求python处理好的节点及边
        graph = this.graphData;
        console.log(graph);

        let link = svg.append("g").attr("class", "links").selectAll("line").data(graph.links).enter()
          .append("line").attr("stroke-width", function (d) {
            return 1;
          });

        let node = svg.append("g").attr("class", "nodes").selectAll("circle").data(graph.nodes).enter()
          .append("circle").attr("r", function (d) {
            return d.size;
          }).attr("fill", function (d) {
            return colors[d.group];
          }).attr("stroke", "none").attr("name", function (d) {
            return d.id;
          }).call(d3.drag()
            .on("start", function (d) {
              if (!d3.event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            })
            .on("drag", function (d) {
              d.fx = d3.event.x;
              d.fy = d3.event.y;
            })
            .on("end", function (d) {
              if (!d3.event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            })
          );

        let text = svg.append("g").attr("class", "texts").selectAll("text").data(graph.nodes)
          .enter()
          .append("text").attr("font-size", function (d) {
            return "100px";
          }).attr("fill", function (d) {
            return "#222222";
          }).attr('name', function (d) {
            return d.id;
          }).text(function (d) {
            return d.id;
          }).attr('text-anchor', 'middle').call(d3.drag()
            .on("start", function (d) {
              if (!d3.event.active) simulation.alphaTarget(0.3).restart();
              d.fx = d.x;
              d.fy = d.y;
            })
            .on("drag", function (d) {
              d.fx = d3.event.x;
              d.fy = d3.event.y;
            })
            .on("end", function (d) {
              if (!d3.event.active) simulation.alphaTarget(0);
              d.fx = null;
              d.fy = null;
            })
          );


        let linksText = svg.append("g").append("g").attr("class", "texts")
          .selectAll("text")
          .attr("font-size", function (d) {
            return 20;
          })
          .data(graph.links)
          .enter()
          .append("text")
          .style("fill", "#222222")
          .text(function (d) {
            return d.relation;
          });

        //圆增加title
        node.append("title").text(function (d) {
          return d.id;
        })

        //simulation中ticked数据初始化并生成图形
        simulation
          .nodes(graph.nodes)
          .on("tick", function () {
            link
              .attr("x1", function (d) {
                return d.source.x;
              })
              .attr("y1", function (d) {
                return d.source.y;
              })
              .attr("x2", function (d) {
                return d.target.x;
              })
              .attr("y2", function (d) {
                return d.target.y;
              });

            node
              .attr("cx", function (d) {
                return d.x;
              })
              .attr("cy", function (d) {
                return d.y;
              });

            text.attr('transform', function (d) {
              return 'translate(' + d.x + ',' + (d.y + d.size / 2) + ')';
            });

            linksText
              .attr("x", function (d) {
                return (d.source.x + d.target.x) / 2;
              })
              .attr("y", function (d) {
                return (d.source.y + d.target.y) / 2;
              });
          });

        simulation.force("link")
          .links(graph.links);
      },


    },
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


  .links {
    background-color: #000000;
  }

  .links line {
    stroke: rgb(114, 109, 109);
    stroke-opactity: 0.2;
  }

  /* .nodes circle {
      stroke: #fff;
      stroke-width: 1.5px;
  }

  .texts text {
      display: none;
  } */
  /* body {
  background-color: #fafafa;
  padding: 30px 40px;
  text-align: center;
  font-family: OpenSans-Light, PingFang SC, Hiragino Sans GB, Microsoft Yahei, Microsoft Jhenghei, sans-serif;
  } */
  /*
  #indicator {
  position: absolute;
  left: 60px;
  bottom: 120px;
  text-align: left;
  color: #f2f2f2;
  font-size: 12px;
  }

  #indicator>div {
  margin-bottom: 4px;
  }

  #indicator span {
  display: inline-block;
  width: 30px;
  height: 14px;
  position: relative;
  top: 2px;
  margin-right: 8px;
  } */
  .link {
    fill: none;
    stroke: rgb(179, 179, 179);
    stroke-width: 1.5px;
  }

  #licensing {
    fill: rgb(247, 247, 247);
  }

  .link.licensing {
    stroke: green;
  }

  .link.resolved {
    stroke-dasharray: 0, 2 1;
  }

  circle {
    /* fill: #b3d38c;  */
    fill: #7f9bda;
    stroke: rgb(105, 104, 104);
    stroke-width: 1px;
  }

  text {
    font: 15px Microsoft YaHei;
    font-weight: 300;
    color: rgb(117, 115, 115);
    pointer-events: none;
    text-shadow: 0 0.5px 0 #fff, 0.5px 0 0 #fff, 0 -0.5px 0 #fff, -0.5px 0 0 #fff;
  }

  .linetext {
    font-size: 12px Microsoft YaHei;
  }
</style>
