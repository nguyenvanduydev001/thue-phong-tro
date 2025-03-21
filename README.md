# 📌 Dự án Thuê Phòng Trọ

## 🚀 Giới thiệu

Dự án **Thuê Phòng Trọ** là một website giúp người dùng tìm kiếm, đăng ký, đăng bài và quản lý phòng trọ một cách dễ dàng.

## 📁 Cách làm việc nhóm với GitHub

### 1️⃣ Clone dự án về máy

```bash
git clone https://github.com/nhom-ban/thue-phong-tro.git
cd thue-phong-tro
```

### 2️⃣ Mỗi người tạo nhánh riêng

```bash
git checkout -b <ten-cua-ban>
# VD: git checkout -b duy
```

### 3️⃣ Code và đẩy lên GitHub

```bash
git add .
git commit -m "<Ten-ban>: Mô tả thay đổi"
# VD: git commit -m "Duy: Thêm giao diện trang chủ"
git push origin <ten-cua-ban>
# VD: git push origin duy
```

### 4️⃣ Tạo Pull Request (PR) để merge vào main

1. Lên GitHub, vào repository `thue-phong-tro`
2. Nhấn `Pull Request`
3. Chọn nhánh của bạn (VD: `duy`) và merge vào `main`
4. Nhấn `Create Pull Request`
5. Sau khi duyệt xong, nhấn `Merge`

### 5️⃣ Cập nhật code mới nhất từ `main`

```bash
git checkout main
git pull origin main
git checkout <ten-cua-ban>
git merge main
# VD: git checkout duy && git merge main
```

## 📌 Công nghệ sử dụng

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL

## 👨‍💻 Thành viên nhóm

- **Duy**: UI/UX, React, Hỗ trợ xây dựng các module
- **Phong**: Xử lý backend, Hỗ trợ xây dựng các module
- **Giáp**: Xây dựng module tìm kiếm phòng
- **Uy**: Xây dựng module quản lý user

---

📢 **Lưu ý:** Luôn làm việc trên nhánh riêng, KHÔNG commit trực tiếp vào `main`.

