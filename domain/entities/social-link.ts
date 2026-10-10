export type SocialPlatform =
  "instagram" | "facebook" | "tiktok" | "youtube" | "x" | "whatsapp";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  url: string;
  active: boolean;
}
