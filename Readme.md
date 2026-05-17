# 🛡️ HƯỚNG DẪN SỬ DỤNG VÀ THUYẾT TRÌNH DỰ ÁN: E-SAFE SIMULATOR
> **Dành cho Sinh viên ngành Thương mại điện tử (TMĐT)**
> **Học phần:** Thanh toán an toàn và bảo mật trong Thương mại điện tử

Chào mừng bạn đến với hệ thống **E-Safe: Interactive Cyber Threat & Scam Simulator**. Đây là một ứng dụng web mô phỏng tương tác cao cấp được lập trình để phục vụ riêng cho bài tiểu luận và buổi báo cáo cuối kỳ của bạn. 

Dưới đây là cẩm nang chi tiết giúp bạn khởi chạy ứng dụng, nắm vững kịch bản demo và cách trình bày trước hội đồng giám khảo để đạt điểm **Xuất sắc (9.0 - 10.0)**.

---

## 🚀 1. HƯỚNG DẪN KHỞI CHẠY NHANH (QUICK START)

Ứng dụng được viết hoàn toàn bằng **HTML, CSS và JavaScript thuần**, đảm bảo tính di động tối đa. Bạn có thể mở nó trên bất kỳ máy tính nào (kể cả máy tính ở giảng đường không có mạng internet hoặc bị chặn phần mềm).

### Cách 1: Click mở trực tiếp (Đơn giản nhất)
1. Tải toàn bộ thư mục `HoangVietDuAn` về máy tính hoặc USB.
2. Tìm file [index.html](index.html).
3. **Double click (nhấp đúp)** vào file này. Trang web sẽ mở ra ngay lập tức trên trình duyệt mặc định (Chrome, Edge, Safari) của bạn.

### Cách 2: Chạy qua Live Server (Chuyên nghiệp hơn)
Nếu bạn mở thư mục này bằng **Visual Studio Code (VS Code)**:
1. Cài đặt Extension **Live Server** (của nhà phát triển Ritwick Dey).
2. Nhấn nút **Go Live** ở góc dưới cùng bên phải màn hình VS Code.
3. Trình duyệt sẽ mở ứng dụng tại cổng mạng nội bộ (mặc định: `http://127.0.0.1:5500`).

---

## 🖥️ 2. KỊCH BẢN LIVE DEMO KHI THUYẾT TRÌNH (TỪNG BƯỚC)

*Hãy phân công 1 thành viên nói slide thuyết trình và 1 thành viên đứng trực tiếp trên máy tính để thực hiện demo theo luồng sau đây:*

### Bước 1: Giới thiệu hệ thống (1 phút)
* **Người nói:** *"Kính chào Thầy Cô và các bạn. Nhóm chúng em chọn đề tài tìm hiểu về chuỗi lừa đảo liên hoàn đang bùng nổ nhắm vào người dùng TMĐT hiện nay. Thay vì chỉ trình bày các ảnh chụp tĩnh hay slide chữ nhàm chán, nhóm chúng em đã xây dựng hệ thống mô phỏng tương tác **E-Safe** để trực quan hóa toàn bộ quá trình kẻ xấu tấn công cũng như cách hệ thống và người dùng phòng vệ."*

### Bước 2: Trình diễn Kịch bản A - Phishing & Hack Telegram (2 phút)
1. Trên menu chính, nhấp chọn tab **Trình giả lập (Simulator)**.
2. Tại khu vực điện thoại thông minh, chỉ vào tin nhắn SMS cảnh báo bảo mật:
   * **Thao tác:** Nhấn nút **"Bật chế độ phân tích Red Flags"** ở bên trái.
   * **Người nói:** *"Ở đây, Thầy Cô có thể thấy khi bật chế độ Red Flags, hệ thống sẽ khoanh vùng các dấu hiệu đáng ngờ mà nạn nhân thường bỏ qua. Ví dụ đầu tiên là tên miền sai chính tả `telegram-security-verifiy.com` cố tình lừa mắt người dùng, và ngôn từ đe dọa khẩn cấp khóa tài khoản trong 24h để đánh vào tâm lý hoảng sợ."*
