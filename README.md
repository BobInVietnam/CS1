# CASE STUDY 1
Dưới đây là một chương trình đơn giản sử dụng `express.js`, có mục tiêu để rút gọn link. Chương trình có thể chưa hoàn toàn được tối ưu.

## Người thực hiện
Cao Xuân Hùng - 22028291  
Lê Khả Thái Sơn - 21020088

## Hướng dẫn cài đặt
```sh
# Cài đặt các gói liên quan
$ npm install --omit=dev
# Cài đặt các gói liên quan (bao gồm gói test)
$ npm install
# Tạo folder cho database
$ mkdir db
# Khởi chạy ứng dụng
$ npm start 
# Chạy test
$ npm run test:performance
```

## Hướng dẫn khởi chạy
Ứng dụng yêu cầu Redis để hoạt động. Bạn có thể khởi chạy Redis và ứng dụng theo một trong hai cách sau:

### 1. Khởi chạy bằng Docker Compose
Docker Compose đã được cấu hình sẵn trong file `compose.yaml`. Chạy lệnh sau để khởi chạy cả Redis và ứng dụng Node.js:

```sh
# Build và khởi chạy ứng dụng cùng Redis
$ docker-compose up --build
```

### 2. Khởi chạy thủ công
Nếu không sử dụng Docker Compose, bạn cần khởi chạy Redis và ứng dụng Node.js theo các bước sau:

1. **Cài đặt và khởi chạy Redis**

2. **Khởi chạy ứng dụng Node.js**:
   ```sh
   # Khởi chạy ứng dụng
   $ npm start
   ```
## Mô Tả
| Endpoint | Phương thức | Mục tiêu
|--|:--:|--|
| /short/:id | GET | Trả về đường dẫn gốc
| /create?url= | POST | Trả về ID được thu gọn


## Yêu cầu triển khai
| Mức độ | Mô tả |
|--|--|
| ![Static Badge](https://img.shields.io/badge/OPTIONAL-medium-yellow)  | Tối ưu chương trình trên |
| ![Static Badge](https://img.shields.io/badge/OPTIONAL-easy-green) | Triển khai thành web hoàn chỉnh |
| ![Static Badge](https://img.shields.io/badge/OPTIONAL-hard-red) | Sử dụng cache để tăng hiệu suất ứng dụng |
| ![Static Badge](https://img.shields.io/badge/REQUIRED-easy-green)  | Cài đặt [middleware](https://expressjs.com/en/guide/using-middleware.html) cho chương trình |
| ![Static Badge](https://img.shields.io/badge/REQUIRED-medium-yellow) | Thêm lớp persistent bằng cách sử dụng ORM (Object-Relational Mapping) |
| ![Static Badge](https://img.shields.io/badge/REQUIRED-medium-yellow) | *Đánh giá* và *cải tiến* hiệu năng dựa trên một mẫu kiến trúc tuỳ chọn. |

Ngoài ra, các bạn có thể tuỳ chọn bổ sung thêm một số phần triển khai khác.

