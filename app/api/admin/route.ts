// app/api/admin/route.ts
import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const limit = url.searchParams.get("limit");

    const users = await prisma.user.findMany({
      where: {
        isActive: true,
      },
      include: {
        sites: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      ...(limit ? { take: parseInt(limit, 10) } : {}),
    });

    const newUsers = await prisma.user.count({
      where: {
        createdAt: {
          gte: new Date(new Date().setMonth(new Date().getMonth() - 1)),
        },
      },
    });

    const totalUsers = await prisma.user.count({
      where: {
        isActive: true,
      },
    });

    const nonUserRoleCount = await prisma.user.count({
      where: {
        isActive: true,
        role: {
          not: "USER",  // Count users whose role is not "USER"
        },
      },
    });

    return new Response(
      JSON.stringify({
        users,
        newUsers,
        totalUsers,
        nonUserRoleCount,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching users and metrics" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
