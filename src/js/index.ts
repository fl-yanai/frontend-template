import '../css/index.css';
import { intersectionObserver } from './lib/intersectionObserver';
import { $smoothScroll, getParams } from './lib/smoothScroll';

window.addEventListener('load', () => {
    // フェードインなどのアニメーション
    const intersectionObserver_targets: NodeListOf<Element> = document.querySelectorAll('.transition-target');
    if (!(intersectionObserver_targets.length === 0)) {
        intersectionObserver(intersectionObserver_targets);
    }
    //
    // スクロールアニメーション
    if (location.hash) {
        const [pcOffset, tabletOffset, mobileOffset] = getParams(location.href);
        if (!(pcOffset && tabletOffset && mobileOffset)) return;
        setTimeout(() => {
            $smoothScroll(
                location.hash.slice(3),
                Number(pcOffset),
                Number(tabletOffset),
                Number(mobileOffset),
                location.pathname,
            );
            history.replaceState('', '', location.pathname);
        }, 500);
    }
    (window as any).smoothScroll = $smoothScroll;
    //

    // ハンバーガーメニュー
    // const navToggle: HTMLElement | null = document.getElementById('navToggle');
    // const navMenu: HTMLElement | null = document.getElementById('navMenu');
    // const activeClass = 'header-navActive';
    // if (!navToggle) return;
    // if (!navMenu) return;
    // navToggle.addEventListener('click', () => {
    //     if (!navToggle.classList.contains(activeClass)) {
    //         navToggle.classList.add(activeClass);
    //         navMenu.classList.add(activeClass);
    //     } else {
    //         navToggle.classList.remove(activeClass);
    //         navMenu.classList.remove(activeClass);
    //     }
    // });
    //

    // タブメニュー
    // const tabs: HTMLCollectionOf<Element> = document.getElementsByClassName('tabMenu');
    // for (let i = 0; i < tabs.length; i++) {
    //     tabs[i].addEventListener('click', () => {
    //         document.getElementsByClassName('isShow')[0].classList.remove('isShow');
    //         tabs[i].classList.add('isShow');
    //     });
    // }
    //
});
