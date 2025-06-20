import BreadCrumbNav from "@/components/BreadCrumbNav";
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
      </div>
    </div>
  )
}