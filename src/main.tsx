
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeMobileApp } from './utils/mobileUtils'

// 初始化移动端功能
initializeMobileApp();

createRoot(document.getElementById("root")!).render(<App />);
