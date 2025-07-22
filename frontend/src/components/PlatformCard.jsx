import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

const PlatformCard = ({
  name,
  description,
  icon,
  onConnect,
  onDisconnect,
  initialConnected = false,
}) => {
  const [isConnected, setIsConnected] = useState(initialConnected);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  

  const { user } = useSelector((state) => state.auth);

  // const isReallyConnected = user.platforms.

  const handleConnect = async () => {
    setLoading(true);
    setError("");
    try {
      await onConnect();
      setIsConnected(true);
    } catch (err) {
      console.error(err);
      setError("Connection failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    setLoading(true);
    setError("");
    try {
      await onDisconnect(name.toLowerCase());
      setIsConnected(false);
    } catch (err) {
      console.error(err);
      setError("Disconnection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl rounded-2xl p-4">
      <CardContent className="flex items-start gap-4 p-0">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-[#1DA1F2] to-[#0d8ddb] flex items-center justify-center text-white">
          {icon}
        </div>

        <div className="flex-1 space-y-1">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
          <p className={cn("text-sm", isConnected ? "text-green-600" : "text-red-500")}>
            {isConnected ? "Connected" : "Not Connected"}
          </p>
          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex gap-2 mt-2">
            <Button
              onClick={handleConnect}
              disabled={isConnected || loading}
              size="sm"
              className="cursor-pointer"
            >
              {loading && !isConnected ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Connect"
              )}
            </Button>

            <Button
              onClick={handleDisconnect}
              disabled={!isConnected || loading}
              variant="destructive"
              size="sm"
              className="cursor-pointer"
            >
              {loading && isConnected ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                "Disconnect"
              )}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlatformCard;
