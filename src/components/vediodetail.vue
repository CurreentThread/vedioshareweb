<template>
<div class="detail">

    <subList :episode="episode" :vedioname="vedioname" :vedioid="vedioid" @refresh="refresh"></subList>
    <div class="row">

        <div class="col-md-8 col-xs-8">
            <div class="row">
                <div class="my_icon_top">
                   <div class="my_img_tit">

                            {{vedio.vedioname}}<span>9.2</span>

                    </div>
                </div>

                <div class="my_icon_bottom">
                    <div class="detail_row">

                        <div class="detail_rowL">
                            类目：{{vedio.catagory}}
                        </div>


                            <div class="detail_rowL">
                                类型：{{vedio.type}}
                            </div>


                            <div class="detail_rowL">
                                地区：{{vedio.region}}
                            </div>



                            <div class="detail_rowL">
                                时间：{{vedio.time}}
                            </div>

                    </div>


                    <div class="detail_row_l" v-if="vedio.subname!=null">
                        别名：{{vedio.subname}}
                    </div>


                    <div class="detail_row_l" v-if=" vedio.episode!=null">


                                共{{vedio.episode}}集&nbsp;





                    </div>
                    <div class="detail_row_l" v-else>


                                更新至{{vedio.nowepisode}}集&nbsp;





                    </div>
                    <putlist ref="putlist" @isexit="isexit"></putlist>

                    <div class="detail_row2" id="detail_opstate">
                            <div class="row subcriber_state" @click="subState(newVedios,vedio,index)" style="margin-left:10%;margin-top:-0%">
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

                            <div class="detail_more">
                                <span class="for_more">更多</span>
                                <div class="my_btns" style="display: none;">
                                    <div class="icon_san">
                                    </div>
                                    <div class="my_btn_li" onclick="watchedConfirm('303251','91159fd3a9064b93bfbbc12b74a0484b','权力的游戏 第七季','tv')">已看完</div>
                                    <!-- <div class="my_btn_li" onclick="_cancelSubcriberClick('91159fd3a9064b93bfbbc12b74a0484b','303251')">取消订阅</div> -->
                                </div>
                            </div>

                        <div class="addToInventory" @click="putHandler(vedio)"  data-target="#putlist" data-toggle="modal">
                            收藏至清单
                        </div>
                    </div>

                </div>

                <div class="detail_img">
                    <div class="detail_img2">
                        <img :src="vedio.picture" onerror="onError(this)">
                    </div>
                </div>
            </div>

            <div class="row">

                <div class="row">
                    <div class="col-md-6 col-xs-6 my_content">
                        <div class="row history" v-if="vedio.isview!=0&&vedio.isview!=null">
                            <span>上次看到</span>
                            <span class="latest_view">{{vedio.vedioname}} 第{{vedio.isview}}集</span>
                            <span class="continue" @click="goahead(vedio.isview)" data-target="#subList" data-toggle="modal" alt="" width="10%">+继续观看
                                <div class="sub_a_icon"></div>
                            </span>
                        </div>


                        <div class="row content">
                            <div class="describe">剧情简介</div>
                            <div class="detail">
                                <span class="director" v-show="vedio.director!=null">
                                    导演：{{vedio.director}}
                                </span>
                                <br>
                                <span class="actor" v-show="vedio.actor!=null">
                                    演员：{{vedio.actor}}
                                </span>
                                <br>
                                <span class="summary" v-show="vedio.summary!=null">

                                    <span>
                                      简介: {{vedio.summary}}
                                    </span>
                                    <!-- <span class="showmore"  @click="showmore">更多</span>


                                    <span class="more" id="more">
                                        他收到了身在大学城的山姆威尔（约翰·布莱德利 John Bradley）的来信，信上说在龙石岛的下面，埋藏着数量巨大的龙晶，这是唯一能够抵挡异鬼入侵的武器。
                                         <span class="hidemore" @click="hidemore">
                                           隐藏
                                         </span>
                                    </span>  -->


                                </span>

                            </div>


                        </div>

                      <div class="row dramas">
                          <div class="each_dramas">
                            <div class="describe">分集列表</div>
                            <div class="detail" v-for="(each,index) in earchdramas" :key="index">
                              <a href="javascript:void(0);" @click="gotoWatch(each.episodenum)" data-target="#subList" data-toggle="modal" alt="" width="10%">
                                <div class="row">

                                <span class="vedioname col-md-7">{{each.subvedioname}}</span>
                                <span class="episode col-md-2">第{{each.episodenum}}集</span>

                                <span class="current_watch col-md-3" v-if="each.iswatched==1">
                                     <div class="icon"></div>已观看
                                </span>
                                <span class="watch_state1 watch_state col-md-2"  v-if="each.iswatched==0">
                                    <div class="icon"></div>
                                    <span>未看</span>
                                </span>
