import {
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";
import type { SocialPlatform } from "@/domain/entities";

const platformIcons: Record<SocialPlatform, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  tiktok: MessageCircle,
  youtube: Youtube,
  x: Twitter,
  whatsapp: MessageCircle,
};

export function SocialIcon({ platform }: { platform: SocialPlatform }) {
  const Icon = platformIcons[platform];
  return <Icon className="h-5 w-5" />;
}
