import type { Maybe } from '../Types';

export function stopPropagation(event: React.SyntheticEvent) {
  event.stopPropagation();
}

export function scrollIntoView(element: Maybe<HTMLDivElement>) {
  element?.scrollIntoView({ inline: 'nearest', block: 'nearest' });
}
