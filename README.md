# Sort Words

一个用于对括号内单词进行排序的 VS Code 扩展。

## 功能

- 对同一组括号内的逗号分隔单词进行排序
- 支持三种括号类型：
  - 圆括号 `()`
  - 方括号 `[]`
  - 尖括号 `<>`
- 支持单行或多行文本处理
- 支持选中文本处理（只处理选中部分）
- 支持嵌套括号处理
- 保持原始括号类型不变
- 保持原始逗号分隔格式

## 使用方法

1. 将光标放在要处理的行上，或选中要处理的文本
2. 使用以下任一方式触发排序：
   - 按快捷键 `Ctrl+Alt+S`（Mac 上是 `Cmd+Alt+S`）
   - 按 `Ctrl+Shift+P` 打开命令面板，输入"排序括号内的单词"

## 示例

```text
原始文本：
(banana, apple, orange)
[zebra, cat, dog]
<yellow, red, blue>
(hello, , world)  // 保持空逗号分隔
[test1, test2, , test3]  // 保持空逗号分隔
[derive(Schema, FromRow, Serialize, Deserialize, Debug)]

处理后：
(apple, banana, orange)
[cat, dog, zebra]
<blue, red, yellow>
(hello, , world)  // 保持空逗号分隔
[test1, test2, , test3]  // 保持空逗号分隔
[derive(Debug, Deserialize, FromRow, Schema, Serialize)]

选中文本示例：
原始文本：
(banana, apple, orange) [zebra, cat, dog]
选中 [zebra, cat, dog] 部分后：
(banana, apple, orange) [cat, dog, zebra]
```

## 安装

1. 在 VS Code 中打开扩展面板（`Ctrl+Shift+X`）
2. 搜索 "Sort Words"
3. 点击安装

## 开发

```bash
# 安装依赖
pnpm install

# 编译
pnpm run compile

# 运行测试
pnpm test
```

## 许可证

MIT
