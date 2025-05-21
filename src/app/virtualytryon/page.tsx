'use client'
import React, { useState, useRef, useEffect } from "react";
import { Camera, RefreshCw, CheckCircle, Share2, Download, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { products } from "@/utils/data";

const VirtualTryOn = () => {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [virtualResult, setVirtualResult] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'user' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      toast.error("Unable to access camera. Please check permissions.");
    }
  };
  
  // Stop camera
  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const tracks = stream.getTracks();
      
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  };
  
  // Capture photo
  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      
      // Set canvas dimensions to match video
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      
      // Draw the video frame to the canvas
      context?.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      
      // Convert canvas to data URL
      const imageData = canvasRef.current.toDataURL('image/png');
      setCapturedImage(imageData);
      
      // Stop the camera after capturing
      stopCamera();
    }
  };
  
  // Reset the process
  const resetProcess = () => {
    setCapturedImage(null);
    setSelectedProduct(null);
    setVirtualResult(null);
    startCamera();
  };
  
  // Process the virtual try-on
  const processVirtualTryOn = () => {
    if (!capturedImage || !selectedProduct) {
      toast.error("Please select a product to try on");
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing time
    setTimeout(() => {
      // In a real app, this would be an AI-generated image
      // For this demo, we'll just use the product image as the "result"
      const product = products.find(p => p.id === selectedProduct);
      if (product) {
        setVirtualResult(product.images[0]);
      }
      setIsProcessing(false);
      toast.success("Virtual try-on complete!");
    }, 3000);
  };
  
  // Clean up camera on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);
  
  // Get clothing items that can be virtually tried on
  const tryOnProducts = products.filter(p => 
    p.category === 'men' || p.category === 'women'
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <main className="flex-grow pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl md:text-4xl font-bold text-fashion-primary mb-4">Virtual Try-On</h1>
              <p className="text-fashion-primary/70 max-w-2xl mx-auto">
                Experience clothes before you buy! Our AI-powered virtual try-on lets you see how items would look on you.
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center space-x-2 text-fashion-primary">
                  <Sparkles className="h-5 w-5" />
                  <h2 className="text-xl font-semibold">AI-Powered Virtual Fitting Room</h2>
                </div>
              </div>
              
              <div className="p-6">
                {/* Step 1: Take a Photo */}
                <div className="mb-8">
                  <h3 className="text-lg font-medium text-fashion-primary mb-4">Step 1: Take a Photo</h3>
                  
                  {!capturedImage ? (
                    <div className="bg-gray-100 rounded-lg overflow-hidden relative">
                      <div className="aspect-[4/3] w-full flex items-center justify-center">
                        {isCameraActive ? (
                          <video 
                            ref={videoRef} 
                            autoPlay 
                            playsInline 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center p-10">
                            <Camera className="h-10 w-10 text-gray-400 mx-auto mb-4" />
                            <p className="text-fashion-primary/70 mb-4">Enable your camera to get started</p>
                            <button
                              onClick={startCamera}
                              className="btn-primary"
                            >
                              Start Camera
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {isCameraActive && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
                          <button
                            onClick={capturePhoto}
                            className="btn-primary rounded-full h-14 w-14 flex items-center justify-center"
                          >
                            <Camera className="h-6 w-6" />
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-gray-100 rounded-lg overflow-hidden relative">
                      <div className="aspect-[4/3] w-full">
                        <img 
                          src={capturedImage} 
                          alt="Captured" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute bottom-4 right-4">
                        <button
                          onClick={resetProcess}
                          className="bg-white text-fashion-primary rounded-full h-10 w-10 flex items-center justify-center shadow-md"
                        >
                          <RefreshCw className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Hidden canvas for capturing */}
                  <canvas ref={canvasRef} className="hidden"></canvas>
                </div>
                
                {/* Step 2: Select a Product */}
                {capturedImage && (
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-fashion-primary mb-4">Step 2: Select a Product to Try On</h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {tryOnProducts.map(product => (
                        <div 
                          key={product.id}
                          onClick={() => setSelectedProduct(product.id)}
                          className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                            selectedProduct === product.id 
                              ? 'border-fashion-primary scale-105' 
                              : 'border-transparent hover:border-gray-300'
                          }`}
                        >
                          <div className="aspect-[3/4] relative">
                            <img 
                              src={product.images[0]} 
                              alt={product.name} 
                              className="w-full h-full object-cover"
                            />
                            {selectedProduct === product.id && (
                              <div className="absolute top-2 right-2 bg-fashion-primary rounded-full p-1">
                                <CheckCircle className="h-4 w-4 text-white" />
                              </div>
                            )}
                          </div>
                          <div className="p-2 text-xs text-center text-fashion-primary/80 truncate">
                            {product.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Step 3: Process */}
                {capturedImage && selectedProduct && (
                  <div className="mb-8 text-center">
                    <button
                      onClick={processVirtualTryOn}
                      disabled={isProcessing}
                      className={`btn-primary px-8 py-3 ${isProcessing ? 'opacity-70' : ''}`}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin mr-2 h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                          Processing...
                        </>
                      ) : (
                        <>Try It On</>
                      )}
                    </button>
                  </div>
                )}
                
                {/* Results */}
                {virtualResult && (
                  <div>
                    <h3 className="text-lg font-medium text-fashion-primary mb-4">Your Virtual Fit</h3>
                    
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                      <div className="aspect-[4/3] w-full">
                        <img 
                          src={virtualResult} 
                          alt="Virtual Try-On Result" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-center space-x-4 mt-6">
                      <button className="btn-secondary flex items-center space-x-2">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                      <button className="btn-secondary flex items-center space-x-2">
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VirtualTryOn;
