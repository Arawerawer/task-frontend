import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthService from "@/services/auth.service";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
//Redux
import { useDispatch } from "react-redux";
import { setCurrentUser } from "@/store/userSlice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await AuthService.login(email, password);
      //console.log(response);

      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch(setCurrentUser(AuthService.getCurrentUser()));
      toast.success("登入成功！即將前往事項頁面", { duration: 3000 });
      navigate("/task");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "登入失敗，請稍後再試");
      console.error("登入失敗:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-sm">
        <p className="mt-4 text-xl font-bold tracking-tight">登入</p>

        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">信箱</label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm mb-1">密碼</label>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <Button type="submit" className="mt-4 w-full">
            登入
          </Button>
        </form>

        <p className="mt-5 text-sm text-center">
          沒有帳號？
          <Link to="/register" className="ml-1 underline text-muted-foreground">
            註冊
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
