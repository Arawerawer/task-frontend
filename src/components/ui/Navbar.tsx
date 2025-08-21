import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { NavMenu } from "@/components/ui/nav-menu";
import { NavigationSheet } from "@/components/ui/navigation-sheet";
import { Link } from "react-router-dom";
//redux
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/store/userSlice";
//api
import AuthService from "@/services/auth.service";
import toast from "react-hot-toast";

const Navbar = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.user.currentUser);

  const handleLogout = () => {
    AuthService.logout();
    dispatch(setCurrentUser(null));
    toast.success("登出成功!現在您會被導向到首頁！");
  };

  return (
    <nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full z-10">
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          {!currentUser && (
            <Link to="/login">
              <Button
                variant="outline"
                className="hidden sm:inline-flex rounded-full"
              >
                登入
              </Button>
            </Link>
          )}

          {!currentUser && (
            <Link to="/register">
              <Button className="rounded-full">註冊</Button>
            </Link>
          )}

          {currentUser && (
            <Link to="/">
              <Button className="rounded-full" onClick={handleLogout}>
                登出
              </Button>
            </Link>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
