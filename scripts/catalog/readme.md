# 工作区依赖自动转录脚本

## 脚本说明

该脚本用于将 `package.json` 文件中的安装依赖，自动写入工作区配置文件`pnpm-workspace.yaml`中，并自动将配置改为工作区协议`catalog:`、`workspace:*`，方便全局管理。

## 使用方法

根目录执行 `pnpm catalog`。
