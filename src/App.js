import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';
import ReactDOM from 'react-dom';
import axios from 'axios'
import randomcolor from 'randomcolor'
import defaultExport from 'module'
import { Chart } from "react-google-charts"
class App extends React.Component {
  constructor()
  {
  super()
  this.state = {
    stockData:[],
    stockName: "",
    li:[],
    Combined: [],
    value: ''
  };
  this.handleSubmit = this.handleSubmit.bind(this)
  this.handleChange = this.handleChange.bind(this)
  
}
async componentDidMount() {
    this.getStock(this.state.li);
    var Combined = new Array();
      this.state.Combined[0] = ['Stock Name', 'Stock Value',{ role: "style" }];
      var randomColor = require('randomcolor'); // import the script
      var color = randomColor();
      for (var i = 0; i < this.state.li.length; i++){
        this.state.Combined[i + 1] = [this.state.li[i], this.state.stockData[i], `color: ${color}` ];
        
    }
    this.interval = setInterval(() => {
      this.getStock(this.state.li);
      var Combined = new Array();
      color = randomColor();
      this.state.Combined[0] = ['Stock Name', 'Stock Value',{ role: "style" }];
      for (var i = 0; i < this.state.li.length; i++){
        this.state.Combined[i + 1] = [this.state.li[i], this.state.stockData[i], `color: ${color}`  ];    
    }
    }, 5000);
  }

getStock= async (symbols) => {
    let term = "AAPL";
    let urllist=[]
    //let symbols=["AAPL","IBM","MSFT"]
    const key = 'brmkjn7rh5re15om60gg';
    const url_finnhub="https://finnhub.io/api/v1/quote?symbol=AAPL&token=bq3klmvrh5rb0pdpe5ng"
    for await (const sym of symbols){
      
        const url_finnhub=`https://finnhub.io/api/v1/quote?symbol=${sym}&token=bq3klmvrh5rb0pdpe5ng`
        const axios = require('axios');
        const st=await axios.get(url_finnhub)
        let current = parseFloat(st.data.c)
        urllist.push(current)
    }
    console.log({urllist})
    this.setState({
      stockData:urllist
    })

      
  
    

}
componentWillUnmount() {
   clearInterval(this.interval);
 }

handleSubmit(event){
    const symbolName=event.target.value
    event.preventDefault();
    this.setState({
      li: [
        ...this.state.li, // spread out the existing li
        this.state.stockName // append this newListItem at the end of this array
      ]
    });



}

handleChange(event) {
  this.setState({ stockName: event.target.value })
}

render() {
  const { li } = this.state
  
  return (
        
        <div>
          <div>
            <form>
            <input
              type="text" 
              value={this.state.stockName} 
              name="stockName" 
              placeholder="Enter Stock Symbol " 
              onChange={this.handleChange}
            />
            <button onClick={this.handleSubmit}>Add Stock!</button>
            </form>
          </div>
          <div>
          <ul>
        {li.map((e,i) => (
          <li key={i}>{e}</li>
        ))}
      </ul>
        </div>
        
        <div className="bar">
        <Chart chartType="BarChart" width="100%" height="400px" data={this.state.Combined} />
      </div>
          
      
     </div>
        
      );

  }
}
export default App