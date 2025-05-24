
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mic, MicOff, Volume2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { vibrate } from "@/utils/mobileUtils";

interface VoiceInteractionProps {
  onBack: () => void;
}

interface Message {
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const VoiceInteraction = ({ onBack }: VoiceInteractionProps) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "assistant",
      content: "您好！我是您的AI语音助手，有什么可以帮助您的吗？",
      timestamp: new Date()
    }
  ]);

  const startListening = async () => {
    setIsListening(true);
    await vibrate();
    toast.success("开始录音...");
    
    // 模拟语音识别
    setTimeout(async () => {
      setIsListening(false);
      setIsProcessing(true);
      await vibrate();
      
      const userMessages = [
        "今天天气怎么样？",
        "帮我设置一个明天上午9点的会议提醒",
        "给我讲个笑话吧",
        "什么是人工智能？",
        "推荐一些好看的电影",
        "今天适合外出吗？"
      ];
      
      const userMessage = userMessages[Math.floor(Math.random() * userMessages.length)];
      
      setMessages(prev => [...prev, {
        type: "user",
        content: userMessage,
        timestamp: new Date()
      }]);

      // 模拟AI响应
      setTimeout(async () => {
        const responses = [
          "根据最新数据，今天天气晴朗，气温适宜，是外出的好天气。",
          "好的，我已经为您设置了明天上午9点的会议提醒，届时会准时通知您。",
          "为什么程序员喜欢黑暗？因为光明会产生Bug！😄",
          "人工智能是模拟人类智能的技术，让机器能够学习、推理和解决问题。",
          "我推荐《阿凡达：水之道》和《流浪地球2》，这两部电影都很不错！",
          "今天天气很好，非常适合外出活动，记得做好防晒哦！"
        ];
        
        const response = responses[Math.floor(Math.random() * responses.length)];
        
        setMessages(prev => [...prev, {
          type: "assistant",
          content: response,
          timestamp: new Date()
        }]);
        
        setIsProcessing(false);
        await vibrate();
        toast.success("回复完成！");
      }, 1500);
    }, 2000);
  };

  const stopListening = async () => {
    setIsListening(false);
    await vibrate();
    toast.info("录音已停止");
  };

  return (
    <div className="min-h-screen p-4 pb-safe">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/10 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Mic className="h-6 w-6 mr-2" />
              语音交互助手
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Chat Messages */}
            <div className="h-80 sm:h-96 overflow-y-auto space-y-4 bg-black/20 rounded-lg p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                      message.type === "user"
                        ? "bg-blue-500 text-white rounded-br-md"
                        : "bg-white/10 text-blue-100 border border-white/20 rounded-bl-md"
                    }`}
                  >
                    <p className="text-sm sm:text-base">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
              
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-white/10 border border-white/20 px-4 py-3 rounded-2xl rounded-bl-md flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
                    <span className="text-blue-200 text-sm">AI正在思考...</span>
                  </div>
                </div>
              )}
            </div>

            {/* Voice Controls */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              {!isListening ? (
                <Button
                  onClick={startListening}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-full text-lg shadow-lg"
                >
                  <Mic className="h-6 w-6 mr-2" />
                  开始语音对话
                </Button>
              ) : (
                <Button
                  onClick={stopListening}
                  className="bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-full animate-pulse text-lg shadow-lg"
                >
                  <MicOff className="h-6 w-6 mr-2" />
                  停止录音
                </Button>
              )}
              
              <Button
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-6 py-4"
                onClick={vibrate}
              >
                <Volume2 className="h-5 w-5 mr-2" />
                播放最后回复
              </Button>
            </div>

            {/* Status */}
            <div className="text-center">
              {isListening && (
                <div className="flex items-center justify-center space-x-2 text-green-400">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse animation-delay-100"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse animation-delay-200"></div>
                  <span className="text-sm ml-2">正在聆听您的声音...</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VoiceInteraction;
