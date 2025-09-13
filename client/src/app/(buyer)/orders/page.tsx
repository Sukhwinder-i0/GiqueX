"use client";

import { useEffect, useState } from "react";
import { FaCheckCircle, FaClock } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import { api } from "@/lib/api"; // adjust this import if your path is different

type OrderStatus = "completed" | "in progress" | "cancelled";

type Order = {
  id: string;
  gig: string;
  seller: string;
  date: string;
  price: string;
  status: OrderStatus;
};

const statusStyles = {
  completed: {
    label: "Completed",
    icon: <FaCheckCircle className="text-green-400" />,
  },
  "in progress": {
    label: "In Progress",
    icon: <FaClock className="text-yellow-400" />,
  },
  cancelled: {
    label: "Cancelled",
    icon: <MdCancel className="text-red-500 text-lg" />,
  },
};

function OrderRow({ order }: { order: Order }) {
  return (
    <tr className="border-b border-white/10 hover:bg-white/10 transition-all">
      <td className="px-6 py-4">{order.id}</td>
      <td className="px-6 py-4">{order.gig}</td>
      <td className="px-6 py-4">{order.seller}</td>
      <td className="px-6 py-4">{order.date}</td>
      <td className="px-6 py-4 font-semibold">{order.price}</td>
      <td className="px-6 py-4 flex items-center gap-2">
        {statusStyles[order.status].icon}
        {statusStyles[order.status].label}
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
        const res = await api.get("/user/orders"); // Adjusted route if needed
        setOrders(res.data.data || []);
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
