<template>
    <div class="list">
        <div class="row">


            <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8">
                    <div class="order">
                        <div class="new noactive" @click="changenew({order:1})">最新</div>
                        <div class="hot active"  @click="changehot({order:0})">最热</div>
                    </div>
            </div>

            <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8 content">
                <div class="row">

                    <div class="col-md-4 col-xs-6" v-for="(list,index) in allVediolist" v-bind:key="list.listid">
                        <div class="row vedio">
                              <div class="col-md-5 col-xs-5 img">
                                <a  class="thumbnail" @click="goToCollect(list.listid)">
                                    <img :src="list.coverimage"
                                        alt="通用的占位符缩略图">
                                </a>
                              </div>
                              <div class="col-xs-7 col-md-7 msg">
                                  <span class="name"  @click="goToCollect(list.listid)">{{list.listname}}</span>
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
  name: "list",
  components: {
    // 'index':index,
    pageination
  },
  data() {
    return {
      //  date:new Date().getYear()
      vedios: [],
      model: {
        total: 100, //总条数
        size: 21, //每页显示条目个数不传默认10
        page: 1 //当前页码
      },
      allVediolist: [],
      collectlists: []
    };
  },

  mounted() {
    this.getAllVediolist();
    this.getAllColletlist();
  },
  methods: {

    goToCollect(listid){
      this.$router.push(
        {
          path:'/subs/collect',
          name:'collect',
          params:{
            listid:listid,
            isupdate:false,
            isSelf:false
          }
        }
      );
    },
    getAllVediolist() {
      var userid = sessionStorage.getItem("userid");
if(userid!=null){
      var url = "http://localhost:8888/vediolist/getAllVediolist/" + userid;

      this.$http.post(url).then(function(response) {
        var newmap = response.body;
        this.allVediolist = newmap;
      });}
    },
    subStatelist(array, list, index) {
      // console.log(array);
      var userid = sessionStorage.getItem("userid");
      var url = "http://localhost:8888/vediolist/collectVedio/" + userid;
if(userid!=null){      this.$http.post(url, list).then(function(response) {
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
      });}
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
    },
    getAllColletlist() {
      var userid = sessionStorage.getItem("userid");
      var url = "http://localhost:8888/vediolist/allcollect";
if(userid!=null){
      var zipFormData = new FormData();
      zipFormData.append("userid", userid);

      this.$http.post(url, zipFormData).then(function(response) {
        var newmap = response.body;
        this.collectlists = newmap;
        // console.log(this.subsVedios);
      });}
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
