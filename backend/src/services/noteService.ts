import Note from '../models/Note';

export const createNoteService = async (
  title: string,
  content: string,
  user_id: string,
  category_id: string,
) => {
  return await Note.create({ title, content, user_id, category_id });
};

export const getNotesService = async () => {
  return await Note.findAll();
};

export const getNoteByIdService = async (id: string) => {
  return await Note.findByPk(id);
};

export const updateNoteService = async (
  id: string,
  title?: string,
  content?: string,
  category_id?: string,
) => {
  const note = await Note.findByPk(id);
  if (!note) return null;

  if (title) note.title = title;
  if (content) note.content = content;
  if (category_id) note.category_id = category_id;

  await note.save();
  return note;
};

export const deleteNoteService = async (id: string) => {
  const note = await Note.findByPk(id);
  if (!note) return null;

  await note.destroy();
  return true;
};
