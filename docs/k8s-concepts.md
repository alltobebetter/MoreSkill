# Kubernetes 核心概念

## Deployment

管理 Pod 的副本数和更新策略。

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
        - name: web
          image: myapp:1.0
          ports:
            - containerPort: 3000
          resources:
            requests:
              memory: "128Mi"
              cpu: "100m"
            limits:
              memory: "256Mi"
              cpu: "500m"
```

## Service

为一组 Pod 提供稳定的网络入口。Pod 会重建，IP 会变，但 Service 的地址不变。

```yaml
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
spec:
  selector:
    app: myapp
  ports:
    - port: 80
      targetPort: 3000
  type: ClusterIP  # 集群内部访问
```

| Service 类型 | 用途 |
|-------------|------|
| ClusterIP | 集群内部访问（默认） |
| NodePort | 通过节点端口外部访问 |
| LoadBalancer | 云平台负载均衡器 |

## Ingress

HTTP 层的路由，把外部请求转发到不同的 Service。

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
spec:
  rules:
    - host: api.example.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: myapp-service
                port:
                  number: 80
```

## ConfigMap 和 Secret

```yaml
# 配置
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  DATABASE_HOST: "db-service"
  LOG_LEVEL: "info"

# 密钥（Base64 编码）
apiVersion: v1
kind: Secret
metadata:
  name: app-secret
type: Opaque
data:
  DB_PASSWORD: cGFzc3dvcmQ=  # base64("password")
```

## HPA：自动扩缩容

```yaml
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: myapp-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: myapp
  minReplicas: 2
  maxReplicas: 10
  metrics:
    - type: Resource
      resource:
        name: cpu
        target:
          type: Utilization
          averageUtilization: 70
```

CPU 使用率超过 70% 自动扩容，低于时自动缩容。

> K8s 的 YAML 看起来多，但每个资源都在解决一个具体问题。理解了概念，写 YAML 就是填表。
