import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { useState } from "react";

export const NavigationSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full ">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="top">
        <Logo />
        <NavMenu
          orientation="vertical"
          className="mx-auto"
          onSelect={() => setIsOpen(false)}
        />
      </SheetContent>
    </Sheet>
  );
};
