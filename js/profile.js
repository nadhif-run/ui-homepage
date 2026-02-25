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

// Load Profile Data
function loadProfileData() {
    const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
    
    const name = profileData.name || 'User Name';
    const email = profileData.email || 'user@example.com';
    const phone = profileData.phone || '+62 812-3456-7890';
    const location = profileData.location || 'Jakarta, Indonesia';
    const bio = profileData.bio || 'Belum ada bio. Klik tombol edit untuk menambahkan deskripsi tentang diri Anda.';
    
    // Update all displays
    document.getElementById('displayName').textContent = name;
    document.getElementById('displayEmail').textContent = email;
    document.getElementById('infoEmail').textContent = email;
    document.getElementById('infoPhone').textContent = phone;
    document.getElementById('infoLocation').textContent = location;
    document.getElementById('aboutText').textContent = bio;
    
    // Update avatars
    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=667eea&color=fff&size=200`;
    document.getElementById('profileAvatar').src = avatarUrl;
    document.getElementById('headerAvatar').src = avatarUrl;
}

// Show Edit Modal
function showEditModal() {
    const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
    
    document.getElementById('editName').value = profileData.name || '';
    document.getElementById('editEmail').value = profileData.email || '';
    document.getElementById('editPhone').value = profileData.phone || '';
    document.getElementById('editLocation').value = profileData.location || '';
    document.getElementById('editBio').value = profileData.bio || '';
    
    document.getElementById('editModal').classList.add('active');
}

// Close Edit Modal
function closeEditModal() {
    document.getElementById('editModal').classList.remove('active');
}

// Handle Edit Profile
function handleEditProfile(event) {
    event.preventDefault();
    
    const profileData = {
        name: document.getElementById('editName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        location: document.getElementById('editLocation').value,
        bio: document.getElementById('editBio').value
    };
    
    localStorage.setItem('profileData', JSON.stringify(profileData));
    localStorage.setItem('username', profileData.name);
    
    loadProfileData();
    closeEditModal();
    
    // Show success message
    alert('Profile berhasil diperbarui!');
}

// Change Avatar
function changeAvatar() {
    const name = prompt('Masukkan nama untuk generate avatar baru:', document.getElementById('displayName').textContent);
    if (name) {
        const profileData = JSON.parse(localStorage.getItem('profileData') || '{}');
        profileData.name = name;
        localStorage.setItem('profileData', JSON.stringify(profileData));
        loadProfileData();
    }
}

// Change Cover
function changeCover() {
    alert('Fitur upload cover photo akan segera hadir!');
}

// Edit About
function editAbout() {
    showEditModal();
    // Focus on bio textarea
    setTimeout(() => {
        document.getElementById('editBio').focus();
    }, 100);
}

// Edit Social
function editSocial() {
    alert('Fitur edit social media links akan segera hadir!');
}

// Initialize
window.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
    
    // Close modal when clicking outside
    document.getElementById('editModal').addEventListener('click', (e) => {
        if (e.target.id === 'editModal') {
            closeEditModal();
        }
    });
});