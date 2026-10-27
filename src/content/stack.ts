import type { MarkName } from "@/content/marks";
import type { Dictionary } from "@/i18n/dictionaries";

type Category = keyof Dictionary["stack"]["categories"];

/** The tools, by category, each with its mark when Simple Icons has one. */
export const STACK: readonly {
  category: Category;
  items: readonly { name: string; mark?: MarkName }[];
}[] = [
  {
    category: "languages",
    items: [
      { name: "Python", mark: "python" },
      { name: "C++", mark: "cplusplus" },
      { name: "C", mark: "c" },
      { name: "Bash", mark: "gnubash" },
      { name: "Java", mark: "openjdk" },
    ],
  },
  {
    category: "cloud",
    items: [
      { name: "Hetzner", mark: "hetzner" },
      { name: "Scaleway", mark: "scaleway" },
      { name: "Oracle" },
      { name: "DigitalOcean", mark: "digitalocean" },
      { name: "AWS" },
    ],
  },
  {
    category: "containers",
    items: [
      { name: "Docker", mark: "docker" },
      { name: "Kubernetes", mark: "kubernetes" },
    ],
  },
  {
    category: "databases",
    items: [
      { name: "PostgreSQL", mark: "postgresql" },
      { name: "MariaDB", mark: "mariadb" },
      { name: "MySQL", mark: "mysql" },
      { name: "Oracle" },
    ],
  },
  {
    category: "monitoring",
    items: [
      { name: "Zabbix" },
      { name: "Prometheus", mark: "prometheus" },
      { name: "Grafana", mark: "grafana" },
    ],
  },
  {
    category: "iac",
    items: [{ name: "Ansible", mark: "ansible" }],
  },
];
