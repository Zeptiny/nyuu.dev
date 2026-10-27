import type { Dictionary } from "@/i18n/dictionaries";

export type ServiceId = keyof Dictionary["services"]["items"];

/**
 * The services, in order, each with the tool in its screenshot. The screenshots are taken in both
 * themes: public/services/{shot}-light.webp and -dark.webp. The text is in the locales.
 */
export const SERVICES: readonly { id: ServiceId; tool: string; shot: string }[] = [
  { id: "hosting", tool: "Proxmox VE", shot: "proxmox" },
  { id: "setup", tool: "Grafana", shot: "grafana" },
  { id: "backups", tool: "BorgBase", shot: "borgbase" },
  { id: "custom", tool: "Terminal", shot: "terminal" },
];
