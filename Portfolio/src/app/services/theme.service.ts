import {Injectable, Renderer2, RendererFactory2} from '@angular/core';

@Injectable({providedIn: 'root'})
export class ThemeService {
    private renderer: Renderer2;
    private currentTheme: 'light' | 'dark' = 'dark';

    constructor(rendererFactory: RendererFactory2) {
        this.renderer = rendererFactory.createRenderer(null, null);
        this.initTheme();
    }

    initTheme() {
        const storedTheme = localStorage.getItem('theme') as 'light' | 'dark';
        this.setTheme(storedTheme || this.currentTheme);
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    setTheme(theme: 'light' | 'dark') {
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);

        this.renderer.removeClass(document.body, theme === 'dark' ? 'light-theme' : 'dark-theme');
        this.renderer.addClass(document.body, theme + '-theme');
    }

    getTheme() {
        return this.currentTheme;
    }
}
