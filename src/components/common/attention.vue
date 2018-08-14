<template>
    <!-- <div class="modal"> -->


		<!-- 模态框（Modal） -->
		<div class="modal fade" id="attention" style="z-index:1200" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" data-dismiss="modal" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title" id="myModalLabel">
							{{ModalTitle}}
						</h4>
					</div>
					<div class="modal-body">
						{{ModalMsg}}
					</div>
					<div class="modal-footer">
						<button type="button" class="btn btn-default" data-dismiss="modal"><span v-if="isdel">取消</span> <span v-else>确定</span>
						</button>
             <button v-show="isdel" type="button" class="btn btn-default" data-dismiss="modal" @click="delHander">确认
						</button>

					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>

    <!-- </div> -->
</template>

<script>
import bus from "@/components/bus.js";

export default {
  name: "attention",
  data() {
    return {};
  },
  props: {
    ModalTitle: {
      type: String,
      default: "警告"
    },
    ModalMsg: {
      type: String
    },
    listid: {
      type: Number
    },
    isdel: {
      type: Boolean
    },
    delOrRemove: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    delHander() {
      console.log(this.delOrRemove);
      if (this.delOrRemove) {
        this.removefromlist();
      } else {
        this.delVediolist();
      }
    },

    delVediolist() {
      var url = "http://localhost:8888/vediolist/dellist";

      console.log(this.listid);
      var zipFormData = new FormData();
      zipFormData.append("listid", this.listid);
      this.$http
        .post(url, zipFormData)
        .then(function(response) {
          var newmap = response.body;
        })
        .then(function() {
          bus.$emit("refresh");
        });

      this.$router.push({
        path: "/subs/subscribe",
        name: "subscribe"
      });
    },
    removefromlist() {
      var url = "http://localhost:8888/vediolist/removeFromList";
      // var _listid = 0;
      console.log(this.listid);
      var zipFormData = new FormData();
      zipFormData.append("listvedioid", this.listid);
      this.$http
        .post(url, zipFormData)
        .then(function(response) {
          // _this._thisid = response.body;
          this.$router.push({
            path: "/subs/collect",
            name: "collect",
            params: {
              listid: response.body,
              isupdate: true,
              isSelf:true
            }
          });
        })
        .then(function() {
          bus.$emit("refresh");
        });
    }
  }
};
</script>

<style>
</style>
