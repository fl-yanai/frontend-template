const $smoothScroll = (hash: string, pcOffset = 0, tabletOffset = 0, mobileOffset = 0, link = '/') => {
    class Scroll {
        hash: string;
        pcOffset: number;
        tabletOffset: number;
        mobileOffset: number;
        constructor(hash: string, pcOffset: number, tabletOffset: number, mobileOffset: number) {
            this.hash = hash;
            this.pcOffset = pcOffset;
            this.tabletOffset = tabletOffset;
            this.mobileOffset = mobileOffset;
        }

        // スクロール処理
        toScroll = (scrollY: number) => {
            window.scrollBy({
                top: scrollY,
                left: 0,
                behavior: 'smooth',
            });
        };

        // デバイスごとのスクロール距離調整
        scrollSizeBranchFunction = (targetElement: HTMLElement, scrollY: number) => {
            const windowWidth: number = window.innerWidth;
            const PCTABbreakPoint = 900;
            const TABMOBbreakPoint = 500;
            const pcSize: boolean = windowWidth >= PCTABbreakPoint;
            const tabletSize: boolean = windowWidth > TABMOBbreakPoint && windowWidth < PCTABbreakPoint;
            const mobileSize: boolean = windowWidth < TABMOBbreakPoint;
            const fadeAnimationOffset = 100;
            if (
                targetElement.classList.contains('.transition-target') &&
                !targetElement.classList.contains('transition')
            ) {
                if (pcSize) {
                    this.toScroll(scrollY - fadeAnimationOffset - this.pcOffset);
                }
                if (tabletSize) {
                    this.toScroll(scrollY - fadeAnimationOffset - this.tabletOffset);
                }
                if (mobileSize) {
                    this.toScroll(scrollY - fadeAnimationOffset - this.mobileOffset);
                }
            } else {
                if (pcSize) {
                    this.toScroll(scrollY - this.pcOffset);
                }
                if (tabletSize) {
                    this.toScroll(scrollY - this.tabletOffset);
                }
                if (mobileSize) {
                    this.toScroll(scrollY - this.mobileOffset);
                }
            }
        };

        // 対象までの距離
        scrollSetup = () => {
            const targetElement: HTMLElement | null = document.getElementById(this.hash);
            if (!targetElement) {
                console.log('not scroll target');
                return;
            }
            const targetY: number = targetElement.getBoundingClientRect().top;
            this.scrollSizeBranchFunction(targetElement, targetY);
        };
    }

    if (!hash) return;
    const scroll = new Scroll(hash, pcOffset, tabletOffset, mobileOffset);
    // ページ外スクロールの場合
    if (link !== location.pathname || link + '/' === location.pathname) {
        hash = '#to' + hash;
        if (link === '/') {
            link = '';
        }
        window.location.href = `${link}/?pcOffset=${pcOffset}&tabletOffset=${tabletOffset}&mobileOffset=${mobileOffset}${hash}`;
    } else {
        scroll.scrollSetup();
    }
};

// ページ外スクロールの場合
const getParams = (href: string) => {
    const url = new URL(href);
    const params = url.searchParams;
    return [params.get('pcOffset'), params.get('tabletOffset'), params.get('mobileOffset')];
};

export { $smoothScroll, getParams };
