// This file is auto-generated during build
// It contains all blog posts data to be used in Cloudflare Workers
import type { BlogPost } from './blog';

export const blogPostsData: Record<string, BlogPost[]> = {
  "en": [
    {
      "slug": "2025-01-20-docker-best-practices",
      "title": "Docker Best Practices for Production",
      "date": "2025-01-20",
      "author": "Nyuu",
      "description": "Learn essential Docker best practices to build secure, efficient, and maintainable container images",
      "tags": [
        "docker",
        "containers",
        "devops",
        "best-practices"
      ],
      "language": "en",
      "published": true,
      "image": "/blog/docker-practices.webp",
      "readingTime": 3
    },
    {
      "slug": "2025-01-15-getting-started-with-kubernetes",
      "title": "Getting Started with Kubernetes",
      "date": "2025-01-15",
      "author": "Nyuu",
      "description": "A beginner's guide to understanding and deploying your first Kubernetes cluster",
      "tags": [
        "kubernetes",
        "devops",
        "containers",
        "tutorial"
      ],
      "language": "en",
      "published": true,
      "image": "/blog/kubernetes-intro.webp",
      "readingTime": 2
    }
  ],
  "pt": [
    {
      "slug": "2025-01-15-comecando-com-kubernetes",
      "title": "Começando com Kubernetes",
      "date": "2025-01-15",
      "author": "Nyuu",
      "description": "Um guia para iniciantes para entender e implantar seu primeiro cluster Kubernetes",
      "tags": [
        "kubernetes",
        "devops",
        "containers",
        "tutorial"
      ],
      "language": "pt",
      "published": true,
      "image": "/blog/kubernetes-intro.webp",
      "readingTime": 2
    }
  ],
  "ca": [
    {
      "slug": "2025-01-15-començant-amb-kubernetes",
      "title": "Començant amb Kubernetes",
      "date": "2025-01-15",
      "author": "Nyuu",
      "description": "Una guia per a principiants per entendre i desplegar el teu primer clúster Kubernetes",
      "tags": [
        "kubernetes",
        "devops",
        "containers",
        "tutorial"
      ],
      "language": "ca",
      "published": true,
      "image": "/blog/kubernetes-intro.webp",
      "readingTime": 2
    }
  ]
};

