"use server";

import prisma from "@/lib/prisma";
import { Post, Site } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { withPostAuth, withSiteAuth } from "./auth";
import { getSession } from "@/lib/auth";
import {
  addDomainToVercel,
  // getApexDomain,
  removeDomainFromVercelProject,
  // removeDomainFromVercelTeam,
  validDomainRegex,
} from "@/lib/domains";
import { put } from "@vercel/blob";
import { customAlphabet } from "nanoid";
import { getBlurDataURL } from "@/lib/utils";
import axios from 'axios';

const nanoid = customAlphabet(
  "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
  7,
); // 7-character random string

enum UserRole {
  ADMIN = "ADMIN",
  USER = "USER",
  INFLUENCER = "INFLUENCER",
  CREATOR = "CREATOR",
  MANAGER = "MANAGER",
  SUBSCRIBER = "SUBSCRIBER"
}

function getSiteLimit(role: UserRole) {
  switch (role) {
    case UserRole.CREATOR:
      return 10;
    case UserRole.INFLUENCER:
      return 2;
    case UserRole.USER:
      return 1;
    case UserRole.MANAGER:
      return Infinity;
    default:
      return 1;
  }
}


// getFollowersCount fetches the number of followers for a given user
export const getFollowersCount = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        followers: {
          select: { id: true }, // Select only the id field to count followers efficiently
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Return the count of followers
    return user.followers.length;
  } catch (error) {
    console.error('Error fetching followers count:', error);
    throw error; // Rethrow or handle as needed
  }
};

// getFollowingCount fetches the number of users that a given user is following
export const getFollowingCount = async (userId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        following: {
          select: { id: true }, // Select only the id field to count followings efficiently
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Return the count of following users
    return user.following.length;
  } catch (error) {
    console.error('Error fetching following count:', error);
    throw error; // Rethrow or handle as needed
  }
};


export const getUserFollowStatus = async (targetUserId: string, currentUserId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
      include: {
        followers: true, // Include followers in the query
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Check if the current user is in the followers list of the target user
    const isFollowing = user.followers.some((follower: { id: string; }) => follower.id === currentUserId);
    return { isFollowing };
  } catch (error) {
    console.error('Error checking follow status:', error);
    throw error; // Rethrow or handle as needed
  }
};

// toggleFollowUser toggles the follow status of the logged-in user and target user
export const toggleFollowUser = async (targetUserId: string, currentUserId: string) => {
  try {
    // First, check if the current user is already following the target user
    const user = await prisma.user.findUnique({
      where: { id: targetUserId },
      include: {
        followers: true, // Include followers in the query
      },
    });

    if (!user) {
      throw new Error('Target user not found');
    }

    const isFollowing = user.followers.some((follower: { id: string; }) => follower.id === currentUserId);

    if (isFollowing) {
      // If already following, remove the follow (unfollow)
      await prisma.user.update({
        where: { id: targetUserId },
        data: {
          followers: {
            disconnect: { id: currentUserId },
          },
        },
      });
    } else {
      // If not following, add the follow (follow)
      await prisma.user.update({
        where: { id: targetUserId },
        data: {
          followers: {
            connect: { id: currentUserId },
          },
        },
      });
    }

    return { isFollowing: !isFollowing };
  } catch (error) {
    console.error('Error toggling follow status:', error);
    throw error; // Rethrow or handle as needed
  }
};

// getPostLikeCount fetches the number of likes for a given post
export const getPostLikeCount = async (postId: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: {
        likes: {
          select: { id: true }, // Only select the id to count likes efficiently
        },
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    return post.likes.length;
  } catch (error) {
    console.error('Error fetching post like count:', error);
    throw error;
  }
};

// getSiteLikeCount fetches the number of likes for a given site
export const getSiteLikeCount = async function getSiteLikeCount(siteId: string, userId: string) {
  // Count total likes for the site
  const likeCount = await prisma.like.count({
    where: { siteId },
  });

  // Check if the user has liked the site
  const isLiked = await prisma.like.findUnique({
    where: {
      userId_siteId: {
        userId,
        siteId,
      },
    },
  }) !== null;

  // Return both like count and user like status
  return { likesCount: likeCount, isLiked };
};

