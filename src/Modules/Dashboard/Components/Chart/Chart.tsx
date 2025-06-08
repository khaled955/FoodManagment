
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const salesData = [
  { name: 'Jan', sales: 4000, revenue: 2400, users: 200 },
  { name: 'Feb', sales: 3000, revenue: 2210, users: 250 },
  { name: 'Mar', sales: 5000, revenue: 3200, users: 270 },
  { name: 'Apr', sales: 4780, revenue: 2908, users: 300 },
  { name: 'May', sales: 5890, revenue: 4300, users: 320 },
];

const userTypesData = [
  { name: 'Admins', value: 5 },
  { name: 'Chefs', value: 15 },
  { name: 'Customers', value: 80 },
];

const pieColors = ['#007bff', '#ffc107', '#28a745'];

export default function Chart() {
  return (
    <div className="row mt-4">
      {/* Sales Line Chart */}
      <div className="col-md-6 mb-4">
        <h5>Sales Overview</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#007bff"
              strokeWidth={3}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Bar Chart */}
      <div className="col-md-6 mb-4">
        <h5>Revenue Stats</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#28a745" animationDuration={1500} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* User Growth Line Chart */}
      <div className="col-md-6 mb-4">
        <h5>User Growth</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={salesData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#ffc107"
              strokeWidth={3}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* User Types Pie Chart */}
      <div className="col-md-6 mb-4">
        <h5>User Distribution</h5>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={userTypesData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
              animationDuration={1500}
            >
              {userTypesData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
