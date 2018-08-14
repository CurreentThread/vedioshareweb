<template>
    <div class="type">
        <div class="row">
            <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8">
                <div class="catagory">

                      <div class="row each">
                        <div class="col-md-1 col-xs-1">状态 </div>
                          <div class="col-md-11 col-xs-11">
                            <ul >
                                <li id="status_0" @click="changeCss($event,{status:0})" class="active">全部</li>
                                <li id="status_1" @click="changeCss($event,{status:1})">连载</li>
                                <li id="status_2" @click="changeCss($event,{status:2})">完结</li>
                                <li id="status_3" @click="changeCss($event,{status:3})">未开播</li>
                            </ul>
                          </div>
                      </div>

                      <br>
                      <div class="row each">
                        <div class="col-md-1 col-xs-1">类目 </div>
                          <div class="col-md-11 col-xs-11">
                            <ul>
                              <li  id="type_0" @click="changeCss($event,{type:0})" class="active">全部</li>
                              <li id="type_1" @click="changeCss($event,{type:1})">电视剧</li>
                              <li id="type_2"  @click="changeCss($event,{type:2})">电影</li>
                              <li id="type_3" @click="changeCss($event,{type:3})">动漫</li>
                              <li id="type_4" @click="changeCss($event,{type:4})">综艺</li>
                          </ul>
                      </div>
                     </div>
                      <br>
                      <div class="row each">
                        <div class="col-md-1 col-xs-1">地区 </div>
                          <div class="col-md-11 col-xs-11">
                            <ul>
                              <li id="region_0" @click="changeCss($event,{region:0})" class="active">全部</li>
                              <li id="region_1" @click="changeCss($event,{region:1})">大陆</li>
                              <li id="region_2" @click="changeCss($event,{region:2})">台湾</li>
                              <li id="region_3" @click="changeCss($event,{region:3})">美国</li>
                              <li id="region_4" @click="changeCss($event,{region:4})">韩国</li>
                              <li id="region_5" @click="changeCss($event,{region:5})">日本</li>
                              <li id="region_6" @click="changeCss($event,{region:6})">英国</li>
                              <li id="region_7"  @click="changeCss($event,{region:7})">其他</li>
                          </ul>
                      </div>
                    </div>
                        <br>
                      <div class="row each">
                        <div class="col-md-1 col-xs-1">年份 </div>
                          <div class="col-md-11 col-xs-11 ">
                            <ul>
                                <li @click="changeCss($event,{year:0})" class="active">全部</li>
                                <li  @click="changeCss($event,{year:1})">2018</li>
                                <li  @click="changeCss($event,{year:2})">2017</li>
                                <li  @click="changeCss($event,{year:3})">2016</li>
                                <li @click="changeCss($event,{year:4})">2015-2010</li>
                                <li  @click="changeCss($event,{year:5})">2010-2000</li>
                                <li  @click="changeCss($event,{year:6})">90年代</li>
                                <li  @click="changeCss($event,{year:7})">更早</li>
                            </ul>
                      </div>
                     </div>
                </div>

            </div>

            <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8">
                    <div class="order">
                        <div class="new noactive" @click="changenew({order:1})">最新</div>
                        <div class="hot active"  @click="changehot({order:0})">最热</div>
                    </div>
            </div>

            <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8 content">
                <div class="row">

                    <div class="col-md-4 col-xs-6" v-for="(vedio,index) in eachvedios" v-bind:key="vedio.vedioid">
                        <div class="row vedio" >
                              <div class="col-md-5 col-xs-5 img">
                                <a href="#" class="thumbnail" @click="goToDetail(vedio.vedioid)">
                                    <img :src="vedio.picture"
                                        alt="通用的占位符缩略图">
                                </a>
                              </div>
                              <div class="col-xs-7 col-md-7 msg">
                                  <span class="name" @click="goToDetail(vedio.vedioid)">{{vedio.vedioname}}</span>
                                  <br>
                                  <span class="summary" v-if="vedio.nowepisode!=0&& vedio.catagory!='电影'">更新至

                                              {{vedio.nowepisode}}

                                  集</span>
                                  <span class="summary" v-else>
                                    {{vedio.catagory}}
                                  </span>


                                  <br>
                                  <div class="row subcriber_state" @click="subState(eachvedios,vedio,index)">
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
            <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8 page">

                <pageination :total="model.total" :size="model.size" :page="model.page" :changge="pageFn" >

                </pageination>
                <!-- {{model.page}}            -->
            </div>

        </div>
    </div>
