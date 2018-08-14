<template>
  <div class="home">
    <!-- <attention v-bind:ModalTitle="ModalTitle" :ModalMsg="ModalMsg"  ></attention> -->

      <div class="row banner">
          <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8">

                <div id="myCarousel" class="carousel slide">
                  <!-- 轮播（Carousel）指标 -->
                  <ol class="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#myCarousel" data-slide-to="1"></li>
                    <li data-target="#myCarousel" data-slide-to="2"></li>
                  </ol>
                  <!-- 轮播（Carousel）项目 -->
                  <div class="carousel-inner">
                    <div class="item active" >
                      <img src="@/assets/imgs/banner.jpg" alt="First slide" >
                    </div>
                    <div class="item">
                      <img src="@/assets/imgs/banner.jpg" alt="Second slide" >
                    </div>
                    <div class="item">
                      <img src="@/assets/imgs/banner.jpg" alt="Third slide">
                    </div>
                  </div>

                  <!-- 轮播（Carousel）导航 -->
                  <a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
                    <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="right carousel-control" href="#myCarousel" role="button" data-slide="next" >
                    <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>

                </div>

          </div>
          <putlist ref="putlist" @isexit="isexit"></putlist>
            <div class="row">
                    <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8">
                        <div class="searchbox">

                          <div id="searchHead">
                            <div class="collapse navbar-collapse" id="example-navbar-collapse">
                              <ul class="nav navbar-nav">
                                  <li ><a href="javascript:void(0)" @click="gotoType(0,1,0)">中国大陆</a></li>
                                  <li class="filteactive"><a href="javascript:void(0)" @click="gotoType(1,3,0)">美剧</a></li>
                                  <li><a href="javascript:void(0)" @click="gotoType(1,6,0)">英剧</a></li>
                                  <li><a href="javascript:void(0)" @click="gotoType(1,5,0)">日剧</a></li>
                                  <li><a href="javascript:void(0)" @click="gotoType(3,0,0)">动漫</a></li>
                                  <li><a href="javascript:void(0)" @click="gotoType(0,0,0)">更多</a></li>
                              </ul>
                            </div>
                          </div>

                          <div class="input-group search">
                              <input type="text" class="form-control" placeholder="剧名" id="fuzzyWord">
                              <span class="input-group-btn">
                                  <button class="btn btn-default" type="button" @click="exportFuzzyWord" >Go</button>
                              </span>
                          </div>
                        </div>
                    </div>
                </div>
      </div>
     <div class="row subscribe">
        <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8 " >
            <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title viewall">我的订阅

                    </h3>

                </div>
                <div class="row" v-if="isSuccess">


                    <div class="border col-md-12 col-xs-12 ">

                        <div class="row">

                            <div class="col-md-12 col-xm-12 col-xs-12 eachsub" v-if="subsVedios.length==0">
                               <div class="col-md-offset-1 col-xs-offset-1 col-md-3 col-xs-3">
                                    <img src="@/assets/imgs/home1.jpg" alt="" width="30%">
                                </div>

                                <div class="col-md-7 col-xs-7 empty" >
                                      <span>
                                      <div class="title">当你订阅的剧集更新时，你会在此看到它。</div>
                                       这里空空如也
                                       <div>
                                            <a>
                                                <router-link to="/type">立即去订阅</router-link>
                                            </a>
                                        </div>
                                        </span>

                                </div>

                              </div>
                              <div v-else>


                              <div class="col-md-3 col-xm-6 col-xs-12 eachsub" v-for="(subs) in subsVedios.slice(0, 3)" v-bind:key="subs.subid" >
                                <div class="row vedio">
                                    <div class="col-md-6 col-xs-6 img" >
                                      <a href="javascript:void(0)" class="thumbnail" @click="goToDetail(subs.vedioid)">
                                          <img :src="subs.picture" class="vedio_img"
                                              alt="通用的占位符缩略图">
                                      </a>
                                    </div>
                                    <div class="col-xs-6 col-md-6 msg">
                                        <div class="user_msg">
                                          <span class="name" @click="goToDetail(subs.vedioid)">{{subs.vedioname}}</span>
                                          <br>
                                          <span class="summary" v-if="subs.nowepisode!=null">更新至

                                              {{subs.nowepisode}}


                                            集</span>


                                          <div class="sub_new" v-if="subs.isnew">

                                          </div>
                                        </div>
                                            <div class="user_icon">
                                                <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                                                  <img src="@/assets/imgs/liebiao.png"  >
                                                </a>
                                                <ul class="dropdown-menu" style="min-width: 20px;" >
                                                    <li><a href="javascript:void(0);" @click="cancelSub(subs.subid)">取消订阅</a></li>
                                                    <li><a href="javascript:void(0);" @click="putHandler(subs)" data-target="#putlist" data-toggle="modal">添加至清单</a></li>

                                                </ul>
                                              </div>



                                    </div>

                                </div>

                              </div>
                              <div class="col-md-3 col-xm-6 col-xs-12 eachsub">

                                  <div class="sub_li sub_more">
                                      <router-link to="/subs/subscribe">
                                        全部{{subsVedios.length}}条订阅<b></b>
                                     </router-link>
                                    </div>
                                </div>
                              </div>
                          </div>

                    </div>



                </div>
               <div v-else class="row unlog border">
                        <div class="col-md-offset-2 col-xs-offset-2 col-md-4 col-xs-4">
                            <img src="@/assets/imgs/home1.jpg" alt="" width="20%">
                        </div>

                        <div class="col-md-4 col-xs-4">
                              <span>
                                登录后可查看您的订阅
                                <br>

                                <button id="fat-btn" class="btn btn-primary" data-loading-text="Loading..."
                                    type="button" v-on:click="login"> 登录
                                </button>                              </span>

                        </div>

               </div>

            </div>

        </div>

    </div>


