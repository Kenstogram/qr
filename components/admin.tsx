"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function Admin({ limit }: { limit?: number }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/admin?limit=${limit}`);
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, [limit]);

  if (!data) {
    return <p>Loading...</p>;
  }

  const { users, newUsers, totalUsers, nonUserRoleCount } = data;
  const activeUsers = users.filter((user: any) => user.isActive).length;

  return (
    <div className="pt-20 pr-10 pl-10 pb-20">
      <div className="grid grid-cols-2 gap-2">
        {/* Display User Metrics */}
        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="font-bold text-xl">Total Users</h3>
          <p className="text-lg">{totalUsers}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="font-bold text-xl">New Users (Last Month)</h3>
          <p className="text-lg">{newUsers}</p>
        </div>

        <div className="bg-white p-5 rounded-lg shadow-md">
          <h3 className="font-bold text-xl">Subscribers</h3>
          <p className="text-lg">{nonUserRoleCount}</p>
        </div>

        {/* If no users or sites */}
        {/* {users.length === 0 && (
          <div className="mt-5 flex flex-col items-center space-x-4">
            <h1 className="pt-20 font-cal text-4xl">No Users Yet</h1>
            <Image
              alt="no users"
              src="https://illustrations.popsy.co/violet/cute-smiling-cat.svg"
              width={400}
              height={400}
            />
          </div>
        )} */}
      </div>
    </div>
  );
}
