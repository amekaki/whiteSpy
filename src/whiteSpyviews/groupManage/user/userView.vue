<template>
  <vx-card>
    <el-row>
      <el-col :span="12">
        <vx-card title="基本信息" class="mt-0">
          <div>
            <vs-avatar class="user-profile-img" :src="userInfoData.photo" size="85px"/>
          </div>

          <!-- OTEHR DATA -->
          <div class="mt-5">
            <h6>来源</h6>
            <p>Telegram</p>
          </div>

          <div class="mt-5">
            <h6>所属群组</h6>
            <p>@SIM144</p>
          </div>

          <div class="mt-5">
            <h6>用户名</h6>
            <p>{{userInfoData.username}}</p>
          </div>

          <div class="mt-5">
            <h6>关联黑产类型</h6>
            <p>{{userInfoData.label}}</p>
          </div>

          <div class="social-links flex mt-4">
            <feather-icon svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded" class="mr-2"
                          icon="FacebookIcon"></feather-icon>
            <feather-icon svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded" class="mr-2"
                          icon="TwitterIcon"></feather-icon>
            <feather-icon svgClasses="h-7 w-7 cursor-pointer bg-primary p-1 text-white rounded" class="mr-2"
                          icon="InstagramIcon"></feather-icon>
          </div>

             <vx-card title="关联知识图谱" class="mt-0">
               <el-row>
<!--            <el-col :span="4">-->
<!--              <el-button>关联人员</el-button>-->
<!--               <el-button>关联人员</el-button>-->
<!--          </el-col>-->
                 <el-col :span="5" >
                    <div class="color-cloumn  " style="margin-top: 200px" >
              <div v-for="(c,key) in colorDict" :key="key" class="cursor-pointer" style="padding:5px;display:flex;"  >

                <div :style="{'background-color':c,height:'20px',width:'20px',padding:'5px'}" @click=updateGraphByType(key)>
                </div>
                <p style="padding-left:7px">
                  {{key}}
                </p>
              </div>
            </div>
                 </el-col>
          <el-col :span="18">

              <svg id='knowledgeGraphSvg' width="500" height="500"></svg>
               </el-col>
                 <el-col :span="3"></el-col>
        </el-row>
             </vx-card>
        </vx-card>
      </el-col>
      <el-col :span="12">

        <el-row>

          <!-- ACTION SLOT -->

<!--          <template slot="actions">-->
<!--            <el-button size="mini" type="primary" @click="showLog()" class="mb-10" v-if="!isShowLog">查看对话记录</el-button>-->
<!--            &lt;!&ndash;<feather-icon icon="MoreHorizontalIcon"></feather-icon>&ndash;&gt;-->
<!--          </template>-->


          <el-col :span="24">

            <div class="border border-solid d-theme-border-grey-light rounded" width="100px" height="100px">
<!--          <VuePerfectScrollbar  width="100px" height="100px" class=" border border-solid d-theme-border-grey-light mt-4" :settings="settings" ref="chatLogPS">-->
                   <vx-card title="对话记录" class="mt-0">
                    <ChatLog :userId="userId" chatHeight="800px"></ChatLog>
                      </vx-card>
<!--                </VuePerfectScrollbar>-->

        </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </vx-card>
</template>

<script>
  import ChatLog from "@/whiteSpyviews/chat/ChatLog"
  import VuePerfectScrollbar from 'vue-perfect-scrollbar'
  import {getAllGraphData, getGraphDataByNodeId, getGraphDataByType, getGraphDataByUserId} from "../../../api/show";
  import * as d3 from "d3";
  import {addGroup,  getUserInfoById} from "../../../api/group";

  export default {
    name: "userView",
    comments:{VuePerfectScrollbar},
    components: {
      ChatLog
    },
    data() {
      return {

        userInfoData:{},
        userId:this.$route.params.userId,
        userData:[],
        relation:false,
        isShowLog: false,
        settings: {
                maxScrollbarLength: 60,
                wheelSpeed: 0.70,
            },
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
          "Balance":"#8dcc93"
        },
        graphData: {links: [], nodes: []}
      }
    },
    created() {
      var userId=this.$route.params.userId
      console.log("id",userId)
      this.getUserInfo(userId)
      this.getGraphDataByUserId (userId)
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
    computed: {
      length1() {
        return (this.isShowLog ? 0 : 24)
      },
      length2() {
        return (this.isShowLog ?24 : 0)
      }
    },
    methods: {
      getUserInfo(userId){
        getUserInfoById(userId).then(response=>{
          console.log("userInfo",response.data)
          this.userInfoData=response.data
        }).catch(error=>{
          console.log("error",error)
        })
      },
      getRelation(){
               this.$vs.loading({
        type:'sound',
      })
          addGroup().then(response => {
          this.relation=true
        this.getAllUser()
          console.log('resopnsee', response)
          this.$vs.loading.close()
          this.$vs.dialog({
        color:'success',
        title: `成功`,
        text: '关联完成'
      })
        }).catch(error => {
          console.log(error)
          this.$vs.loading.close()
        })

      },
      showLog() {
        this.isShowLog = true
      },
      searchGroups(type) {
        console.log(this.searchQuery)
        this.$vs.loading({
        type:type,
      })
        getGraphDataByUserId (this.searchQuery).then(response => {
          console.log(response.data)
          this.graphData = response.data
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
        }).catch(error => {
          console.log(error)
        })
      },
      getAllGraphData(){
        getAllGraphData().then(response => {
          console.log(response.data)
          this.graphData = response.data
        }).catch(error => {
          console.log(error)
        })
      },
      updateGraphByType(type) {
        console.log("指定类型",type,this.userId)
        getGraphDataByType(this.userId,type).then(response => {
          console.log(response.data)
          this.graphData = response.data
        }).catch(error => {
          console.log(error)
        })
      },
      updateGraphByNodeId(nodeId) {
        getGraphDataByNodeId(nodeId).then(response => {
          console.log(response.data)
          this.graphData = response.data
        }).catch(error => {
          console.log(error)
        })
      },
      clickTest(d) {
        console.log("clickTest", d)
        this.currentNodeId = d.id
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
          }))
          .force("charge", d3.forceManyBody())
          .force("center", d3.forceCenter(width / 2, height / 2));

        simulation.force('charge')
          .strength(-1000) // 排斥力强度，正值相互吸引，负值相互排斥
        //存储关系图的数据
        let graph;
        //定义d3.json请求python处理好的节点及边
        graph = this.graphData;
        console.log(graph);

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
            return 16;
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
          }).attr("xlink:href", function (e) {
            return "https://www.baidu.com/img/flexible/logo/pc/result@2.png";
          }).attr("width", function (e) {
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
    }
  }
</script>

<style lang="scss">
@import "@/assets/scss/vuesax/apps/chat.scss";
</style>
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
