<template>
    <div class="search">
        <div class="row search_head">

            <div class="col-md-offset-4 col-xs-offset-4 col-md-4 col-xs-4 search_form">
                <form class="bs-example bs-example-form" role="form">
                 <div class="input-group search_box">
                    <input type="text" class="form-control" id="input_word">
                    <span class="input-group-addon search_btn" @click="goFuzzySearch">search</span>
                </div>
              </form>
            </div>

        </div>

        <div class="row search_content">
            <div class="col-md-offset-3 col-xs-offset-3 col-md-6 col-xs-6">
                <div class="row result_number">
                    搜索
                    <span class="result">{{fuzzyWord}}</span>
                    共找到
                    <span class="result_nu">{{model.total}}条</span>
                    记录
                </div>

                <div class="row each_result" v-if="eachvedios.length==0">
                  <span class="no_found">
                    没有搜到,您可以创建条目
                  </span>

                </div>

                <div class="row each_result" v-for="(vedio,index) in eachvedios" :key="vedio.vedioid">
                    <span class="result_img thumbnail col-md-2">
                        <img :src="vedio.picture" alt="" @click="goToDetail(vedio.vedioid)">
                    </span>
                    <div class="result_detail col-md-9">
                        <div class="row_detail_f row" >

                                <div class="type col-md-offset-1 col-xs-offset-1 col-xs-2 col-md-2">{{vedio.catagory}}</div>
                                <div class="name col-md-5 col-xs-5"  @click="goToDetail(vedio.vedioid)">{{vedio.vedioname}}</div>
                                <div class="subs">
                                         <div class="subcriber_state" @click="subState(eachvedios,vedio,index)">
                                            <div class="sub_state">

                                                  <span v-if="isSub(vedio)" class="yiding">
                                                      <img src="@/assets/imgs/icon_yiding.png" alt="button_sub">
                                                  </span>

                                                  <span v-else class="weiding">
                                                      <img src="@/assets/imgs/icon_weiding.png" alt="button_sub">
                                                  </span>


                                            </div>
                                        <div class="sub_num">{{vedio.subcribecount}}</div>
                                      </div>
                                </div>
                            </div>

                        <div class="row_detail_f row" >
                              <div class="_over col-md-offset-1 col-xs-offset-1 col-md-5 col-xs-5">
                                  <span v-if="vedio.isover ==1">连载</span>
                                  <span v-else-if="vedio.isover ==2">完结</span>
                                  <span v-else>未开播</span>
                                  /共{{vedio.episode}}集/{{vedio.region}}/{{vedio.time}}

                              </div>
                        </div>
                         <div class="row_detail_f row" >
                              <div class="s_name col-md-offset-1 col-xs-offset-1  col-md-5 col-xs-5">
                              原名: {{vedio.vedioname}}
                              </div>
                        </div>
                         <div class="row_detail_f row" >
                              <div class="s_name  col-md-offset-1 col-xs-offset-1 col-md-5 col-xs-5">
                              别名: <span v-if="vedio.subname!=null">{{vedio.subname}}</span>
                              <span v-else>{{vedio.vedioname}}</span>
                              </div>
                        </div>
                         <div class="row_detail_f row" >
                            <div class="summary col-md-offset-1 col-xs-offset-1 col-md-11">
                             {{vedio.summary}}
                            </div>
                        </div>
                    </div>
                </div>
                  <div class="row each_result" v-if="model.total!=0">

                    <pageination :total="model.total" :size="model.size" :page="model.page" :changge="pageFn" >

                   </pageination>
                  </div>

            </div>
        </div>
    </div>

</template>
<script src="../assets/libs/pageination.js"></script>

<script>
import pageination from "vue_pageination";

