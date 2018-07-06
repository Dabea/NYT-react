import React, {Component } from 'react';
import axios from 'axios';
import "./search.css";


class Search extends Component {

    state = {
        searchTopic: "test",
        startYear: "",
        endYear: "",
        storyies: [],
        savedStories: [
            { headline: "My saved story" , savedDate: "10/28/2010"},
            { headline: "Another saved story" , savedDate: "10/28/2010" } 
        ]
    }

    componentDidMount() {
            this.loadSavedStories();
    }

    loadSavedStories = () => {
      axios.get("/api/stories").then( res => {
          console.log(res);
      }
          
      )
    }

    removeStory = (index) => {
        if(this.state.savedStories.length === 1){
            this.setState(  {
                savedStories: []
            });
        }else {
            this.setState(  {
                savedStories: this.state.savedStories.splice(index, 1 )
            });
        }
    }

    buildQueryURL = () => {
        let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        queryURL += "?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

        queryURL += "&q=" + this.state.searchTopic;
      
        var startYear = this.state.startYear;
      
        if (parseInt(startYear)) {
          queryURL += "&begin_date=" + startYear + "0101";
        }

        var endYear = this.state.endYear
      
        if (parseInt(endYear)) {
          queryURL += "&end_date=" + endYear + "0101";
        }
        axios.get(queryURL).then(res => {
            console.log(res.data.response.docs)
            this.setState({
                storyies: res.data.response.docs
            });
        })
        return queryURL;
      };

    
      
    updateInputValue = (evt)  => {
        this.setState({
            searchTopic: evt.target.value
        });
    };

    updateInputStartYear = (evt)  => {
        this.setState({
            startYear: evt.target.value
        });
    };

    updateInputEndYear = (evt)  => {
        this.setState({
            endYear: evt.target.value
        });
    };
     

    render() {
        const Mystyle = {
            "border": "1px solid black",
            "margin": "15px"
          }
       
        return (
            <div>
                <div  className="panel" >
                    <div className="panel-header" >
                        <span> Search </span>
                    </div>    
                    <div>
                        <label> Topic </label>
                        <input value={this.state.searchTopic} onChange={(event) =>this.updateInputValue(event)} />
                    </div>
                    <div>
                        <label> start Year </label>
                        <input value={this.state.startYear} onChange={(event) =>this.updateInputStartYear(event)} />
                    </div>
                    <div>
                        <label> end Year </label>
                        <input value={this.state.endYear} onChange={(event) =>this.updateInputEndYear(event)} />
                    </div>    
                    <button onClick={this.buildQueryURL}> Click me</button>
                   
                </div>
                <div className="panel" >
                    <div className="panel-header" >
                        <span> Results </span>
                    </div>    
                {this.state.storyies.map((story, i) => <div onClick={()=> alert(this.state.storyies[i].headline.kicker) } style={Mystyle} key={'story-' + i}  >{story.headline.main} <button>Save </button> </div>)}
                </div>

                <div className="panel" >
                    <div className="panel-header" >
                        <span> Saved Stories </span>
                    </div>    
                {this.state.savedStories.map((story, i) => <div style={Mystyle} key={story._id}  >{story.title} <span>Date Saved {story.savedDate} </span> <button onClick={() =>this.removeStory(i) }> The Key is {i} Delete </button> </div>)}
                </div>



            </div>
        )
    }
}

export default Search