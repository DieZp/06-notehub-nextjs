// app/components/NoteForm/NoteForm.tsx

import css from './NoteForm.module.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { createNote } from '@/lib/api';
import type { NoteFormValues } from '../../types/note';

interface NoteFormProps {
  readonly onCloseModal: () => void;
}
function NoteForm({ onCloseModal }: NoteFormProps) {
  const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo',
  };

  const queryClient = useQueryClient();

  const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      onCloseModal();
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note created successfully!');
    },
    onError: () => {
      toast.error('Failed to create the note. Please try again.');
    },
  });

  function handleSubmit(values: NoteFormValues): void {
    createNoteMutation.mutate(values);
  }

  const NoteFormSchema = Yup.object().shape({
    title: Yup.string()
      .min(3, 'Title must be between 3 and 50 characters')
      .max(50, 'Title must be between 3 and 50 characters')
      .required('Title is required'),
    content: Yup.string().max(500, 'Content can contain up to 500 characters'),
    tag: Yup.string()
      .oneOf(['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'], 'Invalid tag')
      .required('Tag is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={NoteFormSchema}
      onSubmit={handleSubmit}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field type="text" id="title" name="title" className={css.input} />
          <ErrorMessage name="title" component={'p'} className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows={8}
            className={css.textarea}
          />
          <ErrorMessage name="content" component={'p'} className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component={'p'} className={css.error} />
        </div>

        <div className={css.actions}>
          <button
            type="button"
            className={css.cancelButton}
            onClick={onCloseModal}
            disabled={createNoteMutation.isPending}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={createNoteMutation.isPending}
          >
            Create note
          </button>
        </div>
      </Form>
    </Formik>
  );
}

export default NoteForm;