<div class="row every">
  <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8 each">
      <div class="type">
                <span>新剧推荐<span class="attention">|</span>
                </span>
                <span class="catagory">
                  <ol class="breadcrumb">
                      <li @click="typenewchange($event,0,1)">中国大陆</li>
                                  <li class="filteactive"  @click="typenewchange($event,1,3)">美剧 </li>
                                  <li  @click="typenewchange($event,1,6)">英剧 </li>
                                  <li @click="typenewchange($event,1,5)">日剧 </li>
                                  <li  @click="typenewchange($event,3,0)">动漫 </li>
                                  <li class="all " @click="gotoType(0,0,0)">全部</li>
                  </ol>
                </span>
                <span class="change"><a href="javascript:void(0)" @click="randomchange(1)">换一换</a></span>
        </div>
  </div>

   <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8 content each">

              <div class="row">
                    <div class="col-md-3 col-xm-11 col-xs-6" v-for="(vedio,index) in newVedios.slice(0, 7)" v-bind:key="vedio.vedioid" >
                        <div class="row vedio" >
                            <div class="col-md-5 col-xs-5 img">
                               <a href="javascript:void(0)" class="thumbnail" @click="goToDetail(vedio.vedioid)">
                                  <img :src="vedio.picture"
                                      alt="通用的占位符缩略图">
                              </a>
                            </div>
                            <div class="col-xs-7 col-md-7 msg">
                                <span class="name" @click="goToDetail(vedio.vedioid)">{{vedio.vedioname}}</span>
                                <br>


 <span class="summary" v-if="vedio.nowepisode!=0&& vedio.catagory!='电影'">更新至{{vedio.nowepisode}}集</span>
                                      <span class="summary" v-else>{{vedio.catagory}}</span>

                                <br>
                                <div class="row subcriber_state" @click="subState(newVedios,vedio,index)">
                                    <div class="sub_state">

                                          <span v-if="isSub(vedio)" :class="index">
                                              <img src="@/assets/imgs/icon_yiding.png" alt="button_sub">
                                          </span>

                                          <span v-else >
                                              <img src="@/assets/imgs/icon_weiding.png" alt="button_sub">
                                          </span>


                                     </div>
                                    <div class="sub_num">{{vedio.subcribecount}}</div>
                                  </div>
                            </div>

                        </div>

                    </div>


                     <div class="col-md-3 col-xm-4">
                        <div class="col_more">
                            <div class="col_more_con">
                              <a href="javascript:void(0);" target="_blank" @click="shownewmore">
                                <span>全部{{newVedios.length}}条内容>></span><b></b>
                              </a>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
