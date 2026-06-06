import { supabase } from './supabase';

// ========== AUTH ==========
export async function signIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signUp(email, password) {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getSession() {
  const { data } = await supabase.auth.getSession();
  return data.session;
}

// ========== GENERIC CRUD ==========
export async function fetchAll(table, orderBy = { column: 'id', ascending: true }) {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order(orderBy.column, { ascending: orderBy.ascending });
  if (error) throw error;
  return data || [];
}

export async function fetchById(table, id) {
  const { data, error } = await supabase.from(table).select('*').eq('id', id).single();
  if (error) throw error;
  return data;
}

export async function createRecord(table, record) {
  const { data, error } = await supabase.from(table).insert(record).select().single();
  if (error) throw error;
  return data;
}

export async function updateRecord(table, id, record) {
  const { data, error } = await supabase
    .from(table)
    .update({ ...record, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function deleteRecord(table, id) {
  const { error } = await supabase.from(table).delete().eq('id', id);
  if (error) throw error;
  return true;
}

// ========== SITE TEXTS (key-value) ==========
export async function getSiteText(key) {
  const { data, error } = await supabase.from('site_texts').select('value').eq('key', key).single();
  if (error && error.code === 'PGRST116') return null;
  if (error) throw error;
  return data?.value || null;
}

export async function setSiteText(key, value) {
  const { data, error } = await supabase
    .from('site_texts')
    .upsert({ key, value, updated_at: new Date().toISOString() })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getAllSiteTexts() {
  const { data, error } = await supabase.from('site_texts').select('*');
  if (error) throw error;
  return data || [];
}

// ========== CONTACT INFO ==========
export async function getContactInfo() {
  const { data, error } = await supabase.from('contact_info').select('*').limit(1).single();
  if (error && error.code === 'PGRST116') return null;
  if (error) throw error;
  return data;
}

export async function updateContactInfo(id, record) {
  const { data, error } = await supabase
    .from('contact_info')
    .update({ ...record, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ========== GALLERY ==========
export async function addGalleryImage(record) {
  const { data, error } = await supabase.from('gallery_images').insert(record).select().single();
  if (error) throw error;
  return data;
}
