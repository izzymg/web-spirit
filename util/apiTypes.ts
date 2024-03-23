interface Category {
    tag: string
    name: string
    description: string
    postCount: number
}

interface Post {
    num: number
    content: string
    subject: string
    createdAt: string
    username: string
}

interface CategoryView {
    category: Category
    threads: Post[]
}

interface ThreadView {
    category: Category
    posts: Post[]
}