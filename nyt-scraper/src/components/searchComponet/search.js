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
          console.log("loaded", res.data);
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
            console.log(res.data.response.docs)
            this.setState({
                storyies: res.data.response.docs
            });
        })

        return queryURL;
      };

    handelChangeEvent = (event) => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    saveStory = (story) => {
        axios.post('/api/stories', {title: story.headline.main , link: story.web_url, summary: story.snippet} )
        .then(
            this.loadSavedStories()
        )
    }

    addNote = (id) => {
       const note =  prompt('Please Enter your note')
        axios.put('/api/stories/' + id , {notes: note } )
        .then(
            this.loadSavedStories()
        )
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
                {this.state.storyies.map((story, i) => <div style={Mystyle} key={'story-' + i}  >{story.headline.main} <button onClick={() => this.saveStory(story)} >Save</button> </div>)}
                </div>

                <div className="panel" >
                    <div className="panel-header" >
                        <span> Saved Stories </span>
                    </div>    
                {this.state.savedStories.map(
                    (story, i) => <div>
                        <div style={Mystyle} key={story._id}>
                             {story.title} 
                             <span>Date Saved {story.dateCreatedFormated} </span> 
                             <button onClick={() =>  this.addNote(story._id)} > Add note </button>
                             <button onClick={() =>this.removeStory(i, story._id) }>Delete </button> 
                             {story.notes.map(note => <div>  {note}  </div>)}  </div> 
                        </div>)}
                </div>



            </div>
        )
    }
}

export default Search