</div>
<div class="row every">
  <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8 each">
      <div class="type">
                <span>热门清单<span class="attention">|</span>
                </span>
                <span class="change"><a href="javascript:void(0)" @click="randomchange(3)">换一换</a></span>
        </div>
  </div>

   <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8 content each">

                <div class="row">

                         <div class="col-md-3 col-xm-11 col-xs-6" v-for="(list,index) in allVediolist.slice(0, 3)" v-bind:key="list.listid" >
                          <div class="row vedio">
                              <div class="col-md-5 col-xs-5 img">
                                <a href="javascript:void(0)" class="thumbnail" @click="goToCollect(list.listid)">
                                    <img :src="list.coverimage"
                                        alt="通用的占位符缩略图">
                                </a>
                              </div>
                              <div class="col-xs-7 col-md-7 msg">
                                  <span class="name" @click="goToCollect(list.listid)">{{list.listname}}</span>
                                  <br>
                                  <span class="summary">共{{list.count}}条目</span>

                                  <br>
                                  <div class="row subcriber_state" @click="subStatelist(allVediolist,list,index)">
                                    <div class="sub_state">

                                          <span v-if="isSublist(list)" class="yiding">
                                              <img src="@/assets/imgs/icon_yiding.png" alt="button_sub">
                                          </span>

                                          <span v-else class="weiding">
                                              <img src="@/assets/imgs/icon_weiding.png" alt="button_sub">
                                          </span>


                                     </div>
                                    <div class="sub_num">{{list.hot}}</div>
                                  </div>
                              </div>

                          </div>

                    </div>

                     <div class="col-md-3 col-xm-11 col-xs-6">

                        <div class="col_more">
                            <div class="col_more_con">
                              <a href="javascript:void(0);" @click="showlistmore">
                                <span>全部{{allVediolist.length}}条清单>></span><b></b>
                              </a>
                            </div>

                        </div>

                    </div>


                </div>
            </div>
</div>
<div class="row every">
  <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8 each">
      <div class="type">
                <span>完结剧集<span class="attention">|</span>
                </span>
                <span class="catagory">
                  <ol class="breadcrumb">

                    <li   @click="typeoverchange($event,0,1)">中国大陆 </li>
                                  <li class="filteactive" @click="typeoverchange($event,1,3)">美剧 </li>
                                  <li  @click="typeoverchange($event,1,6)">英剧 </li>
                                  <li  @click="typeoverchange($event,1,5)">日剧 </li>
                                  <li @click="typeoverchange($event,3,0)">动漫 </li>
                                  <li class="all"  @click="gotoType(0,0,2)">全部 </li>
                  </ol>
                </span>
                <span class="change"><a href="javascript:void(0)" @click="randomchange(2)">换一换</a></span>
        </div>
  </div>

   <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8 content each">

              <div class="row">

                       <div class="col-md-3 col-xm-11 col-xs-6" v-for="(vedio,index) in overVedios.slice(0, 11)" v-bind:key="vedio.vedioid" >
                          <div class="row vedio">
                              <div class="col-md-5 col-xs-5 img">
                                <a href="javascript:void(0)" class="thumbnail" @click="goToDetail(vedio.vedioid)">
                                    <img :src="vedio.picture"
                                        alt="通用的占位符缩略图">
                                </a>
                              </div>
                              <div class="col-xs-7 col-md-7 msg">
                                  <span class="name" @click="goToDetail(vedio.vedioid)">{{vedio.vedioname}}</span>
                                  <br>

 <span class="summary" v-if="vedio.nowepisode!=0&& vedio.catagory!='电影'">更新至{{vedio.nowepisode}}集</span>
                                      <span class="summary" v-else>{{vedio.catagory}}</span>

                                  <br>
                                  <div class="row subcriber_state" @click="subState(overVedios,vedio,index)">
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

                     <div class="col-md-3 col-xm-11 col-xs-6">

                        <div class="col_more">
                            <div class="col_more_con">
                              <a href="javascript:void(0);" target="_blank" @click="showovermore">
                                <span>全部{{overVedios.length}}条内容>></span><b></b>
                              </a>
                            </div>

                        </div>

                    </div>
                </div>


            </div>
</div>
  </div>
</template>

