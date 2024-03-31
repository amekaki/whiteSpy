<template>
  <div>
    <vx-card >

      <el-row :gutter="20">
        <el-col :span="24">
          <el-row>
            <el-col :span="2" class="mt-4 "  >
              <span @click="goBack()" style="display: flex;flex-direction: row;align-items: center;margin-top: auto;margin-bottom: auto;cursor: pointer">
                              <vs-icon icon="arrow_back " size="27px">
  </vs-icon>
              <div class="ml-2 "  >返回</div>

              </span>

            </el-col>
            <el-col :span="22">
                       <div class="chat__profile-search flex p-4">
        <vs-input icon="icon-search" icon-pack="feather" class="w-full mx-5 input-rounded-full no-icon-border"
                  placeholder="输入关键字" @keyup.enter="searchGroups( 'sound')" v-model="searchQuery"/>
      </div>
            </el-col>
          </el-row>

          <div class="knowledgeGraph" style="display:flex ; flex-direction:row">
            <div class="color-cloumn" style="display:flex;flex-direction:column ; align-self:flex-end">
              <div v-for="(c,key) in colorDict" :key="key" style="padding:5px;display:flex;">

                <div :style="{'background-color':c,height:'20px',width:'20px',padding:'5px'}">
                </div>
                <p style="padding-left:7px">
                  {{key}}
                </p>
              </div>
            </div>
            <svg id='knowledgeGraphSvg' width="900" height="650"></svg>
          </div>
        </el-col>
<!--        <el-col :span="8">-->
<!--          <div class="grid-content bg-purple"></div>-->
<!--        </el-col>-->
      </el-row>

    </vx-card>

  </div>

</template>

