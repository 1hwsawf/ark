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
                document.body.classList.remove('menu-open'); // 关闭移动菜单
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
        navigator.clipboard.writeText(text).then(() => {
            alert('已复制到剪贴板: ' + text);
        }).catch(err => {
            console.error('复制失败: ', err);
        });
    };
});
