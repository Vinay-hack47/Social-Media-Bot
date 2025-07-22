import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CalendarIcon, ImageIcon, VideoIcon } from "lucide-react";
import axios from "axios";
import { cn } from "@/lib/utils";

const platformIcons = {
  twitter: <svg className="w-5 h-5 text-[#1DA1F2]" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.47.69a4.3 4.3 0 0 0 1.88-2.37 8.59 8.59 0 0 1-2.72 1.04A4.28 4.28 0 0 0 16.11 4c-2.37 0-4.29 1.92-4.29 4.29 0 .34.04.67.11.99C7.69 9.13 4.07 7.38 1.64 4.7c-.37.64-.58 1.38-.58 2.17 0 1.5.76 2.82 1.92 3.6-.71-.02-1.38-.22-1.97-.54v.05c0 2.1 1.5 3.85 3.5 4.25-.36.1-.74.16-1.13.16-.28 0-.54-.03-.8-.08.54 1.7 2.1 2.94 3.95 2.97A8.6 8.6 0 0 1 2 19.54c-.32 0-.63-.02-.94-.06A12.13 12.13 0 0 0 8.29 21.5c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.18 8.18 0 0 0 22.46 6z" /></svg>,
  instagram: <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>,
  facebook: <svg className="w-5 h-5 text-blue-700" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 5 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.41c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.89h-2.34v6.99C18.34 21.13 22 17 22 12z" /></svg>,
  youtube: <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 24 24"><path d="M21.8 8.001a2.752 2.752 0 0 0-1.94-1.948C18.2 6 12 6 12 6s-6.2 0-7.86.053A2.752 2.752 0 0 0 2.2 8.001C2 9.66 2 12 2 12s0 2.34.2 3.999a2.752 2.752 0 0 0 1.94 1.948C5.8 18 12 18 12 18s6.2 0 7.86-.053a2.752 2.752 0 0 0 1.94-1.948C22 14.34 22 12 22 12s0-2.34-.2-3.999zM10 15.5v-7l6 3.5-6 3.5z" /></svg>,
};

const CreatePlatformPost = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Only show connected platforms
  const connectedPlatforms = [];
  // if (user?.twitter?.twitterId && user?.twitter?.accessToken) connectedPlatforms.push("twitter");
  const twitterPlatform = user?.platforms?.find(p => p.name === "twitter");
  if (twitterPlatform?.platformId && !!twitterPlatform?.accessToken) connectedPlatforms.push("twitter")
  // if (user?.instagram?.instagramId && user?.instagram?.accessToken) connectedPlatforms.push("instagram");
  // if (user?.facebook?.facebookId && user?.facebook?.accessToken) connectedPlatforms.push("facebook");
  // if (user?.youtube?.youtubeId && user?.youtube?.accessToken) connectedPlatforms.push("youtube");

  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [schedule, setSchedule] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(content);
  console.log(file);
  console.log(schedule);
  

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    if (selectedFile) {
      setPreview(URL.createObjectURL(selectedFile));
    } else {
      setPreview("");
    }
  };

  const handleScheduleChange = (e) => {
    setSchedule(e.target.value);
  };
  

  const handlePlatformToggle = (platform) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPlatforms.length === 0) {
      toast.error("Select at least one platform.");
      return;
    }
    if (!content && !file) {
      toast.error("Content or media is required.");
      return;
    }
    
    if (schedule) {
      const now = new Date();
      const scheduledDate = new Date(schedule);

      // Date validations (✅ keep these)
      const maxDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000);
      if (scheduledDate > maxDate) {
        toast.error("Schedule date must be within 5 days.");
        return;
      }
      if (scheduledDate < now) {
        toast.error("Schedule date must be in the future.");
        return;
      }

      try {
        const formData = new FormData();
        formData.append("content", content);
        formData.append("scheduledFor", schedule);
        formData.append("platforms", JSON.stringify(selectedPlatforms));
        if (file) formData.append("file", file);
        console.log(formData);
        

        const res = await axios.post(
          "http://localhost:3000/api/v1/schedule",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          console.log(res.data);
          
          toast.success(res.data.message || "Post scheduled successfully!");
          navigate("/dashboard");
        }

      } catch (err) {
        toast.error(
          err?.response?.data?.error ||
          err?.response?.data?.message ||
          "Failed to schedule post. Try again."
        );
      }

      return;
    }

    if (!selectedPlatforms.includes("twitter")) {
      toast.error("Only Twitter posting is implemented for now.");
      return;
    }
    setLoading(true);
    try {
      let res;
      if (file) {
        // Tweet with image
        const formData = new FormData();
        formData.append("caption", content);
        formData.append("content", content);
        formData.append("file", file);

        res = await axios.post(
          "http://localhost:3000/api/v1/twitter/tweet-with-image",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );
        if (res.data.success) {
          toast.success(res.data.message || "Tweet posted successfully!");
          navigate("/dashboard")
        }
      } else {
        // Simple tweet
        res = await axios.post(
          "http://localhost:3000/api/v1/twitter/post-tweet",
          { content },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        if (res.data.message) {
          toast.success(res.data.message || "Tweet posted successfully!");
          navigate("/dashboard")
        }
      }

    } catch (err) {
      toast.error(
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        "Failed to post. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-10 shadow-xl rounded-2xl">
      <CardHeader>
        <CardTitle>Create Post / Tweet</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Platform Selection */}
          <div>
            <Label className="mb-2 block">Select Platforms</Label>
            <ToggleGroup type="multiple" className="flex gap-3" value={selectedPlatforms}>
              {connectedPlatforms.length === 0 && (
                <span className="text-sm text-muted-foreground">No platforms connected.</span>
              )}
              {connectedPlatforms.map((platform) => (
                <ToggleGroupItem
                  key={platform}
                  value={platform}
                  aria-label={platform}
                  pressed={selectedPlatforms.includes(platform)}
                  onClick={() => handlePlatformToggle(platform)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors",
                    selectedPlatforms.includes(platform)
                      ? "bg-blue-100 dark:bg-blue-900 border-blue-500 text-blue-700 dark:text-blue-300"
                      : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800"
                  )}
                >
                  {platformIcons[platform]}
                  <span className="capitalize">{platform}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Content Input */}
          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={4}
              className="resize-none"
            />
          </div>

          {/* Media Upload */}
          <div>
            <Label htmlFor="file">Upload Image or Video</Label>
            <Input
              id="file"
              type="file"
              name="file"
              accept="image/*,video/*"
              onChange={handleFileChange}
            />
            {preview && (
              <div className="mt-2">
                {file?.type?.startsWith("image") ? (
                  <img src={preview} alt="Preview" className="rounded-xl w-full max-h-60 object-contain" />
                ) : (
                  <video controls src={preview} className="rounded-xl w-full max-h-60 object-contain" />
                )}
              </div>
            )}
          </div>

          {/* Schedule Picker */}
          <div>
            <Label htmlFor="schedule">Schedule (optional)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="schedule"
                type="datetime-local"
                value={schedule}
                onChange={handleScheduleChange}
                min={new Date().toISOString().slice(0, 16)}
                max={(() => {
                  const maxDate = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000);
                  return maxDate.toISOString().slice(0, 16);
                })()}
                className="w-full"
              />
              <CalendarIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <span className="text-xs text-muted-foreground">Leave empty to post immediately.</span>
          </div>

          <Button type="submit" className="w-full cursor-pointer" disabled={loading || connectedPlatforms.length === 0}>
            {loading ? "Posting..." : schedule ? "Schedule Post" : "Post Now"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePlatformPost;
