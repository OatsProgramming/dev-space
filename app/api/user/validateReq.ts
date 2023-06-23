import { NextResponse } from "next/server";
import isEmpty from "lodash/isEmpty";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

type Essential = {
    userId?: string
}

type DELETE = {
    method: 'DELETE',
    data: Essential
}

type PATCH = {
    method: 'PATCH',
    data: Essential & {
        newInfo: {
            username?: string,
            password?: string,
            email?: string,
            name?: string,
        }
    }
}

type POST = {
    method: 'POST',
    data: {
        username: string,
        email: string,
        name?: string,
        password: string,
    }
}

export default async function validateReq<T extends DELETE | PATCH | POST>(req: Request) {
    try {
        const body = await req.json() as ReqBody<UserReq>
        const { method, data } = body

        let message;
        let status;

        switch (method) {
            case 'DELETE':
            case 'PATCH': {
                const { isVerified, newInfo } = data
                // If just delete, will delete currently signed in user
                // since its been verified already with /api/verifyUser
                const session = await getServerSession(authOptions)
                // Just in case of hackers
                if (!session) {
                    message = "User must sign in."
                    status = 401
                    break;
                }

                else if (!isVerified) {
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
                console.log(data)
                data.userId = session.user.id
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