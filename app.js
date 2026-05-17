/* ==========================================================================
   E-SAFE SIMULATOR — APPLICATION LOGIC
   Handles interactive simulation flows, dynamic stats, chatbot, and tabs.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Global resilience variables
    let chatbotTypingTimeout = null;
    let hackerConsoleTimeout = null;
    let currentTypingIndicator = null;

    // -------------------------------------------------------------
    // 1. NAVIGATION & TAB SWITCHING SYSTEM
    // -------------------------------------------------------------
    const navItems = document.querySelectorAll('.nav-links .nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const tabId = item.getAttribute('data-tab');
            
            // Toggle navbar active indicator
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            
            // Toggle corresponding tab content view
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.getAttribute('id') === `tab-${tabId}`) {
                    content.classList.add('active');
                }
            });

            // Control tickers depending on active virtual tab (0% background CPU!)
            if (tabId === 'simulator') {
                if (typeof startCryptoTickers === 'function') startCryptoTickers();
            } else {
                if (typeof stopCryptoTickers === 'function') stopCryptoTickers();
            }
        });
    });

    // -------------------------------------------------------------
    // 2. SIMULATOR QUICK SELECTION BARS
    // -------------------------------------------------------------
    const btnSelectPhish = document.getElementById('btn-select-phish');
    const btnSelectCrypto = document.getElementById('btn-select-crypto');
    const panelPhishing = document.getElementById('panel-phishing-sim');
    const panelCrypto = document.getElementById('panel-crypto-sim');

    btnSelectPhish.addEventListener('click', () => {
        panelPhishing.scrollIntoView({ behavior: 'smooth', block: 'center' });
        panelPhishing.classList.add('glow-primary');
        setTimeout(() => panelPhishing.classList.remove('glow-primary'), 2000);
    });

    btnSelectCrypto.addEventListener('click', () => {
        panelCrypto.scrollIntoView({ behavior: 'smooth', block: 'center' });
        panelCrypto.classList.add('glow-primary');
        setTimeout(() => panelCrypto.classList.remove('glow-primary'), 2000);
    });


    // -------------------------------------------------------------
    // 3. SCENARIO A: PHISHING SIMULATOR LOGIC
    // -------------------------------------------------------------
    const phoneScreen = document.getElementById('phone-screen-content');
    const btnToggleRedflags = document.getElementById('btn-toggle-redflags');
    const btnResetPhishing = document.getElementById('btn-reset-phishing');
    const phishPanelCard = document.getElementById('panel-phishing-sim');
    let redFlagsActive = false;

    // Cache original SMS App state HTML
    const smsAppHtml = `
        <div class="phone-app" id="phone-app-sms">
            <div class="phone-header">
                <div class="phone-avatar">T</div>
                <div>
                    <div class="phone-contact-name">Telegram Security</div>
                    <div class="phone-contact-status"><i class="fa-solid fa-circle-check"></i> Official Account</div>
                </div>
            </div>
            <div class="phone-chat-body">
                <div class="sms-time">Hôm nay 23:08</div>
                <div class="sms-bubble redflag-glow">
                    <div class="sms-sender">HỆ THỐNG AN NINH TELEGRAM</div>
                    Tài khoản của bạn phát hiện truy cập bất thường tại IP: 103.45.12.89 (Hà Nội, VN). 
                    <br><br>
                    Vui lòng xác thực tài khoản trong vòng 24 giờ để tránh bị khóa vĩnh viễn:
                    <span class="sms-link" id="phishing-click-link">telegram-security-verifiy.com/login</span>
                </div>
            </div>
        </div>
    `;

    // Toggle Red Flags Mode
    btnToggleRedflags.addEventListener('click', () => {
        redFlagsActive = !redFlagsActive;
        if (redFlagsActive) {
            phishPanelCard.classList.add('redflags-active');
            btnToggleRedflags.innerHTML = `<i class="fa-solid fa-eye-slash"></i> Tắt chế độ phân tích Red Flags`;
            btnToggleRedflags.classList.remove('btn-danger');
            btnToggleRedflags.classList.add('btn-success');
        } else {
            phishPanelCard.classList.remove('redflags-active');
            btnToggleRedflags.innerHTML = `<i class="fa-solid fa-eye"></i> Bật chế độ phân tích Red Flags`;
            btnToggleRedflags.classList.remove('btn-success');
            btnToggleRedflags.classList.add('btn-danger');
        }
    });

    // Reset Phishing scenario
    btnResetPhishing.addEventListener('click', () => {
        if (hackerConsoleTimeout) {
            clearTimeout(hackerConsoleTimeout);
            hackerConsoleTimeout = null;
        }
        phoneScreen.innerHTML = smsAppHtml;
        setupSmsLinkListener();
        showGenericNotification("Đã đặt lại kịch bản", "Trở lại màn hình tin nhắn SMS ban đầu của nạn nhân.");
    });

    // Handle Phishing Link Click
    function setupSmsLinkListener() {
        const link = document.getElementById('phishing-click-link');
        if (link) {
            link.addEventListener('click', () => {
                loadPhishingLoginForm();
            });
        }
    }

    // Load Fake Telegram Login Form
    function loadPhishingLoginForm() {
        phoneScreen.innerHTML = `
            <div class="phish-app">
                <div class="phish-header-bar redflag-glow">
                    <i class="fa-solid fa-lock" style="font-size:0.75rem; color: var(--signal-safe);"></i> 
                    <span>Xác thực tài khoản an toàn</span>
                </div>
                <div class="phish-warning-url">
                    https://telegram-security-verifiy.com/login
                </div>
                <div class="phish-logo">
                    <i class="fa-brands fa-telegram" style="color: white;"></i>
                </div>
                <h4 class="phish-title">Đăng Nhập Telegram</h4>
                <p class="phish-subtitle">Nhập số điện thoại để hệ thống gửi mã xác minh OTP hủy lệnh khóa tài khoản.</p>
                
                <div class="phish-form">
                    <div class="phish-input-group">
                        <label>Quốc gia</label>
                        <input type="text" value="Việt Nam (+84)" readonly>
                    </div>
                    <div class="phish-input-group">
                        <label>Số điện thoại</label>
                        <input type="text" id="phish-phone" placeholder="Nhập số điện thoại của bạn..." value="0908123456">
                    </div>
                    <div class="phish-input-group">
                        <label>Mã OTP gửi về điện thoại</label>
                        <input type="text" id="phish-otp" placeholder="Nhập mã OTP..." value="9872">
                    </div>
                    <button class="btn redflag-glow" id="btn-submit-phish-login" style="background:#0088cc; color:white; border:none; margin-top:0.5rem;">
                        <i class="fa-solid fa-circle-check"></i> Xác nhận & Mở khóa tài khoản
                    </button>
                </div>
            </div>
        `;

        // Tooltip for Submit Button
        const tipBtn = document.createElement('div');
        tipBtn.className = 'redflag-tooltip';
        tipBtn.id = 'tip-submit';
        tipBtn.style.bottom = '30px';
        tipBtn.style.left = '10px';
        tipBtn.innerHTML = `
            <strong><i class="fa-solid fa-circle-exclamation"></i> Red Flag 3: Nút gửi OTP giả!</strong><br>
            Nút xác thực này không kết nối đến Telegram mà trực tiếp đóng gói SĐT và OTP của nạn nhân chuyển đến máy chủ Hacker.
        `;
        phoneScreen.appendChild(tipBtn);

        // Bind login submission click
        const btnSubmit = document.getElementById('btn-submit-phish-login');
        btnSubmit.addEventListener('click', () => {
            const phone = document.getElementById('phish-phone').value.trim() || "0908123456";
            const otp = document.getElementById('phish-otp').value.trim() || "9872";
            
            // Disable button immediately to prevent double-click spam
            btnSubmit.disabled = true;
            btnSubmit.style.pointerEvents = 'none';
            btnSubmit.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Đang tải...`;
            
            loadHackerConsole(phone, otp);
        });
    }

    // Load Hacker Console with randomized delays
    function loadHackerConsole(phone, otp) {
        if (hackerConsoleTimeout) {
            clearTimeout(hackerConsoleTimeout);
            hackerConsoleTimeout = null;
        }

        phoneScreen.innerHTML = `
            <div class="hacker-console" id="hacker-logs">
                <div class="console-header">
                    <span><i class="fa-solid fa-radiation"></i> HACKER CONTROL CENTER</span>
                    <span>ACTIVE</span>
                </div>
                <div class="console-line">[i] Khởi động Module chiếm quyền điều khiển...</div>
            </div>
        `;

        const logsContainer = document.getElementById('hacker-logs');
        const logs = [
            `[+] Thiết lập kết nối ngược đến server: 103.45.12.89... HOÀN TẤT`,
            `[+] Đã bắt gói tin POST chứa thông tin nhạy cảm.`,
            `[+] Dữ liệu thu thập: <span class="console-accent">SĐT: ${phone} | OTP: ${otp}</span>`,
            `[i] Bắt đầu phiên Session Hijacking giả lập...`,
            `[+] Bypass cơ chế bảo mật 2FA... <span class="console-success">SUCCESS (Target không bật 2FA!)</span>`,
            `[+] Đánh cắp Token lưu khóa ứng dụng Telegram... HOÀN TẤT`,
            `[+] Cướp Session thành công! Đã đăng xuất thiết bị nạn nhân.`,
            `[i] Bắt đầu kích hoạt bot spam tự động qua danh bạ...`,
            `[+] Đang gửi link lừa đảo sàn NovaGrow: "Nhận free $500 quà tặng!"`,
            `[+] Đã gửi tin nhắn rác thành công đến <span class="console-warning">142 bạn bè</span> trong danh bạ nạn nhân.`,
            `[!] QUY TRÌNH HACK HOÀN TẤT. THU THẬP NẠN NHÂN MỚI THÀNH CÔNG!`
        ];

        let logIndex = 0;
        
        // Random delay between 800-1800ms for realistic feel
        function appendNextLog() {
            const activeLogsContainer = document.getElementById('hacker-logs');
            if (!activeLogsContainer) return; // Stop executing if panel has been reset

            if (logIndex < logs.length) {
                const line = document.createElement('div');
                line.className = 'console-line';
                line.innerHTML = logs[logIndex];
                activeLogsContainer.appendChild(line);
                activeLogsContainer.scrollTop = activeLogsContainer.scrollHeight;
                logIndex++;
                
                const delay = 800 + Math.random() * 1000;
                hackerConsoleTimeout = setTimeout(appendNextLog, delay);
            } else {
                // Final notice bridging to Scenario B
                const notice = document.createElement('div');
                notice.className = 'console-bridge-notice';
                notice.innerHTML = `
                    <p class="console-bridge-title"><i class="fa-solid fa-link"></i> BƯỚC TIẾP THEO TRONG CHUỖI SCAM:</p>
                    <p class="console-bridge-desc">Bạn bè của nạn nhân nhận được tin nhắn Telegram spam, click vào đó và được dẫn dụ đến <strong>Sàn đầu tư ảo NovaGrow (Kịch bản B)</strong>.</p>
                `;
                activeLogsContainer.appendChild(notice);
            }
        }
        
        const initialDelay = 800 + Math.random() * 600;
        hackerConsoleTimeout = setTimeout(appendNextLog, initialDelay);
    }

    // Initialize Phishing SMS Link click
    setupSmsLinkListener();


    // -------------------------------------------------------------
    // 4. SCENARIO B: CRYPTO PLATFORM SIMULATOR LOGIC
    // -------------------------------------------------------------
    const profitEl = document.getElementById('crypto-live-profit');
    const totalAssetsEl = document.getElementById('crypto-total-assets');
    const btnWithdraw = document.getElementById('btn-crypto-withdraw-action');
    const btnTriggerModal = document.getElementById('btn-trigger-scam-modal');
    const btnResetCrypto = document.getElementById('btn-reset-crypto');
    const scamTaxModal = document.getElementById('scam-tax-modal');
    const btnCloseScamModal = document.getElementById('btn-close-scam-modal');
    
    let baseDeposit = 1000.00;
    let currentProfit = 254.38;
    let profitIntervalId = null;
    let chartIntervalId = null;

    // Simulated Candlestick chart ticker
    const chartContainer = document.getElementById('candlestick-chart');
    const maxCandles = 24;
    const candlesArray = [];

    function generateInitialCandles() {
        if (!chartContainer) return;
        chartContainer.innerHTML = '';
        
        for (let i = 0; i < maxCandles; i++) {
            const height = Math.floor(Math.random() * 80) + 40; // 40px to 120px
            const isGreen = Math.random() > 0.4; // 60% green candles
            
            const candle = document.createElement('div');
            candle.className = `candlestick ${isGreen ? '' : 'red'}`;
            candle.style.height = `${height}px`;
            
            chartContainer.appendChild(candle);
            candlesArray.push(candle);
        }
    }

    function startCryptoTickers() {
        // Clear any existing intervals first to prevent duplication
        stopCryptoTickers();

        // Real-time ticking profit simulator (visual manipulation)
        profitIntervalId = setInterval(() => {
            currentProfit += 0.05;
            const total = baseDeposit + currentProfit;
            
            if (profitEl && totalAssetsEl) {
                profitEl.textContent = `$${currentProfit.toFixed(2)}`;
                totalAssetsEl.textContent = `$${total.toFixed(2)}`;
            }
        }, 1000);

        // Tick the chart to make it feel alive
        chartIntervalId = setInterval(() => {
            if (!chartContainer || candlesArray.length === 0) return;
            
            // Remove first candle safely
            const first = candlesArray.shift();
            if (first && chartContainer.contains(first)) {
                chartContainer.removeChild(first);
            }
            
            // Append new candle
            const height = Math.floor(Math.random() * 80) + 40;
            const isGreen = Math.random() > 0.35;
            
            const newCandle = document.createElement('div');
            newCandle.className = `candlestick ${isGreen ? '' : 'red'}`;
            newCandle.style.height = `${height}px`;
            
            chartContainer.appendChild(newCandle);
            candlesArray.push(newCandle);
        }, 2000);
    }

    function stopCryptoTickers() {
        if (profitIntervalId) {
            clearInterval(profitIntervalId);
            profitIntervalId = null;
        }
        if (chartIntervalId) {
            clearInterval(chartIntervalId);
            chartIntervalId = null;
        }
    }

    // Initialize chart and start tickers
    generateInitialCandles();
    startCryptoTickers();

    // Listen to browser tab visibility changes (0% background CPU!)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            stopCryptoTickers();
        } else {
            // Only resume if the active virtual tab is 'simulator'
            const activeTabItem = document.querySelector('.nav-links .nav-item.active');
            if (activeTabItem && activeTabItem.getAttribute('data-tab') === 'simulator') {
                startCryptoTickers();
            }
        }
    });

    // Withdraw and scam trigger action
    const triggerScamModal = () => {
        if (scamTaxModal) {
            scamTaxModal.style.display = 'flex';
        }
        if (btnWithdraw) {
            btnWithdraw.disabled = true;
            btnWithdraw.style.pointerEvents = 'none';
            btnWithdraw.innerHTML = `<i class="fa-solid fa-lock"></i> Giao dịch bị khóa`;
            btnWithdraw.classList.remove('btn-success');
            btnWithdraw.classList.add('btn-secondary');
        }
    };

    if (btnWithdraw) btnWithdraw.addEventListener('click', triggerScamModal);
    if (btnTriggerModal) btnTriggerModal.addEventListener('click', triggerScamModal);
    
    if (btnCloseScamModal) {
        btnCloseScamModal.addEventListener('click', () => {
            if (scamTaxModal) scamTaxModal.style.display = 'none';
            showGenericNotification("Yêu cầu hỗ trợ đã gửi", "Hỗ trợ viên Anna đã nhận thông tin. Vui lòng kiểm tra khung chat 24/7 bên phải màn hình Sàn để làm việc!");
        });
    }

    // Reset Crypto Simulation stats & chat
    if (btnResetCrypto) {
        btnResetCrypto.addEventListener('click', () => {
            if (chatbotTypingTimeout) {
                clearTimeout(chatbotTypingTimeout);
                chatbotTypingTimeout = null;
            }
            currentTypingIndicator = null;

            if (btnWithdraw) {
                btnWithdraw.disabled = false;
                btnWithdraw.style.pointerEvents = 'auto';
                btnWithdraw.innerHTML = `<i class="fa-solid fa-arrow-up-from-bracket"></i> Rút toàn bộ tiền`;
                btnWithdraw.classList.remove('btn-secondary');
                btnWithdraw.classList.add('btn-success');
            }

            currentProfit = 254.38;
            const chatContainer = document.getElementById('crypto-chat-messages-container');
            if (chatContainer) {
                chatContainer.innerHTML = `
                    <div class="cc-message bot">
                        Chào anh/chị. Hệ thống phát hiện lệnh rút tiền $2,500 của anh/chị đang bị cơ quan thuế tạm khóa. Tôi là hỗ trợ viên VIP của NovaGrow, hãy liên hệ tôi ngay để hướng dẫn mở khóa nhanh chóng nhé.
                    </div>
                `;
            }
            renderChatbotOptions();
            showGenericNotification("Đã làm sạch dữ liệu", "Hệ thống sàn và hội thoại chat đã được đặt lại từ đầu.");
        });
    }


    // -------------------------------------------------------------
    // 5. SOCIAL ENGINEERING CHATBOT LOGIC (VIP Support Anna)
    // -------------------------------------------------------------
    const chatContainer = document.getElementById('crypto-chat-messages-container');
    const chatOptionsContainer = document.getElementById('crypto-chat-options-container');

    const conversationTree = [
        {
            id: 'q1',
            question: 'Tại sao lệnh rút tiền của tôi bị giữ lại?',
            answer: 'Dạ chào anh/chị, hệ thống phát hiện tài khoản của anh/chị có lợi nhuận tăng trưởng đột biến vượt mức quy định của sàn. Theo quy chuẩn an toàn thuế quốc tế, anh/chị cần nạp thêm 15% phí bảo chứng dòng tiền ($375) để hệ thống AI xác minh đây là dòng tiền đầu tư cá nhân hợp pháp, không phải rửa tiền.'
        },
        {
            id: 'q2',
            question: 'Có thể trừ tiền thuế thẳng từ số dư tài khoản của tôi không?',
            answer: 'Dạ rất tiếc không thể trừ trực tiếp từ số dư được ạ. Vì tài khoản của anh/chị hiện đang ở trạng thái Khóa Tạm Thời (Temporary Blocked) do cơ quan kiểm sát quản lý. Toàn bộ tính năng nội bộ đều bị vô hiệu hóa. Cách duy nhất để mở khóa là có giao dịch đối ứng nạp tiền bảo chứng từ ví cá nhân bên ngoài vào.'
        },
        {
            id: 'q3',
            question: 'Tôi không có tiền nạp thêm, có cách nào khác không?',
            answer: 'Dạ nếu anh/chị không thể nạp phí xác minh trước thời hạn 12 giờ của Ủy Ban Thuế, tài khoản sẽ bị phong tỏa vĩnh viễn và số tiền gốc lẫn lãi $2,500 sẽ bị sung công quỹ. Anna khuyên chân thành anh/chị hãy xoay xở tạm từ người thân, bạn bè để nạp kích hoạt tài khoản. Sau 15 phút xác minh xong, anh/chị có thể rút hết cả số tiền $2,500 cộng thêm $375 phí bảo chứng ra ngay lập tức ạ.'
        },
        {
            id: 'q4',
            question: 'Đây là sàn lừa đảo! Tôi sẽ báo Công an Việt Nam!',
            answer: 'Anna rất hiểu sự lo lắng của anh/chị. Tuy nhiên, sàn NovaGrow chúng tôi có đăng ký pháp lý quốc tế tại quần đảo Cayman (Vương Quốc Anh) và giao dịch qua ví phi tập trung Blockchain. Công an Việt Nam không có thẩm quyền giải quyết dòng tiền này. Nếu anh/chị chọn báo công an, tài khoản sẽ bị đóng băng vĩnh viễn do nghi vấn tranh chấp pháp lý và anh/chị sẽ mất trắng toàn bộ tài sản đầu tư.'
        }
    ];

    function appendChatMessage(sender, text) {
        if (!chatContainer) return;
        
        const msgDiv = document.createElement('div');
        msgDiv.className = `cc-message ${sender}`;
        msgDiv.textContent = text;
        
        chatContainer.appendChild(msgDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    function renderChatbotOptions() {
        if (!chatOptionsContainer) return;
        chatOptionsContainer.innerHTML = '';
        
        conversationTree.forEach(option => {
            const btn = document.createElement('button');
            btn.className = 'chat-option-btn';
            btn.textContent = option.question;
            
            btn.addEventListener('click', () => {
                if (chatbotTypingTimeout) {
                    clearTimeout(chatbotTypingTimeout);
                    chatbotTypingTimeout = null;
                }

                // User clicks option
                appendChatMessage('user', option.question);
                chatOptionsContainer.innerHTML = ''; // Clear options during reply typing
                
                // Show typing indicator in UI
                const typingIndicator = document.createElement('div');
                typingIndicator.className = 'cc-message bot';
                typingIndicator.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Hỗ trợ viên đang gõ câu trả lời...';
                currentTypingIndicator = typingIndicator;
                chatContainer.appendChild(typingIndicator);
                chatContainer.scrollTop = chatContainer.scrollHeight;

                // Randomized typing delay for human-like feel
                const typingDelay = 1200 + Math.random() * 1300;
                chatbotTypingTimeout = setTimeout(() => {
                    if (currentTypingIndicator && chatContainer.contains(currentTypingIndicator)) {
                        chatContainer.removeChild(currentTypingIndicator);
                    }
                    currentTypingIndicator = null;
                    chatbotTypingTimeout = null;
                    appendChatMessage('bot', option.answer);
                    renderChatbotOptions(); // Re-render option buttons
                }, typingDelay);
            });
            
            chatOptionsContainer.appendChild(btn);
        });
    }

    renderChatbotOptions();


    // -------------------------------------------------------------
    // 6. TAB 4: SHIELD HUB INTERACTIVE CHECKLISTS
    // -------------------------------------------------------------
    const userChecklistItems = document.querySelectorAll('#user-checklist .checklist-item');
    const orgChecklistItems = document.querySelectorAll('#org-checklist .checklist-item');

    function setupChecklist(items) {
        items.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('checked');
            });
        });
    }

    setupChecklist(userChecklistItems);
    setupChecklist(orgChecklistItems);

    // -------------------------------------------------------------
    // 7. MASTER RESET SYSTEM (IDEMPOTENCY / PRESENTATION REPLAY)
    // -------------------------------------------------------------
    const btnMasterReset = document.getElementById('btn-master-reset');
    
    if (btnMasterReset) {
        btnMasterReset.addEventListener('click', () => {
            // --- 1. RESET SCENARIO A (Phishing Telegram) ---
            if (hackerConsoleTimeout) {
                clearTimeout(hackerConsoleTimeout);
                hackerConsoleTimeout = null;
            }
            if (phoneScreen) {
                phoneScreen.innerHTML = smsAppHtml;
            }
            setupSmsLinkListener();

            // Reset Red Flags analysis
            if (phishPanelCard) {
                phishPanelCard.classList.remove('redflags-active');
            }
            if (btnToggleRedflags) {
                btnToggleRedflags.innerHTML = `<i class="fa-solid fa-eye"></i> Bật chế độ phân tích Red Flags`;
                btnToggleRedflags.classList.remove('btn-success');
                btnToggleRedflags.classList.add('btn-danger');
            }

            // --- 2. RESET SCENARIO B (Fake Crypto Exchange) ---
            if (chatbotTypingTimeout) {
                clearTimeout(chatbotTypingTimeout);
                chatbotTypingTimeout = null;
            }
            currentTypingIndicator = null;

            // Reset Withdraw button state
            if (btnWithdraw) {
                btnWithdraw.disabled = false;
                btnWithdraw.style.pointerEvents = 'auto';
                btnWithdraw.innerHTML = `<i class="fa-solid fa-arrow-up-from-bracket"></i> Rút toàn bộ tiền`;
                btnWithdraw.classList.remove('btn-secondary');
                btnWithdraw.classList.add('btn-success');
            }

            // Hide Scam Modal overlay
            if (scamTaxModal) {
                scamTaxModal.style.display = 'none';
            }

            // Reset balances & profit
            currentProfit = 254.38;
            baseDeposit = 1000.00;
            const total = baseDeposit + currentProfit;
            if (profitEl) {
                profitEl.textContent = `$${currentProfit.toFixed(2)}`;
            }
            if (totalAssetsEl) {
                totalAssetsEl.textContent = `$${total.toFixed(2)}`;
            }

            // Restart Tickers safely
            startCryptoTickers();

            // Reset VIP Support Chat History
            const chatContainer = document.getElementById('crypto-chat-messages-container');
            if (chatContainer) {
                chatContainer.innerHTML = `
                    <div class="cc-message bot">
                        Chào anh/chị. Hệ thống phát hiện lệnh rút tiền $2,500 của anh/chị đang bị cơ quan thuế tạm khóa. Tôi là hỗ trợ viên VIP của NovaGrow, hãy liên hệ tôi ngay để hướng dẫn mở khóa nhanh chóng nhé.
                    </div>
                `;
            }
            renderChatbotOptions();

            // --- 3. RESET SHIELD HUB INTERACTIVE CHECKLISTS ---
            const checklistItems = document.querySelectorAll('.checklist-item');
            checklistItems.forEach(item => item.classList.remove('checked'));

            // --- 4. SHOW CONFIRMATION NOTIFICATION ---
            showGenericNotification(
                "Đồ án đã thiết lập lại!", 
                "Toàn bộ kịch bản A (Phishing), kịch bản B (Sàn giao dịch), chat hỗ trợ VIP Anna, trạng thái Red Flags và Checklist lá chắn bảo mật đã quay lại trạng thái ban đầu tinh khiết."
            );
        });
    }

    // -------------------------------------------------------------
    // 8. GENERIC NOTIFICATION SYSTEM
    // -------------------------------------------------------------
    const genericModal = document.getElementById('generic-modal');
    const genericTitle = document.getElementById('modal-title');
    const genericDesc = document.getElementById('modal-desc');
    const btnCloseGeneric = document.getElementById('btn-close-generic-modal');

    function showGenericNotification(title, message) {
        if (!genericModal) return;
        genericTitle.textContent = title;
        genericDesc.textContent = message;
        genericModal.style.display = 'flex';
    }

    if (btnCloseGeneric) {
        btnCloseGeneric.addEventListener('click', () => {
            if (genericModal) genericModal.style.display = 'none';
        });
    }
});
