document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('hamburger-toggle');
    const menuIcon = document.getElementById('menu-icon');
    const drawer = document.getElementById('mobile-drawer');

    if (!toggleBtn || !menuIcon || !drawer) return;
     /* ── Helper: open / close ── */
    function openDrawer() {
        drawer.classList.add('open');
        document.body.style.overflow = 'hidden'; // stop background scroll
        menuIcon.classList.replace('fa-bars', 'fa-xmark');
        // Keep the toggle button visible above the drawer
        toggleBtn.style.position = 'fixed';
        toggleBtn.style.zIndex   = '10001';
        toggleBtn.setAttribute('aria-expanded', 'true');
    }
 
    function closeDrawer() {
        drawer.classList.remove('open');
        document.body.style.overflow = ''; // restore scroll
        menuIcon.classList.replace('fa-xmark', 'fa-bars');
        toggleBtn.style.position = '';
        toggleBtn.style.zIndex   = '';
        toggleBtn.setAttribute('aria-expanded', 'false');
    }
    toggleBtn.addEventListener('click', () => {
        // Toggle the "open" class on the drawer
        drawer.classList.toggle('open');

    });
     /* ── BONUS: close when any drawer link is clicked ── */
    drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            drawer.classList.remove('open');
            menuIcon.classList.replace('fa-xmark', 'fa-bars');
            toggleBtn.style.position = '';
            toggleBtn.style.zIndex = '';
        });
    });
 
    /* ── Close drawer if user resizes back to desktop ── */
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            drawer.classList.remove('open');
            menuIcon.classList.replace('fa-xmark', 'fa-bars');
            toggleBtn.style.position = '';
            toggleBtn.style.zIndex = '';
        }
    });
});