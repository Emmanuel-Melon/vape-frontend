import React from 'react';
import { motion } from 'framer-motion';
import { User, Shield, Clock, MoreVertical, Ban, CheckCircle } from 'lucide-react';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'USER' | 'ADMIN';
  status: 'ACTIVE' | 'SUSPENDED' | 'PENDING';
  avatar: string;
  joinDate: string;
  lastActive: string;
  totalPurchases: number;
  totalSales: number;
}

interface UserManagementCardProps {
  user: User;
  index: number;
  onAction: (action: string, user: User) => void;
}

export const UserManagementCard: React.FC<UserManagementCardProps> = ({
  user,
  index,
  onAction
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'SUSPENDED': return 'bg-red-100 text-red-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-purple-100 text-purple-800';
      case 'USER': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={user.avatar}
            alt={user.username}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-800">{user.username}</h3>
            <p className="text-sm text-gray-600">{user.email}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
            {user.status}
          </span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
            {user.role}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-600">Joined:</span>
          <p className="font-medium">{new Date(user.joinDate).toLocaleDateString()}</p>
        </div>
        <div>
          <span className="text-gray-600">Last Active:</span>
          <p className="font-medium">{user.lastActive}</p>
        </div>
        <div>
          <span className="text-gray-600">Purchases:</span>
          <p className="font-medium text-green-600">{user.totalPurchases}</p>
        </div>
        <div>
          <span className="text-gray-600">Sales:</span>
          <p className="font-medium text-blue-600">{user.totalSales}</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => onAction('view', user)}
          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
        >
          View Profile
        </button>
        <button
          onClick={() => onAction(user.status === 'ACTIVE' ? 'suspend' : 'activate', user)}
          className={`px-3 py-2 rounded-lg transition-colors text-sm ${
            user.status === 'ACTIVE' 
              ? 'bg-red-100 text-red-700 hover:bg-red-200' 
              : 'bg-green-100 text-green-700 hover:bg-green-200'
          }`}
        >
          {user.status === 'ACTIVE' ? <Ban size={16} /> : <CheckCircle size={16} />}
        </button>
        <button
          onClick={() => onAction('more', user)}
          className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <MoreVertical size={16} />
        </button>
      </div>
    </motion.div>
  );
};