import { Twitter, Instagram, Facebook, Youtube } from "lucide-react";
import PlatformCard from "@/components/PlatformCard";
import { useTwitterAuth } from "./platforms/twitter/useTwitterAuth"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import useTwitterDisconnect from "./platforms/twitter/useTwitterDisconnect";

const PlatformContent = () => {
  const { connect } = useTwitterAuth();
  const { disconnect } = useTwitterDisconnect();
  const { user } = useSelector((state) => state.auth);

  const twitterPlatform = user?.platforms?.find(p => p.name === "twitter");
  const isTwitterConnected = !!twitterPlatform?.platformId && !!twitterPlatform?.accessToken;


  return (
    <div className="p-6 flex flex-col gap-6">
      <PlatformCard
        name="Twitter"
        description="Connect your Twitter account to schedule posts and track engagement."
        icon={<Twitter className="w-6 h-6" />}
        onConnect={connect}
        onDisconnect={disconnect}
        initialConnected={isTwitterConnected}
      />

      <PlatformCard
        name="Instagram"
        description="Coming soon"
        icon={<Instagram className="w-6 h-6 opacity-30" />}
        onConnect={async () => { }}
        onDisconnect={async () => { }}
        initialConnected={false}
      />

      <PlatformCard
        name="Facebook"
        description="Coming soon"
        icon={<Facebook className="w-6 h-6 opacity-30" />}
        onConnect={async () => { }}
        onDisconnect={async () => { }}
        initialConnected={false}
      />

      <PlatformCard
        name="Youtube"
        description="Coming soon"
        icon={<Youtube className="w-6 h-6 opacity-30" />}
        onConnect={async () => { }}
        onDisconnect={async () => { }}
        initialConnected={false}
      />
    </div>
  );
};

export default PlatformContent;
