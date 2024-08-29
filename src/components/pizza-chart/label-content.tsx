import { memo } from 'react';

export const LabelContent = memo(({ viewBox, total }: { viewBox?: { cx: number; cy: number }; total: number }) => {
  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
    return (
      <text x={viewBox.cx} y={viewBox.cy} textAnchor='middle' dominantBaseline='middle'>
        <tspan x={viewBox.cx} y={viewBox.cy} className='fill-foreground text-2xl font-bold'>
          {total.toLocaleString()}
        </tspan>
        <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className='fill-muted-foreground'>
          Total
        </tspan>
      </text>
    );
  }
});
