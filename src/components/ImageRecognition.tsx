
import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, Camera, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { takePicture, vibrate } from "@/utils/mobileUtils";

interface ImageRecognitionProps {
  onBack: () => void;
}

const ImageRecognition = ({ onBack }: ImageRecognitionProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        setAnalysisResult("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = async () => {
    await vibrate();
    const photo = await takePicture();
    if (photo) {
      setSelectedImage(photo);
      setAnalysisResult("");
      toast.success("图片捕获成功！");
    } else {
      toast.error("无法访问相机，请使用文件上传");
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      toast.error("请先选择一张图片");
      return;
    }

    setIsAnalyzing(true);
    await vibrate();
    
    // 模拟LLaVA模型分析
    setTimeout(() => {
      const mockResults = [
        "这是一张包含多个物体的图片。我可以识别出：建筑物、树木、天空等元素。图片整体色调偏暖，光线充足，可能是在白天拍摄的。",
        "图片中显示了一个室内场景，包含家具、装饰品等物品。整体布局整洁，色彩搭配和谐。",
        "这张图片展示了自然风景，包含山脉、河流或湖泊、植被等自然元素。景色优美，具有很高的观赏价值。",
        "我检测到这张图片中有人物存在，表情自然，整体构图良好。背景环境看起来很舒适。"
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setAnalysisResult(randomResult);
      setIsAnalyzing(false);
      vibrate();
      toast.success("图像分析完成！");
    }, 2000);
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
              <Camera className="h-6 w-6 mr-2" />
              图像识别 - LLaVA模型
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Upload Section */}
            <div className="border-2 border-dashed border-white/30 rounded-lg p-6 text-center">
              {selectedImage ? (
                <div className="space-y-4">
                  <img 
                    src={selectedImage} 
                    alt="Selected" 
                    className="max-w-full max-h-64 mx-auto rounded-lg shadow-lg"
                  />
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button 
                      variant="outline"
                      onClick={() => fileInputRef.current?.click()}
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      从相册选择
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={handleCameraCapture}
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      拍照
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Camera className="h-12 w-12 text-white/50 mx-auto" />
                  <div>
                    <p className="text-white text-lg mb-2">上传图片或拍照进行识别</p>
                    <p className="text-blue-200 text-sm">支持 JPG、PNG、GIF 格式</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <Button 
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      从相册选择
                    </Button>
                    <Button 
                      onClick={handleCameraCapture}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      拍照
                    </Button>
                  </div>
                </div>
              )}
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Analysis Button */}
            {selectedImage && (
              <div className="text-center">
                <Button
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-3 text-lg"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                      分析中...
                    </>
                  ) : (
                    "开始分析"
                  )}
                </Button>
              </div>
            )}

            {/* Results */}
            {analysisResult && (
              <Card className="bg-white/5 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-lg">分析结果</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-blue-200 leading-relaxed text-base">{analysisResult}</p>
                </CardContent>
              </Card>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ImageRecognition;
