<template>
    <div class="bg-gradient-primary" id="auth-page">
        <div class="container h-100">

            <!-- Outer Row -->
            <div class="align-items-center h-100 justify-content-center row">

                <div class="col-xl-10 col-lg-12 col-md-9">

                    <router-view></router-view>

                </div>

            </div>

        </div>
    </div>
</template>

<style lang="scss">
    #auth-page{
        height: 100vh;
    }

</style>

<script>


export default {

}
</script>