# Kubernetes 入门

## 什么是 Kubernetes

Kubernetes（K8s）是容器编排平台。Docker 管理单个容器，K8s 管理成百上千个容器。

比喻：Docker 是开一辆车，K8s 是管理一个车队——调度、监控、故障处理、扩缩容全自动。

## 为什么需要 K8s

当你有几十个微服务、每个服务多个实例时：
- 怎么部署和更新？
- 某个实例挂了怎么自动恢复？
- 流量大了怎么自动扩容？
- 怎么管理配置和密钥？

K8s 解决所有这些问题。

## 核心架构

```
Master 节点（控制平面）
├── API Server：所有操作的入口
├── Scheduler：决定 Pod 运行在哪个节点
├── Controller Manager：维护期望状态
└── etcd：存储集群状态

Worker 节点
├── kubelet：管理节点上的 Pod
├── kube-proxy：网络代理
└── 容器运行时（containerd）
```

## 最小部署单元：Pod

Pod 是 K8s 的最小单元，包含一个或多个容器。

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: myapp
spec:
  containers:
    - name: web
      image: myapp:1.0
      ports:
        - containerPort: 3000
```

## 常用命令

```bash
# 查看资源
kubectl get pods
kubectl get services
kubectl get deployments

# 部署应用
kubectl apply -f deployment.yaml

# 查看日志
kubectl logs myapp-pod

# 进入容器
kubectl exec -it myapp-pod -- sh

# 扩缩容
kubectl scale deployment myapp --replicas=5
```

## 学习路径

1. 先学 Docker
2. 用 Minikube 或 Kind 在本地搭建 K8s
3. 理解 Pod、Deployment、Service
4. 学习 ConfigMap、Secret、Ingress
5. 了解 Helm 包管理

> K8s 的学习曲线很陡，但它是现代云原生应用的基石。
