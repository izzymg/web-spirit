interface Category {
    tag: string
    name: string
    postCount: number
}

interface Post {
    number: number
    content: string
}

interface CategoryView {
    category: Category
    threads: Post[]
}