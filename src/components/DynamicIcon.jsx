import React from 'react';
import * as Icons from 'lucide-react';

export default function DynamicIcon({ name, className = 'w-5 h-5', ...props }) {
  const IconComponent = Icons[name] || Icons.Compass;
  return <IconComponent className={className} {...props} />;
}