</div>
                              </a>
                            </div>



                             <div class="detail">

                                <pageination :total="model.total" :size="model.size" :page="model.page" :changge="pageFn" >

                                </pageination>
                              <!-- {{model.page}}            -->
                            </div>
                          </div>
                      </div>

                    </div>

                      <div class="col-md-3 col-xs-3 my_recommand">
                            <div class="row each_title">
                                <div class="recommand">新剧推荐</div>
                            </div>

                            <div class="each_recommand">

                                 <div class="row vedio" v-for="(vedio,index) in newVedios.slice(0,3)" :key="vedio.vedioid">
                                    <div class="col-md-5 col-xs-5 img" >
                                    <a href="javascript:void(0);" class="thumbnail" @click="goToDetail(vedio.vedioid)" >
                                        <img :src="vedio.picture"
                                            alt="通用的占位符缩略图"  >
                                    </a>
                                    </div>
                                    <div class="col-xs-7 col-md-7 msg">
                                      <span class="name"  @click="goToDetail(vedio.vedioid)">{{vedio.vedioname}}</span>
                                      <br>
                                      <span class="summary" v-if="vedio.nowepisode!=null&& vedio.catagory!='电影'">更新至{{vedio.nowepisode}}集</span>
                                      <span class="summary" v-else>电影</span>

                                        <br>
                                       <div class="row subcriber_state" @click="subState(newVedios,vedio,index)">
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
                            </div>
                    </div>
                </div>

            </div>
        </div>
    </div>


</div>

</template>
<script src="../assets/libs/pageination.js"></script>

<script>
import pageination from "vue_pageination";
import subList from "@/components/SubVedioList";
import putlist from "@/components/putlist";
import bus from "./bus.js";

