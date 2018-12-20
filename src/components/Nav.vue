<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <ul class="navbar-nav">
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/help">Help</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/page">Profile</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/friends">Friends</router-link>
            </li>
            <li class="nav-item">
                <router-link class="nav-link" exact-active-class="active" to="/auto">Auto</router-link>
            </li>
        </ul>
        
    </nav>
</div>
</template>
