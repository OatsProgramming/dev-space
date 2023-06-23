type VerifyUser = {
    username?: string,
    email?: string,
    password: string
}

type MutateHTTP = 'POST' | 'PATCH' | 'DELETE'

type ReqBody<T> = {
    data: T,
    method: MutateHTTP
}

type UserProps = {
    username: string,
    name: string,
    email: string,
    password: string,
}

type UserReq = Partial<UserProps> & {
    isVerified?: boolean,
    newInfo?: Partial<UserProps>,
    userId?: string,
}