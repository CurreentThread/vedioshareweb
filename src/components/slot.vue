<template>
    <div class="slot">
        <div class="row">
            <div class="col-md-offset-2 col-xs-offset-2 col-md-8 col-xs-8">
                <div class="row">
                    <div class="my_slot_head">
                        <div class="head_total">
                            <div>我的足迹👣{{slots.length}}条</div>
                        </div>
                        <div class="head_clear">
                            <div>
                                <span @click="clear">
                                    <img src="@/assets/imgs/del.png" alt="" width="20%">
                                  清空记录</span>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="row">
                    <div class="my_slot_slot">
                        <div v-for="day in days" :key="day">

                        <div class="each_day" >
                            <div>
                                <div class="circle"></div>


                                <div class="daytime">{{day}}</div>
                            </div>
                        </div>

                        <div class="slots">

                            <div class="each_slot"  v-for="(slot,index) in eachslots" :key="slot.slotsid"  v-if="slot.oprateday==day">
                                <span>
                                    <span class="operate" >
                                        {{slot.opratename}} <span class="first_detail">
                                          <a @click="gotoVedio(slot.vedioid)"> {{slot.vedioname}}</a>
                                                <span  v-if="slot.listname!=null">
                                                 <a v-if="slot.opratename=='收藏'" @click="gotoCollect(slot.listid,false)" > <span class="second_detail">
                                                        {{slot.listname}}
                                                  </span>
                                                </a>
                                                <a v-else @click="gotoCollect(slot.listid,false)" > <span class="second_detail">
                                                        {{slot.listname}}
                                                  </span>
                                                </a>
                                                </span>
                                            </span>
                                    </span>
                                    <span class="operate_time">
                                      {{slot.opratetime}}

                                      <span class="delthis" @click="delthis(slot.slotsid,index)">x</span>

                                    </span>


                                </span>
                            </div>

                        </div>

                          </div>


                              <div class="each_slot">

                                <pageination :total="model.total" :size="model.size" :page="model.page" :changge="pageFn" >

                                </pageination>

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

export default {
  name: "slot",
  data() {
    return {
      slots: [],
      eachslots: [],
      model: {
        total: 100, //总条数
        size: 7, //每页显示条目个数不传默认10
        page: 1 //当前页码
      },
      days: []
    };
  },

  components: {
    pageination
  },
  mounted: function() {
    this.queryAllslots();
  },
  methods: {
    gotoVedio(vedioid) {
      this.$router.push({
        path: "/subs/detail",
        name: "detail",
        params: {
          vedioid: vedioid
        }
      });
    },
    gotoCollect(listid, isSelf) {
      this.$router.push({
        path: "/subs/collect",
        name: "collect",
        params: {
          listid: listid,
          isupdate: false,
          isSelf: isSelf
        }
      });
    },
    queryAllslots() {
      var userid = sessionStorage.getItem("userid");
      var url = "http://localhost:8888/slot/queryall";
if(userid!=null){
      var zipFormData = new FormData();
      zipFormData.append("userid", userid);
      //   zipFormData.append("vedioid", vedio.vedioid);
      this.$http.post(url, zipFormData).then(function(response) {
        var newmap = response.body;
        for (var i in newmap) {
          this.days = i.slice(1, i.length - 1).split(",");
          this.slots = newmap[i];
          this.slots.reverse();
          this.model.total = this.slots.length;
          if (this.slots.length != 0) {
            this.eachslots = this.slots.slice(0, this.model.size);
            console.log(this.eachslots);
          }
        }
      });}
      this.model.page = 1;
    },
    clear() {
      var url = "http://localhost:8888/slot/delAll";

      //   zipFormData.append("vedioid", vedio.vedioid);
      this.$http.post(url).then(function(response) {
        if (response.body != 0) {
          this.slots = [];
          this.eachslots = [];
          this.model.total = 0;
        }
      });

    },
    delthis(slotsid, index) {
      var url = "http://localhost:8888/slot/delByid";

      var zipFormData = new FormData();
      zipFormData.append("slotid", slotsid);
      //   zipFormData.append("vedioid", vedio.vedioid);
      this.$http.post(url, zipFormData).then(function(response) {
        if (response.body != "0") {
          this.slots.splice(index, 1);
          this.model.total = this.slots.length;
          this.eachslots = this.slots.slice(0, this.model.size);
        }
      });
    },
    pageFn(val) {
      this.model.page = val;
      if (val == Math.ceil(this.model.total / this.model.size)) {
        this.eachslots = this.slots.slice(
          (val - 1) * this.model.size,
          this.slots.length
        );
      } else {
        this.eachslots = this.slots.slice(
          (val - 1) * this.model.size,
          val * this.model.size
        );
      }
    }
  }
};
</script>

<style>
.my_slot_head {
  margin: 20px;
  color: silver;
  font-size: 14px;
}
.my_slot_head .head_total {
  float: left;
}
.my_slot_head .head_clear {
  float: right;
  cursor: pointer;
}
.my_slot_slot {
  margin-top: 20px;
}

.my_slot_slot .each_day {
  border: 1px whitesmoke solid;
  margin-bottom: 20px;
}
.my_slot_slot .each_day ul {
  list-style: none;
}
.my_slot_slot .each_day .circle {
  position: absolute;
  width: 10px;
  height: 10px;
  border: 2px solid #59c4f9;
  border-radius: 50%;
}
.my_slot_slot .each_day .daytime {
  /* float: right; */
  position: absolute;
  left: 4%;
  margin-top: -5px;
}

.my_slot_slot .slots {
  border-left: 1px #59c4f9 solid;
}

.my_slot_slot .slots .each_slot {
  background-color: white;
  height: 50px;
  padding: 1% 0;
  margin-left: 2%;
  margin-top: 10px;
}

.my_slot_slot .slots .operate {
  color: silver;
  font-size: 20px;
  font-weight: bolder;
  position: absolute;
  left: 30px;
}

.my_slot_slot .slots .operate a {
  text-decoration: none;
  color: lightcoral;
  cursor: pointer;
}

.my_slot_slot .slots .operate a :hover {
  border-bottom: 2px sandybrown solid;
}
.my_slot_slot .slots .first_detail {
  color: black;
  font-size: 15px;
  /* position: absolute; */
  /* left: 100px; */
  margin-top: 0.5%;
}

.my_slot_slot .slots .second_detail {
  color: midnightblue;
  font-size: 13px;
}

.my_slot_slot .each_slot .operate_time {
  margin-right: 5%;
  color: silver;
  font-size: 15px;
  float: right;
}

.my_slot_slot .each_slot .operate_time .delthis {
  color: black;
  padding: 5px;
  font-weight: bolder;
  margin-left: 10px;
  cursor: pointer;
}
</style>
