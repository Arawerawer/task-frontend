import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthService from "@/services/auth.service";

import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await AuthService.register(username, email, password);
      toast.success("註冊成功！即將前往登入頁面");
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "註冊失敗，請稍後再試");
      console.error("註冊失敗:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-sm w-full flex flex-col items-center border rounded-lg p-6 shadow-sm">
        <p className="mt-4 text-xl font-bold tracking-tight">註冊</p>

        <form className="w-full space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">姓名</label>
            <Input
              placeholder="Your name"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

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
            註冊
          </Button>
        </form>

        <p className="mt-5 text-sm text-center">
          已經有帳號了嗎？
          <Link to="/login" className="ml-1 underline text-muted-foreground">
            登入
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
