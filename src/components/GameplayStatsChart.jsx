import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const GameplayStatsChart = () => {
  const { isDark } = useTheme();
  const [timeRange] = useState('week'); // Could be 'week', 'month', 'year'

  // Mock data for the chart
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Hours Played',
        data: [2.5, 3.2, 4.1, 2.8, 5.3, 6.2, 4.8],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        backgroundColor: isDark ? '#1F2937' : '#FFFFFF',
        titleColor: isDark ? '#FFFFFF' : '#111827',
        bodyColor: isDark ? '#D1D5DB' : '#4B5563',
        borderColor: isDark ? '#374151' : '#E5E7EB',
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          title: (context) => `${context[0].label}`,
          label: (context) => `${context.parsed.y} hours`
        }
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
          drawBorder: false
        },
        ticks: {
          color: isDark ? '#9CA3AF' : '#6B7280'
        }
      },
      y: {
        grid: {
          color: isDark ? 'rgba(75, 85, 99, 0.2)' : 'rgba(243, 244, 246, 0.8)',
          drawBorder: false
        },
        ticks: {
          color: isDark ? '#9CA3AF' : '#6B7280',
          padding: 8,
          callback: (value) => `${value}h`
        },
        min: 0,
        suggestedMax: 8
      }
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false
    },
    elements: {
      line: {
        borderWidth: 2
      },
      point: {
        radius: 4,
        hoverRadius: 6,
        borderWidth: 2,
        backgroundColor: isDark ? '#1F2937' : '#FFFFFF'
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-64"
    >
      <Line data={data} options={options} />
    </motion.div>
  );
};

export default GameplayStatsChart; 