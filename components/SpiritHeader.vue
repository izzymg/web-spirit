<template>
    <div class="panel">
        <header>
            <nav>
                <ul>
                    <li><NuxtLink to="/">everything</NuxtLink></li>
                    <li><NuxtLink to="/dev">dev</NuxtLink></li>
                    <li><NuxtLink to="/yours">yours</NuxtLink></li>
                </ul>
                <h1>spirit</h1>
            </nav>
        </header>
    </div>
</template>

<style scoped>
nav {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
}

nav ul {
    margin: 0;
    padding: 0;

    display: flex;
    flex-flow: row;
    list-style: none;
    gap: 2em;
}

nav ul li a {
    text-decoration: none;
    color: inherit;
}

</style>