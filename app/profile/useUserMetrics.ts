'use client'

import useSWR from 'swr'
import { Params } from './[userId]/layout';
import baseUrl from '@/lib/baseUrl';
import tempUserId from '@/lib/toyData/tempUserId';
import type { Post } from '@prisma/client';
import postEx from '@/lib/toyData/postEx';
import userEx from '@/lib/toyData/userEx';
import useCancelableSWR from '@/lib/hooks/useCancelableSWR';

export type UserMetrics = (Post & GeneralUserInfo)[] | UserResponse[]

export default function useUserMetrics(profileProps: Params) {
    const { userCategory, userId } = profileProps

    let url = `${baseUrl}/api/user/${userCategory}?userId=${tempUserId}`
    if (userCategory === 'posts') url = `${baseUrl}/api/posts?userId=${tempUserId}`

    const { data, isLoading, error } = useSWR(url,
        (url) =>
            new Promise((resolve) => setTimeout(() => userCategory === 'posts' ? resolve(postEx) : resolve(userEx), 1000)
            ))

    // const { SWRResponse, controller } = useCancelableSWR(url)
    // const { data, isLoading, error } = SWRResponse
    const controller = {
        signal: '',
        abort: () => void 0
    }

    return {
        userMetrics: data as UserMetrics,
        isLoading,
        error,
        controller
    }
}