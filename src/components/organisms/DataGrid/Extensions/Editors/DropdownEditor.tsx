import React from 'react';
import { textEditorClassname } from './TextEditor';
import type { EditorProps } from '../..';

const titles = ['Dr.', 'Mr.', 'Mrs.', 'Miss', 'Ms.'] as const;

export function DropdownEditor({ row, onRowChange }: EditorProps<any>) {
  return (
    <select
      className={textEditorClassname}
      value={row.title}
      onChange={event =>
        onRowChange({ ...row, title: event.target.value }, true)
      }
      autoFocus
    >
      {titles.map(title => (
        <option key={title} value={title}>
          {title}
        </option>
      ))}
    </select>
  );
}
