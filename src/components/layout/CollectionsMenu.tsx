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
                href="/mensthobas"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-fashion-light hover:text-fashion-primary focus:bg-fashion-light focus:text-fashion-primary"
              >
                <div className="text-sm font-medium leading-none">Mens Thobas</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Elegant and traditional mens thobas for every occasion
                </p>
              </Link>
              <Link
                href="/kidsthobas"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-fashion-light hover:text-fashion-primary focus:bg-fashion-light focus:text-fashion-primary"
              >
                <div className="text-sm font-medium leading-none">Kids Thobas</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Comfortable and stylish thobas for children
                </p>
              </Link>
              <Link
                href="/turbancaps"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-fashion-light hover:text-fashion-primary focus:bg-fashion-light focus:text-fashion-primary"
              >
                <div className="text-sm font-medium leading-none">Turban & Caps</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Traditional turbans and modern caps to complete your look
                </p>
              </Link>
              <Link
                href="/pajamas"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-fashion-light hover:text-fashion-primary focus:bg-fashion-light focus:text-fashion-primary"
              >
                <div className="text-sm font-medium leading-none">Pajamas</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Comfortable and stylish pajamas for all ages
                </p>
              </Link>
              {/* <Link
                href="/emarathi"
                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-fashion-light hover:text-fashion-primary focus:bg-fashion-light focus:text-fashion-primary"
              >
                <div className="text-sm font-medium leading-none">Emarathi</div>
                <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                  Traditional Emarathi designs and patterns
                </p>
              </Link> */}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default CollectionsMenu;
