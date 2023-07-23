type MutateHTTP = 'POST' | 'PATCH' | 'DELETE'

type ReqBody<T> = {
    data: T,
    method: MutateHTTP
}

type Reducer<S, A> = (prevState: S, action: A) => S

type TargetGroup = UserGroupParam | PostGroupParam
