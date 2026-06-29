# 图匣 API 接入与测试报告

测试日期：2026-06-09

## 接入范围

- 通用后端 API Base：`http://10.100.0.148/miniapp/testappapi/api`
- 应用状态：`GET http://10.100.0.148/miniapp/testappapi/api/openapp/status`
- 图形验证码：`POST http://10.100.0.148/miniapp/testappapi/api/captcha/generate`
- 注册：`POST http://10.100.0.148/miniapp/testappapi/api/auth/register`
- 登录：`POST http://10.100.0.148/miniapp/testappapi/api/auth/login`
- 退出：`POST http://10.100.0.148/miniapp/testappapi/api/auth/logout`
- 当前用户：`GET http://10.100.0.148/miniapp/testappapi/api/me`
- 意见反馈：`POST http://10.100.0.148/miniapp/testappapi/api/feedback`
- 备案信息：`GET http://10.100.0.148/miniapp/testappapi/api/site/icp`
- 友情链接：`GET http://10.100.0.148/miniapp/testappapi/api/site/friend-links`
- 协议内容：`GET http://10.100.0.148/miniapp/testappapi/api/content/pages/privacy_policy`、`GET http://10.100.0.148/miniapp/testappapi/api/content/pages/user_agreement`
- 图片在线链接：保留 ImgBB 官方接口 `POST https://api.imgbb.com/1/upload?key=...`

## 权限规则

- 所有工具页功能均要求登录后使用。
- 未登录点击工具区域的上传、输入、选择、复制、下载、生成等控件，会打开登录/注册弹窗。
- 登录状态只认后端 `/api/me` 或 `/api/auth/login` 返回的用户信息，不再信任本地 `localStorage` 伪登录。

## 自动化测试

测试方式：Playwright 无头浏览器 + API mock 拦截，验证浏览器实际发出的请求路径、方法和请求体；并补充真实 API Base 连通性探测。

真实接口探测：

- `GET http://10.100.0.148/miniapp/testappapi/api/openapp/status`：HTTP 200
- 返回 `captcha_enabled: true`，`member: ok`

通过项：

- 未登录点击工具上传区会打开登录弹窗。
- 注册请求命中 `/api/auth/register`，请求体包含 `username/password/nickname/email/captcha_id/captcha_code`。
- 注册成功后回到登录模式，不自动伪登录。
- 登录请求命中 `/api/auth/login`，登录后顶部显示用户昵称。
- 退出请求命中 `/api/auth/logout`。
- 登录后工具功能可继续操作。
- 联系我们提交命中 `/api/feedback`，请求体符合 `type/title/content/contact/images`。
- 隐私协议可从 `/api/content/pages/privacy_policy` 动态替换正文。
- 后端协议内容会移除 `script` 等不安全标签。
- 底部备案信息可从 `/api/site/icp` 展示。
- ImgBB 上传命中官方接口并展示返回 URL。
- 12 个工具页移动端 390px 宽度无横向溢出。
- 12 个工具页未登录交互均会弹登录。
- 无 JS 运行错误、无业务控制台错误、无 404 资源。

机器可读结果：`docs/api-integration-test-result.json`

## 构建结果

- `node --check static/js/common.js`：通过
- `hugo --gc --minify --cleanDestinationDir`：通过

## 注意事项

- ImgBB 官方上传需要用户提供自己的 API Key；该 Key 仅保存在当前浏览器本地设置中。
- 通用后端文档未提供文件上传 API，因此“图片在线链接”继续使用 ImgBB 官方接口作为真实外链能力。
- 若后端启用验证码，前端会根据 `/api/openapp/status` 的 `captcha_enabled` 自动显示验证码输入区并调用 `/api/captcha/generate`。
