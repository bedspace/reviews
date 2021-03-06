import React from 'react';
import Overbar from  './Overbar.jsx'
import ScoreOverview from './ScoreOverview.jsx'
import ReviewList from './ReviewList.jsx'
import Searchbar from './Searchbar.jsx'
import styles from '../styles/appStyle.css'
import StarDisplay from './starDisplay.jsx'


class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      data:props.data,
      searchQuery: null,
      searchMode: false,
      currentQuery: null
    }
    this.handleSearchKeystroke = this.handleSearchKeystroke.bind(this);
    this.returnFromSearchMode = this.returnFromSearchMode.bind(this);
  }
  handleSearchKeystroke (event) {
    if(event.key === 'Enter'){
      this.setState({searchMode: true, currentQuery: this.state.searchQuery}, () => {
        console.log('searchmode? : ' + this.state.searchMode);
        fetch(`http://localhost:9999/${this.props.listing}/${this.state.searchQuery}/`)
        .then(response => response.json())
        .then(data => {
          this.setState({data:data})
        })
      })
    }
    else {this.setState({searchQuery: event.target.value}, () => {console.log('query? : ' + this.state.searchQuery)});
  }
}
  returnFromSearchMode (event) {

    this.setState({searchQuery: null,
      searchMode: false,
      data: this.props.data
    }, () => {console.log(this.state.searchMode)})
  }
  render() {
    if ((this.state.searchMode === true) && (this.state.data === 'No reviews match your search!') ) {
      return (<div className={styles.primary}>
        <div className={styles.flexRow}>
        <h1>{this.props.data.length - 1} Reviews</h1>
        <StarDisplay starCount={this.props.data[0].review_score}/>
        <Searchbar className={styles.backRow} onKeystroke={this.handleSearchKeystroke}/>

        </div>

        <div>
          None of our guests have mentioned  "{this.state.currentQuery}"
          <a href="#" onClick={this.returnFromSearchMode}>      Back to all reviews</a>
        </div>

      </div>)
    }
     else if (this.state.searchMode === true) {
       console.log(this.state.data)
        return (<div className={styles.primary}>
          <div className={styles.flexRow} >
          <h1>{this.props.data.length - 1} Reviews</h1>
            <StarDisplay starCount={this.props.data[0].review_score}/>
            <Searchbar onKeystroke={this.handleSearchKeystroke}/>
          </div>

          <div>
            {this.state.data.length-1} of our guests have mentioned {this.state.currentQuery}
            <a href="#" onClick={this.returnFromSearchMode}>      Back to all reviews</a>
            <ReviewList data={this.state.data} />
          </div>

        </div>)
      }
      else {
        return (
        <div className={styles.primary} >
          <div className={styles.flexRow}>
            <h1>{this.props.data.length - 1} Reviews
            </h1>
            <StarDisplay starCount={this.props.data[0].review_score}/>
            <Searchbar onKeystroke={this.handleSearchKeystroke}/>
          </div>

          <div>
            <ScoreOverview listingData={this.props.data[0]}/>
          </div>

          <div>
            <ReviewList data={this.state.data} />
          </div>

        </div>)
      }
  }
};
export default App;




// import StarDisplay from  './starDisplay.jsx'
// import React from 'react';
// import Searchbar from './Searchbar.jsx'
// import styles from '../styles/overbarStyle.css'
// function Overbar (props) {
//   return (<div className={styles.overbar}>
//     <span>

//     <strong>{props.reviewCount} Reviews</strong>
//     </span>
//     <span>
//     <StarDisplay starCount={props.reviewScore}/>
//     </span>
//   </div>
//   )
// }