// getPostLikeStatus checks if the current user has liked a specific post
export const getPostLikeStatus = async (postId: string, userId: string) => {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        likes: true, // Include likes to check if the user has liked the post
      },
    });

    if (!post) {
      throw new Error('Post not found');
    }

    // Check if the user has liked the post
    const hasLiked = post.likes.some((like) => like.userId === userId);
    return { hasLiked };
  } catch (error) {
    console.error('Error checking post like status:', error);
    throw error;
  }
};

// getSiteLikeStatus checks if the current user has liked a specific site
export const getSiteLikeStatus = async (siteId: string, userId: string) => {
  try {
    const site = await prisma.site.findUnique({
      where: { id: siteId },
      include: {
        likes: true, // Include likes to check if the user has liked the site
      },
    });

    if (!site) {
      throw new Error('Site not found');
    }

    // Check if the user has liked the site
    const hasLiked = site.likes.some((like) => like.userId === userId);
    return { hasLiked };
  } catch (error) {
    console.error('Error checking site like status:', error);
    throw error;
  }
};


export const createSite = async (formData: FormData) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }

  // Extract form data
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const subdomain = formData.get("subdomain") as string;
  const imageUrl = formData.get("image") as string; // Get image URL from form data
  const QrUrl = formData.get("name") as string;
  const livestreamVideoUrl = formData.get("livestreamVideoUrl") as string;
  const role = session.user.role as UserRole;

  const siteCount = await prisma.site.count({
    where: { userId: session.user.id },
  });

  const siteLimit = getSiteLimit(role);
  let siteMatch = false;

  // Determine if the user can create more sites
  if (siteCount >= siteLimit) {
    siteMatch = true; // User has reached their site limit
    return { error: "QR limit reached. Upgrade for more QR Experiences.", siteMatch }; // Send feedback to UI
  }

      // After creating the site, update site count and siteMatch
    const updatedSiteCount = siteCount + 1;
    siteMatch = updatedSiteCount >= siteLimit; // Update siteMatch status
  
      // Update user's siteCount and siteMatch in the database
      await prisma.user.update({
        where: { id: session.user.id },
        data: {
          siteCount: updatedSiteCount,
          siteMatch,
        },
      });

  // Function to handle collection request
  const collectionRequest = async (name: string) => {
    try {
      const response = await axios.post(
        'https://InfluencersQR.cloud/admin/collections',
        {
          title: name,
        },
        {
          headers: {
            'x-medusa-access-token': `${process.env.MEDUSA_API_TOKEN}`,
            'Content-Type': 'application/json'
          },
        }
      );
      if (response.data && response.data.success) {
        console.log('Collection request sent successfully');
      } else {
        console.error('Failed to send Collection request');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  try {
    // Send collection request
    await collectionRequest(name);

    // Create site with Prisma
    const response = await prisma.site.create({
      data: {
        name,
        description,
        subdomain,
        livestreamVideoUrl: livestreamVideoUrl, // Assign video URL to site data
        clicklink: imageUrl, // Assign image URL to site data
        QrUrl: QrUrl,
        image: imageUrl, // Assign image URL to site data
        logo: imageUrl, // Assign image URL to site data
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    // Revalidate tag
    await revalidateTag(`${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`);

    // Return response
    return response;
  } catch (error: any) {
    // Handle errors
    if (error.code === "P2002") {
      return {
        error: error.message,
      };
    } else {
      return {
        error: error.message,
      };
    }
  }
};

export const updateSite = withSiteAuth(
  async (formData: FormData, site: Site, key: string) => {
    const value = formData.get(key) as string;

    try {
      let response;

      // Custom domain handling
      if (key === "customDomain") {
        if (value.includes("vercel.pub")) {
          return { error: "Cannot use vercel.pub subdomain as your custom domain" };
        }

        if (validDomainRegex.test(value)) {
          response = await prisma.site.update({
            where: {
              id: site.id,
            },
            data: {
              customDomain: value,
            },
          });
          await Promise.all([
            addDomainToVercel(value), // Add to Vercel project
            // Optional: Add www subdomain and redirect to apex domain
            // addDomainToVercel(`www.${value}`),
          ]);
        } else if (value === "") {
          response = await prisma.site.update({
            where: {
              id: site.id,
            },
            data: {
              customDomain: null,
            },
          });
        }

        // Remove the old custom domain from Vercel if it's different
        if (site.customDomain && site.customDomain !== value) {
          response = await removeDomainFromVercelProject(site.customDomain);
        }
      }

      // Image or logo file upload handling
      else if (key === "image" || key === "logo") {
        if (!process.env.BLOB_READ_WRITE_TOKEN) {
          return {
            error:
              "Missing BLOB_READ_WRITE_TOKEN token. Note: Vercel Blob is currently in beta – please fill out this form for access: https://tally.so/r/nPDMNd",
          };
        }

        const file = formData.get(key) as File;
        const filename = `${nanoid()}.${file.type.split("/")[1]}`;

        // Upload the file to blob storage
        const { url } = await put(filename, file, {
          access: "public",
        });

        // Add cache busting to the URL
        const urlWithCacheBusting = `${url}?t=${Date.now()}`;

        // Generate a blurhash for images
        const blurhash = key === "image" ? await getBlurDataURL(urlWithCacheBusting) : null;

        // Update the site data in the database with the new URL
        response = await prisma.site.update({
          where: {
            id: site.id,
          },
          data: {
            [key]: urlWithCacheBusting, // Store URL with cache-busting
            ...(blurhash && { imageBlurhash: blurhash }), // Store blurhash if image
          },
        });
      }

      // Handle 'enableFeature' field if it's being updated
      else if (key === "enableFeature") {
        const booleanValue = formData.get(key) === "on"; // This should be 'true' if the checkbox is checked
      
        response = await prisma.site.update({
          where: {
            id: site.id,
          },
          data: {
            enableFeature: booleanValue, // Store the boolean value directly
          },
        });
      }
      
      
      // Handle other fields (non-file data)
      else {
        response = await prisma.site.update({
          where: {
            id: site.id,
          },
          data: {
            [key]: value,
          },
        });
      }

      // Revalidate the tags after updating the site data
      console.log(
        "Updated site data! Revalidating tags: ",
        `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
        `${site.customDomain}-metadata`,
      );
      await revalidateTag(
        `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`,
      );
      site.customDomain &&
        (await revalidateTag(`${site.customDomain}-metadata`));

      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This ${key} is already taken`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  },
);



export const deleteSite = withSiteAuth(async (_: FormData, site: Site) => {
  try {
    // Delete the site
    const response = await prisma.site.delete({
      where: {
        id: site.id,
      },
    });

    // Revalidate metadata tags
    await revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
    );
    if (response.customDomain) {
      await revalidateTag(`${site.customDomain}-metadata`);
    }

    // Decrement siteCount for the user
    if (site.userId) {
      const user = await prisma.user.update({
        where: { id: site.userId },
        data: {
          siteCount: {
            decrement: 1,
          },
        },
        // Return the updated user to check siteCount
        select: {
          siteCount: true,
          siteMatch: true,
        },
      });

      // If siteCount is 0, set siteMatch to true
      if (user.siteCount === 0) {
        await prisma.user.update({
          where: { id: site.userId },
          data: {
            siteMatch: false,
          },
        });
      }
    }

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
});

export const getSiteFromPostId = async (postId: string) => {
  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
    select: {
      siteId: true,
    },
  });
  return post?.siteId;
};

export const createExperience = async (formData: FormData) => {
  try {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }

    // Check if email is kenny@qrexperiences.com and bypass site match and site limit logic
    if (session.user.email === "kenny@qrexperiences.com" || session.user.email === "kenny@livestreamqr.com") {
      return await createExperienceWithoutLimit(formData, session.user.id);
    }

    // Extracting form data
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const subdomain = formData.get("subdomain") as string;
    const image = formData.get("image") as string;
    const livestreamVideoUrl = formData.get("livestreamVideoUrl") as string;
    const clicklink = formData.get("clicklink") as string;
    const QrUrl = formData.get("QrUrl") as string;
    const url = formData.get("url") as string;
    const role = session.user.role as UserRole;

    // Retrieve the current site count before creating the site
    const siteCount = await prisma.site.count({
      where: { userId: session.user.id },
    });

    // Determine if the user can create more sites based on role
    const siteLimit = getSiteLimit(role);

    if (siteCount >= siteLimit) {
      return { error: "QR limit reached. Upgrade for more QR Experiences.", siteMatch: true }; // User has reached their site limit
    }

    // Create the Dub URL by sending the clicklink to the Dub API
    const dubResponse = await axios.post(
      `https://api.dub.co/links?workspaceId=${process.env.DUB_WORKSPACE_ID}`,
      {
        domain: 'go.qrexperiences.com',
        url: url,
        key: clicklink, // Use the site name as the key
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DUB_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Construct the new shortened URL from Dub API response
    const dubUrl = `https://${dubResponse.data.domain}/${dubResponse.data.key}`;

    // Create the site in the database
    const site = await prisma.site.create({
      data: {
        name,
        clicklink,
        description,
        subdomain,
        image,
        QrUrl: url,
        linkId: dubResponse.data.id, // Store the linkId from the Dub API response
        logo: image,
        livestreamVideoUrl,
        user: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });

    // After creating the site, we update site count and siteMatch
    const updatedSiteCount = siteCount + 1;
    const siteMatch = updatedSiteCount >= siteLimit;

    // Update the user's site count and site match status
    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        siteCount: updatedSiteCount,
        siteMatch,
      },
    });

    // Revalidate tags after site creation
    await revalidateTag(
      `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
    );

    return site;
  } catch (error) {
    console.error("Error creating experience:", error);
    return { error: "Failed to create experience. Try again!" };
  }
};

// Helper function to bypass site limit and match for specific email
const createExperienceWithoutLimit = async (formData: FormData, userId: string) => {
  try {
    // Extract form data
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const subdomain = formData.get("subdomain") as string;
    const image = formData.get("image") as string;
    const livestreamVideoUrl = formData.get("livestreamVideoUrl") as string;
    const clicklink = formData.get("clicklink") as string;
    const QrUrl = formData.get("QrUrl") as string;
    const url = formData.get("url") as string;

    // Create the Dub URL by sending the clicklink to the Dub API
    const dubResponse = await axios.post(
      `https://api.dub.co/links?workspaceId=${process.env.DUB_WORKSPACE_ID}`,
      {
        domain: 'go.qrexperiences.com',
        url: url,
        key: clicklink, // Use the site name as the key
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.DUB_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    // Construct the new shortened URL from Dub API response
    const dubUrl = `https://${dubResponse.data.domain}/${dubResponse.data.key}`;

    // Create the site in the database
    const site = await prisma.site.create({
      data: {
        name,
        clicklink,
        description,
        subdomain,
        image,
        QrUrl: url,
        linkId: dubResponse.data.id, // Store the linkId from the Dub API response
        logo: image,
        livestreamVideoUrl,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    // Revalidate tags after site creation
    await revalidateTag(
      `${subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`
    );

    return site;
  } catch (error) {
    console.error("Error creating experience (without limit):", error);
    return { error: "Failed to create experience. Try again!" };
  }
};

export const createPost = withSiteAuth(async (_: FormData, site: Site) => {
  const session = await getSession();
  if (!session?.user.id) {
    return { error: "Not authenticated" };
  }

  try {
    // Create the post associated with the site and user
    const post = await prisma.post.create({
      data: {
        siteId: site.id,
        userId: session.user.id,
      },
    });

    // Revalidate the tags for posts (both subdomain and custom domain)
    await revalidateTag(
      `${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`
    );
    if (site.customDomain) {
      await revalidateTag(`${site.customDomain}-posts`);
    }

    return post;
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Failed to create post" };
  }
});
// creating a separate function for this because we're not using FormData
export const updatePost = async (data: Post) => {
  const session = await getSession();
  if (!session?.user.id) {
    return {
      error: "Not authenticated",
    };
  }
  const post = await prisma.post.findUnique({
    where: {
      id: data.id,
    },
    include: {
      site: true,
    },
  });
  if (!post || post.userId !== session.user.id) {
    return {
      error: "Post not found",
    };
  }
  try {
    const response = await prisma.post.update({
      where: {
        id: data.id,
      },
      data: {
        title: data.title,
        description: data.description,
        content: data.content,
      },
    });

    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
    );
    await revalidateTag(
      `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
    );

    // if the site has a custom domain, we need to revalidate those tags too
    post.site?.customDomain &&
      (await revalidateTag(`${post.site?.customDomain}-posts`),
      await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

    return response;
  } catch (error: any) {
    return {
      error: error.message,
    };
  }
  };

  export const updatePostMetadata = withPostAuth(
    async (
      formData: FormData,
      post: Post & {
        site: Site;
      },
      key: string,
    ) => {
      const value = formData.get(key) as string;

      try {
        let response;
        if (key === "image") {
          const file = formData.get("image") as File;
          const filename = `${nanoid()}.${file.type.split("/")[1]}`;

          const { url } = await put(filename, file, {
            access: "public",
          });

          const blurhash = await getBlurDataURL(url);

          response = await prisma.post.update({
            where: {
              id: post.id,
            },
            data: {
              image: url,
              imageBlurhash: blurhash,
            },
          });
        } else {
          response = await prisma.post.update({
            where: {
              id: post.id,
            },
            data: {
              [key]: key === "published" ? value === "true" : value,
            },
          });
        }

        await revalidateTag(
          `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-posts`,
        );
        await revalidateTag(
          `${post.site?.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-${post.slug}`,
        );

        // if the site has a custom domain, we need to revalidate those tags too
        post.site?.customDomain &&
          (await revalidateTag(`${post.site?.customDomain}-posts`),
          await revalidateTag(`${post.site?.customDomain}-${post.slug}`));

        return response;
      } catch (error: any) {
        if (error.code === "P2002") {
          return {
            error: `This slug is already in use`,
          };
        } else {
          return {
            error: error.message,
          };
        }
      }
    },
  );

  export const deletePost = withPostAuth(async (_: FormData, post: Post) => {
    try {
      const response = await prisma.post.delete({
        where: {
          id: post.id,
        },
        select: {
          siteId: true,
        },
      });
      return response;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  });

  export const editUser = async (
    formData: FormData,
    _id: unknown,
    key: string,
  ) => {
    const session = await getSession();
    if (!session?.user.id) {
      return {
        error: "Not authenticated",
      };
    }
    const value = formData.get(key) as string;
  
    try {
      const response = await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          [key]: value,
        },
      });
      return response;
    } catch (error: any) {
      if (error.code === "P2002") {
        return {
          error: `This ${key} is already in use`,
        };
      } else {
        return {
          error: error.message,
        };
      }
    }
  };

export const GetClicks = async () => {
  try {
    const response = await axios.get(
      `https://api.dub.co/analytics/top_links?workspaceId=${process.env.DUB_WORKSPACE_ID}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DUB_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );
    console.log('Clicks data:', response.data); // Log the entire response data
    return response.data; // Return the entire response data
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
};

export const GetTodayClicksDomain = async (domain: string) => {
  try {
    const response = await axios.get(
      `https://api.dub.co/analytics/clicks/count?workspaceId=${process.env.DUB_WORKSPACE_ID}&domain=go.qrexperiences.com&groupBy=timeseries&interval=90d&key=${domain}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DUB_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );
    console.log('Clicks data:', response.data); // Log the entire response data
    return response.data; // Return the entire response data
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
};

export const GetTodayClickAnalyticsDomain = async (clicklink: string) => {
  try {
    const response = await axios.get(
      `https://api.dub.co/analytics?workspaceId=${process.env.DUB_WORKSPACE_ID}&domain=go.qrexperiences.com&key=${clicklink}&groupBy=timeseries&interval=90d`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DUB_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );
    console.log('Clicks data:', response.data); // Log the entire response data
    return response.data; // Return the entire response data
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
};

export const GetTodayClickAnalytics = async () => {
  try {
    const response = await axios.get(
      `https://api.dub.co/analytics?workspaceId=${process.env.DUB_WORKSPACE_ID}&domain=go.qrexperiences.com&groupBy=timeseries&interval=90d`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DUB_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );
    console.log('GetClickAnalytics data:', response.data); // Log the entire response data
    return response.data; // Return the entire response data
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
};

export const GetClicksDomain = async (domain: string) => {
  try {
    const response = await axios.get(
      `https://api.dub.co/analytics/clicks/count?workspaceId=${process.env.DUB_WORKSPACE_ID}&domain=go.qrexperiences.com&groupBy=timeseries&interval=90d&key=${domain}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DUB_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );
    console.log('Clicks data:', response.data); // Log the entire response data
    return response.data; // Return the entire response data
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
};

export const GetClickAnalyticsDomain = async (clicklink: string) => {
  try {
    const response = await axios.get(
      `https://api.dub.co/analytics?workspaceId=${process.env.DUB_WORKSPACE_ID}&domain=go.qrexperiences.com&key=${clicklink}&groupBy=timeseries&interval=90d`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DUB_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );
    console.log('Clicks data:', response.data); // Log the entire response data
    return response.data; // Return the entire response data
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
};

export const GetClickAnalyticsGeo = async (clicklink: string) => {
  try {
    const response = await axios.get(
      `https://api.dub.co/events?workspaceId=${process.env.DUB_WORKSPACE_ID}&domain=go.qrexperiences.com&key=${clicklink}&event=clicks&groupby=cities&interval=90d`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DUB_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );
    console.log('Clicks data:', response.data); // Log the entire response data
    return response.data; // Return the entire response data
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
};

export const GetClickAnalytics = async () => {
  try {
    const response = await axios.get(
      `https://api.dub.co/analytics?workspaceId=${process.env.DUB_WORKSPACE_ID}&domain=go.qrexperiences.com&groupBy=timeseries&interval=90d`,
      {
        headers: {
          Authorization: `Bearer ${process.env.DUB_API_TOKEN}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        }
      }
    );
    console.log('GetClickAnalytics data:', response.data); // Log the entire response data
    return response.data; // Return the entire response data
  } catch (error) {
    console.error('An error occurred:', error);
    return null;
  }
};

export const updateClicklink = withSiteAuth(
  async (formData: FormData, site: Site, key: string) => {
    const value = formData.get(key) as string;

    try {
      const session = await getSession();
      if (!session?.user?.id) {
        console.error("User not authenticated");
        return { error: "Not authenticated" };
      }

      // Make a request to the Dub API to shorten the URL
      const dubResponse = await axios.post(
        `https://api.dub.co/links?workspaceId=${process.env.DUB_WORKSPACE_ID}`,
        {
          domain: 'go.qrexperiences.com',
          url: value,
          key: site.name, // Use the site name directly
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.DUB_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const dubUrl = `https://${dubResponse.data.domain}/${dubResponse.data.key}`;

      // Update the site with the new clicklink
      const response = await prisma.site.update({
        where: { id: site.id },
        data: {
          clicklink: dubUrl,
          QrUrl: value,
          linkId: dubResponse.data.id,
          user: { connect: { id: session.user.id } },
        },
      });

      // Revalidate tags
      await revalidateTag(`${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`);
      // Refresh the page
      if (typeof window !== "undefined") {
        window.location.reload();
      }

      return response;
    } catch (error) {
      console.error("Error updating clicklink", error);
      return { error: "Failed to update clicklink" };
    }
  }
);

export const updateClicklinks = withSiteAuth(
  async (formData: FormData, site: Site, key: string) => {
    const value = formData.get(key) as string;

    try {
      const session = await getSession();
      if (!session?.user?.id) {
        console.error("User not authenticated");
        return { error: "Not authenticated" };
      }

      let dubResponse;

      if (site.linkId) {
        // Make a request to the Dub API to update the URL for an existing link
        dubResponse = await axios.patch(
          `https://api.dub.co/links/${site.linkId}?workspaceId=${process.env.DUB_WORKSPACE_ID}`,
          { url: value },
          {
            headers: {
              Authorization: `Bearer ${process.env.DUB_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        // If linkId is missing, create a new link
        dubResponse = await axios.post(
          `https://api.dub.co/links?workspaceId=${process.env.DUB_WORKSPACE_ID}`,
          {
            domain: 'go.qrexperiences.com',
            url: value,
            key: site.name, // Use the site name as the link key
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.DUB_API_KEY}`,
              'Content-Type': 'application/json',
            },
          }
        );
      }

      const dubUrl = `https://${dubResponse.data.domain}/${dubResponse.data.key}`;

      // Update the site with the new clicklink
      const response = await prisma.site.update({
        where: { id: site.id },
        data: {
          clicklink: dubUrl,
          QrUrl: value,
          linkId: dubResponse.data.id, // Save the updated linkId
          user: { connect: { id: session.user.id } },
        },
      });

      // Revalidate tags
      await revalidateTag(`${site.subdomain}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}-metadata`);
      // Refresh the page
      if (typeof window !== "undefined") {
        window.location.reload();
      }

      return response;
    } catch (error) {
      console.error("Error updating clicklinks", error);
      return { error: "Failed to update clicklinks" };
    }
  }
);
