import React from 'react';
import { FaPlane, FaHotel, FaCalendar, FaStar } from 'react-icons/fa';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import Card, { CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Trips',
      value: '12',
      icon: <FaPlane className="text-blue-600" />,
      color: 'blue',
    },
    {
      title: 'Hotels Booked',
      value: '8',
      icon: <FaHotel className="text-green-600" />,
      color: 'green',
    },
    {
      title: 'Upcoming Trips',
      value: '3',
      icon: <FaCalendar className="text-orange-600" />,
      color: 'orange',
    },
    {
      title: 'Total Spent',
      value: '$2,450',
      icon: <FaStar className="text-purple-600" />,
      color: 'purple',
    },
  ];

  const recentTrips = [
    {
      id: 1,
      destination: 'Paris, France',
      date: 'Mar 15-22, 2024',
      status: 'Upcoming',
      image: '/paris.jpg',
    },
    {
      id: 2,
      destination: 'Tokyo, Japan',
      date: 'Jan 10-18, 2024',
      status: 'Completed',
      image: '/tokyo.jpg',
    },
    {
      id: 3,
      destination: 'Santorini, Greece',
      date: 'Dec 5-12, 2023',
      status: 'Completed',
      image: '/santorini.jpg',
    },
  ];

  const getStatusColor = (status) => {
    return status === 'Upcoming' ? 'text-green-600 bg-green-50' : 'text-gray-600 bg-gray-50';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-gray-600">
            Ready for your next adventure? Let's plan something amazing.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent>
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    {stat.icon}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Trips */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Recent Trips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTrips.map((trip) => (
                    <div key={trip.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <FaPlane className="text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{trip.destination}</h3>
                        <p className="text-sm text-gray-600">{trip.date}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
                          {trip.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    View All Trips
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="w-full justify-start" size="lg">
                    <FaPlane className="mr-3" />
                    Plan New Trip
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <FaHotel className="mr-3" />
                    Book Hotel
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <FaCalendar className="mr-3" />
                    View Bookings
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="lg">
                    <FaStar className="mr-3" />
                    My Reviews
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Trip Reminder */}
            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Upcoming Trip
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  Paris, France - Mar 15-22, 2024
                </p>
                <Button size="sm" className="w-full">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
