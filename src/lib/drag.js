export function startMouseDrag(event, target, hook) {
  const offsetX = (target.parentNode.scrollLeft - target.parentNode.getBoundingClientRect().left + event.clientX) - target.offsetLeft;
  const offsetY = (target.parentNode.scrollTop - target.parentNode.getBoundingClientRect().top + event.clientY) - target.offsetTop;

  const onMove = (event) => _onMove(target, offsetX, offsetY, event.clientX, event.clientY, hook);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseup", () => {
    window.removeEventListener("mousemove", onMove);
    target.style.opacity = "";
  });
}

export function startTouchDrag(event, target, hook) {
  event.preventDefault();

  const offsetX = (target.parentNode.scrollLeft - target.parentNode.getBoundingClientRect().left + event.touches[0].clientX) - target.offsetLeft;
  const offsetY = (target.parentNode.scrollTop - target.parentNode.getBoundingClientRect().top + event.touches[0].clientY) - target.offsetTop;

  const onMove = (event) => {
    event.preventDefault();
    _onMove(target, offsetX, offsetY, event.touches[0].clientX, event.touches[0].clientY, hook);
  };

  window.addEventListener("touchmove", onMove, {passive: false});
  window.addEventListener("touchend", () => {
    window.removeEventListener("touchmove", onMove);
    target.style.opacity = "";
    return true;
  });
}

function _onMove(target, offsetX, offsetY, clientX, clientY, hook) {
  const left = Math.max((target.parentNode.scrollLeft - target.parentNode.getBoundingClientRect().left + clientX) - offsetX, 10);
  const top = Math.max((target.parentNode.scrollTop - target.parentNode.getBoundingClientRect().top + clientY) - offsetY, 10);

  target.style.opacity = "0.7";
  hook(left, top);
}
