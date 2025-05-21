import React, { useRef, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@/utils/data";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";
import { Image } from '@imagekit/next';
import {
    ImageKitAbortError,
    ImageKitInvalidRequestError,
    ImageKitServerError,
    ImageKitUploadNetworkError,
    upload,
} from "@imagekit/next";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be positive"),
  category: z.string().min(1, "Category is required"),
  inStock: z.boolean().default(true),
  featured: z.boolean().default(false),
  sizes: z.array(z.string()).min(1, "At least one size is required"),
  colors: z.array(z.string()).min(1, "At least one color is required"),
  images: z.array(z.string()).min(1, "At least one image is required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductFormValues) => Promise<void>;
  initialData?: Product & { _id?: string };
}

const availableSizes = ["XS", "S", "M", "L", "XL", "XXL", "30", "32", "34", "36", "38", "40", "42", "44"];
const availableColors = ["Black", "White", "Red", "Blue", "Green", "Yellow", "Brown", "Gray", "Navy", "Pink", "Purple", "Orange", "Beige", "Tan", "Charcoal"];
const availableCategories = ["men", "women", "kids", "accessories"];

// Sample placeholder images
const placeholderImages = [
  "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=2787&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=3036&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1582552938357-32b906df40cb?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=2940&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=2980&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?q=80&w=2940&auto=format&fit=crop",
];

const ProductForm: React.FC<ProductFormProps> = ({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}) => {
  const [uploadedImages, setUploadedImages] = useState<{ url: string; file: File }[]>([]);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = useRef<AbortController | null>(null);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      category: initialData?.category || "",
      inStock: initialData?.inStock ?? true,
      featured: initialData?.featured ?? false,
      sizes: initialData?.sizes || [],
      colors: initialData?.colors || [],
      images: initialData?.images || [],
    },
  });

  const authenticator = async () => {
    try {
      const response = await fetch("/api/upload-auth");
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please upload only image files');
        continue;
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size should be less than 5MB');
        continue;
      }

      try {
        // Get authentication parameters
        const authParams = await authenticator();
        const { signature, expire, token, publicKey } = authParams;

        // Create new AbortController for this upload
        abortController.current = new AbortController();

        // Upload to ImageKit
        const uploadResponse = await upload({
          file,
          fileName: file.name,
          folder: "/products", // Store in products folder
          useUniqueFileName: true,
          signature,
          expire,
          token,
          publicKey,
          onProgress: (event) => {
            setUploadProgress((event.loaded / event.total) * 100);
          },
          abortSignal: abortController.current.signal,
        });

        if (!uploadResponse.url) {
          throw new Error("Failed to get upload URL");
        }

        // Add the uploaded image to the form
        const currentImages = form.getValues("images") || [];
        form.setValue("images", [...currentImages, uploadResponse.url]);
        
        // Add to uploaded images state
        setUploadedImages(prev => [...prev, { url: uploadResponse.url, file }]);
        
        toast.success("Image uploaded successfully");
      } catch (error) {
        if (error instanceof ImageKitAbortError) {
          toast.error("Upload was cancelled");
        } else if (error instanceof ImageKitInvalidRequestError) {
          toast.error("Invalid upload request");
        } else if (error instanceof ImageKitUploadNetworkError) {
          toast.error("Network error during upload");
        } else if (error instanceof ImageKitServerError) {
          toast.error("Server error during upload");
        } else {
          toast.error("Failed to upload image");
        }
        console.error("Upload error:", error);
      }
    }
  };

  const removeImage = (imageUrl: string) => {
    setUploadedImages(prev => prev.filter(img => img.url !== imageUrl));
    const currentImages = form.getValues("images") || [];
    form.setValue("images", currentImages.filter(url => url !== imageUrl));
  };

  const handleSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      // Handle file uploads first
      if (uploadedImages.length > 0) {
        const formData = new FormData();
        uploadedImages.forEach((img) => {
          formData.append("image0", img.file);
        });

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadResult.error || "Failed to upload images");
        }

        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Failed to upload images");
        }
        
        // Replace temporary URLs with actual uploaded URLs
        data.images = data.images.map((url) => {
          const uploadedImage = uploadedImages.find((img) => img.url === url);
          if (uploadedImage) {
            return uploadResult.urls[uploadedImages.indexOf(uploadedImage)];
          }
          return url;
        });

        toast.success(uploadResult.message || "Images uploaded successfully");
      }

      // Prepare the request body
      const requestBody = initialData 
        ? { ...data, _id: initialData._id }
        : data;

      // Save product data
      const response = await fetch("/api/products", {
        method: initialData ? "PUT" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to save product");
      }

      if (!result.success) {
        throw new Error(result.error || "Failed to save product");
      }
      
      await onSubmit(result.data);
    onOpenChange(false);
    toast.success(initialData ? "Product updated successfully" : "Product added successfully");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(errorMessage);
      console.error("Error saving product:", error);
    }
  };

  const addImage = (imageUrl: string) => {
    const currentImages = form.getValues("images") || [];
    if (!currentImages.includes(imageUrl)) {
      form.setValue("images", [...currentImages, imageUrl]);
    }
  };

  const toggleSize = (size: string) => {
    const currentSizes = form.getValues("sizes") || [];
    if (currentSizes.includes(size)) {
      form.setValue("sizes", currentSizes.filter(s => s !== size));
    } else {
      form.setValue("sizes", [...currentSizes, size]);
    }
  };

  const toggleColor = (color: string) => {
    const currentColors = form.getValues("colors") || [];
    if (currentColors.includes(color)) {
      form.setValue("colors", currentColors.filter(c => c !== color));
    } else {
      form.setValue("colors", [...currentColors, color]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {initialData 
              ? "Make changes to the product here. Click save when you're done."
              : "Fill in the product details below to add a new product to your store."}
          </DialogDescription>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" min="0" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter product description" 
                      className="min-h-[100px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableCategories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="space-y-4">
              <FormLabel>Images</FormLabel>
              <div className="grid grid-cols-3 gap-4">
                {form.watch("images")?.map((image, index) => (
                  <div key={index} className="relative rounded-md overflow-hidden h-40">
                    <Image 
                      src={image} 
                      alt={`Product ${index}`} 
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(image)}
                      className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                {form.watch("images")?.length < 6 && (
                  <div className="space-y-2">
                    <div 
                      className="border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center h-40 cursor-pointer hover:border-[#4AA79F]"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="w-8 h-8 mb-2 text-gray-400" />
                      <p className="text-sm text-gray-500">Upload Image</p>
                      <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-[#4AA79F] h-2.5 rounded-full" 
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Sample Images</p>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                  {placeholderImages.map((image, index) => (
                    <div 
                      key={index}
                      className="relative cursor-pointer rounded-md overflow-hidden h-20"
                      onClick={() => addImage(image)}
                    >
                      <Image 
                        src={image} 
                        alt={`Sample ${index}`} 
                        fill
                        className="object-cover hover:opacity-80 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>
              {form.formState.errors.images && (
                <p className="text-sm text-red-500">{form.formState.errors.images.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <FormLabel>Sizes</FormLabel>
                <div className="mt-2 flex flex-wrap gap-2">
                  {availableSizes.map((size) => {
                    const isSelected = form.watch("sizes")?.includes(size);
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => toggleSize(size)}
                        className={`px-3 py-1 rounded-md text-sm ${
                          isSelected 
                          ? "bg-[#4AA79F] text-white" 
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                {form.formState.errors.sizes && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.sizes.message}</p>
                )}
              </div>
              
              <div>
                <FormLabel>Colors</FormLabel>
                <div className="mt-2 flex flex-wrap gap-2">
                  {availableColors.map((color) => {
                    const isSelected = form.watch("colors")?.includes(color);
                    return (
                      <Tooltip key={color}>
                        <TooltipTrigger asChild>
                          <button
                            type="button"
                            onClick={() => toggleColor(color)}
                            className={`px-3 py-1 rounded-md text-sm ${
                              isSelected 
                              ? "bg-[#4AA79F] text-white" 
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {color}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>{color}</span>
                        </TooltipContent>
                      </Tooltip>
                    );
                  })}
                </div>
                {form.formState.errors.colors && (
                  <p className="text-sm text-red-500 mt-1">{form.formState.errors.colors.message}</p>
                )}
              </div>
            </div>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
              <FormField
                control={form.control}
                name="inStock"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>In Stock</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Featured Product</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div>
            
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#4AA79F] hover:bg-[#4AA79F]/90">
                {initialData ? "Save Changes" : "Add Product"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductForm;
