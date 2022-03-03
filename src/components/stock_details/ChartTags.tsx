import { FC } from 'react';
import { chartColors } from '../../store/util';
import { Series } from '../../store/types';

type Props = {
  stockDataForChart: Series[];
};

const ChartTags: FC<Props> = ({ stockDataForChart }) => {
  return (
    <div className="explanation-wrapper">
      {stockDataForChart.map(({ label }, i: number) => {
        return (
          <div className="explanation-item" key={chartColors[i].label}>
            <span
              className="color-ball"
              style={{ backgroundColor: chartColors[i || 0].color }}
            />
            <span>{label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default ChartTags;
