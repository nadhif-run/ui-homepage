// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Handle Logout
function handleLogout() {
    if (confirm('Apakah Anda yakin ingin keluar?')) {
        localStorage.clear();
        window.location.href = './dashboard.html';
    }
}

// Settings Navigation
document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.settings-nav-item');
    const sections = document.querySelectorAll('.settings-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const sectionId = item.getAttribute('data-section');
            
            // Remove active class from all nav items and sections
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked nav item and corresponding section
            item.classList.add('active');
            document.getElementById(`${sectionId}-section`).classList.add('active');
        });
    });
    
    // Load settings
    loadSettings();
    
    // Theme selector
    const themeOptions = document.querySelectorAll('.theme-option');
    themeOptions.forEach(option => {
        option.addEventListener('click', () => {
            themeOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            const theme = option.getAttribute('data-theme');
            localStorage.setItem('theme', theme);
            applyTheme(theme);
        });
    });
    
    // Font size slider
    const fontSizeRange = document.getElementById('fontSizeRange');
    const fontPreview = document.getElementById('fontPreview');
    
    fontSizeRange.addEventListener('input', (e) => {
        const size = e.target.value;
        fontPreview.style.fontSize = `${size}px`;
        localStorage.setItem('fontSize', size);
    });
    
    // Toggle switches
    setupToggleListeners();
});

// Load Settings
function loadSettings() {
    const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
    
    document.getElementById('settingsEmail').textContent = profileData.email || 'user@example.com';
    document.getElementById('settingsUsername').textContent = '@' + (profileData.name || 'username').toLowerCase().replace(/\s/g, '');
    document.getElementById('settingsPhone').textContent = profileData.phone || '+62 812-3456-7890';
    
    // Load avatar
    const name = profileData.name || 'User';
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=100`;
    document.getElementById('headerAvatar').src = avatarUrl;
    
    // Load theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    const themeOption = document.querySelector(`.theme-option[data-theme="${savedTheme}"]`);
    if (themeOption) {
        themeOption.click();
    }
    
    // Load font size
    const savedFontSize = localStorage.getItem('fontSize') || '16';
    document.getElementById('fontSizeRange').value = savedFontSize;
    document.getElementById('fontPreview').style.fontSize = `${savedFontSize}px`;
    
    // Load toggle states
    loadToggleStates();
}

// Setup Toggle Listeners
function setupToggleListeners() {
    const toggles = [
        'twoFactorToggle',
        'newsletterToggle',
        'securityEmailToggle',
        'tipsToggle',
        'pushToggle',
        'soundToggle',
        'highContrastToggle',
        'reduceMotionToggle',
        'publicProfileToggle',
        'showEmailToggle',
        'onlineStatusToggle',
        'analyticsCookieToggle',
        'marketingCookieToggle'
    ];
    
    toggles.forEach(toggleId => {
        const toggle = document.getElementById(toggleId);
        if (toggle) {
            toggle.addEventListener('change', (e) => {
                localStorage.setItem(toggleId, e.target.checked);
                console.log(`${toggleId}: ${e.target.checked}`);
            });
        }
    });
}

// Load Toggle States
function loadToggleStates() {
    const toggles = [
        'twoFactorToggle',
        'newsletterToggle',
        'securityEmailToggle',
        'tipsToggle',
        'pushToggle',
        'soundToggle',
        'highContrastToggle',
        'reduceMotionToggle',
        'publicProfileToggle',
        'showEmailToggle',
        'onlineStatusToggle',
        'analyticsCookieToggle',
        'marketingCookieToggle'
    ];
    
    toggles.forEach(toggleId => {
        const toggle = document.getElementById(toggleId);
        if (toggle) {
            const savedState = localStorage.getItem(toggleId);
            if (savedState !== null) {
                toggle.checked = savedState === 'true';
            }
        }
    });
}

// Apply Theme
function applyTheme(theme) {
    // This is a placeholder - you would implement actual theme switching here
    console.log('Theme changed to:', theme);
    alert(`Tema "${theme}" akan diterapkan. Fitur ini akan dikembangkan lebih lanjut.`);
}

// Account Functions
function changeEmail() {
    const newEmail = prompt('Masukkan email baru:', document.getElementById('settingsEmail').textContent);
    if (newEmail) {
        const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
        profileData.email = newEmail;
        localStorage.setItem('profileData', JSON.stringify(profileData));
        document.getElementById('settingsEmail').textContent = newEmail;
        alert('Email berhasil diubah!');
    }
}

function changeUsername() {
    const currentUsername = document.getElementById('settingsUsername').textContent.replace('@', '');
    const newUsername = prompt('Masukkan username baru:', currentUsername);
    if (newUsername) {
        document.getElementById('settingsUsername').textContent = '@' + newUsername;
        alert('Username berhasil diubah!');
    }
}

function changePhone() {
    const newPhone = prompt('Masukkan nomor telepon baru:', document.getElementById('settingsPhone').textContent);
    if (newPhone) {
        const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
        profileData.phone = newPhone;
        localStorage.setItem('profileData', JSON.stringify(profileData));
        document.getElementById('settingsPhone').textContent = newPhone;
        alert('Nomor telepon berhasil diubah!');
    }
}

function deleteAccount() {
    const confirmation = prompt('Ketik "HAPUS AKUN" untuk mengkonfirmasi penghapusan akun:');
    if (confirmation === 'HAPUS AKUN') {
        if (confirm('Apakah Anda yakin? Tindakan ini tidak dapat dibatalkan!')) {
            localStorage.clear();
            alert('Akun Anda telah dihapus.');
            window.location.href = './dashboard.html';
        }
    } else if (confirmation !== null) {
        alert('Konfirmasi tidak sesuai. Penghapusan akun dibatalkan.');
    }
}

// Security Functions
function changePassword() {
    const currentPassword = prompt('Masukkan password saat ini:');
    if (currentPassword) {
        const newPassword = prompt('Masukkan password baru:');
        if (newPassword) {
            const confirmPassword = prompt('Konfirmasi password baru:');
            if (newPassword === confirmPassword) {
                alert('Password berhasil diubah!');
            } else {
                alert('Password tidak cocok!');
            }
        }
    }
}

function manageDevices() {
    alert('Fitur kelola perangkat akan segera hadir!');
}

// Privacy Functions
function downloadData() {
    const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
    const customLinks = JSON.parse(localStorage.getItem('customLinks') || '[]');
    
    const data = {
        profile: profileData,
        customLinks: customLinks,
        exportDate: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'my-data-export.json';
    link.click();
    
    URL.revokeObjectURL(url);
    alert('Data Anda berhasil diunduh!');
}

// Language and Timezone
document.getElementById('languageSelect')?.addEventListener('change', (e) => {
    localStorage.setItem('language', e.target.value);
    alert('Bahasa akan diubah. Harap muat ulang halaman.');
});

document.getElementById('timezoneSelect')?.addEventListener('change', (e) => {
    localStorage.setItem('timezone', e.target.value);
    console.log('Timezone changed to:', e.target.value);
});

document.getElementById('timeFormatSelect')?.addEventListener('change', (e) => {
    localStorage.setItem('timeFormat', e.target.value);
    console.log('Time format changed to:', e.target.value);
});

document.getElementById('dateFormatSelect')?.addEventListener('change', (e) => {
    localStorage.setItem('dateFormat', e.target.value);
    console.log('Date format changed to:', e.target.value);
});