3. **Thao tác:** Click vào đường link màu xanh trên màn hình chat điện thoại.
4. Giao diện đăng nhập Telegram giả lập hiện ra:
   * **Người nói:** *"Nạn nhân sẽ bị dẫn dụ vào một trang xác thực giả trông y như thật của Telegram. Khi họ nhập SĐT và OTP và bấm nút gửi..."*
5. **Thao tác:** Nhấn nút **"Xác nhận & Mở khóa tài khoản"** màu xanh dương.
6. Màn hình Hacker Console (dòng chữ xanh nến chạy) hiện ra:
   * **Người nói:** *"Ngay lập tức, mã xác thực OTP đã bị chuyển trực tiếp về máy chủ của tin tặc. Máy chủ của chúng sẽ chạy script tự động cướp phiên đăng nhập (Session Hijacking), đá thiết bị của nạn nhân ra và tự động sử dụng quyền điều khiển gửi tin nhắn rác dụ dỗ đầu tư sàn ảo cho toàn bộ 142 bạn bè trong danh bạ nạn nhân."*

### Bước 3: Trình diễn Kịch bản B - Sàn Crypto giả mạo NovaGrow (3 phút)
1. Cuộn màn hình sang bên phải tại khu vực **Sàn Đầu Tư Ảo NovaGrow**.
2. **Người nói:** *"Và đây là đích đến tiếp theo của chuỗi lừa đảo liên hoàn. Bạn bè của nạn nhân nhận được tin nhắn Telegram spam sẽ bị dẫn dụ vào sàn giao dịch tiền điện tử NovaGrow này."*
3. Chỉ vào số dư lợi nhuận:
   * **Người nói:** *"Nhóm chúng em đã thiết kế giao diện sàn cực kỳ tinh vi với bảng điện tử, biểu đồ nến đang tự động nhảy thời gian thực và đặc biệt là số dư lợi nhuận liên tục tăng nhảy số mỗi giây (+0.05$/s). Đây là đòn thao túng tâm lý đánh mạnh vào lòng tham của nạn nhân, khiến họ tin rằng tiền của họ đang sinh sôi nảy nở."*
4. **Thao tác:** Bấm nút **"Rút toàn bộ tiền" (Withdraw)** ở cột bên phải.
5. Màn hình **Modal Lỗi Đỏ** hiện ra.
   * **Người nói:** *"Khi lòng tham đạt đỉnh và nạn nhân muốn rút toàn bộ $2,500 gốc lẫn lãi ra, một bẫy khóa rút tiền thuế sẽ lập tức kích hoạt. Sàn thông báo khoản rút bị giữ lại do nghi vấn trốn thuế quốc tế và yêu cầu nạp thêm 15% tương đương $375 phí bảo chứng từ bên ngoài vào. Đây chính là bẫy Chi phí chìm (Sunk Cost) cực kỳ tàn nhẫn."*
6. **Thao tác:** Nhấn nút đóng cảnh báo thuế. Nhìn sang hộp chat ở góc dưới bên phải. Click chọn câu hỏi tương tác: *"Có thể trừ tiền thuế thẳng từ số dư tài khoản của tôi không?"*.
7. Đợi 1.5 giây để Trợ lý ảo Anna trả lời:
   * **Người nói:** *"Nạn nhân sẽ lo sợ và chat với hỗ trợ viên Anna. Như Thầy Cô thấy trên màn hình chat mô phỏng, hỗ trợ viên được lập trình sẵn kịch bản tâm lý cực kỳ sắc bén: dọa dẫm tài khoản sẽ bị đóng băng vĩnh viễn và sung công quỹ nếu quá 12 giờ, đồng thời xúi giục nạn nhân đi vay mượn nóng bên ngoài để nạp xác minh danh tính. Kẻ lừa đảo không bao giờ cho trừ trực tiếp vào số dư vì thực tế số dư trên sàn hoàn toàn là ảo, chúng chỉ muốn vét thêm một dòng tiền thật mới từ bên ngoài."*

### Bước 4: Sơ đồ hóa kỹ thuật & Hướng phòng thủ (2 phút)
1. Nhấp chọn tab **Sơ đồ mối đe dọa (Threat Map)** trên thanh Menu.
2. Trình bày sơ đồ luồng tấn công (đỏ) và luồng phòng thủ (xanh lá).
   * **Người nói:** *"Bảng sơ đồ Threat Map bóc tách chi tiết các lỗ hổng mà kẻ gian đã lợi dụng và đề xuất giải pháp đối phó ở cả hai phía: Người dùng và Tổ chức doanh nghiệp."*
