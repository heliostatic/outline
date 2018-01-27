// @flow
import React from 'react';
import { Document } from 'slate';
import type { SlateNodeProps } from '../types';
import styled from 'styled-components';
import { headingToSlug } from '../utils';
import Placeholder from './Placeholder';

type Props = SlateNodeProps & {
  component: string,
  className: string,
  placeholder: string,
};

function Heading(props: Props) {
  const {
    parent,
    placeholder,
    node,
    editor,
    readOnly,
    children,
    component = 'h1',
    className,
    attributes,
  } = props;
  const parentIsDocument = parent instanceof Document;
  const firstHeading = parentIsDocument && parent.nodes.first() === node;
  const showPlaceholder = placeholder && firstHeading && !node.text;
  const slugish = headingToSlug(node);
  const showHash = readOnly && !!slugish;
  const Component = component;
  const emoji = editor.props.emoji || '';
  const title = node.text.trim();
  const startsWithEmojiAndSpace =
    emoji && title.match(new RegExp(`^${emoji}\\s`));

  return (
    <Component {...attributes} id={slugish} className={className}>
      <Wrapper hasEmoji={startsWithEmojiAndSpace}>{children}</Wrapper>
      {showPlaceholder && (
        <Placeholder contentEditable={false}>
          {editor.props.placeholder}
        </Placeholder>
      )}
      {showHash && (
        <Anchor name={slugish} href={`#${slugish}`}>
          #
        </Anchor>
      )}
    </Component>
  );
}

const Wrapper = styled.div`
  display: inline;
  margin-left: ${(props: SlateNodeProps) => (props.hasEmoji ? '-1.2em' : 0)};
`;

const Anchor = styled.a`
  visibility: hidden;
  padding-left: 0.25em;
  color: #dedede;

  &:hover {
    color: #cdcdcd;
  }
`;

export const StyledHeading = styled(Heading)`
  position: relative;

  &:hover {
    ${Anchor} {
      visibility: visible;
      text-decoration: none;
    }
  }
`;
export const Heading1 = (props: SlateNodeProps) => (
  <StyledHeading component="h1" {...props} />
);
export const Heading2 = (props: SlateNodeProps) => (
  <StyledHeading component="h2" {...props} />
);
export const Heading3 = (props: SlateNodeProps) => (
  <StyledHeading component="h3" {...props} />
);
export const Heading4 = (props: SlateNodeProps) => (
  <StyledHeading component="h4" {...props} />
);
export const Heading5 = (props: SlateNodeProps) => (
  <StyledHeading component="h5" {...props} />
);
export const Heading6 = (props: SlateNodeProps) => (
  <StyledHeading component="h6" {...props} />
);