<script>
import attention from "@/components/common/attention";
import bus from "./bus.js";
import putlist from "@/components/putlist";
export default {
  name: "HomePage",
  components: {
    attention,
    putlist
  },
  data() {
    return {
      isSuccess: false, //拿到id，
      newVedios: [],
      overVedios: [],
      newCount: 0,
      overCount: 0,
      subsVedios: [],
      allVediolist: [],
      collectlists: [],
      _this_catagory: 0,
      _this_region: 3,
      ModalTitle: "警告",
      ModalMsg: ""
    };
  },

  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "getParams",
    deep: true
  },
  mounted: function() {
    this.getParams();
    //美剧
    this.getNewVedios(0, 3);
    this.getOverVedios(0, 3);
    this.getAllSubs();
    this.getAllVediolist();
    this.getAllColletlist();
  },

  props: {},
  methods: {
    goToDetail(vedioid) {
      this.$router.push({
        path: "/subs/detail",
        name: "detail",
        params: {
          vedioid: vedioid
        }
      });
    },
    goToCollect(listid) {
      this.$router.push({
        path: "/subs/collect",
        name: "collect",
        params: {
          listid: listid,
          isupdate: false,
          isSelf: false
        }
      });
    },
    isexit(msg) {
      bus.$emit("empty", msg);
      bus.$emit("idel", false);
      $("#attention").modal("show"); //手动开启
    },
    putHandler(subs) {
      this.$refs.putlist.transfer(subs.vedioid, subs.vedioname, subs.picture);
    },
    cancelSub(subid) {
      var url = "http://localhost:8888/subscirbe/cancelSub/" + subid;

      this.$http
        .post(url)
        .then(function(response) {
          var newmap = response.body;
          if (newmap != true) return;
          // console.log(this.subsVedios);
        })
        .then(function() {
          this.getAllSubs();
          this.getNewVedios(0, 3);
          this.getOverVedios(0, 3);
        });
    },
    exportFuzzyWord() {
      var fuzzyWord = $("#fuzzyWord").val();
      console.log(fuzzyWord);
      if (fuzzyWord == "") {
        bus.$emit("empty", "请输入搜索内容");
        bus.$emit("idel", false);

        $("#attention").modal("show"); //手动开启

        return;
      }

      //跳转路由
      //  this.$emit("exportFuzzyWord",fuzzyWord);
      this.$router.push({
        path: "/search",
        name: "search",
        params: {
          fuzzyWord: fuzzyWord
        }
      });
    },
    showlistmore() {
      this.$router.push({
        path: "/list",
        name: "list"
      });
    },
    shownewmore() {
      this.gotoType(this._this_catagory, this._this_region, 0);
    },
    showovermore() {
      this.gotoType(this._this_catagory, this._this_region, 2);
    },
    typenewchange(e, catagory, region) {
      this.changecss(e);
      this.getNewVedios(catagory, region);
    },
    typeoverchange(e, catagory, region) {
      this.changecss(e);
      this.getOverVedios(catagory, region);
    },
    changecss(e) {
      $(e.currentTarget).addClass("filteactive");
      var siblings = $(e.currentTarget).siblings();
      for (var i = 0; i < siblings.length; i++) {
        //遍历子元素
        $(siblings[i]).removeClass("filteactive");
      }
    },
    gotoType(catagory, region, status) {
      this._this_catagory = catagory;
      this._this_region = region;
      this.$router.push({
        path: "/type",
        name: "type",
        params: {
          catagory: catagory,
          region: region,
          status: status
        }
      });
    },
    login() {
      $("#bg").show();
      $("#logon").show();
    },
    getParams() {
      var userid = sessionStorage.getItem("userid");
      if (userid != null) {
        this.isSuccess = true;
      }
    },
    getAllColletlist() {
      var userid = sessionStorage.getItem("userid");
      if (userid != null) {
        var url = "http://localhost:8888/vediolist/allcollect";

        var zipFormData = new FormData();
        zipFormData.append("userid", userid);

        this.$http.post(url, zipFormData).then(function(response) {
          var newmap = response.body;
          this.collectlists = newmap;
          // console.log(this.subsVedios);
        });
      }
    },
    getAllVediolist() {
      var userid = sessionStorage.getItem("userid");
      if (userid != null) {
        if (userid == null) {
          userid = -1;
          console.log(userid);
        }
        var url = "http://localhost:8888/vediolist/getAllVediolist/" + userid;

        this.$http.post(url).then(function(response) {
          var newmap = response.body;
          this.allVediolist = newmap;
        });
      }
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
            // var subs = newmap[i];
            vedio.subcribecount = i;
            // array.splice(index,1,vedio);
            for (var i = 0; i < this.overVedios.length; i++) {
              if (this.overVedios[i].vedioid == vedio.vedioid) {
                this.overVedios.splice(i, 1, vedio);
              }
            }
            for (var i = 0; i < this.newVedios.length; i++) {
              if (this.newVedios[i].vedioid == vedio.vedioid) {
                this.newVedios.splice(i, 1, vedio);
              }
            }
          }
        });
      } else {
        this.getAllSubs();
      }
    },
    getNewVedios(type, region) {
      this._this_catagory = type;
      this._this_region = region;
      var _this = this;
      var url =
        "http://localhost:8888/vedio/searchIsNew?type=" +
        type +
        "&region=" +
        region;
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
    getOverVedios(type, region) {
      this._this_catagory = type;
      this._this_region = region;
      var _this = this;
      var url =
        "http://localhost:8888/vedio/searchIsOver?type=" +
        type +
        "&region=" +
        region;
      this.$http.post(url).then(function(response) {
        var newmap = response.body;
        for (var i in newmap) {
          this.overCount = i;
          this.overVedios = newmap[i];
          // console.log(this.newCount);
          // console.log(this.newVedios);
        }
      });
    },
    randomchange(data) {
      var array = [];
      if (data == 1) array = this.newVedios;
      else if (data == 2) array = this.overVedios;
      else array = this.allVediolist;
      var m = array.length,
        t,
        i;
      // 如果还剩有元素…
      while (m) {
        // 随机选取一个元素…
        i = Math.floor(Math.random() * m--);
        // 与当前元素进行交换
        t = array[m];
        array[m] = array[i];
        array[i] = t;
      }
      if (data == 1) {
        this.newVedios = array;
        this.newVedios.splice();
      } else if (data == 2) {
        this.overVedios = array;
        this.overVedios.splice();
      } else {
        this.allVediolist = array;
        this.allVediolist.splice();
      }
    },
    isSub(vedio) {
      var flag = false;
      first: for (var j = 0; j < this.subsVedios.length; j++) {
        if (vedio.vedioid == this.subsVedios[j].vedioid) {
          flag = true;
          break first;
        }
      }
      return flag;
    },

    subStatelist(array, list, index) {
      // console.log(array);
      var userid = sessionStorage.getItem("userid");
      if (userid != null) {
        var url = "http://localhost:8888/vediolist/collectVedio/" + userid;

        this.$http.post(url, list).then(function(response) {
          var newmap = response.body;
          for (var i in newmap) {
            var subs = newmap[i];
            list.hot = i;
            // array.splice(index,1,vedio);
            for (var i = 0; i < this.allVediolist.length; i++) {
              if (this.allVediolist[i].listid == list.listid) {
                this.allVediolist.splice(i, 1, list);
              }
            }
          }
          this.getAllColletlist();
        });
      }
    },
    isSublist(list) {
      var flag = false;
      first: for (var j = 0; j < this.collectlists.length; j++) {
        if (list.listid == this.collectlists[j].listid) {
          flag = true;
          break first;
        }
      }
      return flag;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.filteactive {
  color: #ff6160;
  cursor: pointer;
}

.filteactive:before {
  color: #888;
}
.home {
  margin: 20px;
}
.searchbox {
  background-color: black;

  opacity: 0.8;
  position: absolute;
  /* top:50%; */
  margin: -20% 10%;
  z-index: 1000;
  width: auto;
}
.search {
  margin-bottom: 3%;
  margin-left: 10%;
  width: 80%;
}

#searchHead {
  /* color:white; */
  font-size: 17px;
  opacity: 1;
  width: 70%;
  margin-left: 20%;
  color: white;
}

.subscribe {
  /* border: 1px red solid; */
  margin-top: 20px;
}

.subscribe .subs_new {
  border: 1px red solid;
  margin-left: 5%;
}

.subscribe .subs_new .msg .name {
  border: 1px red solid;
  font-size: 12px;
}

.eachsub {
  margin-top: 2%;
}
.eachsub .user_msg .name {
  cursor: pointer;
}

.eachsub .msg {
  text-align: left;
  font-size: 14px;
  padding: 10px 0px;
}
.eachsub .msg .summary {
  color: #888888;
  font-size: 12px;
}

.sub_li.sub_more {
  line-height: 100px;
  background: #f4f5f6;
  text-align: center;
  font-size: 15px;
  border-radius: 2px;
  margin-top: 5px;
}
.sub_li.sub_more a {
  color: #3f7cc1;
}
.sub_li.sub_more a b {
  display: inline-block;
  width: 17px;
  height: 17px;
  vertical-align: middle;
  position: relative;
  top: -2px;
  background: url("../assets/imgs/icon.png");
  background-position: -150px -270px;
}
.sub_new {
  width: 36px;
  height: 20px;
  text-align: center;
  line-height: 20px;
  background: url("../assets/imgs/icon.png");
  background-position: -210px -220px;
  color: #fff;
  border-radius: 2px;
  font-size: 12px;
  position: absolute;
  top: 80px;
}

.vedio .vedio_img {
  max-height: 120px;
  min-height: 120px;
}

.vedio .msg {
  min-height: 120px;
  max-height: 120px;
}
.vedio .msg .user_msg {
  min-height: 60px;
  max-height: 60px;
}

.user_icon {
  margin-left: 60%;
  width: 40px;
  height: 40px;
  /* border-radius: 50px; */
  overflow: hidden;
  display: inline-block;
  vertical-align: middle;
  /* border: 1px solid #dedede; */
}

.user_icon img {
  display: block;
  width: 70%;
  height: 70%;
  margin: 6px;
}

.vedioMsg {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* position: absolute; */
  /* left: 50%; */
}
.vedioMsg a {
  color: cadetblue;
  text-decoration: none;
}

.vedioMsg a:hover {
  color: teal;
}

.vedioMsg .upd {
  font-size: 5px;
}

.unlog .img {
  width: 80%;
  height: auto;
}

.unlog {
  font-size: 18px;
  /* height: 300px; */
  margin: 5%;
  /* border:1px red solid; */
}
.content {
  margin-top: 1px;
  padding-top: 10px;
}
.content .vedio {
  background-color: white;
  /* box-shadow: 2px 2px 2px darkseagreen; */
  /* margin-left: 2px; */
  height: 120px;
}

.content .vedio .img img {
  max-height: 90px;
  min-height: 90px;
}

.content .msg {
  margin: 10% -6%;
}

.content .msg .name {
  border-bottom: 1px rgb(222, 222, 222) dashed;
  /* margin-left: -20%; */
  color: black;
  position: absolute;
  left: 20px;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: left;
  cursor: pointer;
  /* top: 80%; */
}
.content .msg .summary {
  font-size: 12px;
  position: absolute;
  left: 20px;

  /* top: 80%; */
}
.content .img {
  margin-left: -5%;
  height: 100%;
  padding-top: 20px;
}
.subcriber_state {
  position: absolute;
  left: 25%;
  font-size: 0;
  cursor: pointer;
  margin-top: 20%;
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
.type {
  font-size: 20px;
  font-weight: bolder;
  color: dimgray;
  text-align: left;
  margin-bottom: 5px;
  margin-top: 5px;
}
.change {
  position: absolute;
  left: 85%;
  font-size: 12px;
  top: 20%;
}
.type .all {
  font-size: 18px;
  color: coral;
}
.type .all a {
  color: crimson;
}
.type .change a {
  color: rosybrown;
}
.type .change a:hover {
  color: saddlebrown;
}
.catagory {
  font-size: 13px;
  position: absolute;
  font-weight: bolder;
  left: 10%;
}
.catagory a {
  color: darkgray;
}

.each {
  background-color: white;
  /* margin-bottom: 20px; */
  box-shadow: 5px 5px 5px #888888;
  /* border-bottom: 1px #888 dashed; */
}

.every {
  margin-bottom: 20px;
}
.col_more {
  display: block;
  width: 100%;
  height: auto;
  text-align: center;
  font-size: 15px;
  border-radius: 3px;
  float: left;
}
.col_more .col_more_con {
  margin: 8% auto;
  width: 100%;
  height: 100%;
  background: #f4f5f6;
}

.col_more a {
  line-height: 100px;
  color: cadetblue;
}
.eachsub .empty {
  color: #888;
  text-align: left;
  margin: 10px;
}

.eachsub .empty .title {
  font-size: 16px;
  color: black;
}

.eachsub .empty a {
  text-decoration: none;
  color: #3f7cc1;
}
</style>