export const blogPostsContent: Record<string, Record<string, string>> = {
  "en": {
    "2025-01-15-getting-started-with-kubernetes": "<h1>Getting Started with Kubernetes</h1>\n<p>Kubernetes has become the de facto standard for container orchestration. In this guide, we'll explore the fundamentals and deploy your first cluster.</p>\n<h2>What is Kubernetes?</h2>\n<p>Kubernetes (K8s) is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. Originally developed by Google, it's now maintained by the Cloud Native Computing Foundation (CNCF).</p>\n<h3>Key Concepts</h3>\n<p>Before diving in, let's understand some core concepts:</p>\n<ol>\n<li><strong>Pods</strong> - The smallest deployable units in Kubernetes</li>\n<li><strong>Services</strong> - Abstract way to expose applications</li>\n<li><strong>Deployments</strong> - Declarative updates for Pods</li>\n<li><strong>Namespaces</strong> - Virtual clusters within a physical cluster</li>\n</ol>\n<h2>Setting Up Your First Cluster</h2>\n<p>Let's start with a local development cluster using kind (Kubernetes in Docker):</p>\n<pre><code class=\"language-bash\"># Install kind\ncurl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64\nchmod +x ./kind\nsudo mv ./kind /usr/local/bin/kind\n\n# Create a cluster\nkind create cluster --name my-cluster\n\n# Verify the cluster\nkubectl cluster-info --context kind-my-cluster\n</code></pre>\n<h2>Deploying Your First Application</h2>\n<p>Now let's deploy a simple nginx application:</p>\n<pre><code class=\"language-yaml\">apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.14.2\n        ports:\n        - containerPort: 80\n</code></pre>\n<p>Apply the deployment:</p>\n<pre><code class=\"language-bash\">kubectl apply -f nginx-deployment.yaml\nkubectl get pods\n</code></pre>\n<h2>Exposing Your Application</h2>\n<p>Create a service to expose your deployment:</p>\n<pre><code class=\"language-yaml\">apiVersion: v1\nkind: Service\nmetadata:\n  name: nginx-service\nspec:\n  selector:\n    app: nginx\n  ports:\n    - protocol: TCP\n      port: 80\n      targetPort: 80\n  type: LoadBalancer\n</code></pre>\n<h2>Next Steps</h2>\n<p>Now that you have a basic understanding of Kubernetes, consider exploring:</p>\n<ul>\n<li><strong>Helm</strong> - Package manager for Kubernetes</li>\n<li><strong>Ingress Controllers</strong> - For advanced routing</li>\n<li><strong>Persistent Volumes</strong> - For stateful applications</li>\n<li><strong>ConfigMaps &#x26; Secrets</strong> - For configuration management</li>\n</ul>\n<h2>Conclusion</h2>\n<p>Kubernetes might seem complex at first, but with practice, it becomes an invaluable tool for managing containerized applications at scale. Start small, experiment, and gradually build your knowledge.</p>\n<p>Happy clustering! 🚀</p>\n",
    "2025-01-20-docker-best-practices": "<h1>Docker Best Practices for Production</h1>\n<p>Building Docker images for production requires careful consideration of security, performance, and maintainability. Let's explore the best practices that will help you create production-ready containers.</p>\n<h2>Use Official Base Images</h2>\n<p>Always start with official images from trusted sources:</p>\n<pre><code class=\"language-dockerfile\"># Good\nFROM node:20-alpine\n\n# Avoid\nFROM some-random-user/node\n</code></pre>\n<p>Alpine-based images are smaller and contain fewer vulnerabilities, making them ideal for production.</p>\n<h2>Multi-Stage Builds</h2>\n<p>Multi-stage builds help reduce image size by separating build dependencies from runtime dependencies:</p>\n<pre><code class=\"language-dockerfile\"># Build stage\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# Production stage\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nCOPY package*.json ./\nEXPOSE 3000\nCMD [\"node\", \"dist/index.js\"]\n</code></pre>\n<h2>Minimize Layers</h2>\n<p>Each instruction in a Dockerfile creates a layer. Combine related commands to reduce layers:</p>\n<pre><code class=\"language-dockerfile\"># Less efficient\nRUN apt-get update\nRUN apt-get install -y curl\nRUN apt-get install -y git\n\n# Better\nRUN apt-get update &#x26;&#x26; apt-get install -y \\\n    curl \\\n    git \\\n    &#x26;&#x26; rm -rf /var/lib/apt/lists/*\n</code></pre>\n<h2>Use .dockerignore</h2>\n<p>Just like <code>.gitignore</code>, use <code>.dockerignore</code> to exclude unnecessary files:</p>\n<pre><code>node_modules\nnpm-debug.log\n.git\n.gitignore\nREADME.md\n.env\n.DS_Store\n</code></pre>\n<h2>Don't Run as Root</h2>\n<p>Running containers as root is a security risk. Create a non-privileged user:</p>\n<pre><code class=\"language-dockerfile\">FROM node:20-alpine\n\n# Create app user\nRUN addgroup -g 1001 -S appuser &#x26;&#x26; \\\n    adduser -S appuser -u 1001\n\nWORKDIR /app\nCOPY --chown=appuser:appuser . .\n\nUSER appuser\n\nCMD [\"node\", \"index.js\"]\n</code></pre>\n<h2>Use Specific Tags</h2>\n<p>Never use <code>latest</code> tag in production. Pin specific versions:</p>\n<pre><code class=\"language-dockerfile\"># Avoid\nFROM node:latest\n\n# Better\nFROM node:20.10.0-alpine3.19\n</code></pre>\n<h2>Scan for Vulnerabilities</h2>\n<p>Regularly scan your images for security vulnerabilities:</p>\n<pre><code class=\"language-bash\"># Using Docker Scout\ndocker scout cves my-image:tag\n\n# Using Trivy\ntrivy image my-image:tag\n</code></pre>\n<h2>Optimize Layer Caching</h2>\n<p>Order your Dockerfile instructions from least to most frequently changing:</p>\n<pre><code class=\"language-dockerfile\">FROM node:20-alpine\n\nWORKDIR /app\n\n# Dependencies change less frequently\nCOPY package*.json ./\nRUN npm ci --only=production\n\n# Source code changes more frequently\nCOPY . .\n\nCMD [\"node\", \"index.js\"]\n</code></pre>\n<h2>Health Checks</h2>\n<p>Implement health checks to ensure your container is running correctly:</p>\n<pre><code class=\"language-dockerfile\">HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\\n  CMD node healthcheck.js || exit 1\n</code></pre>\n<h2>Use Build Arguments and Environment Variables Wisely</h2>\n<pre><code class=\"language-dockerfile\">ARG NODE_ENV=production\nENV NODE_ENV=$NODE_ENV\n\n# Sensitive data should come from runtime environment\nENV DATABASE_URL=${DATABASE_URL}\n</code></pre>\n<h2>Conclusion</h2>\n<p>Following these Docker best practices will help you build secure, efficient, and maintainable container images. Remember:</p>\n<ul>\n<li>Keep images small</li>\n<li>Minimize attack surface</li>\n<li>Use multi-stage builds</li>\n<li>Never run as root</li>\n<li>Pin specific versions</li>\n<li>Scan regularly for vulnerabilities</li>\n</ul>\n<p>Happy containerizing! 🐳</p>\n"
  },
  "pt": {
    "2025-01-15-comecando-com-kubernetes": "<h1>Começando com Kubernetes</h1>\n<p>Kubernetes tornou-se o padrão de fato para orquestração de contêineres. Neste guia, vamos explorar os fundamentos e implantar seu primeiro cluster.</p>\n<h2>O que é Kubernetes?</h2>\n<p>Kubernetes (K8s) é uma plataforma de orquestração de contêineres de código aberto que automatiza a implantação, dimensionamento e gerenciamento de aplicações em contêineres. Originalmente desenvolvido pelo Google, agora é mantido pela Cloud Native Computing Foundation (CNCF).</p>\n<h3>Conceitos Principais</h3>\n<p>Antes de mergulhar, vamos entender alguns conceitos fundamentais:</p>\n<ol>\n<li><strong>Pods</strong> - As menores unidades implantáveis no Kubernetes</li>\n<li><strong>Services</strong> - Forma abstrata de expor aplicações</li>\n<li><strong>Deployments</strong> - Atualizações declarativas para Pods</li>\n<li><strong>Namespaces</strong> - Clusters virtuais dentro de um cluster físico</li>\n</ol>\n<h2>Configurando Seu Primeiro Cluster</h2>\n<p>Vamos começar com um cluster de desenvolvimento local usando kind (Kubernetes in Docker):</p>\n<pre><code class=\"language-bash\"># Instalar kind\ncurl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64\nchmod +x ./kind\nsudo mv ./kind /usr/local/bin/kind\n\n# Criar um cluster\nkind create cluster --name my-cluster\n\n# Verificar o cluster\nkubectl cluster-info --context kind-my-cluster\n</code></pre>\n<h2>Implantando Sua Primeira Aplicação</h2>\n<p>Agora vamos implantar uma aplicação nginx simples:</p>\n<pre><code class=\"language-yaml\">apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.14.2\n        ports:\n        - containerPort: 80\n</code></pre>\n<p>Aplicar o deployment:</p>\n<pre><code class=\"language-bash\">kubectl apply -f nginx-deployment.yaml\nkubectl get pods\n</code></pre>\n<h2>Expondo Sua Aplicação</h2>\n<p>Crie um service para expor seu deployment:</p>\n<pre><code class=\"language-yaml\">apiVersion: v1\nkind: Service\nmetadata:\n  name: nginx-service\nspec:\n  selector:\n    app: nginx\n  ports:\n    - protocol: TCP\n      port: 80\n      targetPort: 80\n  type: LoadBalancer\n</code></pre>\n<h2>Próximos Passos</h2>\n<p>Agora que você tem uma compreensão básica do Kubernetes, considere explorar:</p>\n<ul>\n<li><strong>Helm</strong> - Gerenciador de pacotes para Kubernetes</li>\n<li><strong>Ingress Controllers</strong> - Para roteamento avançado</li>\n<li><strong>Persistent Volumes</strong> - Para aplicações stateful</li>\n<li><strong>ConfigMaps &#x26; Secrets</strong> - Para gerenciamento de configuração</li>\n</ul>\n<h2>Conclusão</h2>\n<p>Kubernetes pode parecer complexo no início, mas com prática, torna-se uma ferramenta inestimável para gerenciar aplicações em contêineres em escala. Comece pequeno, experimente e gradualmente construa seu conhecimento.</p>\n<p>Feliz clustering! 🚀</p>\n"
  },
  "ca": {
    "2025-01-15-començant-amb-kubernetes": "<h1>Començant amb Kubernetes</h1>\n<p>Kubernetes s'ha convertit en l'estàndard de facto per a l'orquestració de contenidors. En aquesta guia, explorarem els fonaments i desplegarem el teu primer clúster.</p>\n<h2>Què és Kubernetes?</h2>\n<p>Kubernetes (K8s) és una plataforma d'orquestració de contenidors de codi obert que automatitza el desplegament, escalat i gestió d'aplicacions en contenidors. Originalment desenvolupat per Google, ara és mantingut per la Cloud Native Computing Foundation (CNCF).</p>\n<h3>Conceptes Clau</h3>\n<p>Abans d'endinsar-nos, entenguem alguns conceptes fonamentals:</p>\n<ol>\n<li><strong>Pods</strong> - Les unitats més petites desplegables a Kubernetes</li>\n<li><strong>Services</strong> - Forma abstracta d'exposar aplicacions</li>\n<li><strong>Deployments</strong> - Actualitzacions declaratives per a Pods</li>\n<li><strong>Namespaces</strong> - Clústers virtuals dins d'un clúster físic</li>\n</ol>\n<h2>Configurant el Teu Primer Clúster</h2>\n<p>Comencem amb un clúster de desenvolupament local utilitzant kind (Kubernetes in Docker):</p>\n<pre><code class=\"language-bash\"># Instal·lar kind\ncurl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64\nchmod +x ./kind\nsudo mv ./kind /usr/local/bin/kind\n\n# Crear un clúster\nkind create cluster --name my-cluster\n\n# Verificar el clúster\nkubectl cluster-info --context kind-my-cluster\n</code></pre>\n<h2>Desplegant la Teva Primera Aplicació</h2>\n<p>Ara desplegarem una aplicació nginx senzilla:</p>\n<pre><code class=\"language-yaml\">apiVersion: apps/v1\nkind: Deployment\nmetadata:\n  name: nginx-deployment\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: nginx\n  template:\n    metadata:\n      labels:\n        app: nginx\n    spec:\n      containers:\n      - name: nginx\n        image: nginx:1.14.2\n        ports:\n        - containerPort: 80\n</code></pre>\n<p>Aplicar el deployment:</p>\n<pre><code class=\"language-bash\">kubectl apply -f nginx-deployment.yaml\nkubectl get pods\n</code></pre>\n<h2>Exposant la Teva Aplicació</h2>\n<p>Crea un service per exposar el teu deployment:</p>\n<pre><code class=\"language-yaml\">apiVersion: v1\nkind: Service\nmetadata:\n  name: nginx-service\nspec:\n  selector:\n    app: nginx\n  ports:\n    - protocol: TCP\n      port: 80\n      targetPort: 80\n  type: LoadBalancer\n</code></pre>\n<h2>Propers Passos</h2>\n<p>Ara que tens una comprensió bàsica de Kubernetes, considera explorar:</p>\n<ul>\n<li><strong>Helm</strong> - Gestor de paquets per a Kubernetes</li>\n<li><strong>Ingress Controllers</strong> - Per a encaminament avançat</li>\n<li><strong>Persistent Volumes</strong> - Per a aplicacions stateful</li>\n<li><strong>ConfigMaps &#x26; Secrets</strong> - Per a gestió de configuració</li>\n</ul>\n<h2>Conclusió</h2>\n<p>Kubernetes pot semblar complex al principi, però amb pràctica, es converteix en una eina inestimable per gestionar aplicacions en contenidors a escala. Comença petit, experimenta i gradualment construeix el teu coneixement.</p>\n<p>Feliç clustering! 🚀</p>\n"
  }
};
