// Linear风格主题切换与滚动效果
document.addEventListener('DOMContentLoaded', () => {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    const hero = document.getElementById('hero');

    // linear风格平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        });
    });

    // linear风格导航高亮
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-list a');
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
                // linear风格高亮
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
        if (body.classList.contains('linear-light')) {
            body.classList.remove('linear-light');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.add('linear-light');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'light');
        }
    });

    // linear风格加载时恢复主题
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('linear-light');
        themeToggle.textContent = '☀️';
    } else {
        body.classList.remove('linear-light');
        themeToggle.textContent = '🌙';
    }
});