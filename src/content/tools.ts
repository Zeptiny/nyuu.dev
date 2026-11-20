import type { MarkName } from "@/content/marks";

type Tool = { mark?: MarkName; color: string };

/**
 * Every tool the page names, with its mark when Simple Icons has one and its brand's color, which a
 * tool's tag takes on under the pointer. The colors are Simple Icons' too, except Java's orange
 * (OpenJDK's is black) and the ones Simple Icons doesn't carry: Oracle, AWS, AWS S3, Zabbix, and
 * restic, which takes the raincoat yellow of its gopher.
 */
const tools = {
  Python: { mark: "python", color: "#3776AB" },
  Go: { color: "#00ADD8" },
  "C++": { mark: "cplusplus", color: "#00599C" },
  C: { mark: "c", color: "#A8B9CC" },
  Bash: { mark: "gnubash", color: "#4EAA25" },
  Java: { mark: "openjdk", color: "#ED8B00" },
  TypeScript: { color: "#3178C6" },
  Hetzner: { mark: "hetzner", color: "#D50C2D" },
  Scaleway: { mark: "scaleway", color: "#4F0599" },
  Oracle: { color: "#F80000" },
  DigitalOcean: { mark: "digitalocean", color: "#0080FF" },
  AWS: { color: "#FF9900" },
  "AWS S3": { color: "#569A31" },
  Docker: { mark: "docker", color: "#2496ED" },
  Kubernetes: { mark: "kubernetes", color: "#326CE5" },
  Linux: { color: "#FCC624" },
  PostgreSQL: { mark: "postgresql", color: "#4169E1" },
  MariaDB: { mark: "mariadb", color: "#003545" },
  MySQL: { mark: "mysql", color: "#4479A1" },
  Zabbix: { color: "#D40000" },
  Prometheus: { mark: "prometheus", color: "#E6522C" },
  Grafana: { mark: "grafana", color: "#F46800" },
  Ansible: { mark: "ansible", color: "#EE0000" },
  FastAPI: { color: "#009688" },
  React: { color: "#61DAFB" },
  rclone: { color: "#3F79AD" },
  restic: { color: "#F8E868" },
} satisfies Record<string, Tool>;

export type ToolName = keyof typeof tools;
export const TOOLS: Record<ToolName, Tool> = tools;
