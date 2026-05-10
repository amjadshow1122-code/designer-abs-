import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  User, 
  Mail, 
  MessageSquare, 
  Edit, 
  ShieldAlert,
  ChevronLeft,
  ChevronRight,
  Download,
  Star
} from 'lucide-react';

const AdminCustomers = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const customers = [
    { 
      id: 1, 
      name: 'Ahmed Hassan', 
      email: 'ahmed@example.com', 
      joined: 'Jan 15, 2023', 
      orders: 12, 
      spent: '$2,450.00', 
      status: 'Active',
      type: 'VIP Collector'
    },
    { 
      id: 2, 
      name: 'Fatima Zohra', 
      email: 'fatima@example.com', 
      joined: 'Mar 22, 2023', 
      orders: 5, 
      spent: '$840.00', 
      status: 'Active',
      type: 'Regular'
    },
    { 
      id: 3, 
      name: 'Omar Khalid', 
      email: 'omar@example.com', 
      joined: 'May 10, 2023', 
      orders: 1, 
      spent: '$120.00', 
      status: 'Inactive',
      type: 'New'
    },
    { 
      id: 4, 
      name: 'Laila Amin', 
      email: 'laila@example.com', 
      joined: 'Jun 05, 2023', 
      orders: 8, 
      spent: '$1,150.00', 
      status: 'Active',
      type: 'Regular'
    },
    { 
      id: 5, 
      name: 'Zaid Bakri', 
      email: 'zaid@example.com', 
      joined: 'Jul 12, 2023', 
      orders: 24, 
      spent: '$5,200.00', 
      status: 'Active',
      type: 'VIP Collector'
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-primary">Customer Directory</h1>
          <p className="text-gray-500 text-sm">Manage your global community of heritage collectors.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="btn border border-gray-200 text-primary hover:bg-gray-50 px-6 py-2.5 text-xs font-bold gap-2">
            <Download size={16} />
            Export List
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by name, email or type..." 
            className="w-full bg-gray-50 border border-transparent focus:bg-white focus:border-primary pl-12 pr-4 py-2.5 rounded-lg text-sm outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-100 rounded-lg text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
            <Filter size={16} />
            Filter Type
          </button>
          <div className="h-8 w-[1px] bg-gray-100 mx-2"></div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Total: {customers.length} Collectors</p>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-[10px] font-bold uppercase tracking-widest text-gray-400">
                <th className="px-6 py-4">Collector</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Stats</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
                        {customer.name[0]}
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-sm font-bold text-primary">{customer.name}</span>
                        <span className="text-[10px] text-gray-400">{customer.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full flex items-center gap-1.5 w-fit ${
                      customer.type === 'VIP Collector' ? 'bg-secondary/10 text-secondary' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {customer.type === 'VIP Collector' && <Star size={10} fill="currentColor" />}
                      {customer.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-primary">{customer.spent}</span>
                      <span className="text-[10px] text-gray-400">{customer.orders} Orders</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`w-2 h-2 rounded-full inline-block mr-2 ${
                      customer.status === 'Active' ? 'bg-green-500' : 'bg-gray-300'
                    }`}></span>
                    <span className="text-sm text-gray-600">{customer.status}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="Send Message">
                        <MessageSquare size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-primary transition-colors" title="Edit Profile">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-500 transition-colors" title="Restrict Access">
                        <ShieldAlert size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-50 flex items-center justify-between bg-gray-50/50">
          <p className="text-sm text-gray-500">Joined since: <span className="font-bold text-primary">January 2023</span></p>
          <div className="flex items-center gap-2">
            <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-100">
              Previous
            </button>
            <button className="px-4 py-2 text-xs font-bold uppercase tracking-widest text-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-gray-100">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCustomers;
