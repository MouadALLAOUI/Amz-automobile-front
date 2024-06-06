import { ResponsiveBar } from '@nivo/bar';

const MyResponsiveBar = ({
  data = [{}],
  keys = [''],
  indexBy = '',
  margin_top= 50,
  margin_right= 130,
  margin_bottom= 50,
  margin_left=60,
  padding = 0.1,
  borderRadius= 5,
  borderWidth= 1,
  borderColor="#222",
  legend_b_position= "middle",
  legend_left= "left",
  legend_l_position= "middle",
}) => (
  <ResponsiveBar
    data={data}
    keys={keys}
    indexBy={indexBy}
    margin={{ top: margin_top, right: margin_right, bottom: margin_bottom, left: margin_left }}
    padding={padding}
    borderRadius={borderRadius}
    borderWidth={borderWidth}
    borderColor={borderColor}
    axisTop={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: null,
    }}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: indexBy,
      legendPosition: legend_b_position,
      legendOffset: 30,
      truncateTickAt: 0,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: legend_left,
      legendPosition: legend_l_position,
      legendOffset: -40,
      truncateTickAt: 0,
    }}
    legends={[
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: -100,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.7,
        symbolSize: 30,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ]}
  />
);

export default MyResponsiveBar;
