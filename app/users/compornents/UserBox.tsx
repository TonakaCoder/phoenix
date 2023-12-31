"use client";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { memo, useCallback, useState } from "react";
import axios from "axios";
import Avatar from "@/app/components/Avatar";
import LoadingModal from "@/app/components/modals/LoadingModal";
import useActiveList from "@/app/hooks/useActiveList";
import { isActive } from "@/app/libs/isActive";

interface UserBoxProps {
  data: User;
}
const UserBox: React.FC<UserBoxProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { members } = useActiveList();

  const handleClick = useCallback(() => {
    setIsLoading(true);

    axios
      .post("/api/conversations", { userId: data.id })
      .then((data: any) => router.push(`/conversations/${data.data.id}`))
      .finally(() => setIsLoading(false));
  }, [data, router]);

  return (
    <>
      {isLoading && <LoadingModal />}
      <div
        onClick={handleClick}
        className="w-full relative flex items-center space-x-3 bg-white p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"
      >
        <Avatar user={data} />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">{data.name}</p>
              <p className="text-xs  text-gray-400">
                {isActive(members, data?.email!)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(UserBox);
