<template>
    <div class="panel">
        <SpiritAuthPanel/>
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
    flex-flow: row wrap-reverse;
    justify-content: space-between;
    align-items: center;
}

nav ul {
    margin: 0;
    padding: 0;

    display: flex;
    flex-flow: row wrap;
    list-style: none;
    gap: 1em;
}

nav ul li a {
    text-decoration: underline;
    font-family: var(--font-mono);
    color: inherit;
}

</style>