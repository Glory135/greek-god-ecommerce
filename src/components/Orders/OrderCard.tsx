import { formatPrice } from "@/lib/utils";
import type { AddressSnapshot, ProductSnapshot } from '@/modules/orders/types';
import { Order } from "@/payload-types"
import { shortenText } from "@/utils/commonFunctions";
import Image from "next/image";


interface Props {
  order: Order
};

const OrderCard = (
  { order }: Props
) => {

  function formatDate(date: string) {
    return new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  }

  const address = order.addressSnapshot as unknown as AddressSnapshot

  return (
    <div className="rounded-2xl bg-background border border-gray-200 shadow p-6 flex flex-col gap-6">
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
                .map((prod) => (
                  <tr key={prod.id}>
                    <td className="py-1 flex items-center gap-2">
                      {prod.image && <Image width={40} height={40} src={prod.image} alt={prod.name} className="object-cover rounded" />}
                      <div className="flex gap-2 flex-wrap">
                        <span>{shortenText(prod.name, 20)}</span>
                        {prod.size && <span className="text-xs text-gray-500">Size: {prod.size}</span>}
                        {prod.color && <span className="text-xs text-gray-500">Color: {prod.color}</span>}
                      </div>
                    </td>
                    <td className="py-1 text-center">{prod.quantity}</td>
                    <td className="px-2 py-1 text-center">{formatPrice(`${prod.price}`)}</td>
                    <td className="py-1 text-center font-semibold">{formatPrice(`${prod.price * prod.quantity}`)}</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {/* Delivery Address (optional) */}
      {order.addressSnapshot && !Array.isArray(order.addressSnapshot) && typeof order.addressSnapshot === 'object' && (
        <div className="mt-2 text-xs text-gray-600">
          <span className="font-semibold">Delivery to:</span>{" "}
          {address?.firstname} {address?.lastname},{" "}
          {address?.address},{" "}
          {address?.appartment ? `, ${address?.appartment}` : ''},{" "}
          {address?.city} ({address?.phone})
        </div>
      )}
    </div>
  )
}

export default OrderCard