# Helm 包管理

## 什么是 Helm

Helm 是 Kubernetes 的包管理器。就像 npm 管理 Node.js 包一样，Helm 管理 K8s 应用。

一个 Helm Chart 包含了部署一个应用所需的所有 K8s 资源定义。

## 为什么需要 Helm

手动管理 K8s YAML 的痛点：
- 一个应用可能有十几个 YAML 文件
- 不同环境（开发/测试/生产）需要不同配置
- 版本管理和回滚困难

Helm 解决了这些问题：模板化、参数化、版本化。

## 基本使用

```bash
# 添加仓库
helm repo add bitnami https://charts.bitnami.com/bitnami

# 搜索 Chart
helm search repo redis

# 安装
helm install my-redis bitnami/redis --set auth.password=mypassword

# 查看已安装
helm list

# 升级
helm upgrade my-redis bitnami/redis --set auth.password=newpassword

# 回滚
helm rollback my-redis 1

# 卸载
helm uninstall my-redis
```

## Chart 结构

```
mychart/
  Chart.yaml          # Chart 元信息
  values.yaml         # 默认配置值
  templates/          # K8s 资源模板
    deployment.yaml
    service.yaml
    ingress.yaml
  charts/             # 依赖的子 Chart
```

## values.yaml

```yaml
replicaCount: 3
image:
  repository: myapp
  tag: "1.0"
service:
  type: ClusterIP
  port: 80
```

模板中引用：

```yaml
replicas: {{ .Values.replicaCount }}
image: {{ .Values.image.repository }}:{{ .Values.image.tag }}
```

不同环境用不同的 values 文件：

```bash
helm install myapp ./mychart -f values-prod.yaml
```

> Helm 让 K8s 部署从"手写 YAML"变成"填参数"，大幅降低运维复杂度。