3. Nhấp chọn tab **Lá chắn bảo mật (Shield Hub)**:
   * **Người nói:** *"Đối với người dùng, nhóm đề xuất giải pháp Zero-Trust cá nhân, thay thế SMS OTP truyền thống bằng khóa bảo mật FIDO2 cứng hoặc ứng dụng Authenticator để chống Phishing. Đối với tổ chức, chúng em đề xuất áp dụng AI giám sát dòng tiền bất thường kết hợp đồng bộ căn cước công dân sinh trắc học để triệt tiêu tài khoản ngân hàng rác."*

---

## 🎯 3. BÍ QUYẾT BẢO VỆ ĐIỂM SỐ TRƯỚC CÁC CÂU HỎI XOÁY CỦA GIẢNG VIÊN

*Khi giảng viên đặt câu hỏi chất vấn sau buổi thuyết trình (để chấm điểm Tiêu chí số 10 trong Rubric), hãy sử dụng các lập luận sau:*

1. **Câu hỏi:** *Kịch bản tấn công Phishing Telegram của nhóm thực hiện qua giao thức nào?*
   * **Trả lời:** *"Dạ thưa Thầy/Cô, hacker sử dụng kỹ thuật thu thập thông tin đăng nhập từ xa qua form Phishing (Credential Harvesting). Khi nạn nhân nhập OTP, hacker dùng công cụ tự động API để thực hiện yêu cầu đăng nhập trực tiếp (Session Request) lên Telegram gốc nhằm lấy mã truy cập API Token và Session Cookie. Vì nạn nhân không cấu hình xác thực 2 lớp bằng mật khẩu tĩnh nên hacker lập tức chiếm quyền điều khiển mà không gặp bất kỳ trở ngại nào."*
2. **Câu hỏi:** *Tại sao AI chống gian lận của ngân hàng có thể nhận diện được các giao dịch chuyển khoản cho sàn lừa đảo?*
   * **Trả lời:** *"Dạ thưa Thầy/Cô, AI chống gian lận vận hành theo cơ chế phân tích hành vi bất thường (Behavioral Analytics). Hệ thống sẽ phát hiện các Indicators of Compromise (IoC) như: Một tài khoản ngân hàng cá nhân xưa nay chỉ thanh toán nhỏ lẻ đột nhiên thực hiện các lệnh chuyển tiền liên tục đến các tài khoản thụ hưởng mới mở, hoặc các tài khoản nằm trong danh sách đen nghi vấn rửa tiền rác. Ngoài ra, AI còn phát hiện ứng dụng ngân hàng đang mở trên điện thoại có dấu hiệu bị điều khiển từ xa thông qua quyền Accessibility cài lén, từ đó tự động chặn giao dịch để bảo vệ khách hàng."*
3. **Câu hỏi:** *Vì sao các nạn nhân lại dễ dàng sập bẫy nạp tiền thuế ở sàn Crypto giả mạo như NovaGrow?*
   * **Trả lời:** *"Dạ, kẻ lừa đảo đã áp dụng xuất sắc hiệu ứng tâm lý 'Chi phí chìm' (Sunk Cost Fallacy). Khi nạn nhân đã nạp vào sàn $1,000 và thấy số dư sinh lãi lên $2,500, họ xem khoản lãi đó là tài sản thuộc sở hữu của mình. Khi bị khóa rút tiền và bắt nạp thêm $375, tâm lý nạn nhân sẽ tập trung vào việc bảo vệ khoản tiền $2,500 kia nên họ sẵn sàng nạp thêm $375 với hy vọng lấy lại tất cả, thay vì chấp nhận dừng lại để chịu mất khoản đầu tư ban đầu."*

---

 chúc nhóm của bạn đạt điểm **A+ (10/10)** tuyệt đối với dự án **E-Safe**!
Nếu cần điều chỉnh hay viết thêm báo cáo tiểu luận Word, hãy nhắn tin ngay cho tôi nhé!
