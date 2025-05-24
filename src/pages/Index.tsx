
import { useState } from "react";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import ImageRecognition from "@/components/ImageRecognition";
import VoiceInteraction from "@/components/VoiceInteraction";
import ScheduleManager from "@/components/ScheduleManager";
import { Camera, Mic, Calendar } from "lucide-react";

const Index = () => {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: "image",
      title: "图像识别",
      description: "基于LLaVA大模型的智能图像识别与分析",
      icon: Camera,
      gradient: "from-blue-500 to-purple-600"
    },
    {
      id: "voice",
      title: "语音交互",
      description: "自然语言语音对话与智能响应",
      icon: Mic,
      gradient: "from-green-500 to-blue-500"
    },
    {
      id: "schedule",
      title: "日程管理",
      description: "智能日程规划与提醒功能",
      icon: Calendar,
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  const renderActiveFeature = () => {
    switch (activeFeature) {
      case "image":
        return <ImageRecognition onBack={() => setActiveFeature(null)} />;
      case "voice":
        return <VoiceInteraction onBack={() => setActiveFeature(null)} />;
      case "schedule":
        return <ScheduleManager onBack={() => setActiveFeature(null)} />;
      default:
        return null;
    }
  };

  if (activeFeature) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
        {renderActiveFeature()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            智能多模态AI助手
          </h1>
          <p className="text-xl text-blue-200 max-w-2xl mx-auto">
            集成图像识别、语音交互、日程管理的下一代AI应用
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              gradient={feature.gradient}
              onClick={() => setActiveFeature(feature.id)}
            />
          ))}
        </div>

        {/* Tech Stack Info */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold text-white mb-6">技术栈</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {["LLaVA大模型", "Whisper语音", "GPT对话", "React前端"].map((tech) => (
              <div key={tech} className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
                <span className="text-blue-200 font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
