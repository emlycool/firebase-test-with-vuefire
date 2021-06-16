<template>
    <!-- <div> -->
        <!-- Sidebar -->
        <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar" ref="sideMenuWrapper">

            <!-- Sidebar - Brand -->
            <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                <div class="sidebar-brand-icon rotate-n-15">
                    <i class="fas fa-laugh-wink"></i>
                </div>
                <div class="sidebar-brand-text mx-3"> {{appName}} <br> <small>admin</small></div>
            </a>

            <!-- Divider -->
            <hr class="sidebar-divider my-0">

                
            <router-link :to="{name: 'Dashboard'}"  custom v-slot="{ href, navigate, isExactActive }">
                <!-- Nav Item - Dashboard -->
                <li class="nav-item" :class="{'active': isExactActive}" >
                    <a class="nav-link" :href="href" @click="navigate">
                        <i class="fas fa-fw fa-tachometer-alt"></i>
                        <span>Dashboard</span>
                    </a>
                </li>

            </router-link>

            <!-- Divider -->
            <hr class="sidebar-divider">

            <!-- Heading -->
            <div class="sidebar-heading">
                Interface
            </div>

            <router-link :to="{name: 'TodoList'}" custom v-slot="{navigate, href, isExactActive}">
                <!-- Nav Item - Dashboard -->
                <li class="nav-item" :class="{'active': isExactActive}" @click="navigate">
                    <a class="nav-link" :href="href">
                    <i class="fas fa-fw fa-tachometer-alt"></i>
                    <span>Todos</span></a>
                </li>

            </router-link>

            <!-- Nav Item - Pages Collapse Menu -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseTwo"
                    aria-expanded="true" aria-controls="collapseTwo">
                    <i class="fas fa-fw fa-cog"></i>
                    <span>Components</span>
                </a>
                <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Custom Components:</h6>
                        <a class="collapse-item" href="buttons.html">Buttons</a>
                        <a class="collapse-item" href="cards.html">Cards</a>
                    </div>
                </div>
            </li>

            <!-- Nav Item - Utilities Collapse Menu -->
            <li class="nav-item">
                <a class="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapseUtilities"
                    aria-expanded="true" aria-controls="collapseUtilities">
                    <i class="fas fa-fw fa-wrench"></i>
                    <span>Utilities</span>
                </a>
                <div id="collapseUtilities" class="collapse" aria-labelledby="headingUtilities"
                    data-parent="#accordionSidebar">
                    <div class="bg-white py-2 collapse-inner rounded">
                        <h6 class="collapse-header">Custom Utilities:</h6>
                        <a class="collapse-item" href="utilities-color.html">Colors</a>
                        <a class="collapse-item" href="utilities-border.html">Borders</a>
                        <a class="collapse-item" href="utilities-animation.html">Animations</a>
                        <a class="collapse-item" href="utilities-other.html">Other</a>
                    </div>
                </div>
            </li>

            <!-- Divider -->
            <hr class="sidebar-divider d-none d-md-block">

            <!-- Sidebar Toggler (Sidebar) -->
            <div class="text-center d-none d-md-inline">
                <button class="rounded-circle border-0" id="sidebarToggle" @click.prevent="toggleSideMenu"></button>
            </div>

        </ul>
        <!-- End of Sidebar -->
    <!-- </div> -->
</template>

<script>
export default {
    data() {
        return {
            appName: process.env.VUE_APP_NAME
        }
    },
    methods:{
        toggleSideMenu(){
            let sideMenuWrapper = this.$refs.sideMenuWrapper
            sideMenuWrapper.classList.toggle('toggled')
        }
    }
}
</script>