import { NextResponse } from "next/server";
import isEmpty from "lodash/isEmpty";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import simpleValidate from "@/lib/simpleValidate";

type Essential = {
    userId?: string
}

type DELETE = {
    method: 'DELETE',
    data: Essential & UserReq<'DELETE'>
}

type PATCH = {
    method: 'PATCH',
    data: Essential & UserReq<'PATCH'>
}

type POST = {
    method: 'POST',
    data: UserReq<'POST'>
}

export default async function validateReq<T extends DELETE | PATCH | POST>(req: Request) {
    try {
        const res = await simpleValidate<UserReqPartial>(req)
        if (res instanceof Response) return res
        const { data, method, userId } = res

        let message;
        let status;

        switch (method) {
            case 'DELETE':
            case 'PATCH': {
                const { isVerified, newInfo } = data

                if (!isVerified) {
                    message = "User's request must be checked for authorization first."
                    status = 401
                    break;
                }

                else if (method === 'PATCH' && (!newInfo || isEmpty(newInfo))) {
                    message = "New info for user route has not been given"
                    status = 422
                    break;
                }

                // Append new data to identify the user by id rather than username or email
                data.userId = userId
                break;
            }
            case 'POST': {
                const { username, email, password } = data
                if (!username || !email || !password) {
                    message =
                        `Missing properties:
                            Username?       ${!username}
                            Email?          ${!email}
                            Password?       ${!password}`
                    status = 422
                }
                break;
            }
            default: {
                message = 'Method not given'
                status = 422
                break;
            }
        }

        if (message && status) return NextResponse.json(message, { status })

        return {
            data: {...data},
            method
        } as T
    } catch (err) {
        console.log(err)
        return NextResponse.json(err, { status: 500 })
    }
}