export default {
  name: "detail",

  data() {
    return {
      isShow: true,
      add: false,
      isShowlike: true,
      vedioId: 0,
      dramas: [],
      model: {
        total: 100, //总条数
        size: 4, //每页显示条目个数不传默认10
        page: 1 //当前页码
      },
      vedio: {},
      index: 0,
      earchdramas: [],
      episode: 0,
      vedioname: "",
      vedioid: 0,
      newVedios: [],
      subsVedios: [],
      historys: []
    };
  },

  components: {
    pageination,
    subList,
    putlist
  },
  mounted() {
    this.getParams();
    this.getAllSubs();
    this.getNewVedios();

  },
  watch: {
    $route(to, from) {
      this.getParams();
      this.getAllSubs();
      this.getNewVedios();
    }
  },
  methods: {
    refresh() {
      this.getParams();
    },
    isexit(msg) {
      bus.$emit("empty", msg);
      bus.$emit("idel", false);
      bus.$emit("refresh");
      $("#attention").modal("show"); //手动开启
    },
    putHandler(vedio) {
      this.$refs.putlist.transfer(
        vedio.vedioid,
        vedio.vedioname,
        vedio.picture
      );
    },
    getNewVedios() {
      var _this = this;
      var url = "http://localhost:8888/vedio/searchIsNew";
      this.$http.post(url).then(function(response) {
        var newmap = response.body;
        for (var i in newmap) {
          this.newCount = i;
          this.newVedios = newmap[i];


          // console.log(this.newCount);
          // console.log(this.newVedios);
        }
      });
    },

    getAllSubs() {
      var userid = sessionStorage.getItem("userid");
      if (userid != null) {
        var url = "http://localhost:8888/subscirbe/getAllSubs";

        var zipFormData = new FormData();
        zipFormData.append("userid", userid);

        this.$http.post(url, zipFormData).then(function(response) {
          var newmap = response.body;
          this.subsVedios = newmap;
          // console.log(this.subsVedios);
        });
      }
    },
    getCertainHistory() {
      var userid = sessionStorage.getItem("userid");
      if (userid != null) {
        var url = "http://localhost:8888/history/querybyVedioid";

        var zipFormData = new FormData();
        zipFormData.append("userid", userid);
        zipFormData.append("vedioid", this.vedioid);
        this.$http
          .post(url, zipFormData)
          .then(function(response) {
            var newmap = response.body;
            this.historys = newmap;
            // console.log(this.subsVedios);
            if (this.historys.length != 0)
              this.vedio.isview = this.historys[
                this.historys.length - 1
              ].isview;
          })
          .then(function() {
            this.setIswatch();
          });
      } else {
        console.log(this.earchdramas);
        this.earchdramas = this.dramas.slice(0, this.model.size);
      }
    },
    setIswatch() {
      console.log(this.historys);
      if (this.historys.length != 0) {
        for (var i = 0; i < this.dramas.length; i++) {
          second: for (var j = 0; j < this.historys.length; j++) {
            if (this.historys[j].isview == this.dramas[i].episodenum) {
              this.dramas[i].iswatched = 1;
              break second;
            } else if (
              j == this.historys.length - 1 &&
              this.historys[j] != this.dramas[i].episodenum
            ) {
              this.dramas[i].iswatched = 0;
            }
          }
        }
      }

      console.log(this.dramas);
      this.earchdramas = this.dramas.slice(0, this.model.size);
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
    subState(array, vedio, index) {
      // console.log(array);
      var userid = sessionStorage.getItem("userid");
      if (userid != null) {
        var url = "http://localhost:8888/subscirbe/subsVedio";

        var zipFormData = new FormData();
        zipFormData.append("userid", userid);
        zipFormData.append("vedioid", vedio.vedioid);
        this.$http.post(url, zipFormData).then(function(response) {
          var newmap = response.body;
          for (var i in newmap) {
            vedio.subcribecount = i;
            if ((this.vedio.vedioid = vedio.vedioid))
              this.vedio.subcribecount = i;
            array.splice(index, 1, vedio);
          }
          this.getAllSubs();
        });
      }
    },
    goToDetail(vedioid) {
      this.$router.push({
        path: "/subs/detail",
        name: "detail",
        params: {
          vedioid: vedioid
        }
      });
    },
    getParams() {
      let routerParams = this.$route.params.vedioid;
      // 将数据放在当前组件的数据内
      this.vedioId = routerParams;
      this.searchTheCertainOne(this.vedioId);
    },
    searchTheCertainOne(vedioId) {
      var url =
        "http://localhost:8888/vedio/getCertainDetail?vedioId=" + vedioId;
      console.log(url);
      this.$http
        .post(url)
        .then(function(response) {
          var newmap = response.body;
          this.vedio = newmap[0];
          this.dramas = newmap[1];
          this.vedioid = this.vedio.vedioid;
          this.model.total = this.dramas.length;
        })
        .then(function() {
          this.getCertainHistory();

          this.vedioname = this.vedio.vedioname;
          console.log(this.vedioname);
        });

      this.model.page = 1;
    },
    goahead(episode) {
      this.episode = episode;
    },
    addlist() {},
    gotoWatch(episode) {
      this.episode = episode;
    },
    showlist() {
      if (this.isShow) {
        $(".selflist").hide();
        this.isShow = false;
      } else {
        $(".selflist").show();
        this.isShow = true;
      }
    },
    showlike() {
      if (this.isShowlike) {
        $(".likelist").hide();
        this.isShowlike = false;
      } else {
        $(".likelist").show();
        this.isShowlike = true;
      }
    },
    showedit() {
      var focus = $(".my_btns").css("display");
      if (focus == "block") $(".my_btns").css("display", "none");
      else $(".my_btns").css("display", "block");
    },
    changecss(e, index) {
      console.log(index);
      if (index == 1) {
        $("#new_view").addClass("active");
        $("#new_update").removeClass("active");
      } else {
        $("#new_update").addClass("active");
        $("#new_view").removeClass("active");
      }
    },
    showmore() {
      if ($("#more").is(":hidden")) {
        $("#more").show();
        $(".showmore").hide();
      }
    },
    hidemore() {
      if (!$("#more").is(":hidden")) {
        $("#more").hide();
        $(".showmore").show();
      }
    },
    pageFn(val) {
      this.model.page = val;
      if (val == Math.ceil(this.model.total / this.model.size)) {
        this.earchdramas = this.dramas.slice(
          (val - 1) * this.model.size,
          this.dramas.length
        );
      } else {
        this.earchdramas = this.dramas.slice(
          (val - 1) * this.model.size,
          val * this.model.size
        );
      }
    }
  }
};
</script>
<style scoped>
[v-cloak] {
  display: none;
}
.subul {
  list-style: none;
  font-size: 18px;
}
.subul li {
  padding-top: 20px;
}

.subul li a {
  color: black;
  text-decoration: none;
}
.subul li a:hover {
  color: brown;
}

.subul .title {
  margin: 20px;
}

.subul .selftitle {
  font-size: 13px;
  color: black;
}

.subul .vedionumber {
  font-size: 12px;
  color: darkgrey;
}
.pic {
  display: inline-block;
  width: 30%;
  height: auto;
  overflow: hidden;
}
.pic img {
  max-width: 100%;
  max-height: 100%;
}

.picright {
  margin-top: 7%;
  width: 60%;
  overflow: hidden;
  /* left: 0%; */
  margin-left: -10%;
  float: right;
}

.my_icon_top {
  position: relative;
  height: 130px;
  width: 100%;
  overflow: hidden;
  background: url("../assets/imgs/tiaomu.png") center top;
  width: 80%;
}
.my_img_tit {
  color: #fff;
  font-size: 24px;
  margin-top: 80px;
  text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.8);
  margin-left: 35%;
  text-align: left;
}

