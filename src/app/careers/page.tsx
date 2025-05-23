'use client'


import React from "react";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchBar } from "@/components/ui/search-bar";

const careers = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    department: "Engineering",
    location: "New York, NY",
    type: "Full-time",
    description: "We're looking for an experienced Frontend Developer to help build our next-generation e-commerce platform."
  },
  {
    id: 2,
    title: "UX/UI Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Join our design team to create intuitive and beautiful user experiences for our fashion platform."
  },
  {
    id: 3,
    title: "3D Technology Specialist",
    department: "Technology",
    location: "San Francisco, CA",
    type: "Full-time",
    description: "Help develop our 3D body scanning technology to provide accurate size recommendations."
  },
  {
    id: 4,
    title: "Fashion Merchandiser",
    department: "Merchandising",
    location: "New York, NY",
    type: "Full-time",
    description: "Curate our clothing collections and ensure we offer the best selection to our customers."
  },
  {
    id: 5,
    title: "Digital Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Lead our digital marketing efforts to reach new customers and grow our brand presence."
  },
  {
    id: 6,
    title: "Data Scientist",
    department: "Data",
    location: "Boston, MA",
    type: "Full-time",
    description: "Analyze customer data to improve our size recommendations and personalization algorithms."
  }
];

const Careers = () => {
  const [filteredCareers, setFilteredCareers] = React.useState(careers);

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setFilteredCareers(careers);
      return;
    }
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = careers.filter(
      job => 
        job.title.toLowerCase().includes(lowerCaseSearch) ||
        job.department.toLowerCase().includes(lowerCaseSearch) ||
        job.location.toLowerCase().includes(lowerCaseSearch)
    );
    
    setFilteredCareers(filtered);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <Button variant="ghost" size="sm" asChild className="mb-4">
              <Link href="/" className="flex items-center">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-fashion-primary mb-4">Careers at FashionFit</h1>
            <p className="text-lg text-fashion-primary/80 mb-8 max-w-3xl">
              Join our team of innovators who are revolutionizing the fashion industry through technology.
              We're always looking for talented individuals to help us grow.
            </p>
          </div>

          <div className="mb-10">
            <SearchBar 
              onSearch={handleSearch} 
              placeholder="Search jobs by title, department or location..." 
              className="mx-auto mb-8"
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCareers.length > 0 ? (
                filteredCareers.map((job) => (
                  <Card key={job.id} className="overflow-hidden">
                    <CardHeader className="bg-fashion-primary/5 pb-4">
                      <CardTitle className="text-fashion-primary">{job.title}</CardTitle>
                      <CardDescription className="flex flex-wrap gap-2 mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-fashion-primary/10 text-fashion-primary">
                          {job.department}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {job.location}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          {job.type}
                        </span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <p className="text-gray-700">{job.description}</p>
                    </CardContent>
                    <CardFooter className="border-t bg-gray-50">
                      <Button className="w-full">View Details</Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-lg text-gray-500">No jobs match your search criteria.</p>
                  <Button variant="outline" className="mt-4" onClick={() => setFilteredCareers(careers)}>
                    View All Jobs
                  </Button>
                </div>
              )}
            </div>
          </div>

          <section className="bg-fashion-primary/5 rounded-xl p-8 mb-10">
            <h2 className="text-2xl font-bold text-fashion-primary mb-4">Why Work With Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4">
                <h3 className="text-xl font-semibold text-fashion-primary mb-2">Innovation</h3>
                <p className="text-fashion-primary/70">
                  Work on cutting-edge technology that's changing how people shop for clothes online.
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-fashion-primary mb-2">Growth</h3>
                <p className="text-fashion-primary/70">
                  Join a rapidly growing startup with plenty of opportunities for career advancement.
                </p>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-fashion-primary mb-2">Benefits</h3>
                <p className="text-fashion-primary/70">
                  Enjoy competitive salaries, flexible work arrangements, and a comprehensive benefits package.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center mb-12">
            <h2 className="text-2xl font-bold text-fashion-primary mb-6">Don't See a Job That Fits?</h2>
            <p className="text-fashion-primary/70 mb-6 max-w-2xl mx-auto">
              We're always looking for talented individuals. Send us your resume and we'll keep it on file for future opportunities.
            </p>
            <Button size="lg">
              Submit Your Resume
            </Button>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Careers;
