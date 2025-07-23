import React from "react";
import { Sparkles, Hourglass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ComingSoon = ({ feature = "This feature" }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-950 rounded-3xl shadow-2xl p-10 transition-all">
      <div className="flex flex-col items-center gap-6 animate-fade-in-up">
        <div className="bg-indigo-200 dark:bg-gray-800 rounded-full p-6 shadow-lg">
          <Sparkles className="w-14 h-14 text-indigo-600 dark:text-indigo-400 animate-bounce-slow" />
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white text-center tracking-tight">
          {feature} is Coming Soon!
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center max-w-2xl leading-relaxed">
          We're building something amazing. Hang tight while we finish up the details!
        </p>

        <Button
          variant="outline"
          className="rounded-full px-6 py-3 cursor-pointer text-indigo-600 border-indigo-500 hover:bg-indigo-100 dark:hover:bg-gray-800 transition"
          onClick={() => navigate("/dashboard")}
        >
          <Hourglass className="mr-2 w-5 h-5 animate-spin" />
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default ComingSoon;
