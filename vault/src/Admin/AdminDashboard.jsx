import React from 'react';
import { Users, Car, FileText, TrendingUp, DollarSign, Star } from 'lucide-react';
import "../assets/AdminDashboard.css";

const AdminDashboard = () => {
  const stats = [
    { icon: Users, label: 'Total Users', value: '1,234', change: '+12%' },
    { icon: Car, label: 'Listed Vehicles', value: '456', change: '+8%' },
    { icon: FileText, label: 'Total Bookings', value: '789', change: '+15%' },
    { icon: DollarSign, label: 'Revenue', value: '$45,678', change: '+20%' },
  ];

  const recentBookings = [
    { id: 1, user: 'John Doe', vehicle: 'Tesla Model 3', date: '2024-03-15', status: 'Confirmed' },
    { id: 2, user: 'Jane Smith', vehicle: 'BMW X5', date: '2024-03-14', status: 'Pending' },
    { id: 3, user: 'Mike Johnson', vehicle: 'Audi Q7', date: '2024-03-13', status: 'Completed' },
  ];

  const topVehicles = [
    { name: 'Tesla Model 3', bookings: 45, rating: 4.8 },
    { name: 'BMW X5', bookings: 38, rating: 4.7 },
    { name: 'Audi Q7', bookings: 32, rating: 4.6 },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard Overview</h1>
        <p>Welcome back, Admin!</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-card-header">
              <stat.icon className="stat-icon" />
              <span className="stat-change">{stat.change}</span>
            </div>
            <h3 className="stat-label">{stat.label}</h3>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Recent Bookings</h2>
            <TrendingUp className="card-icon" />
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Vehicle</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.user}</td>
                    <td>{booking.vehicle}</td>
                    <td>{booking.date}</td>
                    <td>
                      <span className={`status-badge status-${booking.status.toLowerCase()}`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title">Top Performing Vehicles</h2>
            <Star className="card-icon" />
          </div>
          {topVehicles.map((vehicle, index) => (
            <div key={index} className="vehicle-item">
              <div className="vehicle-info">
                <h3>{vehicle.name}</h3>
                <p>{vehicle.bookings} bookings</p>
              </div>
              <div className="vehicle-rating">
                <Star className="rating-star" />
                <span>{vehicle.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;