
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Device } from '@capacitor/device';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';

export const initializeMobileApp = async () => {
  try {
    // 设置状态栏样式
    await StatusBar.setStyle({ style: Style.Dark });
    
    // 隐藏启动屏幕
    await SplashScreen.hide();
    
    console.log('移动端初始化完成');
  } catch (error) {
    console.log('移动端功能不可用，使用Web版本');
  }
};

export const getDeviceInfo = async () => {
  try {
    const info = await Device.getInfo();
    return info;
  } catch (error) {
    console.log('无法获取设备信息');
    return null;
  }
};

export const takePicture = async () => {
  try {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });
    
    return image.dataUrl;
  } catch (error) {
    console.log('相机功能不可用');
    return null;
  }
};

export const vibrate = async () => {
  try {
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch (error) {
    console.log('震动功能不可用');
  }
};
