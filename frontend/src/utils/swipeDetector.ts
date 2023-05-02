let initialX: number | null = null;
let initialY: number | null = null;

export function initTouch(
  e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
) {
  const touchEvent = e as React.TouchEvent;
  initialX = touchEvent.touches
    ? touchEvent.touches[0].clientX
    : (e as React.MouseEvent).clientX;
  initialY = touchEvent.touches
    ? touchEvent.touches[0].clientY
    : (e as React.MouseEvent).clientY;
}

export function swipeDirection(
  e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  swipeTopEvents?: () => void,
  swipeDownEvents?: () => void,
  swipeRightEvents?: () => void,
  swipeLeftvents?: () => void
) {
  if (initialX !== null && initialY !== null) {
    const touchEvent = e as React.TouchEvent;
    const currentX = touchEvent.touches
      ? touchEvent.touches[0].clientX
      : (e as React.MouseEvent<HTMLDivElement>).clientX;
    const currentY = touchEvent.touches
      ? touchEvent.touches[0].clientY
      : (e as React.MouseEvent<HTMLDivElement>).clientY;

    let diffX = initialX - currentX;
    let diffY = initialY - currentY;

    if (Math.abs(diffX) < Math.abs(diffY))
      diffY > 0 ? swipeTopEvents?.() : swipeDownEvents?.();
    else diffX > 0 ? swipeRightEvents?.() : swipeLeftvents?.();
    initialX = null;
    initialY = null;
  }
}
