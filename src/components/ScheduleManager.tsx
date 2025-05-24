
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Calendar, Plus, Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ScheduleManagerProps {
  onBack: () => void;
}

interface ScheduleItem {
  id: string;
  title: string;
  date: string;
  time: string;
  description: string;
}

const ScheduleManager = ({ onBack }: ScheduleManagerProps) => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: "1",
      title: "团队例会",
      date: "2024-05-25",
      time: "09:00",
      description: "讨论本周工作进展和下周计划"
    },
    {
      id: "2",
      title: "项目评审",
      date: "2024-05-26",
      time: "14:30",
      description: "AI项目第一阶段成果展示"
    }
  ]);

  const [newSchedule, setNewSchedule] = useState({
    title: "",
    date: "",
    time: "",
    description: ""
  });

  const [showAddForm, setShowAddForm] = useState(false);

  const addSchedule = () => {
    if (!newSchedule.title || !newSchedule.date || !newSchedule.time) {
      toast.error("请填写完整的日程信息");
      return;
    }

    const schedule: ScheduleItem = {
      id: Date.now().toString(),
      ...newSchedule
    };

    setSchedules(prev => [...prev, schedule]);
    setNewSchedule({ title: "", date: "", time: "", description: "" });
    setShowAddForm(false);
    toast.success("日程添加成功！");
  };

  const deleteSchedule = (id: string) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== id));
    toast.success("日程删除成功！");
  };

  const getTodaySchedules = () => {
    const today = new Date().toISOString().split('T')[0];
    return schedules.filter(schedule => schedule.date === today);
  };

  const getUpcomingSchedules = () => {
    const today = new Date().toISOString().split('T')[0];
    return schedules.filter(schedule => schedule.date > today);
  };

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-4xl mx-auto">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="text-white hover:bg-white/10 mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Schedule */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                今日日程
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getTodaySchedules().length > 0 ? (
                <div className="space-y-3">
                  {getTodaySchedules().map((schedule) => (
                    <div key={schedule.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-medium">{schedule.title}</h4>
                          <p className="text-blue-200 text-sm">{schedule.time}</p>
                          {schedule.description && (
                            <p className="text-blue-300 text-xs mt-1">{schedule.description}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSchedule(schedule.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-blue-200 text-center py-4">今日暂无安排</p>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Schedule */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                即将到来
              </CardTitle>
            </CardHeader>
            <CardContent>
              {getUpcomingSchedules().length > 0 ? (
                <div className="space-y-3">
                  {getUpcomingSchedules().map((schedule) => (
                    <div key={schedule.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-medium">{schedule.title}</h4>
                          <p className="text-blue-200 text-sm">{schedule.date} {schedule.time}</p>
                          {schedule.description && (
                            <p className="text-blue-300 text-xs mt-1">{schedule.description}</p>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteSchedule(schedule.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-blue-200 text-center py-4">暂无upcoming安排</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Add Schedule */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mt-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              <span className="flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                添加日程
              </span>
              <Button
                onClick={() => setShowAddForm(!showAddForm)}
                variant="outline"
                size="sm"
                className="border-white/30 text-white hover:bg-white/10"
              >
                {showAddForm ? "取消" : "新建"}
              </Button>
            </CardTitle>
          </CardHeader>
          {showAddForm && (
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  placeholder="日程标题"
                  value={newSchedule.title}
                  onChange={(e) => setNewSchedule(prev => ({ ...prev, title: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                />
                <Input
                  type="date"
                  value={newSchedule.date}
                  onChange={(e) => setNewSchedule(prev => ({ ...prev, date: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white"
                />
                <Input
                  type="time"
                  value={newSchedule.time}
                  onChange={(e) => setNewSchedule(prev => ({ ...prev, time: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white"
                />
                <Input
                  placeholder="描述 (可选)"
                  value={newSchedule.description}
                  onChange={(e) => setNewSchedule(prev => ({ ...prev, description: e.target.value }))}
                  className="bg-white/10 border-white/20 text-white placeholder:text-blue-300"
                />
              </div>
              <Button
                onClick={addSchedule}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white w-full"
              >
                添加日程
              </Button>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  );
};

export default ScheduleManager;
