import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between px-8 py-20 bg-gradient-to-br from-blue-50 via-indigo-100 to-blue-200 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 overflow-hidden">
      {/* Decorative Gradient Circles */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-200 dark:bg-blue-900 rounded-full opacity-30 blur-3xl z-0" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-200 dark:bg-indigo-900 rounded-full opacity-30 blur-3xl z-0" />

      <div className="relative z-10 max-w-xl space-y-8">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-8 h-8 text-blue-500 animate-pulse" />
          <span className="uppercase tracking-widest text-xs font-semibold text-blue-600 dark:text-blue-400">
            Next-Gen Automation
          </span>
        </div>
        <h2 className="text-5xl font-extrabold text-gray-900 dark:text-white leading-tight drop-shadow-sm">
          Automate Your <span className="text-blue-600 dark:text-blue-400">Social Media</span>
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300">
          Effortlessly schedule posts, manage all your platforms, and track your performance — all in one beautiful dashboard.
        </p>
        <div className="flex gap-4 mt-6">
          <Link to="/register">
            <Button size="lg" className="cursor-pointer rounded-full px-8 text-lg shadow-lg">
              Start for Free
            </Button>
          </Link>
          <Link to="/explore">
            <Button variant="outline" size="lg" className="cursor-pointer rounded-full px-8 text-lg border-blue-400 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-800">
              Explore Features
            </Button>
          </Link>
        </div>
      </div>
      <div className="relative z-10 mt-12 md:mt-0">
        <div className="rounded-3xl shadow-2xl overflow-hidden border-4 border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900">
          <img
            src="https://i.pinimg.com/originals/18/5c/55/185c5506f1652e7f7462a0ca0c31f8fc.jpg"
            alt="Dashboard preview"
            className="w-[420px] h-[320px] object-cover"
          />
        </div>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white dark:bg-gray-800 px-6 py-2 rounded-full shadow-md flex items-center gap-2 border border-blue-100 dark:border-blue-700">
          <Sparkles className="w-5 h-5 text-yellow-400 animate-spin" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-200">AI-powered Scheduling</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;