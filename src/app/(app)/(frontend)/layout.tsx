import BreadCrumbNav from "@/components/BreadCrumbNav";
import Footer from "@/components/Footer/Footer";
import Navbar from "@/components/Nav/Navbar";

export default function FrontendLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='relative flex flex-col min-h-screen'>
      <div className='flex-grow flex-1'>
        <Navbar />
        <BreadCrumbNav />
        {children}
        <Footer />
      </div>
    </div>
  )
}