type LinkClickInfo = {
  href: string;
  el: HTMLAnchorElement;
};

type LinkClickOptions = {
  root: Element;
  filter?: (href: string) => boolean;
  onClick: (info: LinkClickInfo) => void;
};

export function trackLinkClicks(opts: LinkClickOptions): () => void {
  function handler(event: Event) {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const anchor = target.closest("a");
    if (!(anchor instanceof HTMLAnchorElement)) return;
    if (!opts.root.contains(anchor)) return;
    if (opts.filter && !opts.filter(anchor.href)) return;
    opts.onClick({ href: anchor.href, el: anchor });
  }
  document.addEventListener("click", handler);
  return () => document.removeEventListener("click", handler);
}
