# Linux 基础命令

## 为什么要学 Linux

绝大多数服务器运行 Linux。Docker 容器里是 Linux。CI/CD 环境是 Linux。不会 Linux 基本命令，就没法做部署和运维。

## 文件操作

```bash
ls -la          # 列出文件（含隐藏文件）
cd /path        # 切换目录
pwd             # 当前目录
mkdir -p a/b/c  # 创建多级目录
cp -r src dest  # 复制目录
mv old new      # 移动/重命名
rm -rf dir      # 删除目录（危险，慎用）
cat file        # 查看文件内容
head -20 file   # 查看前 20 行
tail -f file    # 实时查看文件末尾（看日志）
```

## 文本处理

```bash
grep "error" log.txt          # 搜索包含 error 的行
grep -r "TODO" src/           # 递归搜索目录
wc -l file                    # 统计行数
sort file | uniq              # 排序去重
awk '{print $1}' file         # 打印第一列
sed 's/old/new/g' file        # 替换文本
```

## 进程管理

```bash
ps aux                        # 查看所有进程
top / htop                    # 实时监控
kill <pid>                    # 终止进程
kill -9 <pid>                 # 强制终止
nohup command &               # 后台运行，退出终端不停止
```

## 网络

```bash
curl https://api.example.com  # 发送 HTTP 请求
wget <url>                    # 下载文件
netstat -tlnp                 # 查看端口占用
ss -tlnp                      # 同上（更现代）
ping example.com              # 测试连通性
```

## 权限

```bash
chmod 755 script.sh           # 设置权限
chown user:group file         # 修改所有者
```

权限数字：`r=4, w=2, x=1`，`755` = 所有者读写执行，其他人读执行。

## 包管理

```bash
# Ubuntu/Debian
apt update && apt install nginx

# CentOS/RHEL
yum install nginx

# Alpine（Docker 常用）
apk add nginx
```

## systemd 服务管理

```bash
systemctl start nginx         # 启动
systemctl stop nginx          # 停止
systemctl restart nginx       # 重启
systemctl status nginx        # 查看状态
systemctl enable nginx        # 开机自启
```

> 不需要精通 Linux，但这些基础命令是服务器操作的必备技能。
