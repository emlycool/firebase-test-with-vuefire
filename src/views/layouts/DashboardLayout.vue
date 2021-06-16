<template>
	<div class="home">
		 <!-- Page Wrapper -->
		<div id="wrapper">

			<side-menu></side-menu>

			<!-- Content Wrapper -->
			<div id="content-wrapper" class="d-flex flex-column">

				<!-- Main Content -->
				<div id="content">

					<top-bar></top-bar>

					<!-- Begin Page Content -->
					<div class="container-fluid">

						<router-view></router-view>

					</div>
					<!-- /.container-fluid -->

				</div>
				<!-- End of Main Content -->

				<app-footer></app-footer>				

			</div>
			<!-- End of Content Wrapper -->

		</div>
		<!-- End of Page Wrapper -->

		<!-- Scroll to Top Button-->
		<a class="scroll-to-top rounded" href="#page-top">
			<i class="fas fa-angle-up"></i>
		</a>
	</div>
</template>

<script>
// @ is an alias to /src
import SideMenu from '@/components/web-components/SideMenu'
import TopBar from '@/components/web-components/TopBar'
import AppFooter from '@/components/web-components/Footer'

export default {
 	name: 'Home',
	components:{
		SideMenu,
		TopBar,
		AppFooter
	}
}
</script>
