import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

//Resux
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import type { RootState } from "@/store/store";
import TaskService from "@/services/task.service";
import toast from "react-hot-toast";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: string;
  dueDate: string;
}

export default function TaskPage() {
  const currentUser = useSelector((state: RootState) => state.user.currentUser);
  const [taskData, setTaskData] = useState<Task[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!currentUser) return;
      setLoading(true);

      try {
        const data = await TaskService.getTask();
        // console.log(" API 有回應：", data);
        setTaskData(data.taskFound);
      } catch (err) {
        console.error(" API 失敗：", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [currentUser]);

  const handleDelete = async (taskId: string) => {
    try {
      setDeletingId(taskId);
      await TaskService.delete(taskId);
      setTaskData((prev) => prev.filter((task) => task._id !== taskId));
      toast.success("刪除成功");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "刪除失敗，請稍後再試");
      console.log(err);
    } finally {
      setDeletingId(null);
    }
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-lg">在獲取您的個人資料之前，您必須先登入。</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-lg">載入中...</p>
      </div>
    );
  }

  if (taskData.length === 0) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="text-lg text-muted-foreground">目前沒有任務。</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted pt-22">
      {taskData.length > 0 &&
        taskData.map((task) => (
          <Card
            className="mx-10 bg-gray-50 border rounded-xl shadow-sm my-4 relative"
            key={task._id}
          >
            <CardHeader>
              <CardTitle className="text-gray-900 font-semibold text-4xl  break-all">
                {task.title}
              </CardTitle>
            </CardHeader>

            <CardContent className="text-gray-600 whitespace-pre-line break-words">
              {task.description}
            </CardContent>

            <Badge
              variant="outline"
              className={`absolute top-2 right-2  ${
                task.status === "todo" && "bg-blue-500 text-white"
              }
                ${task.status === "inProgress" && "bg-red-500 text-white"}`}
            >
              {task.status === "todo"
                ? "代辦中"
                : task.status === "inProgress" && "進行中"}
            </Badge>

            <CardContent className="text-red-600">
              截止日期 : {task.dueDate}
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button
                onClick={() => handleDelete(task._id)}
                disabled={deletingId === task._id}
              >
                {deletingId === task._id ? "刪除中..." : "完成/刪除"}
              </Button>
            </CardFooter>
          </Card>
        ))}
    </div>
  );
}
