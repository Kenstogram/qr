"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { getUserFollowStatus, getFollowersCount, getFollowingCount, toggleFollowUser, getSiteLikeCount } from '@/lib/actions'; // Necessary functions in actions
import { Site } from '@prisma/client';
import { Heart, Users } from "lucide-react";
import { getSession } from '@/lib/auth'; // Import getSession to fetch session

interface ThreadsCardProps {
  data: Site;  // Type for site data
}

export default function ThreadsCard({ data }: ThreadsCardProps) {
  const [session, setSession] = useState<any>(null);  // State to hold session data
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);  // Track the like state
  const [likesCount, setLikesCount] = useState<number>(0);  // Track the like count
  const [loading, setLoading] = useState<boolean>(true);  // Loading state for async operations

  // Fetch the session client-side
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const sessionData = await getSession(); // Use getSession directly
        setSession(sessionData);
        setLoading(false);  // Once session is fetched, stop loading
      } catch (error) {
        console.error("Error fetching session:", error);
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  // Fetch follower, following, and like data once session is loaded
  useEffect(() => {
    const fetchData = async () => {
      if (!session?.user?.id) return; // Ensure that the user is logged in before fetching data

      try {
        if (data.userId) {
          // Fetch user follow status (based on logged-in user)
          const userFollowStatus = await getUserFollowStatus(data.userId, session.user.id);
          setIsFollowing(userFollowStatus.isFollowing);

          // Fetch followers and following counts
          const followerCount = await getFollowersCount(data.userId);
          const followingCount = await getFollowingCount(data.userId);
          setFollowersCount(followerCount);
          setFollowingCount(followingCount);

          // Fetch like status and count for this site
          const userLikeStatus = await getSiteLikeCount(data.id, session.user.id);
          setLikesCount(userLikeStatus.likesCount);
          setIsLiked(userLikeStatus.isLiked);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (!loading && session?.user?.id) {
      fetchData();
    }
  }, [data.subdomain, data.userId, data.id, session, loading]); // Add session and loading to dependencies

  const handleFollowToggle = async () => {
    if (!session?.user?.id) return; // Ensure logged-in user ID exists

    try {
      await toggleFollowUser(data.userId as string, session.user.id);
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.error('Error toggling follow status:', error);
    }
  };

  const handleLikeToggle = async () => {
    if (!session?.user?.id) return; // Ensure logged-in user ID exists

    try {
      const response = await fetch('/api/like', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          siteId: data.id,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to toggle like');
      }

      const result = await response.json();
      setIsLiked((prev) => !prev);
      setLikesCount(result.likeCount);  // Assuming the API returns the updated like count
    } catch (error) {
      console.error('Error toggling like status:', error);
    }
  };

  // Show loading state if session is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="border border-gray-300 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 bg-white">
      <Link href={`https://go.qrexperiences.com/${data.subdomain}`} rel="noreferrer" target="_blank" className="flex flex-col overflow-hidden rounded-lg">
        {/* Image Section */}
        <div className="flex justify-between items-center">
          <Image
            alt="Card Cover Image"
            src={data.image as string}
            unoptimized={true}
            style={{ objectFit: 'cover' }}
            width={100}
            height={100}
            className="rounded-full border border-gray-300"
          />
          <div className="flex flex-col ml-4 flex-grow">
            <p className="text-lg font-semibold text-black">{data.description}</p>
          </div>
        </div>
      </Link>

      {/* Followers, Following, and Like Section */}
      <div className="mt-3 flex justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Users size={16} />
          <span>{followersCount} Followers</span>
        </div>
        <div className="flex items-center space-x-1">
          <Users size={16} />
          <span>{followingCount} Following</span>
        </div>
      </div>

      {/* Follow and Like Buttons */}
      <div className="flex items-center justify-between mt-4 space-x-4">
        <button
          onClick={handleFollowToggle}
          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium ${isFollowing ? 'bg-red-100 text-white' : 'bg-blue-100 text-white'} hover:bg-opacity-80 transition-all`}
        >
          <span>{isFollowing ? 'Unfollow' : 'Follow'}</span>
        </button>

        <button
          onClick={handleLikeToggle}
          aria-label={isLiked ? "Unlike" : "Like"}
          className={`flex items-center space-x-2 text-sm font-medium ${isLiked ? 'text-red-500' : 'text-gray-500'} hover:text-red-600`}
        >
          <Heart size={16} />
          <span>{likesCount} {likesCount === 1 ? 'Like' : 'Likes'}</span>
        </button>
      </div>
    </div>
  );
}
