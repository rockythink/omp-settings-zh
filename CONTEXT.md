# Project Context

## 当前项目

`omp-settings-zh` 是官方 OMP 的设置项简体中文扩展。版本为 0.2.0，开发依赖与真实界面验证基线为 OMP 18.4.4；通过 GitHub 仓库安装与 Release 分发。

## 已确认的产品边界

- 使用官方二进制与原生 `/settings`，不复制设置面板。
- 当前汉化范围：391 项含 UI 元数据的设置名称、说明、风险警告和静态选项。
- 页签、分组标题与硬编码操作提示保留官方原文。这是本轮适配明确确认的范围，不宣称完整 TUI 汉化。
- `/settings-language` 提供语言选择器；`zh` 挂载中文，`en` 恢复原文，无需重启，只需重新打开面板。
- 语言只保留在当前进程，下次启动默认中文；不写配置、不读当前设置值或凭据、不联网。
- 热插拔指汉化效果开关，不改变 OMP 原生 Plugin/Extension 的安装、禁用和重载生命周期。

## 18.4.4 宿主事实

- 设置由 `config/registry.ts` 注册，`config/all-settings.ts` 的 `orderedSettings()` 提供按面板顺序排列的句柄。
- `setting.definition` 是宿主共享引用；`host-adapter.ts` 只动态导入包根和 `config/all-settings`。
- 原生 `config/settings-ui.ts` 每次打开面板从注册表生成 entries，TUI 再生成派生定义。
- 编译版没有暴露 TUI 页签/分组模块的共享实例；从磁盘导入副本无法汉化真实页签。保持原始 group 可避免排序与分区错误。
- 部分说明是可配置的只读 getter，键位图标随符号预设变化；中文模板必须保留这种动态行为，撤销时恢复原始描述符。
- `/reload-plugins` 不等价于卸载已加载 Extension。立即撤销汉化用 `/settings-language en`。

## 实现不变量

- 只修改设置项显示字段；不修改 setting path、类型、默认值、选项 value、group、条件、凭据标记或保存逻辑。
- 兼容预检先于写入；中途错误逆序回滚，恢复错误必须可见。
- 撤销恢复原始值/属性描述符，不覆盖另一扩展后续改成不同文案的字段。
- 主会话负责语言状态；子会话不能撤销主会话共享的汉化。
- 活动译文仅根据目标版本官方英文独立生成和复核；保留清楚的产品名、协议和技术缩写。
- 新增设置、未收录选项或无法匹配的动态说明安全保留官方原文。

## 维护入口

`bun run check` 执行类型、单元/宿主契约、覆盖、漂移和三轮可逆应用冒烟。宿主适配变化必须另在实际官方编译版验证，不能仅依赖源码运行成功。

下一阶段再处理上游定时巡检；本轮未增加自动更新工作流。

官方上游：https://github.com/can1357/oh-my-pi

文档优先级：`docs/PRD.md` 定义需求；`docs/TECHNICAL-DESIGN.md` 定义实现；`docs/TRANSLATION-GUIDE.md` 定义译文；`docs/OPEN-SOURCE-RELEASE.md` 定义发布门禁；`CONTRIBUTING.md` 定义贡献流程。上游真实行为变化时，先核验再同步文档。
