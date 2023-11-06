export default function() {
    return useState("message", () => ({
        message: "",
        isError: false,
        code: -1,
    }))
}