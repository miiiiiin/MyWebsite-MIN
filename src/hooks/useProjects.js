import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { portfolioData as staticData } from '../data/portfolioData';

export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const { data, error: supabaseError } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (supabaseError) throw supabaseError;

        if (data && data.length > 0) {
          // Supabase 데이터가 있으면 사용
          setProjects(data);
        } else {
          // 데이터가 없으면 정적 데이터 사용
          setProjects(staticData);
        }
      } catch (err) {
        console.error('Error fetching projects:', err);
        setError(err.message);
        // 에러 발생 시 정적 데이터로 폴백
        setProjects(staticData);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return { projects, loading, error };
};
