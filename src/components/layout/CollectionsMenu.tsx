
import React from "react";
import Link from "next/link";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const CollectionsMenu = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-fashion-primary/80 hover:text-fashion-primary">
            Collections
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <Link
                href="/womens-collection"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-fashion-light hover:text-fashion-primary focus:bg-fashion-light focus:text-fashion-primary"
              >
                <div className="text-sm font-medium leading-none">Women</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Explore elegant designs for every occasion
                </p>
              </Link>
              <Link
                href="/mens-collection"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-fashion-light hover:text-fashion-primary focus:bg-fashion-light focus:text-fashion-primary"
              >
                <div className="text-sm font-medium leading-none">Men</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Premium selection of men's clothing and accessories
                </p>
              </Link>
              <Link
                href="/accessories-collection"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-fashion-light hover:text-fashion-primary focus:bg-fashion-light focus:text-fashion-primary"
              >
                <div className="text-sm font-medium leading-none">Accessories</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Complete your look with stylish accessories
                </p>
              </Link>
              <Link
                href="/new-arrivals"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-fashion-light hover:text-fashion-primary focus:bg-fashion-light focus:text-fashion-primary"
              >
                <div className="text-sm font-medium leading-none">New Arrivals</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  The latest fashion trends and designs
                </p>
              </Link>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CollectionsMenu;
