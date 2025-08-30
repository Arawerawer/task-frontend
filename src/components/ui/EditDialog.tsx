import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { zhTW } from "date-fns/locale";
import { format } from "date-fns";
import { ChevronDownIcon, Sprout } from "lucide-react";

import { useState } from "react";
import toast from "react-hot-toast";
import TaskService from "@/services/task.service";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

interface EditDialogProps {
  task: Task;
}

export default function EditDialog({ task }: EditDialogProps) {
  const [formData, setFormData] = useState({
    title: task.title,
    description: task.description,
    status: task.status,
    dueDate: task.dueDate,
  });

  const [submitting, setSubmitting] = useState(false);

  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    task.dueDate ? new Date(task.dueDate) : undefined
  );

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return; //  防止重複送出
    setSubmitting(true);
    try {
      const newTask = await TaskService.editTask(task._id, formData);
      console.log("task edited:", newTask);
      toast.success("事項更新成功");

      window.location.reload();
    } catch (err: any) {
      console.error("Error creating product:", err);
      toast.error(err.response?.data?.message || "更新失敗，請稍後再試");
    } finally {
      setSubmitting(false);
    }
  };

  const isDisabled =
    formData.title.trim() === "" ||
    formData.description.trim() === "" ||
    formData.status.trim() === "" ||
    formData.dueDate.trim() === "";

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className=" flex items-center gap-2">修改事項</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>更新事項</AlertDialogTitle>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit} id="myForm">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-3">
              <Label htmlFor="title">標題</Label>
              <Input
                id="title"
                placeholder="請填寫標題"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />

              <Label htmlFor="description">敘述</Label>
              <Textarea
                className="whitespace-normal break-words break-all"
                id="description"
                placeholder="請描述您的事項內容"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-3">
              <Label htmlFor="status">狀態</Label>
              <Select
                value={formData.status}
                onValueChange={(val) => handleChange("status", val)}
              >
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
                        handleChange(
                          "dueDate",
                          date ? format(date, "yyyy-MM-dd") : ""
                        );
                        setOpen(false);
                      }}
                      locale={zhTW}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <AlertDialogFooter className="mt-2">
            <AlertDialogCancel type="button">取消</AlertDialogCancel>
            <AlertDialogAction
              type="submit"
              disabled={submitting || isDisabled}
            >
              {submitting ? "修改中..." : "儲存修改"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
