---
title: "Começando com Kubernetes"
date: "2025-01-15"
author: "Nyuu"
description: "Um guia para iniciantes para entender e implantar seu primeiro cluster Kubernetes"
tags: ["kubernetes", "devops", "containers", "tutorial"]
language: "pt"
published: true
image: "/blog/kubernetes-intro.webp"
---

# Começando com Kubernetes

Kubernetes tornou-se o padrão de fato para orquestração de contêineres. Neste guia, vamos explorar os fundamentos e implantar seu primeiro cluster.

## O que é Kubernetes?

Kubernetes (K8s) é uma plataforma de orquestração de contêineres de código aberto que automatiza a implantação, dimensionamento e gerenciamento de aplicações em contêineres. Originalmente desenvolvido pelo Google, agora é mantido pela Cloud Native Computing Foundation (CNCF).

### Conceitos Principais

Antes de mergulhar, vamos entender alguns conceitos fundamentais:

1. **Pods** - As menores unidades implantáveis no Kubernetes
2. **Services** - Forma abstrata de expor aplicações
3. **Deployments** - Atualizações declarativas para Pods
4. **Namespaces** - Clusters virtuais dentro de um cluster físico

## Configurando Seu Primeiro Cluster

Vamos começar com um cluster de desenvolvimento local usando kind (Kubernetes in Docker):

```bash
# Instalar kind
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# Criar um cluster
kind create cluster --name my-cluster

# Verificar o cluster
kubectl cluster-info --context kind-my-cluster
```

## Implantando Sua Primeira Aplicação

Agora vamos implantar uma aplicação nginx simples:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nginx-deployment
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx
  template:
    metadata:
      labels:
        app: nginx
    spec:
      containers:
      - name: nginx
        image: nginx:1.14.2
        ports:
        - containerPort: 80
```

Aplicar o deployment:

```bash
kubectl apply -f nginx-deployment.yaml
kubectl get pods
```

## Expondo Sua Aplicação

Crie um service para expor seu deployment:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: nginx-service
spec:
  selector:
    app: nginx
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
  type: LoadBalancer
```

## Próximos Passos

Agora que você tem uma compreensão básica do Kubernetes, considere explorar:

- **Helm** - Gerenciador de pacotes para Kubernetes
- **Ingress Controllers** - Para roteamento avançado
- **Persistent Volumes** - Para aplicações stateful
- **ConfigMaps & Secrets** - Para gerenciamento de configuração

## Conclusão

Kubernetes pode parecer complexo no início, mas com prática, torna-se uma ferramenta inestimável para gerenciar aplicações em contêineres em escala. Comece pequeno, experimente e gradualmente construa seu conhecimento.

Feliz clustering! 🚀
