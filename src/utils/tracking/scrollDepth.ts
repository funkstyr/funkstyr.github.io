type ScrollDepthOptions = {
  milestones?: readonly number[];
  onMilestone: (depth: number, elapsedMs: number) => void;
};

function getScrollPercent(): number {
  const h = document.documentElement;
  const b = document.body;
  const scrollTop = h.scrollTop || b.scrollTop;
  const scrollHeight = h.scrollHeight || b.scrollHeight;
  const denominator = scrollHeight - h.clientHeight;
  if (denominator <= 0) return 0;
  return (scrollTop / denominator) * 100;
}

export function observeScrollDepth(opts: ScrollDepthOptions): () => void {
  const milestones = opts.milestones ?? [25, 50, 75, 100];
  const startedAt = Date.now();
  const tracked = new Set<number>();
  let rafHandle = 0;

  function check() {
    const percent = getScrollPercent();
    for (const depth of milestones) {
      if (percent >= depth && !tracked.has(depth)) {
        tracked.add(depth);
        opts.onMilestone(depth, Date.now() - startedAt);
      }
    }
  }

  function onScroll() {
    if (rafHandle) return;
    rafHandle = requestAnimationFrame(() => {
      check();
      rafHandle = 0;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
    if (rafHandle) cancelAnimationFrame(rafHandle);
  };
}
