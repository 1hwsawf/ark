document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('themeToggle');
    const menuToggle = document.getElementById('menuToggle');
    const hero = document.getElementById('hero');

    // linear风格平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                document.body.classList.remove('menu-open');
            }
        });
    });

    // linear风格导航高亮
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav a');
        let activeId = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 120 && rect.bottom > 120) {
                activeId = section.id;
            }
        });
        navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${activeId}`) {
                link.classList.add('active');
                link.style.background = 'linear-gradient(90deg, #7c3aed26 0%, #06b6d426 100%)';
                link.style.color = '#fff';
            } else {
                link.classList.remove('active');
                link.style.background = '';
                link.style.color = '';
            }
        });

        // linear风格Hero渐变
        if (scrollY > 80) {
            hero && hero.classList.add('scrolled');
        } else {
            hero && hero.classList.remove('scrolled');
        }
    });

    // linear风格主题切换：深浅色 + 渐变切换
    themeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark')) {
            body.classList.remove('dark');
            themeToggle.textContent = '🌙';
            localStorage.setItem('site-dark', '0');
        } else {
            body.classList.add('dark');
            themeToggle.textContent = '☀️';
            localStorage.setItem('site-dark', '1');
        }
    });

    // linear风格加载时恢复主题
    const savedTheme = localStorage.getItem('site-dark');
    if (savedTheme === '1') {
        body.classList.add('dark');
        themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('dark');
        themeToggle.textContent = '🌙';
    }

    // 移动菜单切换
    menuToggle.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
    });

    // 复制到剪贴板功能
    window.copyToClipboard = function(text) {
        try {
            navigator.clipboard.writeText(text).then(() => {
                const notification = document.createElement('div');
                notification.textContent = `已复制: ${text}`;
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.right = '20px';
                notification.style.background = 'linear-gradient(90deg, #7c3aed 30%, #06b6d4 100%)';
                notification.style.color = '#fff';
                notification.style.padding = '10px 20px';
                notification.style.borderRadius = '8px';
                notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)';
                notification.style.zIndex = '1000';
                notification.style.fontSize = '0.9rem';
                document.body.appendChild(notification);
                setTimeout(() => {
                    notification.style.opacity = '0';
                    notification.style.transition = 'opacity 0.3s ease';
                    setTimeout(() => notification.remove(), 300);
                }, 2000);
            }).catch(err => {
                console.error('复制失败: ', err);
                alert('复制失败，请手动复制: ' + text);
            });
        } catch (err) {
            console.error('复制功能不可用: ', err);
            alert('复制功能不可用，请手动复制: ' + text);
        }
    };
});