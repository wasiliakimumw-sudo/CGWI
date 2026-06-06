import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

function useFetch(table) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from(table).select('*').order('id', { ascending: true })
      .then(r => { if (!r.error) setData(r.data || []); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}

export const usePrograms = () => useFetch('programs');
export const useTestimonials = () => useFetch('testimonials');
export const usePartners = () => useFetch('partners');
export const useTeamMembers = () => useFetch('team_members');

export function useSiteText(key) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('site_texts').select('value').eq('key', key).single()
      .then(r => { if (!r.error) setData(r.data?.value); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [key]);
  return { data, loading };
}

export function useContactInfoData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.from('contact_info').select('*').limit(1).single()
      .then(r => { if (!r.error) setData(r.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);
  return { data, loading };
}
