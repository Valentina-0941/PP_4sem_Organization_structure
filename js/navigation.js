document.addEventListener("DOMContentLoaded", function() {
    const navItems = [
        {
            href: "index.html",
            tooltip: "Главная страница",
            imgSrc: "source/icon/fi-rr-home.svg",
            imgAlt: "home icon"
        },
        {
            href: "structure.html",
            tooltip: "Структура организации (карточки)",
            imgSrc: "source/icon/fi-rr-id-card-clip-alt.svg",
            imgAlt: "stats icon"
        },
        {
            href: "structure-graph.html",
            tooltip: "Структура организации (граф)",
            imgSrc: "source/icon/fi-rr-department-structure.svg",
            imgAlt: "structure icon"
        },
        {
            href: "structure-zoomable-icicle.html",
            tooltip: "Zoomable icicle",
            imgSrc: "source/icon/fi-rr-layout-fluid.svg",
            imgAlt: "structure icon"
        },
        {
            href: "structure-zoomable-sunburst.html",
            tooltip: "Zoomable sunburst",
            imgSrc: "source/icon/fi-rr-chart-pie-alt.svg",
            imgAlt: "structure icon"
        },
        {
            href: "help.html",
            tooltip: "Помощь",
            imgSrc: "source/icon/fi-rr-question-square.svg",
            imgAlt: "question icon"
        }
    ];

    const navContainer = document.getElementById('navigation');

    navItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.className = "nav-link py-3";
        a.href = item.href;
        a.setAttribute('data-bs-toggle', 'tooltip');
        a.setAttribute('data-bs-placement', 'right');
        a.setAttribute('aria-label', 'Dashboard');
        a.setAttribute('data-bs-original-title', item.tooltip);

        if (item.id) {
            a.id = item.id;
        }

        const img = document.createElement('img');
        img.className = "icon";
        img.src = item.imgSrc;
        img.alt = item.imgAlt;

        a.appendChild(img);
        li.appendChild(a);
        navContainer.appendChild(li);
    });

    // Initialize tooltips
    $(function () {
        $('[data-bs-toggle="tooltip"]').tooltip();
    });
});