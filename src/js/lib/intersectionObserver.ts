const intersectionObserver = (targets: NodeListOf<Element>): void => {
    const options = {
        // 交差監視をする枠（ルート要素）nullはビューポート
        root: null,
        // rootからの距離 px
        rootMargin: '0px',
        // 発火に必要な、交差する要素の割合 %
        threshold: 0,
    };

    const callback = (entries: any, object: any) => {
        entries.forEach((entry: any) => {
            // isIntersectingで交差判定
            if (!entry.isIntersecting) return;
            entry.target.classList.add('transition');
            // 交差が終われば監視解除
            object.unobserve(entry.target);
        });
    };

    const observer: IntersectionObserver = new IntersectionObserver(callback, options);

    targets.forEach((element: Element) => {
        // 監視開始
        observer.observe(element);
    });
};
export { intersectionObserver };
