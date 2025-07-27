"use client"

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useState } from "react";
import { useCacheInvalidation } from "@/hooks/use-cache-invalidation";
import { toast } from "sonner";

interface RefreshButtonProps {
  type?: 'products' | 'collections' | 'layout' | 'all';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children?: React.ReactNode;
}

export const RefreshButton = ({ 
  type = 'all', 
  variant = 'outline', 
  size = 'sm',
  className = '',
  children 
}: RefreshButtonProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { invalidateProducts, invalidateCollections, invalidateLayout, invalidateAll } = useCacheInvalidation();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      switch (type) {
        case 'products':
          await invalidateProducts();
          toast.success('Product data refreshed');
          break;
        case 'collections':
          await invalidateCollections();
          toast.success('Collection data refreshed');
          break;
        case 'layout':
          await invalidateLayout();
          toast.success('Layout data refreshed');
          break;
        case 'all':
        default:
          await invalidateAll();
          toast.success('All data refreshed');
          break;
      }
    } catch (error) {
      console.error('Refresh error:', error);
      toast.error('Failed to refresh data');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleRefresh}
      disabled={isRefreshing}
      className={className}
    >
      <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''} ${children ? 'mr-2' : ''}`} />
      {children || 'Refresh'}
    </Button>
  );
}; 