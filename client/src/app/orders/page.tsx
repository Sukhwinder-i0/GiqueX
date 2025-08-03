'use client'

import { FaCheckCircle, FaClock } from 'react-icons/fa'

type OrderStatus = 'completed' | 'in progress'

type Order = {
  id: string
  gig: string
  seller: string
  date: string
  price: string
  status: OrderStatus
}

const orders: Order[] = [
  {
    id: 'order001',
    gig: 'Design portfolio website',
    seller: 'DevSanya',
    date: 'July 5, 2025',
    price: '₹6,500',
    status: 'completed',
  },
]

const statusStyles = {
  completed: {
    label: 'Completed',
    icon: <FaCheckCircle className="text-green-400" />,
  },
  'in progress': {
    label: 'In Progress',
    icon: <FaClock className="text-yellow-400" />,
  },
}

export default function OrdersPage() {
  return (
    <section className="min-h-screen px-6 py-12 bg-[#0f172a] text-white">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Orders</h1>

      <div className="overflow-x-auto rounded-xl bg-white/5 backdrop-blur-lg border border-white/10">
        <table className="min-w-full table-auto">
          <thead className="text-white/70 text-sm border-b border-white/10">
            <tr className="text-left">
              <th className="px-6 py-3">Order ID</th>
              <th className="px-6 py-3">Gig</th>
              <th className="px-6 py-3">Buyer</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-white/10 hover:bg-white/10 transition-all"
              >
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
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
