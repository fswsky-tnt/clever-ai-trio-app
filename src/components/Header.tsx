
import { Brain } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">AI多模态助手</h1>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#" className="text-blue-200 hover:text-white transition-colors">首页</a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors">功能</a>
            <a href="#" className="text-blue-200 hover:text-white transition-colors">关于</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
