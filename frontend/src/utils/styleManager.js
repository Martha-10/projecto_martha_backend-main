export function clearDynamicStyles(exclude = []) {
    document.querySelectorAll('link[data-style]').forEach(link => {
        const name = link.dataset.style;
        if (!exclude.includes(name)) {
            link.remove();
        }
    });
}

export function loadDynamicStyle(href, name, exclude = []) {
    clearDynamicStyles(exclude);

    // Verifica si ya existe
    const existing = document.querySelector(`link[data-style="${name}"]`);
    if (existing) return;

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.dataset.style = name;
    document.head.appendChild(link);
}