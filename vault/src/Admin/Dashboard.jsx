import React from 'react';
import { Users, Car, FileText, TrendingUp, DollarSign, Star, Calendar, AlertCircle } from 'lucide-react';
import "../assets/Dashboard.css";

const Dashboard = () => {
  const stats = [
    { icon: Users, label: 'Total Users', value: '1,234', change: '+12%' },
    { icon: Car, label: 'Active Listings', value: '456', change: '+8%' },
    { icon: FileText, label: 'Total Bookings', value: '789', change: '+15%' },
    { icon: DollarSign, label: 'Revenue', value: '$45,678', change: '+20%' },
  ];

  const recentBookings = [
    { 
      id: 1, 
      user: 'John Doe', 
      vehicle: 'Tesla Model 3', 
      date: '2024-03-15', 
      status: 'Confirmed',
      amount: '$150/day'
    },
    { 
      id: 2, 
      user: 'Jane Smith', 
      vehicle: 'BMW X5', 
      date: '2024-03-14', 
      status: 'Pending',
      amount: '$200/day'
    },
    { 
      id: 3, 
      user: 'Mike Johnson', 
      vehicle: 'Audi Q7', 
      date: '2024-03-13', 
      status: 'Completed',
      amount: '$180/day'
    },
    { 
      id: 4, 
      user: 'Sarah Wilson', 
      vehicle: 'Mercedes GLC', 
      date: '2024-03-12', 
      status: 'Cancelled',
      amount: '$190/day'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Vehicle maintenance due for BMW X5',
      time: '2 hours ago'
    },
    {
      id: 2,
      type: 'info',
      message: 'New booking request received',
      time: '3 hours ago'
    },
    {
      id: 3,
      type: 'success',
      message: 'Payment received from John Doe',
      time: '5 hours ago'
    }
  ];

  const upcomingBookings = [
    {
      id: 1,
      vehicle: 'Tesla Model S',
      user: 'Alice Brown',
      startDate: '2024-03-20',
      duration: '3 days'
    },
    {
      id: 2,
      vehicle: 'Porsche Cayenne',
      user: 'Robert Smith',
      startDate: '2024-03-21',
      duration: '5 days'
    },
    {
      id: 3,
      vehicle: 'Range Rover Sport',
      user: 'Emma Davis',
      startDate: '2024-03-22',
      duration: '2 days'
    }
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
              <stat.icon />
              <span className="stat-change">{stat.change}</span>
            </div>
            <h3 className="stat-label">{stat.label}</h3>
            <p className="stat-value">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="card bookings-card">
          <div className="card-header">
            <h2 className="card-title">Recent Bookings</h2>
            <FileText />
          </div>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>User</th>
                  <th>Vehicle</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.user}</td>
                    <td>{booking.vehicle}</td>
                    <td>{booking.date}</td>
                    <td>{booking.amount}</td>
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

        <div className="dashboard-grid-right">
          <div className="card upcoming-card">
            <div className="card-header">
              <h2 className="card-title">Upcoming Bookings</h2>
              <Calendar />
            </div>
            <div className="upcoming-list">
              {upcomingBookings.map((booking) => (
                <div key={booking.id} className="upcoming-item">
                  <div className="upcoming-info">
                    <h3>{booking.vehicle}</h3>
                    <p>{booking.user}</p>
                  </div>
                  <div className="upcoming-details">
                    <span className="upcoming-date">{booking.startDate}</span>
                    <span className="upcoming-duration">{booking.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card alerts-card">
            <div className="card-header">
              <h2 className="card-title">Recent Alerts</h2>
              <AlertCircle />
            </div>
            <div className="alerts-list">
              {alerts.map((alert) => (
                <div key={alert.id} className={`alert-item alert-${alert.type}`}>
                  <div className="alert-content">
                    <p>{alert.message}</p>
                    <span className="alert-time">{alert.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;