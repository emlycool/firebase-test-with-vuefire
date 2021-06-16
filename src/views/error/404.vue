<template>
    <div class="container-fluid" id="not-found">

        <!-- 404 Error Text -->
        <div class="text-center">
            <div class="error mx-auto" data-text="404">404</div>
            <p class="lead text-gray-800 mb-5">Page Not Found</p>
            <p class="text-gray-500 mb-0">It looks like you found a glitch in the matrix...</p>

            <router-link :to="{name: 'Dashboard'}"> &larr;  to Dashboard</router-link>
        </div>

    </div>
</template>

<style>
    #not-found{
        height: 100vh;
        display: grid;
        place-items: center;
    }
</style>