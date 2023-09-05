"use client";

import { Conversation, User } from "@prisma/client";
import AvatarGroup from "./AvatarGroup";
import Avatar from "./Avatar";

interface DynamicAvatarProps {
  conversation: Conversation & {
    users: User[];
  };
  user: User;
}

const DynamicAvatar: React.FC<DynamicAvatarProps> = ({
  conversation,
  user,
}) => {
  if (conversation.inGroup) return <AvatarGroup users={conversation.users} />;

  return <Avatar user={user} />;
};

export default DynamicAvatar;
