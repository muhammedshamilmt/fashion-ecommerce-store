import React from 'react';
import { Users, Building, Map, Award, Zap, Lock, Heart, LifeBuoy } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-primary/5 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <Breadcrumb className="mb-6">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/">Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/about">About Us</BreadcrumbLink>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>

                <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                  Revolutionizing Fashion Shopping
                </h1>
                <p className="text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  FashionFit is on a mission to solve the biggest problem in online fashion: 
                  finding clothes that actually fit your unique body shape.
                </p>
                <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-10 bg-primary rounded"></div>
                    <span className="font-medium">Founded 2023</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-10 bg-primary rounded"></div>
                    <span className="font-medium">Based in New York</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-1 w-10 bg-primary rounded"></div>
                    <span className="font-medium">50+ Team Members</span>
                  </div>
                </div>
              </div>
              
              <div className="relative animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="aspect-video rounded-xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1573164713988-8665fc963095?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                    alt="FashionFit team" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white dark:bg-fashion-900 rounded-lg p-4 shadow-lg">
                  <p className="font-medium">Our team is passionate about combining fashion with technology</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Mission & Values</h2>
              <p className="text-lg text-muted-foreground">
                We&apos;re committed to transforming the online shopping experience with innovative technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Users,
                  title: 'Customer First',
                  description: "Everything we do starts with what's best for our customers."
                },
                {
                  icon: Zap,
                  title: 'Innovation',
                  description: "We continuously push the boundaries of what's possible in fashion tech."
                },
                {
                  icon: Lock,
                  title: 'Privacy & Security',
                  description: 'Your data and privacy are treated with the utmost respect and security.'
                },
                {
                  icon: Heart,
                  title: 'Sustainability',
                  description: "We're committed to reducing waste through precise fit technology."
                }
              ].map((value, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-fashion-900 p-6 rounded-xl shadow-sm animate-fade-in"
                  style={{ animationDelay: `${0.2 * index}s` }}
                >
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <h2 className="text-3xl font-bold mb-6">Our Story</h2>
                <div className="space-y-6 text-lg">
                  <p>
                    FashionFit was born out of a frustrating experience. Our founder, after receiving yet another ill-fitting 
                    garment from an online purchase, wondered: &quot;Why can&apos;t technology solve this problem?&quot;
                  </p>
                  <p>
                    That question led to a journey of exploration in 3D body scanning, AI, and computer vision. After two years 
                    of research and development, FashionFit launched with a mission to make online clothes shopping as reliable 
                    as in-store fitting rooms.
                  </p>
                  <p>
                    Today, we&apos;re proud to be at the forefront of fashion technology, helping thousands of customers find their 
                    perfect fit while reducing returns and fashion waste.
                  </p>
                </div>
              </div>
              
              <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1560243563-062bfc001d68?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="FashionFit office" 
                      className="w-full h-full object-cover aspect-square"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1593508512255-86ab42a8e620?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Tech development" 
                      className="w-full h-full object-cover aspect-video"
                    />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1558403194-611308249627?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="3D scanning" 
                      className="w-full h-full object-cover aspect-video"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1595565312451-23051ab0666c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Customer experience" 
                      className="w-full h-full object-cover aspect-square"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
              <p className="text-lg text-muted-foreground">
                Meet the talented individuals behind FashionFit&apos;s innovation and success.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: 'Emma Johnson',
                  role: 'Founder & CEO',
                  image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                  name: 'Michael Chen',
                  role: 'CTO',
                  image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                  name: 'Sophia Rodriguez',
                  role: 'Head of Product',
                  image: 'https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                  name: 'James Wilson',
                  role: 'Chief Design Officer',
                  image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                  name: 'Olivia Kim',
                  role: 'VP of Marketing',
                  image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                },
                {
                  name: 'David Patel',
                  role: 'Head of AI Research',
                  image: 'https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
                }
              ].map((member, index) => (
                <div 
                  key={index} 
                  className="bg-white dark:bg-fashion-900 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow animate-fade-in"
                  style={{ animationDelay: `${0.1 * index}s` }}
                >
                  <div className="aspect-[3/4]">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 md:py-24 bg-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <p className="text-lg text-muted-foreground">
                Have questions about FashionFit? We&apos;d love to hear from you.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-fashion-900 p-6 rounded-xl shadow-sm text-center">
                <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Our Office</h3>
                <p className="text-muted-foreground">
                  123 Fashion Street<br />
                  New York, NY 10001<br />
                  United States
                </p>
              </div>
              
              <div className="bg-white dark:bg-fashion-900 p-6 rounded-xl shadow-sm text-center">
                <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <LifeBuoy className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer Support</h3>
                <p className="text-muted-foreground">
                  support@fashionfit.com<br />
                  +1 (555) 123-4567<br />
                  Available 24/7
                </p>
              </div>
              
              <div className="bg-white dark:bg-fashion-900 p-6 rounded-xl shadow-sm text-center">
                <div className="mx-auto h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Careers</h3>
                <p className="text-muted-foreground">
                  jobs@fashionfit.com<br />
                  We&apos;re always looking for<br />
                  talented individuals
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
