import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { type ComponentPropsWithoutRef } from "react";
import { Link } from "react-router-dom";
//Redux
import { useSelector } from "react-redux";

type NavMenuBaseProps = {
  onSelect?: () => void;
};

type NavMenuProps = ComponentPropsWithoutRef<typeof NavigationMenu> &
  NavMenuBaseProps;

export const NavMenu = ({ onSelect, ...props }: NavMenuProps) => {
  const currentUser = useSelector((state: any) => state.user.currentUser);

  return (
    <NavigationMenu {...props}>
      <NavigationMenuList className=" gap-6 space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-center w-full">
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Link to="/" onClick={onSelect}>
              首頁
            </Link>
          </NavigationMenuLink>
        </NavigationMenuItem>

        {currentUser && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/task" onClick={onSelect}>
                事項
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}

        {currentUser && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link to="/create" onClick={onSelect}>
                新增事項
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};
