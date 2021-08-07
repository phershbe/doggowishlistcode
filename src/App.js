import './App.css';
import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      data: '',
      url: '',
      breed: '',
      list: [],
      price: 'Who knows!'
    }
  }

  dogBreed = () => {
    console.log('Breed name');
    let currentURL = this.state.data.message.slice();
    let endOfURL = currentURL.slice(30);
    let middleOfURL = endOfURL.split("/")[0];
    if (middleOfURL.includes('-')) {
      let name = middleOfURL.split("-");
      middleOfURL = name[1] + " " + name[0];
    }
    console.log(middleOfURL);
    this.setState({breed: middleOfURL});
  }

  componentDidMount() {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(json =>
        this.setState({data: json}, () => 
          this.dogBreed()
        )
      );
  }

  changeDoggo = () => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then(response => response.json())
      .then(json => 
        this.setState({data: json}, () => 
         this.dogBreed()
        )
      )
  }

  addDoggo = () => {
    const updatedList = [...this.state.list];
    
    const currentDoggo = {
      breed: this.state.breed,
      price: this.state.price,
      id: 1 + Math.random()
    }
    this.setState({list: updatedList.concat(currentDoggo)});
    if (this.state.price === "Who knows!") {
      this.setState({price: "Hopefully not much!"});
    } else if (this.state.price === "Hopefully not much!") {
      this.setState({price: "We'll find out!"});
    } else {
      this.setState({price: "Who knows!"});
    }
  }

  deleteDoggo = (x) => {
    const copiedList = [...this.state.list]
    this.setState({list: copiedList.filter(item => item.id !== x)});
  }

  render() {

    return (
      <>
      <h1 className="text-center">Thank you to Dog API for the data!</h1>
      <div className="row">
        <div className="col text-center">
          <h1>It's a {this.state.breed}!</h1>
          <div className="picture">
            <img src={this.state.data.message} alt="dog" />
          </div>
          <br />
          <button onClick={this.changeDoggo} className="buttons">Change Doggo</button>
        </div>
        <div className="col text-center">
          <div className="titleAndButton">
            <h1>List of doggos I want...</h1>
            <button onClick={this.addDoggo} className="buttons">Add Current Doggo</button>
          </div>
          <ul>
          {this.state.list.map((item) => (
            <>
            <div className="list">
              <li key={item.id}>{item.breed}<button className="forDog" onClick={() => this.deleteDoggo(item.id)}>X</button></li>
              <p>Price: {item.price}</p>
            </div>
            
            </>
          ))}
          </ul>
        </div>
      </div>
      </>
    )
  }
}

export default App;
