export function formatDate({year, month, date}) {
  const current = new Date();
  const provided = new Date(year, month, date);
  current.setHours(0, 0, 0, 0);
  const difference = (provided.getTime() - current.getTime()) / (1000 * 3600 * 24);

  if (difference === -1) {
    return "Yesterday";
  } else if (difference === 0) {
    return "Today";
  } else if (difference === 1) {
    return "Tomorrow";
  } else if (difference >= 7) {
    return provided.toLocaleString("default", {"weekday": "long"});
  } else {
    return provided.toLocaleString("default", {"month": "short", "day": "numeric"});
  }
}

export function formatTime({hours, minutes}) {
  if (hours > 12) {
    return `${hours-12}:${minutes} PM`;
  } else {
    return `${hours}:${minutes} AM`;
  }
}
