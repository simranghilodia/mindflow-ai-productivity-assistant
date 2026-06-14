import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, 
  FileText, 
  CheckSquare, 
  TrendingUp, 
  Clock, 
  Zap 
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export const StatsGrid: React.FC = () => {
  const { notes, user, analytics } = useAppStore();
  
  const totalTasks = notes.reduce((acc, note) => acc + note.tasks.length, 0);
  const completedTasks = notes.reduce((acc, note) => 
    acc + note.tasks.filter(task => task.completed).length, 0
  );
  const aiProcessedNotes = notes.filter(note => note.isAiProcessed).length;

  const stats = [
    {
      title: 'AI Uses Today',
      value: user?.aiUsageCount || 0,
      max: user?.subscription === 'pro' ? '∞' : user?.aiUsageLimit,
      icon: Brain,
      color: 'from-purple-500 to-blue-500',
      trend: '+12%'
    },
    {
      title: 'Notes Created',
      value: notes.length,
      icon: FileText,
      color: 'from-emerald-500 to-green-500',
      trend: '+8%'
    },
    {
      title: 'Tasks Completed',
      value: completedTasks,
      max: totalTasks,
      icon: CheckSquare,
      color: 'from-orange-500 to-red-500',
      trend: '+23%'
    },
    {
      title: 'AI Processed',
      value: aiProcessedNotes,
      icon: Zap,
      color: 'from-pink-500 to-purple-500',
      trend: '+15%'
    },
    {
      title: 'Productivity Score',
      value: Math.round((completedTasks / Math.max(totalTasks, 1)) * 100),
      suffix: '%',
      icon: TrendingUp,
      color: 'from-blue-500 to-cyan-500',
      trend: '+5%'
    },
    {
      title: 'Time Saved',
      value: Math.round(aiProcessedNotes * 12.5),
      suffix: 'min',
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      trend: '+31%'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        
        return (
          <motion.div
            key={stat.title}
            className="card p-4 sm:p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className={`p-2 sm:p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-emerald-400 text-xs sm:text-sm font-medium">
                {stat.trend}
              </span>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-white/70 text-xs sm:text-sm font-medium">{stat.title}</h3>
              <div className="flex items-baseline space-x-2">
                <span className="text-xl sm:text-2xl font-bold text-white">
                  {stat.value}
                </span>
                {stat.max && (
                  <span className="text-white/50 text-sm">
                    / {stat.max}
                  </span>
                )}
                {stat.suffix && (
                  <span className="text-white/70 text-sm">
                    {stat.suffix}
                  </span>
                )}
              </div>
              
              {stat.max && typeof stat.max === 'number' && (
                <div className="w-full bg-white/20 rounded-full h-2 mt-3">
                  <div 
                    className={`bg-gradient-to-r ${stat.color} h-2 rounded-full transition-all duration-300`}
                    style={{ width: `${Math.min((stat.value / stat.max) * 100, 100)}%` }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};