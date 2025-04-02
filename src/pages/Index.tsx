
import Dashboard from './Dashboard';
import { useEffect } from 'react';
import { useFontSize } from '@/hooks/use-font-size';

const Index = () => {
  // Initialize font size on app start
  const { fontSize } = useFontSize();
  
  useEffect(() => {
    // Apply initial font size
    document.documentElement.style.fontSize = `${fontSize / 16}rem`;
  }, [fontSize]);
  
  return <Dashboard />;
};

export default Index;
