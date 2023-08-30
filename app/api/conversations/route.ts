import getCurrentUser from "@/app/actions/getCurrentUser";

import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb'

export async function POST(
    request: Request
) {

    try {
        //get current accessed
        const currentUser = await getCurrentUser();
        const body = await request.json();
        const { userId, inGroup, members, name } = body;

        if (!currentUser?.id || !currentUser?.email) {
            return new NextResponse('Unauthorized', { status: 401 })
        }

        if (inGroup && (!members || members.length < 2 || !name)) {
            return new NextResponse('Invalid data', { status: 400 })
        }

        if (inGroup) {
            const newConversation = await prisma.conversation.create({
                data: {
                    name,
                    inGroup,
                    users: {
                        connect: [
                            ...members.map((member: { value: string }) => ({
                                id: member.value
                            })),
                            {
                                id: currentUser.id
                            }
                        ]
                    }
                },
                include: {
                    users: true
                }
            });

            return NextResponse.json(newConversation)
        }

        const existingConversation = await prisma.conversation.findMany({
            where: {
                OR: [
                    {
                        userIds: {
                            equals: [currentUser.id, userId]
                        }
                    }, {
                        userIds: {
                            equals: [userId, currentUser.id]
                        }
                    }
                ]
            }
        })

        const signleConversation = existingConversation[0];

        if (signleConversation) {
            return NextResponse.json(signleConversation)
        }

        const newConversation = await prisma.conversation.create({
            data: {
                users: {
                    connect: [
                        {
                            id: currentUser.id
                        },
                        {
                            id: userId
                        }
                    ]
                }
            },
            include: {
                users: true
            }
        })

        return NextResponse.json(newConversation);

    } catch (error) {
        return new NextResponse("Internal Error", { status: 500 })
    }
}