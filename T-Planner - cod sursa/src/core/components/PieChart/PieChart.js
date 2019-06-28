import React, { Component } from 'react';

import styles from './PieChart.module.scss';
import { thisExpression } from '@babel/types';

class PieChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            slices:  []
        }
    }

    componentDidMount() {
        const { slices } = this.props;

        this.setState({ slices });
    }

    componentDidUpdate(prevProps) {
        const { slices } = this.props;
        if (JSON.stringify(slices) !== JSON.stringify(prevProps.slices)) {
            this.setState({ slices })
        }
    }

    getCoordinatesByPercent = (percent) => {
        const x = Math.cos(2 * Math.PI * percent);
        const y = Math.sin(2 * Math.PI * percent);

        return [x, y];
    }

    displaySlices = (slices) => {
        let cumulativePercent = 0;
        const mappedSlices = slices.map(slice => {
            const [startX, startY] = this.getCoordinatesByPercent(cumulativePercent);
            const [endX, endY] = this.getCoordinatesByPercent(cumulativePercent + slice.percent);
            const largeArcFlag = slice.percent > .5 ? 1 : 0;
            slice.pathData = [
                `M ${startX} ${startY}`, // Move
                `A 1 1 0 ${largeArcFlag} 1 ${endX} ${endY}`, // Arc
                `L 0 0`, // Line
            ].join(' ');
            cumulativePercent = cumulativePercent + slice.percent;
            return slice;
        })
        return (
            <>
            {mappedSlices.map(slice => (
                <path key={slice.value} d={slice.pathData} fill={slice.color} />
            ))}
            </>
        )
        
    }

    render() {
      const { slices } = this.state;
      const { parentValue } = this.props;
      return (
          <div>
            <svg viewBox="-1 -1 2 2" style={{ transform: "rotate(-90deg)", backgroundColor: 'gray', borderRadius: '50%'}}>
                {this.displaySlices(slices)}
            </svg>
            <div className={styles.legend}>
                <div><div style={{backgroundColor: 'gray', width: '10px', height: '10px ', display: 'inline-flex'}}/> {parentValue}</div>
                {slices.map(slice => (
                    <div key={slice.value}><div style={{backgroundColor: slice.color, width: '10px', height: '10px ', display: 'inline-flex'}}/> {slice.value}</div>
                ))}
            </div>
          </div>
      )
    }
};

export default PieChart;