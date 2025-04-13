import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { AchievementsTimeline } from './AchievementsTimeline';

export const AchievementsCard = ({ achievements }) => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Recent Achievements
      </h2>
      <AchievementsTimeline achievements={achievements} />
    </Card>
  );
}; 