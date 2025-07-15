import { 
  Salad, 
  Apple, 
  Beef,
  Fish,
  EggFried,
  Vegan,
  Tractor,
  Package,
  Donut,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  Salad,
  Apple,
  Beef,
  Fish,
  EggFried,
  Vegan,
  Tractor,
  Donut,
  Package,
};

export function getCategoryIcon(iconName: string){
    const CategoryIcon = iconMap[iconName];
    return CategoryIcon ?? Package;
}