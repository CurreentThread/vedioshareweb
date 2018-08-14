<template>
    <!-- <div class="modal"> -->


		<!-- 模态框（Modal） -->
		<div class="modal fade" :id="id"  style="z-index:1100" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<button type="button" class="close" @click="cancel" aria-hidden="true">
							&times;
						</button>
						<h4 class="modal-title">
							{{operateName}}
						</h4>
					</div>
					<div class="modal-body row">
						<form class="form-horizontal" role="form">

							<div class="col-md-8 col-xs-8">

									<div class=" form-group">
										<label for="firstname" class="col-sm-3 control-label">清单名</label>
										<div class="col-sm-9">
											<input type="text" class="form-control" :id="listid" placeholder="不超过20个字">
										</div>
									</div>


							</div>


						</form>
					</div>
						<div class="modal-footer">
								<button type="button" class="btn btn-default" @click="cancel">取消
								</button>
								<button type="button" class="btn btn-info" @click="operateHandler">确定</button>

						</div>

				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>

    <!-- </div> -->
</template>



<script>
import bus from "@/components/bus.js";

export default {
  name: "modal",
  data() {
    return {
      file: "",
      // vediolist: {}，
    };
  },
  props: {
    ModalTitle: {
      type: String,
      default: "警告"
    },
    ModalMsg: {
      type: String
    },
    operateName: {
      type: String
    },
    isedit: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: "updModal"
    },
    listid:{
      type: String,
      default: "listname"
    }
  },
  methods: {
    cancel() {
      $("#" + this.id).modal("hide");
    },
    operateHandler() {
      this.createlist();
    },
    createlist() {
      var userid = sessionStorage.getItem("userid");
      var listname = $("#"+this.listid).val();
      var url = "http://localhost:8888/vediolist/createlist";
if(userid!=null){
      var zipFormData = new FormData();
      zipFormData.append("userid", userid);
      zipFormData.append("listname", listname);
      //   zipFormData.append("vedioid", vedio.vedioid);
      this.$http
        .post(url, zipFormData)
        .then(function(response) {
          var newmap = response.body;
          console.log(newmap);
          if (newmap != null) {
            var vediolist = newmap;
          }
        })
        .then(function() {
          this.$emit("refreshlist");
          $("#" + this.id).modal("hide");
          bus.$emit("refresh");
        });}
    }
  }
};
</script>

<style>
</style>
