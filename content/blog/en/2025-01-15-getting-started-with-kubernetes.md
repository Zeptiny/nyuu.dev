---
title: "Getting Started with Kubernetes"
date: "2025-01-15"
author: "Nyuu"
description: "A beginner's guide to understanding and deploying your first Kubernetes cluster"
tags: ["kubernetes", "devops", "containers", "tutorial"]
language: "en"
published: true
image: "/blog/kubernetes-intro.webp"
---

# Getting Started with Kubernetes

Kubernetes has become the de facto standard for container orchestration. In this guide, we'll explore the fundamentals and deploy your first cluster.

## What is Kubernetes?

Kubernetes (K8s) is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. Originally developed by Google, it's now maintained by the Cloud Native Computing Foundation (CNCF).

### Key Concepts

Before diving in, let's understand some core concepts:

1. **Pods** - The smallest deployable units in Kubernetes
2. **Services** - Abstract way to expose applications
3. **Deployments** - Declarative updates for Pods
4. **Namespaces** - Virtual clusters within a physical cluster

## Setting Up Your First Cluster

Let's start with a local development cluster using kind (Kubernetes in Docker):

```bash
# Install kind
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# Create a cluster
kind create cluster --name my-cluster

# Verify the cluster
kubectl cluster-info --context kind-my-cluster
```

## Deploying Your First Application

Now let's deploy a simple nginx application:

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

Apply the deployment:

```bash
kubectl apply -f nginx-deployment.yaml
kubectl get pods
```

## Exposing Your Application

Create a service to expose your deployment:

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

## Next Steps

Now that you have a basic understanding of Kubernetes, consider exploring:

- **Helm** - Package manager for Kubernetes
- **Ingress Controllers** - For advanced routing
- **Persistent Volumes** - For stateful applications
- **ConfigMaps & Secrets** - For configuration management

## Conclusion

Kubernetes might seem complex at first, but with practice, it becomes an invaluable tool for managing containerized applications at scale. Start small, experiment, and gradually build your knowledge.

Happy clustering! 🚀
