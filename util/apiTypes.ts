interface Category {
    tag: string
    name: string
    postCount: number
}

interface Post {
    num: number
    content: string
    createdAt: string
}

interface CategoryView {
    category: Category
    threads: Post[]
}

interface ThreadView {
    category: Category
    posts: Post[]
}