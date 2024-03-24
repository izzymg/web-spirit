interface MessagingConfirmationInfo {
    action: string
    onConfirm: () => Promise<void>
}

interface MessagingState {
    message?: string
    isError: boolean
    code: number
    confirmation?: MessagingConfirmationInfo
}

export default function() {
    return useState<MessagingState>("message", () => ({
        isError: false,
        code: -1,
    }))
}