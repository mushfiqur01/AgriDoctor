import { useLanguage } from '@/contexts/LanguageContext';

interface CropIconProps {
  icon: string;
  name: string;
  delay: number;
}

function CropIcon({ icon, name, delay }: CropIconProps) {
  const { language } = useLanguage();
  
  return (
    <div 
      className="flex flex-col items-center gap-2 animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="crop-icon bg-secondary hover:bg-primary/10">
        <span className="animate-float" style={{ animationDelay: `${delay * 2}ms` }}>
          {icon}
        </span>
      </div>
      <span className={`text-sm font-medium text-muted-foreground ${language === 'bn' ? 'font-bangla' : ''}`}>
        {name}
      </span>
    </div>
  );
}

export function CropIcons() {
  const { t } = useLanguage();
  
  const crops = [
    { icon: '🌽', nameKey: 'home.corn', delay: 100 },
    { icon: '🥔', nameKey: 'home.potato', delay: 200 },
    { icon: '🌾', nameKey: 'home.wheat', delay: 300 },
  ];

  return (
    <div className="flex items-center justify-center gap-6">
      {crops.map((crop) => (
        <CropIcon
          key={crop.nameKey}
          icon={crop.icon}
          name={t(crop.nameKey)}
          delay={crop.delay}
        />
      ))}
    </div>
  );
}
