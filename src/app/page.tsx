import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NewArrivals from "../app/new-arrivals/page";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        

        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Mens",
                  image: "https://www.alkameez.com/cdn/shop/files/2_9340c8cd-c2a4-43a3-ae09-c3a0cc0455b4.png?v=1747737108&width=720",
                  link: "/mensthobas"
                },
                {
                  title: "Boys",
                  image: "https://www.alkameez.com/cdn/shop/files/1_a07ff1e0-9bb1-4068-b293-9f80208b52f0.png?v=1747737307&width=720",
                  link: "/boys-thobas"
                },
                {
                  title: "Kids",
                  image: "https://www.alkameez.com/cdn/shop/files/website_kids_banner_final.png?v=1747737399&width=720",
                  link: "/kidsthobas"
                }
              ].map((item, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg shadow-sm">
                  <Link href={item.link}>
                  <div className="h-[25rem] ">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  </div>
                  </Link>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-[3rem] font-semibold text-white font-['Adelone-Serial-Extrabold-Regular'] ">{item.title}</h3>
                    <div className="transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <Button variant="outline" className="bg-white/90 backdrop-blur-sm ml-[30%] xl:ml-[40%]  text-fashion-950 font-['Adelone-Serial-Extrabold-Regular'] hover:bg-white border-0" asChild>
                        <Link href={item.link}>
                          Explore Collection
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        <section className="py-16">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-10 max-w-xl mx-auto">
              <span className="badge-fashion">Popular Now</span>
              <h2 className="text-[3rem] font-['Adelone-Serial-Extrabold-Regular'] text-fashion-primary font-bold mt-2">Trending Styles</h2>
              <p className="text-fashion-600 mt-4">
                Discover what's popular right now based on real-time data and customer favorites.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: "Emarathi",
                  image: "https://www.alkameez.com/cdn/shop/files/EMARATI_NEW_3.png?v=1733921814&width=750",
                  link: "/emarathi"
                },
                {
                  title: "Omani",
                  image: "https://www.alkameez.com/cdn/shop/files/OMANI_NEW_1.png?v=1733921248&width=750",
                  link: "/omani"
                },
                {
                  title: "Saudi",
                  image: "https://www.alkameez.com/cdn/shop/files/SAUDI_NEW_1.png?v=1733918348&width=750",
                  link: "/saudi"
                },
                {
                  title: "Morocan",
                  image: "https://www.alkameez.com/cdn/shop/files/6_b7840197-323d-491d-ab47-ce1e58ad39d0.png?v=1740916392&width=750",
                  link: "/morocan"
                }
              ].map((item, index) => (
                <div key={index} className="relative group overflow-hidden rounded-lg shadow-sm">
                  <Link href={item.link}>
                  <div className="h-[25rem] ">
                  
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                  </div>
                  </Link>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-[3rem] font-semibold text-white font-['Adelone-Serial-Extrabold-Regular'] ">{item.title}</h3>
                    <div className="transform translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <Button variant="outline" className="bg-white/90 backdrop-blur-sm text-fashion-950 font-['Adelone-Serial-Extrabold-Regular'] hover:bg-white border-0" asChild>
                        <Link href={item.link}>
                          Explore Collection
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
         

         <NewArrivals/>
        

        <FeaturedCollection />


        {/* Features Section */}
        {/* <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-fashion-primary mb-4">
                Revolutionary Fashion Experience
              </h2>
              <p className="max-w-2xl mx-auto text-fashion-primary/70 text-lg">
                FashionFit combines cutting-edge technology with fashion expertise to provide a truly unique shopping experience.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
              {/* Feature 1 */}
              {/* <div className="bg-fashion-light p-8 rounded-xl">
                <div className="w-16 h-16 bg-fashion-blue rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fashion-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-fashion-primary mb-3">3D Body Scanning</h3>
                <p className="text-fashion-primary/70">
                  Our advanced 3D scanning technology captures your exact measurements for a perfect fit every time.
                </p>
              </div> */}
              
              {/* Feature 2 */}
              {/* <div className="bg-fashion-peach p-8 rounded-xl">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fashion-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-fashion-primary mb-3">Virtual Try-On</h3>
                <p className="text-fashion-primary/70">
                  Try clothes on your digital avatar before purchasing to ensure the style and fit are perfect for you.
                </p>
              </div> */}
              
              {/* Feature 3 */}
              {/* <div className="bg-fashion-blue p-8 rounded-xl">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-fashion-primary">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-fashion-primary mb-3">AI Recommendations</h3>
                <p className="text-fashion-primary/70">
                  Receive personalized style recommendations based on your body shape, preferences, and fashion trends.
                </p>
              </div>
            </div>
          </div> */}
        {/* </section> */}
        
        {/* Testimonials */}
        <section className="py-20 bg-gradient-to-br from-fashion-primary to-fashion-primary/80 text-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Adelone-Serial-Extrabold-Regular']">What Our Customers Say</h2>
              <p className="max-w-2xl mx-auto text-white/80 text-lg">
                Discover why thousands of fashion-forward customers choose FashionFit for their online shopping needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-white/90">
                  "The quality of the Thobe is outstanding! The fabric feels premium and the stitching is perfect. I’ve worn it to several occasions and always receive compliments."
                </p>
                <div className="flex items-center">
                  {/* <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img src="https://randomuser.me/api/portraits/women/45.jpg" alt="Customer" className="w-full h-full object-cover" />
                  </div> */}
                  <div>
                    <p className="font-medium"> Ahmed R. </p>
                    <p className="text-white/70 text-sm">Loyal Customer</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-white/90">
                  "This Thobe is both traditional and stylish. It fits perfectly and is very comfortable for daily wear. Definitely ordering more!"
                </p>
                <div className="flex items-center">
                  {/* <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" className="w-full h-full object-cover" />
                  </div> */}
                  <div>
                    <p className="font-medium">Yusuf Khan </p>
                    <p className="text-white/70 text-sm">Fashion Enthusiast</p>
                  </div>
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl">
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="mb-4 text-white/90">
                  "I was impressed by the fast delivery and elegant packaging. The Thobe exceeded my expectations – classy, breathable, and well-crafted"
                </p>
                <div className="flex items-center">
                    {/* <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img src="https://randomuser.me/api/portraits/women/68.jpg" alt="Customer" className="w-full h-full object-cover" />
                    </div> */}
                  <div>
                    <p className="font-medium">Omar Latif</p>
                    <p className="text-white/70 text-sm">Style Conscious</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-fashion-light">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-12 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold font-['Adelone-Serial-Extrabold-Regular'] text-fashion-primary mb-6">
                    Experience the Future of Fashion Shopping
                  </h2>
                  <p className="text-fashion-primary/70 mb-8 text-lg">
                    Sign up today and get 15% off your first purchase. Join thousands of satisfied customers who've revolutionized their shopping experience.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* <a href="/signup" className="btn-primary text-center ">
                      Create an Account
                    </a> */}
                    <a href="/products" className="btn-secondary text-center">
                      Browse Collection
                    </a>
                  </div>
                </div>
                <div className="md:w-1/2">
                  <img 
                    src="/tobasbyrack.png" 
                    alt="Fashion Model" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
