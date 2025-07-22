// src/components/MediaModal.jsx
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const MediaModal = ({ open, onClose, mediaUrl }) => {
  const isVideo = mediaUrl?.endsWith(".mp4");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-background/80 backdrop-blur"
          >
            <X className="h-5 w-5" />
          </Button>

          {isVideo ? (
            <video
              src={mediaUrl}
              controls
              autoPlay
              className="w-full max-h-[80vh] object-contain"
            />
          ) : (
            <img
              src={mediaUrl}
              alt="Post Media"
              className="w-full max-h-[80vh] object-contain"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MediaModal;
