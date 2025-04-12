import React from 'react';
import { LayoutDashboard, Car, Users, FileText, Settings, MessageSquare, Bell, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import "../assets/AdminSidebar.css";

const AdminSidebar = () => {
  const location = useLocation();
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: Car, label: 'Vehicles', path: '/admin/vehicles' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: FileText, label: 'Bookings', path: '/admin/bookings' },
    { icon: MessageSquare, label: 'Reviews', path: '/admin/reviews' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Car className="w-8 h-8" />
        <h1>Vehicle Vault</h1>
      </div>
      
      <nav className="nav-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <button className="logout-button">
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </button>
    </div>
  );
};

export default AdminSidebar;