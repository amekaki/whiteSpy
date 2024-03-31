<template>
        <vx-card >
          <iframe name="child" id="child" src="/neo4jd3.html" width="100%" height="700" frameborder="0"
                  scrolling="no"></iframe>
        </vx-card>

</template>

<script>
    export default {
        name: "knowledgeGraph",
      data(){
          return {
            iframeWin:{}
          }
      },
    }

</script>

<style scoped>

</style>
