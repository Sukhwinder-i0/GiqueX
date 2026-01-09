"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { api } from "@/lib/api"; // adjust this import if your path is different

type OrderStatus = "completed" | "in-progress" | "pending";

type Order = {
  _id: string;
  gig: {
    _id: string;
    title: string;
    price: number;
  } | string;
  seller: {
    _id: string;
    name: string;
    email: string;
  } | string;
  buyer: {
    _id: string;
    name: string;
    email: string;
  } | string;
  createdAt: string;
  price: number;
  status: OrderStatus;
};

const statusStyles = {
  completed: {
    label: "Completed",
    icon: <FaCheckCircle className="text-green-400" />,
  },
  "in-progress": {
    label: "In Progress",
    icon: <FaClock className="text-yellow-400" />,
  },
  "pending": {
    label: "Pending",
    icon: <FaClock className="text-blue-400" />,
  },
  cancelled: {
    label: "Cancelled",
    icon: <MdCancel className="text-red-500 text-lg" />,
  },
};

function OrderRow({ order }: { order: Order }) {
  const gigTitle = typeof order.gig === 'object' ? order.gig.title : order.gig;
  const sellerName = typeof order.seller === 'object' ? order.seller.name : order.seller;
  const orderDate = new Date(order.createdAt).toLocaleDateString();
  const price = typeof order.gig === 'object' ? order.gig.price : order.price;

  return (
    <tr className="border-b border-white/10 hover:bg-white/10 transition-all">
      <td className="px-6 py-4">{order._id.slice(-8)}</td>
      <td className="px-6 py-4">{gigTitle}</td>
      <td className="px-6 py-4">{sellerName}</td>
      <td className="px-6 py-4">{orderDate}</td>
      <td className="px-6 py-4 font-semibold">₹{price}</td>
      <td className="px-6 py-4 flex items-center gap-2">
        {statusStyles[order.status]?.icon}
        {statusStyles[order.status]?.label || order.status}
      </td>
    </tr>
  );
}

function OrderTable({ orders }: { orders: Order[] }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
      <table className="min-w-full table-auto">
        <thead className="text-white/70 text-sm border-b border-white/10">
          <tr className="text-left">
            <th className="px-6 py-3">Order ID</th>
            <th className="px-6 py-3">Gig</th>
            <th className="px-6 py-3">Seller</th>
            <th className="px-6 py-3">Date</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Page() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await api.get("/user/orders");
        setOrders(res.data?.data || res.data || []);
      } catch (err: any) {
        if (err.response?.status === 401) {
          setError(
            "You are not signed in. Please sign in to view your orders."
          );
        } else {
          setError(err.message || "Failed to fetch orders");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <section className="min-h-screen px-6 py-20 text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Orders</h1>

      {loading && <p className="text-center">Loading...</p>}
      {!loading && !error && <OrderTable orders={orders} />}

      {error && (
        <div className="w-full inline-flex justify-center">
        <div className="text-center text-red-500 border border-white/30 px-8 py-4 rounded-xl bg-white/10">
          {error.includes("not signed in") ? (
            <p>
              {error}{" "}
              <a href="/auth" className="underline text-blue-400">
                Sign In
              </a>
            </p>
          ) : (
            <p>{error}</p>
          )}
        </div>
        </div>
      )}
    </section>
  );
}
