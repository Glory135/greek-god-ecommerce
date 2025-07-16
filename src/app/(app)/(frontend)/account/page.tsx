"use client"

import useGetUser from '@/hooks/use-get-user';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useTRPC } from '@/trpc/client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { RefreshCcw } from 'lucide-react';
import Image from 'next/image';
import { useEffect } from 'react';
import { DEFAULT_LIMIT } from '@/constants';
import type { ProductSnapshot } from '@/modules/orders/types';

function getInitials(name?: string, email?: string) {
  if (name && name.trim().length > 0) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  }
  if (email) return email[0]?.toUpperCase();
  return '?';
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function formatPrice(amount: string | number) {
  return `₦${Number(amount).toLocaleString()}`;
}

export default function AccountPage() {
  const { user, isLoading } = useGetUser();
  const router = useRouter();
  const trpc = useTRPC();

  // Redirect to login if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.replace('/login');
    }
  }, [isLoading, user, router]);

  // Placeholder logout logic (replace with real one)
  const handleLogout = () => {
    // TODO: Replace with real logout logic
    localStorage.clear();
    router.replace('/login');
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
              <div key={order.id} className="rounded-2xl bg-background border border-gray-200 shadow p-6 flex flex-col gap-6">
                <div className="flex flex-wrap gap-6 items-center justify-between">
                  <div className="flex flex-col gap-1 min-w-[150px]">
                    <span className="text-xs text-gray-500">Order Ref</span>
                    <span className="text-primary font-mono text-base font-semibold break-all">{order.paymentReference}</span>
                  </div>
                  <div className="flex flex-col gap-1 min-w-[100px]">
                    <span className="text-xs text-gray-500">Date</span>
                    <span>{formatDate(order.paymentDate)}</span>
                  </div>
                  <div className="flex flex-col gap-1 min-w-[100px]">
                    <span className="text-xs text-gray-500">Status</span>
                    {order.status ? (
                      <span className={`px-2 py-1 rounded text-xs font-bold w-fit ${order.status === 'paid' ? 'bg-green-100 text-green-700' : order.status === 'pending' ? 'bg-yellow-100 text-yellow-700' : order.status === 'delivered' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'}`}>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    ) : (
                      <span className="px-2 py-1 rounded text-xs font-bold w-fit bg-yellow-100 text-yellow-700">Pending</span>
                    )}
                  </div>
                  {/* Delivery Status */}
                  <div className="flex flex-col gap-1 min-w-[120px]">
                    <span className="text-xs text-gray-500">Delivery Status</span>
                    {order.delivered ? (
                      <span className="px-2 py-1 rounded text-xs font-bold w-fit bg-blue-100 text-blue-700">Delivered</span>
                    ) : (
                      <span className="px-2 py-1 rounded text-xs font-bold w-fit bg-gray-100 text-gray-700">Not Delivered</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1 min-w-[100px]">
                    <span className="text-xs text-gray-500">Total</span>
                    <span className="font-semibold">{formatPrice(order.amount)}</span>
                  </div>
                </div>
                {/* Products */}
                <div className="overflow-x-auto mt-2">
                  <table className="min-w-full text-sm border rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="px-2 py-1 text-left">Product</th>
                        <th className="px-2 py-1 text-left">Qty</th>
                        <th className="px-2 py-1 text-left">Price</th>
                        <th className="px-2 py-1 text-left">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(order.productsSnapshot) &&
                        (order.productsSnapshot as unknown[])
                          .filter((p): p is ProductSnapshot => typeof p === 'object' && p !== null && 'id' in p && 'name' in p)
                          .map((prod, i) => (
                            <tr key={prod.id}>
                              <td className="px-2 py-1 flex items-center gap-2">
                                {prod.image && <Image width={40} height={40} src={prod.image} alt={prod.name} className="object-cover rounded" />}
                                <span>{prod.name}</span>
                                {prod.size && <span className="ml-2 text-xs text-gray-500">Size: {prod.size}</span>}
                                {prod.color && <span className="ml-2 text-xs text-gray-500">Color: {prod.color}</span>}
                              </td>
                              <td className="px-2 py-1">{prod.quantity}</td>
                              <td className="px-2 py-1">{formatPrice(prod.price)}</td>
                              <td className="px-2 py-1 font-semibold">{formatPrice(prod.price * prod.quantity)}</td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
                {/* Delivery Address (optional) */}
                {order.addressSnapshot && !Array.isArray(order.addressSnapshot) && typeof order.addressSnapshot === 'object' && (
                  <div className="mt-2 text-xs text-gray-600">
                    <span className="font-semibold">Delivery to:</span>
                    {JSON.stringify(order.addressSnapshot.firstname)} {JSON.stringify(order.addressSnapshot.lastname)},
                    {JSON.stringify(order.addressSnapshot.address)},
                    {JSON.stringify(order.addressSnapshot.appartment) ? `, ${JSON.stringify(order.addressSnapshot.appartment)}` : ''},
                    {JSON.stringify(order.addressSnapshot.city)} ({JSON.stringify(order.addressSnapshot.phone)})
                  </div>
                )}
              </div>
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