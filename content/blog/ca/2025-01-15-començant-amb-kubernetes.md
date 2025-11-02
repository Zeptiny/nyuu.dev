---
title: "Començant amb Kubernetes"
date: "2025-01-15"
author: "Nyuu"
description: "Una guia per a principiants per entendre i desplegar el teu primer clúster Kubernetes"
tags: ["kubernetes", "devops", "containers", "tutorial"]
language: "ca"
published: true
image: "/blog/kubernetes-intro.webp"
---

# Començant amb Kubernetes

Kubernetes s'ha convertit en l'estàndard de facto per a l'orquestració de contenidors. En aquesta guia, explorarem els fonaments i desplegarem el teu primer clúster.

## Què és Kubernetes?

Kubernetes (K8s) és una plataforma d'orquestració de contenidors de codi obert que automatitza el desplegament, escalat i gestió d'aplicacions en contenidors. Originalment desenvolupat per Google, ara és mantingut per la Cloud Native Computing Foundation (CNCF).

### Conceptes Clau

Abans d'endinsar-nos, entenguem alguns conceptes fonamentals:

1. **Pods** - Les unitats més petites desplegables a Kubernetes
2. **Services** - Forma abstracta d'exposar aplicacions
3. **Deployments** - Actualitzacions declaratives per a Pods
4. **Namespaces** - Clústers virtuals dins d'un clúster físic

## Configurant el Teu Primer Clúster

Comencem amb un clúster de desenvolupament local utilitzant kind (Kubernetes in Docker):

```bash
# Instal·lar kind
curl -Lo ./kind https://kind.sigs.k8s.io/dl/v0.20.0/kind-linux-amd64
chmod +x ./kind
sudo mv ./kind /usr/local/bin/kind

# Crear un clúster
kind create cluster --name my-cluster

# Verificar el clúster
kubectl cluster-info --context kind-my-cluster
```

## Desplegant la Teva Primera Aplicació

Ara desplegarem una aplicació nginx senzilla:

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

Aplicar el deployment:

```bash
kubectl apply -f nginx-deployment.yaml
kubectl get pods
```

## Exposant la Teva Aplicació

Crea un service per exposar el teu deployment:

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

## Propers Passos

Ara que tens una comprensió bàsica de Kubernetes, considera explorar:

- **Helm** - Gestor de paquets per a Kubernetes
- **Ingress Controllers** - Per a encaminament avançat
- **Persistent Volumes** - Per a aplicacions stateful
- **ConfigMaps & Secrets** - Per a gestió de configuració

## Conclusió

Kubernetes pot semblar complex al principi, però amb pràctica, es converteix en una eina inestimable per gestionar aplicacions en contenidors a escala. Comença petit, experimenta i gradualment construeix el teu coneixement.

Feliç clustering! 🚀
