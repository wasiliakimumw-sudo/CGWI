import { useState, useEffect } from 'react';
import { fetchAll, getSiteText, getContactInfo } from '../lib/api';

export function usePrograms() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAll('programs').then(setData).catch(() => setData([])).finally(() => setLoading(false));
  }, []);
  return { data, loading };
}

export function useTestimonials() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAll('testimonials').then(setData).catch(() => setData([])).finally(() => setLoading(false));
  }, []);
  return { data, loading };
}

export function usePartners() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAll('partners').then(setData).catch(() => setData([])).finally(() => setLoading(false));
  }, []);
  return { data, loading };
}

export function useTeamMembers() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchAll('team_members').then(setData).catch(() => setData([])).finally(() => setLoading(false));
  }, []);
  return { data, loading };
}

export function useSiteText(key) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getSiteText(key).then(setData).catch(() => setData(null)).finally(() => setLoading(false));
  }, [key]);
  return { data, loading };
}

export function useContactInfoData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getContactInfo().then(setData).catch(() => setData(null)).finally(() => setLoading(false));
  }, []);
  return { data, loading };
}
