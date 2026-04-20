import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@next/third-parties/google';
// 1. 引入 Script 组件用于加载 AdSense
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AI Workout to CSV',
  description: 'Generate a professional AI workout program and download it as a CSV or Excel file. Perfect for Notion users and spreadsheet geeks. 100% Free.',
  verification: {
    google: 'Qb4KWFmDgo5q6xeSIwR9uNQujz0uepS61yiZ_iDyM7Y',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        
        {/* Google Analytics 保持不变 */}
        <GoogleAnalytics gaId="G-LBM7MY3ESW" />

        {/* 2. 在这里添加 Google AdSense 代码 */}
        {/* 注意：请把 ca-pub-xxxxxxxxxxxxx 替换为你 AdSense 后台的真实 ID */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1783115982181211"
          crossOrigin="anonymous">
		  </script>
      </body>
    </html>
  );
}