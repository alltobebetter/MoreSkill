# Git 工作流

## Git 是什么

Git 是分布式版本控制系统。它记录代码的每一次变更，让你可以回到任何历史版本。

## 基础命令

```bash
git init                    # 初始化仓库
git clone <url>             # 克隆远程仓库
git add .                   # 暂存所有变更
git commit -m "描述"        # 提交
git push                    # 推送到远程
git pull                    # 拉取远程变更
git log --oneline           # 查看提交历史
git diff                    # 查看变更内容
```

## 分支策略

### Git Flow

```
main ──────────────────────── 生产环境
  └── develop ──────────────── 开发主线
        ├── feature/login ──── 功能分支
        ├── feature/payment
        └── release/1.0 ────── 发布分支
```

适合：版本发布周期长的项目

### GitHub Flow（推荐）

```
main ──────────────────────── 始终可部署
  ├── feature/login ──── PR → Code Review → 合并
  └── fix/bug-123 ────── PR → Code Review → 合并
```

适合：持续部署的项目

## Commit 规范

```
feat: 新增用户注册功能
fix: 修复登录页面白屏问题
docs: 更新 API 文档
refactor: 重构订单模块
chore: 升级依赖版本
```

## 常用操作

```bash
# 创建并切换分支
git checkout -b feature/login

# 合并分支
git merge feature/login

# 变基（更干净的历史）
git rebase main

# 暂存当前工作
git stash
git stash pop

# 撤销上一次提交（保留变更）
git reset --soft HEAD~1

# 查看某个文件的修改历史
git log --follow -p filename
```

> 好的 Git 习惯：小步提交、清晰的 commit message、用 PR 做 Code Review。