.my_img_tit span {
  color: #ffac2d;
  padding: 5px;
}

.my_icon_center {
  position: absolute;
  left: 10%;
  top: 6%;
  border: 3px white solid;
}

/* .my_icon_center img {
  float: left;
  /* left: 20%;
} */

.detail_img {
  position: absolute;
  top: 50px;
  left: 80px;
  width: 168px;
  height: 224px;
  padding: 3px;
  background: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
.detail_img .detail_img2 {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.detail_img img {
  width: auto;
  min-width: 100%;
  height: 100%;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -wekit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
}
.my_icon_bottom {
  /* padding-left: -120px; */
  height: 173px;
  width: 80%;
  padding-left: 220px;
  background: #fff;
  padding-top: 12px;
  position: relative;
}
.detail_row {
  font-size: 13px;
  line-height: 1;
  color: #333;
  width: 410px;
  margin-left: 10%;
}

.detail_row .detail_rowL {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: inline-block;
  margin-bottom: 8px;
  text-align: left;
}

.detail_row_l {
  margin-left: 10%;

  padding-left: 2px;
  width: 80%;
  font-size: 13px;
  line-height: 1.1;
  color: #333;
  margin-bottom: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
}

.detail_row2 {
  position: absolute;
  left: 17%;
  top: 114px;
  width: 500px;
}
.detail_row2 .subcriber_state {
  display: inline-block;
  font-size: 0;
  cursor: pointer;
  overflow: hidden;
  vertical-align: bottom;
  margin-left: -10%;
}
.detail_row2 .subcriber_state.subcriber_alr .sub_state {
  border: 1px solid #fab9b4;
  background: #fab9b4;
}
.detail_row2 .subcriber_state.subcriber_alr .sub_num {
  border: 1px solid #fab9b4;
  color: #fab9b4;
}
.detail_row2 .detail_more {
  display: inline-block;
  color: #3f7cc1;
  margin-left: 20%;
  vertical-align: bottom;
  position: relative;
  cursor: pointer;
}
.detail_row2 .detail_more .my_btns {
  position: absolute;
  top: 30px;
  display: none;
  left: -72px;
  width: 100px;
  background: #fff;
  font-size: 13px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  border: 1px solid #dedede;
  -webkit-filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
  border-radius: 2px;
  padding: 3px 0;
  z-index: 8;
}
.detail_row2 .detail_more .my_btns .icon_san {
  position: absolute;
  top: -17px;
  right: 8px;
  width: 0;
  border-width: 8px;
  border-style: solid;
  border-color: transparent transparent #dedede transparent;
}
.detail_row2 .detail_more .my_btns .my_btn_li {
  text-align: center;
  color: #333;
  width: 100%;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
}
.detail_row2 .addToInventory {
  display: inline-block;
  color: #3f7cc1;
  margin-left: 10px;
  vertical-align: bottom;
  cursor: pointer;
}

.my_recommand .each_title {
  border-bottom: 1px gray dashed;
}
.my_recommand {
  margin-top: 20px;
  margin-left: 5%;
  /* width: %; */
  color: black;
  background-color: white;
}

.my_recommand .recommand {
  font-weight: bolder;
  font-size: 16px;
  margin-bottom: 4%;
}

.my_recommand .each_recommand .vedio {
  background-color: white;
  box-shadow: 2px 2px 2px mistyrose;
  margin-left: 2px;
  margin-top: 3px;
}
.my_recommand .each_recommand .msg {
  margin: 5% -6%;
  text-align: left;
}
.my_recommand .each_recommand .msg .name {
  border-bottom: 1px rgb(222, 222, 222) dashed;
  /* margin-left: -20%; */
  color: black;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  /* top: 80%; */
}
.my_recommand .each_recommand .msg .summary {
  font-size: 12px;

  /* top: 80%; */
}
.my_recommand .each_recommand .img {
  margin-left: -5%;
}

.my_content {
  margin-top: 16px;
  left: 2%;
}

.my_content .history {
  background-color: white;
  margin-bottom: 20px;
  color: black;
  font-size: 14px;
  text-align: left;
  font-weight: bolder;
  padding: 10px 20px;
}

.my_content .history .latest_view {
  color: #ff6160;
  font-size: 14px;
   overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}
.my_content .history .continue {
  float: right;
  color: #3f7cc1;
  font-size: 10px;
  cursor: pointer;
}

.sub_a_icon {
  width: 14px;
  height: 14px;
  background: url(../assets/imgs/icon.png);
  background-position: -10px -270px;
  vertical-align: middle;
  display: inline-block;
  position: relative;
  top: -2px;
}

.current_watch {
  color: #ffac2d;
  font-size: 13px;

  /* float: right; */
  /* position: absolute;
  bottom: 25%;
  left: 70%; */
}
.current_watch .icon {
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  background: url(../assets/imgs/icon.png);
  background-position: -240px -271px;
  position: relative;
  top: -3px;
  margin-right: 5px;
}
.my_content .content {
  background-color: white;
}
.my_content .describe {
  color: black;
  font-size: 18px;
  font-weight: bolder;
  text-align: left;
  border-bottom: 1px silver solid;
  padding: 10px 20px;
}

.my_content .detail {
  text-align: left;
  margin-top: 10px;
  margin-left: 20px;
  line-height: 25px;
}

.my_content .detail .summary .showmore {
  color: salmon;
  cursor: pointer;
}

.my_content .detail .summary .more {
  display: none;
}

.my_content .detail .summary .hidemore {
  color: darkcyan;
  cursor: pointer;
}

.my_content .dramas {
  background-color: white;
}

.my_content .dramas .vedioname {
  color: black;
  font-size: 17px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

}

.my_content .dramas .episode {
  color: black;
  font-size: 15px;
  /* margin-left: 5%; */
  /* margin-right: 15%; */
}

.dramas .detail {
  border-bottom: 1px silver dashed;
  padding: 10px 10px;
}

.watch_state1 {
  /* float: right; */
  font-size: 13px;
}
.watch_state1 .icon {
  display: inline-block;
  vertical-align: middle;
  width: 18px;
  height: 18px;
  background: url(../assets/imgs/player.png);
  background-position: -40px -20px;
  position: relative;
  top: -3px;
}
.watch_state1 span {
  color: #888;
}

.subcriber_state {
  /* border:1px red solid; */
  position: absolute;
  left: 21%;
  font-size: 0;
  cursor: pointer;
  margin-top: 5%;
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
