type ToastType = 'info' | 'warning' | 'error' | 'success'

type NotifyParams = {
    type: ToastType,
    message: string,
} | {
    type: 'promise',
    messages: {
        pending: string,
        success: string,
        error: string,
    },
    /**
     * Use "as" keyword
     */
    promise: Promise<any>
}

type NotifyReturnType = Record<ToastType, string | number> & {
    /**
     * Use "as" keyword
     */
    promise: Promise<any>
}