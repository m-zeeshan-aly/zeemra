import "./globals.css";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AppProvider } from "@/lib/context";
import CustomCursor from "@/components/ui/CustomCursor";
import { ErrorBoundary } from "@/components/ui/ErrorBoundary";

export const metadata = {
  title: "ZEEMRA - Crafted in Leather",
  description: "Premium Leather Goods from Sialkot to Europe",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <AppProvider>
            <CustomCursor />
            <AnnouncementBar />
            <Navbar />
            {children}
            <Footer />
          </AppProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
