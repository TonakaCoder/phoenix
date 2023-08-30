import { Conversation, Message, User } from '@prisma/client'

//results of 'include' on api

export type FullMessageType = Message & {
    sender: User,
    seen: User[]
}

export type FullConversationType = Conversation & {
    users: User[],
    messages: FullMessageType[]
}