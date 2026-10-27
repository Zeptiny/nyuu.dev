import type { ToolName } from "@/content/tools";
import type { Dictionary } from "@/i18n/dictionaries";

type Category = keyof Dictionary["stack"]["categories"];

/** The tools, by category. Their marks and colors are in TOOLS. */
export const STACK: readonly { category: Category; items: readonly ToolName[] }[] = [
  { category: "languages", items: ["Python", "C++", "C", "Bash", "Java"] },
  { category: "cloud", items: ["Hetzner", "Scaleway", "Oracle", "DigitalOcean", "AWS"] },
  { category: "containers", items: ["Docker", "Kubernetes"] },
  { category: "databases", items: ["PostgreSQL", "MariaDB", "MySQL", "Oracle"] },
  { category: "monitoring", items: ["Zabbix", "Prometheus", "Grafana"] },
  { category: "iac", items: ["Ansible"] },
];
