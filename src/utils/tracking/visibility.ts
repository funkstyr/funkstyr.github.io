type VisibilityOptions = {
  target: Element;
  threshold?: number;
  once?: boolean;
  onVisible: (elapsedMs: number) => void;
};

export function observeVisibility(opts: VisibilityOptions): () => void {
  const startedAt = Date.now();
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          opts.onVisible(Date.now() - startedAt);
          if (opts.once) observer.disconnect();
        }
      }
    },
    { threshold: opts.threshold ?? 0 },
  );
  observer.observe(opts.target);
  return () => observer.disconnect();
}