<script>
  import * as d3 from 'd3';
  import {
    getGroupGraphData,
    getGraphDataByNodeId,
    getGraphDataByUserId,
    getGroupAnalyseGraphByUser
  } from "../../api/show";
  import {getGroupSearchResult} from "../../api/group";

  export default {
    name: "graphGroupShow",
    data() {
      return {
        searchQuery:"",
        currentNodeId: 0,
        colorLineDict: {
          "Person": '#3699ff',
          "Platform": "#7cffb2",
          "PRICE": '#fddd60',
          "COMPANY": '#ff6e76',
          "AIM": "#58d9f9",
        },
        colorDict: {
          "Person": '#4992ff',
          "Platform": "#7cffb2",
          "Price": '#fddd60',
          "Company": '#ff6e76',
          "Aim": "#58d9f9",
          "Location":"#7367f0",
          "PhoneNumber":"#4ad3be",
          "SIMGROUP":"#8dcc93",
        },
        graphData: {links: [], nodes: []}
        ,
        nodeStack:[]
      }
    },
    created() {
      this.getGroupGraphData()
    },
    watch: {
      currentNodeId(value) {
        console.log(value)
        this.updateGraphByNodeId(value)

      },
      graphData: {//深度监听，可监听到对象、数组的变化
        handler(value) {
          console.log("change", value)
          this.deleteDraw()
          this.draw()
        },
        deep: true //true 深度监听
      }
    },
    methods: {
      goBack(){
        if(this.nodeStack.length<=1){
          return
        }else{
          console.log("statck",this.nodeStack)
          let popNode=this.nodeStack.pop()
        this.graphData =this.nodeStack[0]
        console.log("nodeStacl",this.graphData)
        }

      },
      searchGroups(type) {
        console.log(this.searchQuery)
        this.$vs.loading({
        type:type,
      })
        getGroupAnalyseGraphByUser (this.searchQuery).then(response => {

          console.log("anasearch",response.data)
          this.graphData = response.data
          this.nodeStack.push(this.graphData)
          this.$vs.loading.close()
        }).catch(error => {
          console.log(error)
          this.$vs.loading.close()
        })

      },
      getGraphDataByUserId(userId){
        getGraphDataByUserId (userId).then(response => {
          console.log(response.data)
          this.graphData = response.data
          this.nodeStack.push(this.graphData)
        }).catch(error => {
          console.log(error)
        })
      },
      getGroupGraphData(){
        this.$vs.loading({
        type:'sound',
        })
        getGroupGraphData().then(response => {
          console.log(response.data)
          this.graphData = response.data

          this.nodeStack.push(response.data)
          this.$vs.loading.close()
          this.$vs.notify({
          color:'success',
          title:`成功`,
          text:'数据获取成功'
          })
        }).catch(error => {
          console.log(error)
          this.$vs.loading.close()
          this.$vs.notify({
          color:'error',
          title:`错误`,
          text:'出错了请重试'
          })
        })
      },
      updateGraphByNodeId(nodeId) {
        getGraphDataByUserId(nodeId).then(response => {
          console.log(response.data)
          this.graphData = response.data
          this.nodeStack.push(response.data)
          console.log("nodeStatck",this.nodeStack)
        }).catch(error => {
          console.log(error)
        })
      },
      clickTest(d) {
        console.log("clickTest", d)
        this.currentNodeId = d.properties.name
      },

      draw() {
        let svg = d3.select('#knowledgeGraphSvg');
        let width = svg.attr("width");
        let height = svg.attr("height");
        let that = this
        // var names = ['Films', 'Characters', 'Planets', 'Starships', 'Vehicles', 'Species'];
        var colorDict = this.colorDict
        var colorLineDict = this.colorLineDict

        // 背景颜色设置 补充CSS样式设置字体布局
        // for (var i=0; i < names.length; i++) {
        // 	$('#indicator').append("<div><span style='background-color:" + colors[i] + "'></span>" + names[i] + "</div>");
        // }


        //利用d3.forceSimulation()定义关系图 包括设置边link、排斥电荷charge、关系图中心点
        let simulation = d3.forceSimulation()
          .force("link", d3.forceLink().id(function (d) {
            return d.id;
          }).distance(60))
            //.distance(100)
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(width / 2, height / 2));

        simulation.force('charge')
          .strength(-3) // 排斥力强度，正值相互吸引，负值相互排斥
        //存储关系图的数据
        let graph;
        //定义d3.json请求python处理好的节点及边
        graph = this.graphData;
        console.log("graph",this.graphData);

        let link = svg.append("g").attr("class", "links").selectAll("line").data(graph.links).enter()
          .append("line").attr("stroke-width", function (d) {
            return 0.5;
          })
          .attr("stroke", function (d) {
            // return colorLineDict[d.type]
            return "#ffffff";
          });

        let node = svg.append("g").attr("class", "nodes").selectAll("circle").data(graph.nodes).enter()
          .append("circle").attr("r", function (d) {
            return 18;
          })
          .attr("fill", function (d) {
            return colorDict[d.labels[0]];
            // return "#ffcd42"
          })
          .attr("stroke", function (d) {
            return "#fff"
          })
          .attr("name", function (d) {
            return d.id;
          })
          .on("click", function (d) {
            that.clickTest(d)
            console.log(d)
          })
          .call(d3.drag()
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

        let image = svg.append("g").attr("class", "svg-img").selectAll("image").data(graph.nodes).enter()
          .append("image").attr("name", function (d) {
            return "pp";
          })
          .attr("height", function (d) {
            return "24px";
          })
          // .attr("xlink:href", function (e) {
          //   return "https://www.baidu.com/img/flexible/logo/pc/result@2.png";
          // })
          .attr("width", function (e) {
            return "24px"
          })

        let text = svg.append("g").attr("class", "texts").selectAll("text").data(graph.nodes)
          .enter()
          .append("text").attr("font-size", function (d) {
            return "100px";
          }).attr("fill", function (d) {
            return "#ffffff";
          }).attr('name', function (d) {
            return d.id;
          }).text(function (d) {
            return d.properties.name;
          }).attr('text-anchor', 'middle')
          .call(d3.drag()
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
            image.attr('transform', function (d) {
              return 'translate(' + d.x + ',' + (d.y) + ')';
            });
            text.attr('transform', function (d) {
              return 'translate(' + (d.x + 32) + ',' + (d.y + 25) + ')';
            });


            // linksText
            //   .attr("x", function (d) {
            //     return (d.source.x + d.target.x) / 2;
            //   })
            //   .attr("y", function (d) {
            //     return (d.source.y + d.target.y) / 2;
            //   });
          });

        simulation.force("link")
          .links(graph.links);
      },
      deleteDraw() {
        d3.select('#knowledgeGraphSvg').selectAll('*').remove();
      }
    },

  }
</script>

<style>
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

  /*circle {*/
  /*  !* fill: #b3d38c;  *!*/
  /*  stroke: rgb(105, 104, 104);*/
  /*  stroke-width: 1px;*/
  /*}*/

  text {
    font: 15px Microsoft YaHei;
    font-weight: 300;
    color: white;
    pointer-events: none;
    text-shadow: 0 1px 0 #000000, 1px 0 0 #000000, 0 -1px 0 #000000, -1px 0 0 #000000;
  }

  linksText {
    font: 15px Microsoft YaHei;
    font-weight: 300;
    color: white;
    pointer-events: none;
    text-shadow: 0 1px 0 #000000, 1px 0 0 #000000, 0 -1px 0 #000000, -1px 0 0 #000000;
  }

</style>
