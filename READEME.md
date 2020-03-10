#

# API
## Auth
POST /auth/sendCode - 發送註冊使用者驗證Email
POST /auth/checkCode - 驗證Email及註冊
POST /auth/login - 登入

## Profile
GET /user - 取得使用者資料
PUT /user/profile - 修改使用者資料
POST /user/password - 修改使用者密碼

## Product
GET /product/all - 取得全部產品資料
POST /product/create - 新增產品
PUT /product/:id - 修改產品資料
DELETE /product/:id - 刪除產品

## Order
GET /order - 取得全部產品資料
GET /order/:id - 新增產品
POST /order/create - 新增訂單
PUT /order/submit/:id -更新結單

## General
/general/uploadImg - 上傳圖片