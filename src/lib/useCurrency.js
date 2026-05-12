import { useState, useEffect } from 'react';
import { supabase } from './supabase';

export const useCurrency = () => {
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('currency')
          .eq('id', 1)
          .single();
          
        if (data && data.currency) {
          setCurrency(data.currency);
        }
      } catch (err) {
        console.error('Error fetching currency:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrency();
  }, []);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  return { currency, formatPrice, loading };
};
