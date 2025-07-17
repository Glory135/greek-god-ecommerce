"use client"

import useGetUser from '@/hooks/use-get-user';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { RefreshCcw } from 'lucide-react';
import { useEffect } from 'react';
import { DEFAULT_LIMIT } from '@/constants';
import OrderCard from '@/components/Orders/OrderCard';
import { PAGES_LINKS } from '@/utils/linksData';
import { appAuthClient } from '@/lib/auth';

function getInitials(name?: string, email?: string) {
  if (name && name.trim().length > 0) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
  if (email) return email[0]?.toUpperCase();
  return '?';
}

export default function AccountPage() {
  const { user, isLoading } = useGetUser();
  const router = useRouter();
  const trpc = useTRPC();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(PAGES_LINKS.login.link);
    }
  }, [isLoading, user, router]);

  console.log(user);
  
  // Placeholder logout logic (replace with real one)
  const handleLogout = async () => {
    await appAuthClient.signout({ returnTo: PAGES_LINKS.home.link })
  };


  // Paginated orders using useInfiniteQuery and getOrdersByUser.queryOptions
  const {
    data: ordersPages,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isLoading: ordersLoading,
  } = useInfiniteQuery(
    trpc.orders.getOrdersByUser.infiniteQueryOptions({
      userId: user?.id || "",
      limit: DEFAULT_LIMIT,
    },
      {
        getNextPageParam: (lastPage) => {
          return lastPage.docs.length > 0 ? lastPage.nextPage : undefined
        }
      })
  );
  const orders = ordersPages?.pages?.flatMap(page => page.docs) || [];

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-[40vh] text-lg">Loading...</div>;
  }

  if (!user) {
    return <div className="flex flex-col items-center justify-center min-h-[40vh] text-lg">Not logged in.</div>;
  }

  const initials = getInitials(user.first_name || user.last_name ? `${user.first_name} ${user.last_name}` : undefined, user.email);
  const name = user.first_name || user.last_name ? `${user.first_name ?? ''} ${user.last_name ?? ''}`.trim() : user.email;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-background rounded-lg shadow p-8 flex flex-col gap-8 items-center">
      {/* Avatar */}
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
        {initials}
      </div>
      {/* User Info */}
      <div className="text-center">
        <div className="text-xl font-semibold mb-1">{name}</div>
        <div className="text-gray-500 text-sm">{user.email}</div>
      </div>
      {/* Actions */}
      <div className="flex flex-col gap-4 w-full mt-6">
        <Button className="w-full" variant="destructive" onClick={handleLogout}>Log Out</Button>
      </div>
      {/* Orders Section */}
      <div className="w-full mt-8">
        <h2 className="text-lg font-bold mb-6 text-left">My Orders</h2>
        {ordersLoading ? (
          <div className="text-center py-8 text-gray-500">Loading orders...</div>
        ) : !orders || orders.length === 0 ? (
          <div className="text-center py-8 text-gray-500">You have not placed any orders yet.</div>
        ) : (
          <div className="flex flex-col gap-10">
            {orders.map(order => (
              <OrderCard
                key={order.id}
                order={order}
              />
            ))}
            {/* Load More Button */}
            {hasNextPage && (
              <div className="w-full flex justify-center pt-4">
                <Button
                  disabled={isFetchingNextPage}
                  variant="secondary"
                  onClick={() => fetchNextPage()} >
                  <RefreshCcw className={`${isFetchingNextPage && "animate-spin"}`} />
                  Load More
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}