</template>
<script src="../assets/libs/pageination.js"></script>

<script>
// import index from "@/components/index"
import pageination from "vue_pageination";
export default {
  name: "type",
  components: {
    // 'index':index,
    pageination
  },
  data() {
    return {
      //  date:new Date().getYear()
      vedios: [],
      eachvedios: [],
      model: {
        total: 100, //总条数
        size: 21, //每页显示条目个数不传默认10
        page: 1 //当前页码
      },
      statusCode: 0,
      typeCode: 0,
      regionCode: 0,
      yearCode: 0,
      orderCode: 0,
      subsVedios: []
    };
  },

  mounted() {
    var catagory = this.$route.params.catagory;
    var region = this.$route.params.region;
    var status = this.$route.params.status;
    if (typeof catagory === "undefined");
    else {
      this.typeCode = catagory;
      console.log($("#type_" + catagory));

      var type_e = $("#type_" + catagory);
      type_e.addClass("active");
      var t_siblings = type_e.siblings();
      for (var i = 0; i < t_siblings.length; i++) {
        //遍历子元素
        $(t_siblings[i]).removeClass("active");
      }
    }

    if (typeof region === "undefined");
    else {
      this.regionCode = region;

      var region_e = $("#region_" + region);
      console.log($("#region_" + region));
      region_e.addClass("active");
      var r_siblings = region_e.siblings();
      for (var i = 0; i < r_siblings.length; i++) {
        //遍历子元素
        $(r_siblings[i]).removeClass("active");
      }
    }

    if (typeof status === "undefined");
    else {
      this.statusCode = status;

      var status_e = $("#status_" + status);
      console.log($("#status_" + status));
      status_e.addClass("active");
      var s_siblings = status_e.siblings();
      for (var i = 0; i < s_siblings.length; i++) {
        //遍历子元素
        $(s_siblings[i]).removeClass("active");
      }
    }

    this.filterByCondition({
      type: this.typeCode,
      region: this.regionCode,
      status: this.statusCode
    });
    this.getAllSubs();
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
      var url = "http://localhost:8888/subscirbe/subsVedio";
if(userid!=null){
      var zipFormData = new FormData();
      zipFormData.append("userid", userid);
      zipFormData.append("vedioid", vedio.vedioid);
      this.$http.post(url, zipFormData).then(function(response) {
        var newmap = response.body;
        for (var i in newmap) {
          var subs = newmap[i];
          vedio.subcribecount = i;
          // array.splice(index,1,vedio);
          for (var i = 0; i < array.length; i++) {
            if (array[i].vedioid == vedio.vedioid) {
              array.splice(i, 1, vedio);
            }
          }

          this.getAllSubs();
        }
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
        // console.log(this.subsVedios);
      });}
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
    changehot(data) {
      $(".hot").attr("class", "hot active");
      $(".new").attr("class", "new noactive");
      this.filterByCondition(data);
    },
    changenew(data) {
      $(".new").attr("class", "new active");
      $(".hot").attr("class", "hot noactive");
      this.filterByCondition(data);
    },
    orderList(order) {
      var url = "http://localhost:8888/vedio/orderVedio/" + order;

      var jsonData = JSON.stringify(this.vedios);

      this.$http.post(url, jsonData).then(function(response) {
        var newmap = response.body;

        for (var i in newmap) {
          this.vedios = newmap[i];
          this.model.total = i;
          // console.log(i + ":" + Math.ceil(this.model.total));
        }

        this.eachvedios = this.vedios.slice(0, this.model.size);

        // console.log(this.eachvedios);
      });
      this.model.page = 1;
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
    getHttpResult(url) {
      this.$http.post(url).then(function(response) {
        var newmap = response.body;

        for (var i in newmap) {
          this.vedios = newmap[i];
          this.model.total = i;
          // console.log(i + ":" + Math.ceil(this.model.total));
        }

        this.eachvedios = this.vedios.slice(0, this.model.size);
        // console.log(this.eachvedios);
      });

      this.model.page = 1;
    },

    changeCss(e, data) {
      this.filterByCondition(data);
      $(e.currentTarget).addClass("active");
      var siblings = $(e.currentTarget).siblings();
      for (var i = 0; i < siblings.length; i++) {
        //遍历子元素
        $(siblings[i]).removeClass("active");
      }
    },
    filterByCondition(data) {
      // console.log($(obj.currentTarget).text());
      // console.log(data);
      var _this = this;
      $.each(data, function(i) {
        if (i == "status") _this.statusCode = data[i];
        if (i == "type") _this.typeCode = data[i];
        if (i == "region") _this.regionCode = data[i];
        if (i == "year") _this.yearCode = data[i];
        if (i == "order") _this.orderCode = data[i];
      });
      var url =
        "http://localhost:8888/vedio/filterByCondition?status=" +
        this.statusCode +
        "&type=" +
        this.typeCode +
        "&region=" +
        this.regionCode +
        "&year=" +
        this.yearCode +
        "&order=" +
        this.orderCode;

      console.log(url);
      this.getHttpResult(url);
    },

    sendVedioId(vedioId) {
      // console.log(vedioId);
      this.$router.push({
        path: "/detail",
        name: "detail",
        params: {
          vedioId: vedioId
        }
      });
    }
  }
};
</script>


<style scoped>
.type {
  margin: 20px;
}
/* <a onclick="_search({ country:'england',page:'1' })">英国</a> */
.active {
  color: #ff6160;
  cursor: pointer;
}

.active:before {
  color: #888;
}
li {
  color: #888;
}

.catagory {
  background-color: white;
  color: darkgray;

  border: 1px white solid;
  box-shadow: 5px 5px 5px darkgray;
}

.catagory ul li {
  font-size: 15px;
  list-style: none;
  margin-right: 6%;
  float: left;
}

.catagory ul {
  margin-left: -3%;
  border-bottom: 1px #888 dashed;
  height: 20px;
  /* margin-top:2%; */
}
.catagory .each {
  margin-top: 1%;
}

.content .vedio {
  background-color: white;
  box-shadow: 2px 2px 2px darkseagreen;
  margin-left: 2px;
  margin-bottom: 2px;
  height: 170px;
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
.order {
  margin-top: 20px;
  cursor: pointer;
}
.order .new {
  display: inline-block;
  float: right;
  height: 25px;
  width: 60px;
}
.order .hot {
  display: inline-block;
  float: right;
  height: 25px;
  width: 60px;
}

.order .active {
  background: #ff6160;
  border: 1px solid #ff6160;
  color: white;
  border-radius: 2px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.order .noactive {
  background: white;
  border: 1px solid #ff6160;
  color: black;
  border-radius: 2px;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
}

.page {
  margin-top: 20px;
}
.pageination_align {
  text-align: center;
}

.pageination {
  color: #48576a;
  font-size: 12px;
  display: inline-block;
  user-select: none;
}

.pagination_page {
  padding: 0 4px;
  border: 1px solid #d1dbe5;
  border-right: 0;
  background: #fff;
  font-size: 13px;
  min-width: 28px;
  height: 28px;
  line-height: 28px;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  float: left;
}

.pagination_page_right {
  border-right: 1px solid #d1dbe5;
}

.pagination_page:hover {
  color: #20a0ff;
}

.disabled {
  color: #e4e4e4 !important;
  background-color: #fff;
  cursor: not-allowed;
}

.pagination_page_active {
  border-color: #20a0ff;
  background-color: #20a0ff;
  color: #fff !important;
  cursor: default;
}
</style>
