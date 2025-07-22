// src/components/Features.jsx
import { Card, CardContent } from "@/components/ui/card";
import { Clock, BarChart, UploadCloud, CheckCircle } from "lucide-react";
import Navbar from "./Navbar";

const features = [
  {
    title: "Scheduled Posting",
    description: "Plan and schedule your content in advance across multiple platforms.",
    icon: <Clock className="h-6 w-6 text-blue-600" />,
  },
  {
    title: "Analytics Dashboard",
    description: "Track performance and engagement with real-time insights.",
    icon: <BarChart className="h-6 w-6 text-green-600" />,
  },
  {
    title: "Media Uploads",
    description: "Upload and attach images or videos to posts easily.",
    icon: <UploadCloud className="h-6 w-6 text-purple-600" />,
  },
  {
    title: "Status Tracking",
    description: "View delivery and publishing status for each platform.",
    icon: <CheckCircle className="h-6 w-6 text-teal-600" />,
  },
];

const Features = () => {
  return (
    <>
    
    <Navbar></Navbar>
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Core Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card key={idx} className="text-left hover:shadow-md transition">
              <CardContent className="p-4 flex gap-4 items-start">
                {feature.icon}
                <div>
                  <h3 className="font-semibold text-gray-700">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Features;
