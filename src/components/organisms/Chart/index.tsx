import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { css } from '@emotion/react';
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';
import { init, use, getInstanceByDom } from 'echarts/core';
import {
  BarChart,
  PieChart,
  LineChart,
  GaugeChart,
  ScatterChart,
  CandlestickChart,
} from 'echarts/charts';
import {
  TitleComponent,
  LegendComponent,
  GridComponent,
  TooltipComponent,
  TooltipComponentOption,
  MarkLineComponent,
  MarkAreaComponent,
  MarkPointComponent,
  DataZoomComponent,
  GraphicComponent,
  GraphicComponentOption,
} from 'echarts/components';
import type { ECharts, ComposeOption, SetOptionOpts } from 'echarts/core';
import type {
  BarSeriesOption,
  PieSeriesOption,
  LineSeriesOption,
  GaugeSeriesOption,
  ScatterSeriesOption,
} from 'echarts/charts';
import _ from 'lodash';
import { CandlestickSeriesOption } from 'echarts';

use([
  CanvasRenderer,
  SVGRenderer,
  BarChart,
  PieChart,
  LineChart,
  GaugeChart,
  ScatterChart,
  TitleComponent,
  LegendComponent,
  GridComponent,
  TooltipComponent,
  MarkLineComponent,
  MarkAreaComponent,
  MarkPointComponent,
  DataZoomComponent,
  GraphicComponent,
  CandlestickChart,
]);

export type BaseSeriesOption = ComposeOption<
  | BarSeriesOption
  | PieSeriesOption
  | LineSeriesOption
  | GaugeSeriesOption
  | ScatterSeriesOption
  | GraphicComponentOption
  | TooltipComponentOption
  | CandlestickSeriesOption
>;

export interface BaseChartProps {
  theme?: 'light' | 'dark';
  option?: any;
  loading?: boolean;
  settings?: SetOptionOpts;
  className?: string;
  onLoaded?: () => void;
}

export type ChartHandle = {
  echarts: () => ECharts | undefined;
  dataZoom?: () => void;
  export?: (fileName: string) => void;
};

export const BaseChart = forwardRef(
  (
    { theme, option, loading, settings, className, onLoaded }: BaseChartProps,
    _ref: React.Ref<ChartHandle>,
  ): JSX.Element => {
    let chart: ECharts | undefined;
    const chartRef = useRef<HTMLDivElement>(null);

    useImperativeHandle(_ref, () => ({
      echarts() {
        return chart;
      },
      export(fileName: string) {
        console.log(fileName);
      },
      dataZoom() {
        chart?.on('dataZoom', function (event: any) {
          if (event.batch) {
            option.dataZoom[0].start = event.batch[0].start;
            option.dataZoom[1].start = event.batch[0].start;
            option.dataZoom[0].end = event.batch[0].end;
            option.dataZoom[1].end = event.batch[0].end;
          } else {
            option.dataZoom[0].start = event.start;
            option.dataZoom[1].start = event.start;
            option.dataZoom[0].end = event.end;
            option.dataZoom[1].end = event.end;
          }
        });
      },
    }));

    useEffect(() => {
      if (chartRef.current !== null) {
        chart = init(chartRef.current, theme, { renderer: 'canvas' });
      }

      function resizeChart() {
        chart?.resize();
      }

      window.addEventListener('resize', resizeChart);

      return () => {
        chart?.dispose();
        window.removeEventListener('resize', resizeChart);
      };
    }, [theme]);

    useEffect(() => {
      if (!option.backgroundColor) option.backgroundColor = 'rgba(0,0,0,0)';

      if (chartRef.current !== null) {
        chart = getInstanceByDom(chartRef.current);
        chart?.setOption(option, settings);

        onLoaded && onLoaded();
      }

      return () => {
        chart?.clear();
      };
    }, [option, settings, theme]);

    useEffect(() => {
      if (chartRef.current !== null) {
        const chart = getInstanceByDom(chartRef.current);

        loading === true ? chart?.showLoading() : chart?.hideLoading();
      }
    }, [loading, theme]);

    return <div className={className} ref={chartRef} />;
  },
);
