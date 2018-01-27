// @flow
import { escape } from 'lodash';
import { Node } from 'slate';
import slug from 'slug';

/**
 * Convert heading title into a URL slug
 */
export function headingToSlug(node: Node) {
  const level = node.type.replace('heading', 'h');
  return escape(`${level}-${slug(node.text)}-${node.key}`);
}

/**
 * Detect Cmd or Ctrl by platform for keyboard shortcuts
 */
export function isCmdKey(event: SyntheticKeyboardEvent) {
  const isMac = /Mac OS/.test(navigator.userAgent);
  return isMac ? event.metaKey : event.ctrlKey;
}
