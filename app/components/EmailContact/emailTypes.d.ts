type Email = {
    email: string,
    name: string,
    message: string,
}

type EmailPartial = Partial<Email>

type Action = {
    e?: Event,
    type: 'sending' | 'updating' | 'deleting',
    newInfo?: EmailPartial,
    form?: HTMLFormElement | null,
}