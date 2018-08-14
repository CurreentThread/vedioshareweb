<template>
    <!-- <div class="modal"> -->

		
		<!-- 模态框（Modal） -->
		<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
						<button type="button" class="btn btn-default" data-dismiss="modal">关闭
						</button>
					
					</div>
				</div><!-- /.modal-content -->
			</div><!-- /.modal -->
		</div>

    <!-- </div> -->
</template>

<script>
export default {
  name: "modal",
  props: {
    ModalTitle: {
      type: String,
      default: "警告"
    },
    ModalMsg: {
      type: String
    }
  }
};
</script>

<style>
</style>
