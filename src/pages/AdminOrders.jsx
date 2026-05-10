import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Eye, 
  Printer, 
  Truck, 
  CheckCircle2, 
  Clock,
  XCircle,
  Download,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const AdminOrders = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const orders = [
    { id: '#ORD-12450', customer: 'Ahmed Hassan', email: 'ahmed@example.com', date: 'Oct 12, 2023', total: '$145.00', status: 'In Transit', items: 2 },
    { id: '#ORD-12451', customer: 'Fatima Zohra', email: 'fatima@example.com', date: 'Oct 12, 2023', total: '$245.00', status: 'Processing', items: 1 },
    { id: '#ORD-12452', customer: 'Omar Khalid', email: 'omar@example.com', date: 'Oct 11, 2023', total: '$85.00', status: 'Delivered', items: 1 },
    { id: '#ORD-12453', customer: 'Laila Amin', email: 'laila@example.com', date: 'Oct 11, 2023', total: '$450.00', status: 'Pending', items: 3 },
    { id: '#ORD-12454', customer: 'Zaid Bakri', email: 'zaid@example.com', date: 'Oct 10, 2023', total: '$1,200.00', status: 'Delivered', items: 4 },
  ];

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-600';
      case 'In Transit': return 'bg-blue-100 text-blue-600';
      case 'Processing': return 'bg-yellow-100 text-yellow-600';
      case 'Pending': return 'bg-gray-100 text-gray-600';
      case 'Cancelled': return 'bg-red-100 text-red-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Delivered': return <CheckCircle2 size={12} />;
      case 'In Transit': return <Truck size={12} />;
      case 'Processing': return <Clock size={12} />;
      case 'Pending': return <Clock size={12} />;
      case 'Cancelled': return <XCircle size={12} />;
      default: return <Clock size={12} />;
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Orders Management</h1>
          <p className="text-gray-500 text-sm">Track and fulfill your heritage acquisition orders.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn border border-gray-200 text-primary hover:bg-gray-50 px-6 py-2.5 text-xs font-bold gap-2">
            <Download size={16} />
            Export Orders
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by order ID or customer..." 
            className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary pl-12 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-100 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <Filter size={16} />
            Filter Status
          </button>
          <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Showing {orders.length} Orders</p>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-primary">{order.id}</span>
                      <span className="text-[10px] text-gray-400">{order.date} • {order.items} Items</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-primary">{order.customer}</span>
                      <span className="text-[10px] text-gray-400">{order.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit ${getStatusStyles(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-secondary" style={{ color: 'var(--color-secondary)' }}>{order.total}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="View Details">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="Print Invoice">
                        <Printer size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-secondary transition-colors" title="Manage Order">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 font-bold uppercase tracking-widest">Page 1 of 24</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50 disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="p-2 border border-gray-100 rounded-lg text-gray-400 hover:bg-gray-50">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders;
