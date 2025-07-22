import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [caption, setCaption] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const url = URL.createObjectURL(selectedFile);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!caption || !content || !file) {
    //   toast.error("All fields including file are required.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("content", content);
    formData.append("file", file);

    try {

      const res = await axios.post(
        "http://localhost:3000/api/v1/posts/post/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/explore")
        setCaption("");
        setContent("");
        setFile(null);
        setPreview("");
      }

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Create a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="caption">Caption</Label>
            <Input
              id="caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Write a caption..."
            />
          </div>

          <div>
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              rows={4}
            />
          </div>

          <div>
            <Label htmlFor="file">Upload Image or Video</Label>
            <Input
              id="file"
              type="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          {preview && (
            <div className="mt-2">
              {file?.type.startsWith("image") ? (
                <img src={preview} alt="Preview" className="rounded-xl w-full" />
              ) : (
                <video controls src={preview} className="rounded-xl w-full" />
              )}
            </div>
          )}

          <Button type="submit" className="w-full cursor-pointer">
            Post
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
