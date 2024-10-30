import { MetricsResponse } from "@/app/(dashboard)/admin/page";
import Image from "next/image";

const UserCard = ({
  type,
  metrics,
}: {
  type: string;
  metrics: MetricsResponse;
}) => {
  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4">
        {type == "student" && metrics?.student_metrics?.total_students}
        {type == "teacher" && metrics?.teacher_metrics?.total_teachers}
        {type == "group" && metrics?.group_metrics?.total_groups}
        {type == "payment" && metrics?.payment_metrics?.total_amount}
        {type == "commission" &&
          metrics?.commission_metrics?.total_commission_amount}
      </h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
