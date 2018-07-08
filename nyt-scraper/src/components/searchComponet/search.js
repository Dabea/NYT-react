import React, {Component } from 'react';
import axios from 'axios';
import "./search.css";


class Search extends Component {

    state = {
        topic: "test",
        startYear: "",
        endYear: "",
        storyies: [],
        savedStories: []
    }

    componentDidMount() {
        this.loadSavedStories();
    }

    loadSavedStories = () => {
        axios.get("/api/stories").then( res => {
          console.log(res);
          this.setState({
              savedStories: res.data
          })
      }
      )
    }

    removeStory = (index, id) => {
        axios.delete(`/api/stories/${id}`).then( (res) => {
            this.state.savedStories.splice(index, 1 )
            this.setState(  {
                savedStories: this.state.savedStories
            });
        });
    }

    buildQueryURL = () => {
        let queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        queryURL += "?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931";
        queryURL += "&q=" + this.state.topic;
        let startYear = this.state.startYear;
        if (parseInt(startYear)) {
          queryURL += "&begin_date=" + startYear + "0101";
        }

        let endYear = this.state.endYear
        if (parseInt(endYear)) {
          queryURL += "&end_date=" + endYear + "0101";
        }

        axios.get(queryURL).then(res => {
            this.setState({
                storyies: res.data.response.docs
            });
        })

        return queryURL;
      };
      
    updateInputValue = (evt)  => {
        this.setState({
            topic: evt.target.value
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

    handelChangeEvent = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }
     

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
                        <input name="topic" value={this.state.topic} onChange={(event) =>this.handelChangeEvent(event)} />
                    </div>
                    <div>
                        <label> start Year </label>
                        <input name="startYear" value={this.state.startYear} onChange={(event) =>this.handelChangeEvent(event)} />
                    </div>
                    <div>
                        <label> end Year </label>
                        <input name="endYear" value={this.state.endYear} onChange={(event) =>this.handelChangeEvent(event)} />
                    </div>    
                    <button onClick={this.buildQueryURL}> Click me</button>
                   
                </div>
                <div className="panel" >
                    <div className="panel-header" >
                        <span> Results </span>
                    </div>    
                {this.state.storyies.map((story, i) => <div onClick={()=> alert('test') } style={Mystyle} key={'story-' + i}  >{story.headline.main} <button>Save </button> </div>)}
                </div>

                <div className="panel" >
                    <div className="panel-header" >
                        <span> Saved Stories </span>
                    </div>    
                {this.state.savedStories.map((story, i) => <div style={Mystyle} key={story._id}  >{story.title} <span>Date Saved {story.dateCreatedFormated} </span> <button onClick={() =>this.removeStory(i, story._id) }>Delete </button> </div>)}
                </div>



            </div>
        )
    }
}

export default Search