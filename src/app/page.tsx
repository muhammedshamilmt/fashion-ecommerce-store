import React from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import FeaturedCollection from "@/components/home/FeaturedCollection";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import NewArrivals from "../app/new-arrivals/page";
import { AnimatedSection, AnimatedContainer, AnimatedItem } from "@/components/AnimatedSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <main className="flex-grow">
        <Hero />
        
        <AnimatedSection className="py-16">
          <div className="container px-4 mx-auto">
            <AnimatedContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                <AnimatedItem 
                  key={index} 
                  className="relative group overflow-hidden rounded-lg shadow-sm"
                >
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
                </AnimatedItem>
              ))}
            </AnimatedContainer>
          </div>
        </AnimatedSection>
        
        <AnimatedSection className="py-16">
          <div className="container px-4 mx-auto">
            <AnimatedItem className="text-center mb-10 max-w-xl mx-auto">
              <span className="badge-fashion">Popular Now</span>
              <h2 className="text-[3rem] font-['Adelone-Serial-Extrabold-Regular'] text-fashion-primary font-bold mt-2">Trending Styles</h2>
              <p className="text-fashion-600 mt-4">
                Discover what's popular right now based on real-time data and customer favorites.
              </p>
            </AnimatedItem>
            
            <AnimatedContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <AnimatedItem 
                  key={index} 
                  className="relative group overflow-hidden rounded-lg shadow-sm"
                >
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
                </AnimatedItem>
              ))}
            </AnimatedContainer>
          </div>
        </AnimatedSection>
         
        <NewArrivals/>
        <FeaturedCollection />

        <AnimatedSection className="py-20 bg-gradient-to-br from-fashion-primary to-fashion-primary/80 text-white">
          <div className="container mx-auto px-4">
            <AnimatedItem className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Adelone-Serial-Extrabold-Regular']">What Our Customers Say</h2>
              <p className="max-w-2xl mx-auto text-white/80 text-lg">
                Discover why thousands of fashion-forward customers choose FashionFit for their online shopping needs.
              </p>
            </AnimatedItem>
            
            <AnimatedContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Ahmed R.",
                  role: "Loyal Customer",
                  text: "The quality of the Thobe is outstanding! The fabric feels premium and the stitching is perfect. I've worn it to several occasions and always receive compliments."
                },
                {
                  name: "Yusuf Khan",
                  role: "Fashion Enthusiast",
                  text: "This Thobe is both traditional and stylish. It fits perfectly and is very comfortable for daily wear. Definitely ordering more!"
                },
                {
                  name: "Omar Latif",
                  role: "Style Conscious",
                  text: "I was impressed by the fast delivery and elegant packaging. The Thobe exceeded my expectations – classy, breathable, and well-crafted"
                }
              ].map((testimonial, index) => (
                <AnimatedItem 
                  key={index}
                  className="bg-white/10 backdrop-blur-sm p-8 rounded-xl"
                >
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg key={star} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="mb-4 text-white/90">{testimonial.text}</p>
                  <div className="flex items-center">
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-white/70 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </AnimatedItem>
              ))}
            </AnimatedContainer>
          </div>
        </AnimatedSection>
        
        <AnimatedSection className="py-20 bg-fashion-light">
          <div className="container mx-auto px-4">
            <AnimatedItem className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-12 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold font-['Adelone-Serial-Extrabold-Regular'] text-fashion-primary mb-6">
                    Experience the Future of Fashion Shopping
                  </h2>
                  <p className="text-fashion-primary/70 mb-8 text-lg">
                    Sign up today and get 15% off your first purchase. Join thousands of satisfied customers who've revolutionized their shopping experience.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
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
            </AnimatedItem>
          </div>
        </AnimatedSection>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
