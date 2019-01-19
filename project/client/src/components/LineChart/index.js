import React from 'react';
import { scaleLinear  } from 'd3-scale';
import {  max , min } from 'd3-array'
import { connect } from 'react-redux'
import { line as d3Line } from 'd3-shape'
import { withRouter } from 'react-router-dom'
import './index.css'


class LineChart extends React.Component {

    render() {
    
        var data = this.props.git.tickerData

        const width = 1000 , height = 300
        const margin = 20
    
        const h = height - 2 * margin, w = width - 2 * margin
    
        const x = scaleLinear()
        .domain([min(data,d => d.a),max(data, d => d.a)]) 
        .range([margin, w])
        
        const y = scaleLinear()
          .domain([0, max(data, d => d.b)]) 
          .range([h, margin])

        const line = d3Line()
          .x( d => x(d.a))
          .y( d => y(d.b))
         
    
        const yTicks = y.ticks(5).map(d => (
            y(d) > 10 && y(d) < h ? 
              <g transform={`translate(${margin},${y(d)})`}>  
                <line x1='0' x2='5' y1='0' y2='0' transform="translate(-5,0)"/>
                <line className='gridline' x1='0' x2={w - margin} y1='0' y2='0' transform="translate(-5,0)"/> 
              </g>
            : null
        ))
    
        return  (
          <svg width={width} height={height} className='chart'>
             <line className="axis" x1={margin} x2={w} y1={h} y2={h}/>
             <line className="axis" x1={margin} x2={margin} y1={margin} y2={h}/>
             <path d={line(data)}/>
             <g className="axis-labels">
             </g>
             <g className="axis-labels">
             {yTicks}
             </g>
          </svg>
        )
      }
    }

LineChart.PropTypes = {
}

const mapStateToProps = ({ git }) => {
    return {
        git
    }
}

export default withRouter(connect(mapStateToProps,
    {
    })(LineChart))
    