import React from 'react';
import { scaleBand, scaleLinear , scaleOrdinal } from 'd3-scale';
import { csvParse } from 'd3-dsv';
import { extent, max , min } from 'd3-array'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { line as d3Line } from 'd3-shape'
import { withRouter } from 'react-router-dom'
import './index.css';
import './index.css'
import { format } from 'path';


class LineChart extends React.Component {
    constructor(props){
        super(props)
    }
    

    render() {
    
        var data = this.props.git.tickerData

        const width = 1000 , height = 300
        const margin = 20
    
        const h = height - 2 * margin, w = width - 2 * margin
    
        //x scale
        const x = scaleLinear()
        .domain([min(data,d => d.a),max(data, d => d.a)]) // domain [0,max] of b (start from 0)
        .range([margin, w])
        
        //y scale
        const y = scaleLinear()
          .domain([0, max(data, d => d.b)]) // domain [0,max] of b (start from 0)
          .range([h, margin])
        
        //line generator: each point is [x(d.a), y(d.b)] where d is a row in data
        // and x, y are scales (e.g. x(10) returns pixel value of 10 scaled by x)
        const line = d3Line()
          .x( d => x(d.a))
          .y( d => y(d.b))
         
        const xTicks = x.ticks(6).map(d => (
            x(d) > margin && x(d) < w ? 
              <g transform={`translate(${x(d)},${h + margin})`}>  
                <text>{d}</text>
                <line x1='0' x1='0' y1='0' y2='5' transform="translate(0,-20)"/>
              </g>
            : null
        ))
    
        const yTicks = y.ticks(5).map(d => (
            y(d) > 10 && y(d) < h ? 
              <g transform={`translate(${margin},${y(d)})`}>  
                <text x="-12" y="5">{d}</text>
                <line x1='0' x1='5' y1='0' y2='0' transform="translate(-5,0)"/>
                <line className='gridline' x1='0' x1={w - margin} y1='0' y2='0' transform="translate(-5,0)"/> 
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
    