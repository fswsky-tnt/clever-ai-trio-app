
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  onClick: () => void;
}

const FeatureCard = ({ title, description, icon: Icon, gradient, onClick }: FeatureCardProps) => {
  return (
    <Card 
      className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-2xl"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${gradient} flex items-center justify-center mb-4`}>
          <Icon className="h-8 w-8 text-white" />
        </div>
        
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-blue-200 text-sm leading-relaxed">{description}</p>
        
        <div className="mt-4">
          <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
            开始使用 →
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
