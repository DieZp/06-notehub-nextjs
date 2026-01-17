// app/types/types.ts

type NoteTag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

interface NoteFormValues {
  title: string;
  content?: string;
  tag: NoteTag;
}

export type { Note, NoteFormValues, NoteTag };