export default {
  name: "search",
  data() {
    return {
      vedios: [],
      model: {
        total: 100, //总条数
        size: 6, //每页显示条目个数不传默认10
        page: 1 //当前页码
      },
      eachvedios: [],
      fuzzyWord: "",
      subsVedios: []
    };
  },

  components: {
    pageination
  },
  mounted() {
    this.getParams();
  },
  watch: {
    $route(to, from) {
      this.fuzzyWord = to.params.fuzzyWord;
      this.fuzzySearch(this.fuzzyWord);
    }
  },
  methods: {

    goToDetail(vedioid){
      this.$router.push(
        {
          path:'/subs/detail',
          name:'detail',
          params:{
            vedioid:vedioid
          }
        }
      );
    },
    subState(array, vedio, index) {
      // console.log(array);
      var userid = sessionStorage.getItem("userid");
if(userid!=null){
      var url = "http://localhost:8888/subscirbe/subsVedio";

      var zipFormData = new FormData();
      zipFormData.append("userid", userid);
      zipFormData.append("vedioid", vedio.vedioid);
      this.$http.post(url, zipFormData).then(function(response) {
        var newmap = response.body;
        for (var i in newmap) {
          vedio.subcribecount = i;

          array.splice(index, 1, vedio);
        }
        this.getAllSubs();
      });}
    },
    getAllSubs() {
      var userid = sessionStorage.getItem("userid");
      var url = "http://localhost:8888/subscirbe/getAllSubs";
if(userid!=null){
      var zipFormData = new FormData();
      zipFormData.append("userid", userid);

      this.$http.post(url, zipFormData).then(function(response) {
        var newmap = response.body;
        this.subsVedios = newmap;
        this.model.total = this.subsVedios.length;
        console.log(this.subsVedios);
      });}
      this.model.page = 1;
    },
    isSub(vedio) {
      var flag = false;
      first: for (var j = 0; j < this.subsVedios.length; j++) {
        if (vedio.vedioid == this.subsVedios[j].vedioid) {
          flag = true;
          console.log(vedio);
          break first;
        }
      }
      return flag;
    },
    pageFn(val) {
      this.model.page = val;
      if (val == Math.ceil(this.model.total)) {
        this.eachvedios = this.vedios.slice(
          (val - 1) * this.model.size,
          this.vedios.length
        );
      } else {
        this.eachvedios = this.vedios.slice(
          (val - 1) * this.model.size + 1,
          val * this.model.size + 1
        );
      }
    },
    goFuzzySearch() {
      this.fuzzyWord = $("#input_word").val();
      this.fuzzySearch(this.fuzzyWord);
    },
    getParams() {
      let routerParams = this.$route.params.fuzzyWord;
      // 将数据放在当前组件的数据内
      this.fuzzyWord = routerParams;
      this.fuzzySearch(this.fuzzyWord);
    },
    fuzzySearch(fuzzyWord) {
      //   console.log(fuzzyWord);
      var url = "http://localhost:8888/vedio/search/" + fuzzyWord;
      console.log(url);
      this.$http.post(url).then(function(response) {
        var newmap = response.body;

        for (var i in newmap) {
          this.vedios = newmap[i];
          this.model.total = i;
          // console.log(i + ":" + Math.ceil(this.model.total));
        }
        this.eachvedios = this.vedios.slice(0, this.model.size);
      });
      this.model.page = 1;
    }
  }
};
</script>

<style scoped>
.search_head {
  background-color: white;
  margin-top: 5px;
}

.search_head .search_form {
  margin-top: 30px;
  margin-bottom: 30px;
}

.search_form input {
  border: 2px gold solid;
}

.search_form .search_btn {
  background-color: gold;
  border: 2px gold solid;
  cursor: pointer;
}

.search_content {
  margin-top: 20px;
}

.search_content .result_number {
  color: silver;
  font-size: 13px;
  text-align: left;
}

.search_content .result_number .result {
  font-size: 16px;
  font-weight: bolder;
}
.search_content .result_number .result_nu {
  color: #ff6160;
}
.search_content .each_result {
  background-color: white;
  margin-top: 20px;
}

.no_found {
  font-size: 15px;
}
.each_result .result_img {
  margin: 1% 5px;
}
.each_result .result_img img {
  display: inline-block;
}

.each_result {
  margin-top: 2%;
}

.row_detail_f .name {
  color: black;
  font-size: 18px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  cursor: pointer;
}
.row_detail_f .subs {
  color: white;
  background-color: #ff6160;
  margin-left: 30%;
}
.row_detail_f ._over {
  color: #888;
  font-size: 13px;
  padding-top: 3px;
}
.row_detail_f {
  text-align: left;
}
.row_detail_f .summary {
  font-size: 13px;
  color: #888;
  overflow: hidden;
  /* text-overflow: ellipsis; */
  /* white-space: nowrap; */
  /* padding-left: 9%; */
  padding-top: 15px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.row_detail_f .s_name {
  color: #888;
  font-size: 13px;
  padding-top: 3px;
}
.result_detail {
  margin-top: 3%;
}

.result_detail .type {
  font-weight: normal;
  vertical-align: middle;
  font-size: 12px;
  line-height: 12px;
  padding: 4px 3px;
  border: 1px solid #888888;
  border-radius: 20px;
  color: #888;
  text-align: center;
}

.subcriber_state {
  position: absolute;
  right: 13%;
  font-size: 0;
  cursor: pointer;
  height: 24px;
  overflow: hidden;
}
.subcriber_state .sub_state {
  float: left;
  background: #ff6160;
  height: 100%;
  line-height: 1;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  border: 1px solid #ff6160;
  border-radius: 2px;
  border-bottom-right-radius: 0;
  border-top-right-radius: 0;
}
.subcriber_state .sub_num {
  display: inline-block;
  height: 100%;
  font-size: 12px;
  padding: 5px 4px;
  color: #ff6160;
  line-height: 1;
  border: 1px solid #ff6160;
  border-radius: 2px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}
.subcriber_state .sub_state img {
  position: relative;
  top: -1px;
}
</style>
