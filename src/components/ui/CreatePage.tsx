import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

//Date
import { zhTW } from "date-fns/locale";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import TaskService from "@/services/task.service";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

//Resux
import { useSelector } from "react-redux";

export default function CreatePage() {
  const currentUser = useSelector((state: any) => state.user.currentUser);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await TaskService.post(title, description, status, dueDate);
      toast.success("事項創建成功");
      navigate("/task");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "創建失敗，請稍後再試");
      console.error("登入失敗:", err);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-lg">在創建事項之前，您必須先登入。</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-muted pt-22 ">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>創建事項</CardTitle>
          <CardDescription>請利用以下內容設定相關事項</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} id="myForm">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-3">
                <Label htmlFor="title">標題</Label>
                <Input
                  id="title"
                  placeholder="請填寫標題"
                  onChange={(e) => setTitle(e.target.value)}
                />
                <Label htmlFor="description">敘述</Label>
                <Input
                  id="description"
                  placeholder="請描述您的事項內容"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-3">
                <Label htmlFor="status">狀態</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full" id="status">
                    <SelectValue placeholder="選擇狀態" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="todo">代辦中</SelectItem>
                    <SelectItem value="inProgress">進行中</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex flex-col  mt-2">
                  <Label htmlFor="date" className="px-1 mb-2">
                    選擇截止日期
                  </Label>

                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild className="!w-full">
                      <Button
                        variant="outline"
                        id="date"
                        className="w-48 justify-between font-normal"
                      >
                        {date
                          ? format(date, "yyyy年MM月dd日", { locale: zhTW })
                          : "選擇日期"}
                        <ChevronDownIcon />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-auto overflow-hidden p-0"
                      align="start"
                    >
                      <Calendar
                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        onSelect={(date) => {
                          setDate(date);
                          setDueDate(date ? format(date, "yyyy-MM-dd") : "");
                          setOpen(false);
                        }}
                        locale={zhTW}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            type="submit"
            form="myForm"
            className="w-full"
            disabled={!title || !status || !date}
          >
            創建事項
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
