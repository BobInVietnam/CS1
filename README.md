# CASE STUDY 1
Dưới đây là một chương trình đơn giản sử dụng `express.js`, có mục tiêu để rút gọn link. Chương trình có thể chưa hoàn toàn được tối ưu.

## Người thực hiện
Cao Xuân Hùng - 22028291  
Lê Khả Thái Sơn - 21020088


## Hướng dẫn cài đặt
```sh
# Cài đặt các gói liên quan
$ npm install
# Tạo folder cho database
$ mkdir db
```

## Hướng dẫn khởi chạy
Docker Compose đã được cấu hình sẵn trong file `compose.yaml`. Chạy lệnh sau để khởi chạy cả Redis, MongoDB và ứng dụng Node.js:

```sh
# Build và khởi chạy ứng dụng cùng Redis
$ docker compose up --build
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

