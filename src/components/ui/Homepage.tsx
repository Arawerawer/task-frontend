import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CirclePlay } from "lucide-react";
import { Link } from "react-router-dom";
//redux
import { useSelector } from "react-redux";

const HomePage = () => {
  const currentUser = useSelector((state: any) => state.user.currentUser);

  return (
    <div className="min-h-screen flex items-center justify-center px-6 ">
      <div className="text-center max-w-2xl">
        <Badge className="bg-gradient-to-br via-70% from-primary via-muted/30 to-primary rounded-full py-1 border-none">
          React19＋node.js(作者：李承澤)
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl md:leading-[1.2] font-bold">
          事項管理
        </h1>
        <p className="mt-6 text-[17px] md:text-lg">
          此專案採用前後端分離架構。 前端以 React 開發，並使用
          shadcn/ui、Axios、Redux。 後端以 Node.js 開發，並使用
          Zod、MongoDB、RESTful API、JWT、Express。
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          {!currentUser && (
            <Link to="/login">
              <Button size="lg" className="rounded-full text-base">
                登入 <ArrowUpRight className="!h-5 !w-5" />
              </Button>
            </Link>
          )}

          {!currentUser && (
            <Link to="/register">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-base shadow-none"
              >
                <CirclePlay className="!h-5 !w-5" /> 註冊
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
